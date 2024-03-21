import express, { json } from 'express';
var Datastore = require('nedb');
const db = new Datastore();
const { PORT } = process.env;
const port = PORT || 1000;
const app = express();
app.use(json());
db.insert({ numb: 0 }, function (err: any, numb: any) {
    console.log('new docs', numb);
});

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/sum', function (req, res) {
    console.log(req.body);
    const { numb } = req.body;
    let total = 0;
    db.insert({ numb }, function (err: any, newDocs: any[]) {
        if(err) return res.send('error');
        console.log(newDocs[0]);
        db.find({}, function(err: any, docs: any[]){
            console.log('docs here', docs);
            docs.forEach((d) => {
                total = total + d.numb;
            })
            res.json({ total });
        });
        

       
    });

})


console.log('my port', port);

app.listen(port);