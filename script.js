let roster = "";
let rosterSkills = "";

window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then( function(response) {
        response.json().then( function(json) {
            let i = 0;
            let j = 0;
            for (i in json) {
                //putting the skills array into a string of HTML, for use later in roster
                rosterSkills = "";
                for (j of json[i].skills) {
                    rosterSkills += j + ', ';
                }
                rosterSkills = rosterSkills.slice(0, rosterSkills.length -2);
                //toggle status based on active entry
                let astronautStatus = "Unknown";
                switch (json[i].active) {
                    case true:
                        astronautStatus = "Active";
                        break;
                    case false:
                        astronautStatus = "Inactive";
                        break;
                }
                //build the HTML for this roster entry
                roster += `
                <div id="roster">
                    <div id="photoColumn">
                        <img id="photo" src="${json[i].picture}">
                        <div id="fancyName">${json[i].firstName}</div>
                        <div id="fancyName">${json[i].lastName}</div>
                    </div>
                    <div id="textColumn">
                        <div id="innerColumn">
                            <div id="plainTitle">First name:<div id="plainName">${json[i].firstName}</div></div>
                            <div id="plainTitle">Last Name:<div id="plainName">${json[i].lastName}</div></div>
                        </div>
                        <div id="innerColumn">
                            <div id="plainTitle">ID#<div id="plainText">${json[i].id}</div></div>
                            <div id="plainTitle">Status<div id="plainText">${astronautStatus}</div></div>
                            <div id="plainTitle">Flight Hours<div id="plainText">${json[i].hoursInSpace}</div></div>
                        </div>
                        <div id="innerColumn">
                            <div id="plainTitle">Skills<div id="plainText">${rosterSkills}</div></div>
                        </div>
                    </div>
                </div>
                `
            }
            document.getElementById("container").innerHTML = roster;
        });



    });
    




});