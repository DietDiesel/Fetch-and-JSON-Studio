let roster = "";
let rosterSkills = "";
let statusHighlight = "";
let astronautStatus = "Unknown";
let i = 0;
let j = 0;

//trying a sort function on the json object
//blatantly stolen from https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return -1;  
       else if(a[property] < b[property])  
          return 1;  
   
       return 0;  
    }  
 }

window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then( function(response) {
        response.json().then( function(json) {

            //trying a sort function on the json object
            json.sort(sortByProperty("hoursInSpace"));

            for (i in json) {
                //putting the skills array into a string of HTML, for use later in roster
                    //first reset the string
                rosterSkills = "";
                    //then loop through the skills and concatenate
                for (j of json[i].skills) {
                    rosterSkills += j + ', ';
                }
                    //trim off the last comma and space
                rosterSkills = rosterSkills.slice(0, rosterSkills.length -2);

                //toggle status based on active entry
                switch (json[i].active) {
                    case true:
                        astronautStatus = "Active";
                        break;
                    default:
                        astronautStatus = "Inactive";
                }

                //extra styling for active astronauts
                if (astronautStatus === "Active") {
                    statusHighlight = ' style="color: limegreen; font-weight: bold;"';
                } else {
                    statusHighlight = "";
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
                            <div id="plainTitle">Status<div id="plainText"${statusHighlight}>${astronautStatus}</div></div>
                            <div id="plainTitle">Flight Hours<div id="plainText">${json[i].hoursInSpace}</div></div>
                        </div>
                        <div id="innerColumn">
                            <div id="plainTitle">Skills<div id="plainText">${rosterSkills}</div></div>
                        </div>
                    </div>
                </div>
                `
            }

            //finally apply the HTML to the page
            roster = '<div id="fancyName">' + json.length + ' total astronauts in roster</div>' + roster;
            document.getElementById("container").innerHTML = roster;
        });
    });
    




});