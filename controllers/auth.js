
const mysql = require("mysql2");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register=(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const password=req.body.password;
    const Confirmpassword=req.body.Confirmpassword;
    db.query('SELECT name FROM user WHERE name=? ',[name], async (error , results) => {
        if(error) {
             console.log(error);
             
            if(results.length > 0) {
            
            return res.render('register', {
                message:'that user already used'
            
            })
            
            } 
        }
        else if (password !== Confirmpassword) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
            }
          let hashedPassword=  await bcrypt.hash(password,8);
              console.log  (hashedPassword); 
              
              db.query('INSERT INTO user SET ?',{name:name,password:hashedPassword},(error,results)=>{
                if(error){
                    console.log(error);
                }else{
                    return res.render('register', {
            
                        message: 'User Registered'
                        
                        });
                    
                }
              })
              
        } );
    

    
}