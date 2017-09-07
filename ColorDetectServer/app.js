const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
var colors = obj;



app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!')
});


app.get('/colors', function(req, res){
    res.json(colors);
});

app.post('/colors', function(req, res){
    var color= req.body;
    colors.push(color);

    fs.writeFile('data.json', JSON.stringify(colors),  function(err) {
        if (err) {
            return console.error(err);
        }
    });

    res.json(colors);
});
app.delete('/colors/:id', function(req, res){
    var id= req.params.id;
    colors.splice(id,1);

    fs.writeFile('data.json', JSON.stringify(colors),  function(err) {
        if (err) {
            return console.error(err);
        }
    });
    res.json(colors);
});

app.post('/color', function(req, res){
    var {r,g,b,k} = req.body;
    console.log(k);

    var distinces = [];
    colors.map((item, key)=>{
        let d = (r-item.code.r)*(r-item.code.r)+(g-item.code.g)*(g-item.code.g) +(b-item.code.b)*(b-item.code.b);

        var distince = {
            name:item.name,
            distince:d
        }
        distinces.push(distince);
    });
    console.log(distinces);
    distinces.sort(function(a,b) {return (a.distince > b.distince)?1:-1} );

    var result = [];
    for(var i = 0; i < k; i++){

        var distince = distinces[i];
        var flag = false;
        result.map((item, key)=>{
            if(distince.name == item.name){
                if(!flag){
                    item.count = item.count +1;
                    flag = true;
                }
            }
        });
        if(!flag){
            result.push({
                name:distince.name,
                count:1
            })
        }
    }
    result.sort(function(a,b) {return (a.count < b.count)} );
    console.log(distinces);
    res.json(result[0]);
});



app.listen(1111, function () {
    console.log('Example app listening on port 1111!');
});