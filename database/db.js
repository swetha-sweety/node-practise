var express = require("express")
var app= express();
var bodypareser = require('body-parser')
app.use(bodypareser.json())
var cors = require('cors')
app.use(cors())
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'student'
})

connection.connect((err)=>{
    if(!err){
      console.log('connected')
    }else {
        console.log(err)
    }
})

app.get('/getdata',(req,res)=>{
    let query = 'select * from customerdata';
    connection.query(query,(err,data)=>{
        if(err) {
            console.log(err)
        }else {
            res.send(data)
        }
    })
}).listen(4000)

app.post('/postdata', (req, res) => {
        let query = 'INSERT INTO customerdata (id,name,age,address) VALUES("'+req.body.id+'","'+req.body.name+'","'+req.body.age+'","'+req.body.address+'")';
        connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        })
}).listen(8088)

app.delete('/deletedata/:id', (req,res)=>{
    let query = `delete from customerdata where id=${req.params.id}`;
    connection.query(query,(err)=>{
        if(!err) res.send({
            message:'successfully deleted'});
            else res.status(400).send(err)
    })
})
    
app.put('/putdata?:id',(req,res)=>{
        let query = `update customerdata set name=${req.body.name},age=${req.body.age},address=${req.body.address} where id=${req.query.id}`;
        connection.query(query, (err) => {
        if (!err) res.send({ message: 'successfully created' });
        else res.status(400).send(err)
    }) 
})


app.listen(8000);


    
    