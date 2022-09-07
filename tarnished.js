// import { fetch } from "./node_modules/node-fetch";

function changeTable(tarnishedId) {
    fetch(`http://localhost:3000/Tarnished/${tarnishedId}`)
    .then(data => {
        return data.json()
    })
    .then(tarnished => {
        document.getElementById("name").innerHTML = tarnished.name;
        document.getElementById("title").innerHTML = tarnished.title;
        document.getElementById("faction").innerHTML = tarnished.factionname;
        document.getElementById("alignment").innerHTML = tarnished.type;
        document.getElementById("description").innerHTML = tarnished.description
    })
};

