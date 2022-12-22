var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'database-1.csbyxhiw6onu.us-east-1.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'Password',
    database: 'my_db'
});

exports.handler = (event, context, callback) =>{
    console.log("request:" +JSON.stringify(event));
  
    let body = {}
        if(event.body){
     body = JSON.parse(event.body);
    }
    context.callbackWaitsForEmptyEventLoop = false;
      let id=event.queryStringParameters.id;
      let sql ="UPDATE student SET ?  WHERE id=?";

    connection.query(sql,[body,id],(err,res)=>{
        if(err){
            throw err
        }
        let result = {
            statusCode : 200,
            body: JSON.stringify(res)
        }

        callback(null,result)
    })
}