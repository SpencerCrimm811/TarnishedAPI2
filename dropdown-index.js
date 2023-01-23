import express from "express";
import pg  from "pg";

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const port = 3001;

const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Cuddles01",
    database: "TheTarnished"
});

client.connect();

var dropdownList = '';

client.query(`Select tsh.id::varchar(255) as key, tsh.name as value from Tarnished tsh`, (err, res) => {
    if (!err){
        dropdownList = res.rows;
    } else {
        console.log(err.message)
    }
    client.end()
});

app.get('/TarnishedDropdown', (req, res) => {
    res.send(dropdownList)
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));