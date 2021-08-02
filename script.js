let roster = "";
let rosterSkills = "";

window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then( function(response) {
        response.json().then( function(json) {
            let i = 0;
            let j = 0;
            for (i of json) {
                for (j of json[i].skills) {
                    rosterSkills += json[i].skills[j];
                    rosterSkills += `<br>`;
                }
                roster += `
                <div id="roster">
                    <div id="photoColumn">
                        <div id="photo">src="${json[i].picture}></img></div>
                        <div id="fancyName>${json[i].firstName}</div>
                        <div id="fancyName>${json[i].lastName}</div>
                    </div>
                    <div id="textColumn">
                        <div id="plainTitle">First name:<div id="plainName">${json[i].firstName}</div></div>
                        <div id="plainTitle">Last Name:<div id="plainName">${json[i].lastName}</div></div>
                        <div id="plainTitle">ID#<div id="plainText">${json[i].id}</div></div>
                        <div id="plainTitle">Status<div id="plainText">${json[i].active}</div></div>
                        <div id="plainTitle">Flight Hours<div id="plainText">${json[i].hoursInSpace}</div></div>
                        <div id="plainTitle">Skills<div id="plainText">${rosterSkills}</div></div>
                    </div>
                </div>
                `
            }
            document.getElementById("container").innerHTML = roster;
        });



    });
    




});