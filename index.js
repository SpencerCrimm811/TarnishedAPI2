import express from "express";
import path from "path";
import pg  from "pg";
import { URL } from 'url';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const port = 3000;
// const __dirname = new URL(".", import.meta.url).pathname;

const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Cuddles01",
    database: "TheTarnished"
});

client.connect();

var tarnishedList = '';

client.query(`Select tsh.id, tsh.name, tsh.title, tsh.description, tsh.portrait, fac.factionname, ali.type  from Tarnished tsh  Inner Join  Faction fac on tsh.factionid = fac.id Inner Join Alignment ali on tsh.alignmentid = ali.id`, (err, res) => {
    if (!err){
        tarnishedList = res.rows;
    } else {
        console.log(err.message)
    }
    client.end()
});

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.get('/Fight:id', (req, res) => {
    const { id } = req.params;

    const foundTarnished = tarnishedList.find((tarnished) => tarnished.id == id);
    //const foundTarnished = tarnishedList.filter((tarnished) => tarnished.id == id);
    const tarnishedName = JSON.stringify(foundTarnished.name);

    res.send(`Winner is ${JSON.parse(tarnishedName)}!`)
});

app.get('/Tarnished', (req, res) => {
    res.send(tarnishedList)
});

/* app.get('/TarnishedMain', (req, res) => {
    res.sendFile(path.join(__dirname, 'tarnished.html'))
});  */

app.get('/Tarnished/:id', (req, res) => {
    const tarnishedId = Number(req.params.id);

    const chosenTarnished = tarnishedList.filter((tarnished) => tarnished.id == tarnishedId);
    const returnValue = chosenTarnished[0];

    res.send(returnValue)
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
