const express = require("express");
const path=require("path");
const mysql = require("mysql2");
const dotenv=require('dotenv');


dotenv.config({path: './.env'})
const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.set('view engine','hbs');

db.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error);
    } else {
        console.log("MySQL connected..");
    }
});



app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))

app.listen(8000,()=>{
    console.log("Server Started on port 8000");
}
);