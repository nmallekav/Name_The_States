
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];
var total = states.length

var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}


document.getElementById("button").onclick = function() {
    clock();
    inputValue();
    hov();
};

 function clock() {
    ti = 20;

   var y = setInterval(function() {
        if (ti == 0) {
            document.getElementById("time").innerHTML = "EXPIRED";
            clearInterval(y);
          }
        else {
            document.getElementById("time").innerHTML = ti;
            ti--;
        };

    }, 1000);

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function inputValue() {
   var x = setInterval(function() {
    var val = document.getElementById("input").value;

    if (document.getElementById("time").innerHTML != "EXPIRED" && states.includes(val)){
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(val);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("list").appendChild(node);     // Append <li> to <ul> with id="myList"
        document.getElementById("input").value = "";

        node.addEventListener("mouseover", function() {
            fetch('https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:'+abvMap[val]+'&LAN=625').then((resp) => resp.json())
            .then(function(data) {
                alert("Number of spanish speakers in "+ val +" is "+numberWithCommas(data[1][0]));
            });
        }, false);

        removeElement(val);
    }
    
    if (states.length == 0 && document.getElementById("time").innerHTML != "EXPIRED") {
        document.getElementById("input").style.display = 'none';
        document.getElementById("button").style.display = 'none';
        document.getElementById("list").style.display = 'none';
        document.getElementById("time").style.display = 'none';


        document.getElementById("listOfLoss").innerHTML = "You Win!";

        clearInterval(x);
    }

    if (document.getElementById("time").innerHTML == "EXPIRED") {

        document.getElementById("input").style.display = 'none';
        document.getElementById("button").style.display = 'none';
        document.getElementById("list").style.display = 'none';

        document.getElementById("listOfLoss").innerHTML = "States Left";
        
        var str =  (total-states.length);
        document.getElementById("score").innerHTML = "Score: "+str + "/"+ total;


        addStates();

        clearInterval(x);
    }
        
    }, 2);
}


function addStates() {
    for (i = 0; i<states.length; i++) {
        var state = states[i];

        var node = document.createElement("li");                 // Create a <li> node
        var textnode = document.createTextNode(state);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>

        node.id = state

        node.addEventListener("mouseover", function() {
            fetch('https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:'+abvMap[state]+'&LAN=625').then((resp) => resp.json())
            .then(function(data) {
                alert("Number of spanish speakers in "+ state +" is "+numberWithCommas(data[1][0]));
            });
        }, false);

        document.getElementById("listOfLoss").appendChild(node);     // Append <li> to <ul> with id="myList"
   
    }
}

function removeElement(ele) {
    for (i = 0; i<states.length; i++) {
        if (ele == states[i])
            states.splice(i, 1);
    }
}
