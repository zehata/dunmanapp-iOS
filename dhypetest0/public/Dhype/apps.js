
var username = "";
var convertedusername = "";

try{
    username = localStorage.getItem('googleaccountemail');
    convertedusername = username.replace(new RegExp("\\.","g"),"?");
} catch (e){}

var viewportwidth = "";

function updatecontentwidth() {
    viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewportwidth >= 1000) {
        $('contentwrapper').style.width = "1000px";
        $('contentwrapper').style.left = "calc( (100vw - 1000px)/2)";
        $('contentwrapper').style.backgroundColor = "transparent";
        $('contentwrapper').style.paddingTop = "100px";
        $('contentwrapper').style.height = "calc( 100vh - 100px)";
        var mobilecards = document.getElementsByClassName('mobilecards');
        for (var i = 0; i < mobilecards.length; i++) {
            mobilecards[i].style.display = "none";
        }
        var cards = document.getElementsByClassName('cards');
        for (var j = 0; j < cards.length; j++) {
            cards[j].style.display = "block";
            cards[j].style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
        }
        $('nav').style.backgroundColor = "transparent";
        $('nav').style.background = "linear-gradient(to right, rgb(0, 32, 96), rgba(0,0,0,0) 95%);";
        $('nav').innerHTML = `<div style="user-select:none; font-family:'Lobster'; color: white; position: absolute; top: 15px;font-size: 20px; left: 20px;">d.hype♯</div>
        <div id="links" style="font-family:'Roboto Thin';user-select:none; color: white; position: absolute; font-size: 20px; left: 120px;">
            <div style="left:0;" class="navlinks" onclick="window.location.href='indexnew.html'"><span class="linkstext">Maintenance</span></div>
            <div class="navlinks" style="left:150px;" onclick="window.location.href='indexnew.html'"><span class="linkstext">Projects</span></div><div style="left:300px" class="navlinks" onclick="window.location.href='indexnew.html'"><span class="linkstext">Archive</span></div><div style="left:450px" class="navlinks" onclick="window.location.href='apps.html'"><span class="linkstext">Apps</span></div>
        </div>`;
        var selects = document.getElementsByTagName('select');
        for (var l = 0; l < selects.length; l++) {
            selects[l].style.width = "initial";
            selects[l].style.height = "initial";
        }
        var mobilecards = document.getElementsByClassName('mobilecards');
        for (var m = 0; m < mobilecards.length; m++) {
            mobilecards[m].style.display = "none";
        }
        var titles = document.getElementsByClassName('titles');
        for (var n = 0; n < titles.length; n++) {
            titles[n].style.display = "none";
        }
    } else if (viewportwidth <= 1000 && viewportwidth >= 720) {
        $('contentwrapper').style.width = "calc( 100vw - 30px)";
        $('contentwrapper').style.left = "10px";
        $('contentwrapper').style.backgroundColor = "transparent";
        $('contentwrapper').style.paddingTop = "100px";
        $('contentwrapper').style.height = "calc(100vh - 50px)";
        $('nav').style.backgroundColor = "transparent";
        $('nav').innerHTML = `
        <div style="user-select:none; font-family:'Lobster'; color: white; position: absolute; top: 15px;font-size: 20px; left: 20px;">d.hype♯</div>
        <div id="links" style="font-family:'Roboto Thin';user-select:none; color: white; position: absolute; font-size: 20px; left: 120px;">
            <div style="left:0;" class="navlinks" onclick="window.location.href='indexnew.html'"><span class="linkstext">Maintenance</span></div>
            <div class="navlinks" style="left:150px;" onclick="window.location.href='indexnew.html'"><span class="linkstext">Projects</span></div><div style="left:300px" class="navlinks" onclick="window.location.href='indexnew.html'"><span class="linkstext">Archive</span></div><div style="left:450px" class="navlinks" onclick="window.location.href='apps.html'"><span class="linkstext">Apps</span></div>
        </div>`;
        var cards = document.getElementsByClassName('cards');
        for (var j = 0; j < cards.length; j++) {
            cards[j].style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
        }
    } else {
        $('contentwrapper').style.width = "100vw";
        $('contentwrapper').style.backgroundColor = "white";
        $('contentwrapper').style.paddingTop = "50px";
        $('contentwrapper').style.height = "calc(100vh - 50px)";
        $('contentwrapper').style.left = "0";
        $('nav').style.backgroundColor = "rgb(0, 32, 96)";
        $('nav').innerHTML = `<div style="user-select:none; font-family:'Lobster'; color: white; position: absolute; top: 15px;font-size: 20px; left: 20px;">d.hype♯</div>
        <img src="menu.png" style="width: 40px; padding: 10px; right: 0; position: absolute;" onclick="openlinks();" alt="">
        <div id="links" style="font-family:'Roboto Thin';user-select:none; color: white; position: absolute; top: -100vh; font-size: 20px; ">
            <div style="left:0;" class="mobilenavlinks" onclick="window.location.href='indexnew.html'"><span class="linkstext">Maintenance</span></div>
            <div class="mobilenavlinks"  onclick="window.location.href='indexnew.html'"><span class="linkstext">Projects</span></div><div class="mobilenavlinks" onclick="window.location.href='indexnew.html'"><span class="linkstext">Archive</span></div><div class="mobilenavlinks" onclick="window.location.href='apps.html'"><span class="linkstext">Apps</span></div>
        </div>`;
        var cards = document.getElementsByClassName('cards');
        for (var j = 0; j < cards.length; j++) {
            cards[j].style.boxShadow = "none";
        }
    }
}
var islinksopen = "closed";

function openlinks() {
    if (islinksopen == "closed") {
        $('links').style.top = "60px";
        $('menuoverlay').style.zIndex = 1;
        var links = document.getElementsByClassName('mobilenavlinks');
        for (var k = 0; k < links.length; k++) {
            links[k].style.opacity = 1;
            links[k].style.top = 0;
        }
        islinksopen = "open";
    } else {
        $('menuoverlay').style.zIndex = -1;
        var links = document.getElementsByClassName('mobilenavlinks');
        for (var k = 0; k < links.length; k++) {
            links[k].style.opacity = 0;
            links[k].style.top = "-300px";
        }
        islinksopen = "closed";
        setTimeout(function() { $('links').style.top = "-100vh"; }, 300);
    }
}
window.addEventListener("resize", function(event) {
    updatecontentwidth();
});

function $(name) {
    return document.getElementById(name);
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function darken() {
    $('darken').style.zIndex = "3";
    $('dialogue').style.zIndex = "4";
    $('dialogue').style.left = "20vw";
    $('dialogue').style.top = "30vh";
    setTimeout(function() {
        $('darken').style.opacity = "0.5";
        $('dialogue').style.opacity = "1";
    }, 1);
}

function lighten() {
    $('darken').style.opacity = "0";
    $('dialogue').style.opacity = "0";
    setTimeout(function() {;
        $('darken').style.zIndex = "-2";
        $('dialogue').style.zIndex = "-1";
    }, 1);
}

function lighten2() {
    $('admindialogue').style.transition = "all 0.3s cubic-bezier(.25,.8,.25,1)";
    $('darken2').style.opacity = "0";
    $('admindialogue').style.opacity = "0";
    setTimeout(function() {;
        $('darken2').style.zIndex = "-2";
        $('admindialogue').style.display = "none";
    }, 300);
}

function openadmin() {
    $('admindialogue').style.display = "block";
    setTimeout(function() { $('admindialogue').style.opacity = 1; }, 1);
    setTimeout(function() { $('admindialogue').style.transition = "none"; }, 300)
    $('darken2').style.zIndex = "3";
    setTimeout(function() { $('darken2').style.opacity = "0.5"; }, 1);
}

// page functions ^
// data functions V


function writedata() {
    if (overwriteconflict == true) {
        lighten();
        $('dialoguetitle').innerHTML = `<div style=" font-weight: bold; font-size: 1.5em;">Confirm upload</div>Are you sure you would like to upload this app?`;
        overwriteconflict = false;
        overwrite();
    } else {
        appname = $('appname').value;
        if (appname && uploadedhtml) {
            var dataserver = firebase.database().ref('/preapps/');
            dataserver.once("value").then(function(snapshot) {
                var allapps = Object.entries(snapshot.val());

                for (var l = 0; l < allapps.length; l++) {
                    if (allapps[l][1][0] == appname) {
                        overwriteconflict = true;
                        overwritingappid = allapps[l][0];
                    }
                }

                if (overwriteconflict == true) {
                    $('dialoguetitle').innerHTML = `<div style=" font-weight: bold; font-size: 1.5em;">Confirm overwrite</div>There is already an app with this name, if you choose to continue, you would overwrite this app, continue anyway?`;
                    darken();
                } else {
                    overwrite();
                }
            });

        } else if (!appname) {
            $('verbose').innerHTML = "Enter a name for your app";
            lighten();
        } else if (!uploadedhtml) {
            $('verbose').innerHTML = "No file uploaded";
            lighten();
        }
    }
}

function overwrite() {
    firebase.database().ref('/preapps/' + overwritingappid).once("value").then(function(snapshot) {
        var currentversion = Number(snapshot.val()[2]) + 1;
        firebase.database().ref('/preapps/').update({
            [overwritingappid]: [appname, ('`' + uploadedhtml + '`'), currentversion]
        });
        lighten();
        var dataserver = firebase.database().ref('/preapps/');
        dataserver.once("value").then(function(snapshot) {
            var allapps = snapshot.val();
            if (allapps[appname] == "`" + uploadedhtml + "`") {
                $('verbose').innerHTML = "Upload successful";
            }
        });
    });
}

function newapp() {
    var savenewapp = firebase.database().ref('/preapps/').push({
        name: "untitled",
        version: 0
    });
    var adminspath = "admins/"+savenewapp.key+'/'+convertedusername;
    var algopath = "reccards/algo/"+savenewapp.key+'/';
    firebase.database().ref().update({
        [adminspath]: 0,
        [algopath]:[false,0]
    }).then(function(){
        firebase.database().ref('/reccards/algo/').once("value", function(snapshot) {
            if(snapshot.val()[savenewapp.key]){
                firebase.database().ref('/preapps/').once("value", function(snapshot) {
                    preappsp1 = Object.entries(snapshot.val());
                    gotopreview((preappsp1.length-2));
                });
            }
        });
    });
}

var ignoreduplicates = false;

function upload() {
    var previewid = localStorage.getItem("previewid");
    firebase.database().ref('/preapps/' + previewid + '/').once("value").then(function(snapshot) {
        // snapshot.val() = {name:"No3",version:2,}
        var appcontent = snapshot.val();
        for (var i = 0; i < uploadedfiles.length; i++) {
            if (appcontent.hasOwnProperty(uploadedfiles[i].name) && ignoreduplicates == false) {
                // duplicate
                $('dialoguetitle').innerHTML = `<div style=" font-weight: bold; font-size: 1.5em;">Confirm overwrite</div>There is already a file with the name` + uploadedfiles[i].name + `, if you choose to continue, you would overwrite this file, continue anyway?`;
                darken();
            } else {
                writefile(uploadedfiles[i].filename, uploadedfiles[i].content)
            }
        }
    });
}

function writefile(filename, content) {
    var previewid = localStorage.getItem("previewid");
    filename.replace(/\./g, "?");
    firebase.database().ref('/preapps/' + previewid + '/').update({
        [filename]: content
    });
}

var uploadedfiles;
uploadedfiles = [];

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(reader) {
            return function() {
                var content = reader.result;
                content = content.replace(new RegExp("window.location.href", 'g'), "nextpage.location");
                content = content.replace(new RegExp("window.open", 'g'), "gotopage");
                var lines = contents.split('\n');
                uploadedfiles.push({
                    "filename": encodeURI(f.name),
                    "contents": content
                });
            }
        })(reader);

        reader.readAsText(f);
    }
}

var appname;
var overwriteconflict = false;
var overwritingappid;

// data functions ^
// admin functions V

var adminserver;
var admins1 = [];

function admindropdown(input) {
    var l = input.selectedIndex;
    adminserver.update({
        [admins1[input.id.slice(5)][0]]: input.selectedIndex
    });
}

function addadmin() {
    var newadmins = $('addadmins').value.replace(/ /g, '').split(',');
    for (admin in newadmins) {
        if (newadmins[admin] != "") {
            adminserver.update({
                [newadmins[admin]]: Number($('newadminsright').value)
            });
        }
    }
}

function removeadmin(input) {
    adminserver.update({
        [admins1[input.id.slice(11)][0]]: null
    });
}
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfAkKocOAk3Elv9V5x0Po4NXuuGGCfdng",
    authDomain: "dhypetest0.firebaseapp.com",
    databaseURL: "https://dhypetest0.firebaseio.com",
    projectId: "dhypetest0",
    storageBucket: "",
    messagingSenderId: "677082806183"
};
firebase.initializeApp(config);
var database = firebase.database();

var preappsp1 = "";
var preapps = [];
var admins = [];
var adminserver = firebase.database().ref('/admins/');
var preappsserver = firebase.database().ref('/preapps/');
preappsserver.on("value", function(snapshot) {
    adminserver.on("value", function(snapshot2){
        var adminraw = snapshot2.val();
        var preappsraw = snapshot.val();
        var objectedpreapps = Object.entries(preappsraw);
        var preappsaccessible = [];
        for(var j = 0; j < objectedpreapps.length; j++){
            if(objectedpreapps[j][0] != "placeholder"){
                if(adminraw[objectedpreapps[j][0]]){
                    if(adminraw[objectedpreapps[j][0]].hasOwnProperty(convertedusername)){
                        if(adminraw[objectedpreapps[j][0]][convertedusername] != 3 && adminraw[objectedpreapps[j][0]][convertedusername] != 6){
                            preappsaccessible[objectedpreapps[j][0]] = (preappsraw[objectedpreapps[j][0]]);
                        }
                    }
                }
            }
        }
        $('appcard').innerHTML = '<div style="margin-bottom: 20px;">Apps</div>      <div style="color:white; background-color: rgb(0, 32, 96);" class="apps">App Name</div><div id="appwrapper"></div><div class="createwrapper"><div id="create">+ Create new app</div></div>'
        preappsp1 = Object.entries(preappsaccessible);
        for (var i = 0; i < preappsp1.length; i++) {
            if (preappsp1[i][0] != "placeholder") {
                var newappdiv = document.createElement("div");
                newappdiv.innerHTML = '<div style="user-select:none;" id="app' + i + '" onclick="gotopreview(' + i + ')">' + preappsp1[i][1].name + '</div>';
                newappdiv.className = "apps";
                $('appwrapper').appendChild(newappdiv);
            }
        }
        $('create').addEventListener("click",function(){
            newapp();
        });
    });
});

// admin functions ^
// preview functions V

function gotopreview(id) {
    console.log(preappsp1[id])
    localStorage.setItem("preview", JSON.stringify(preappsp1[id][1]));
    localStorage.setItem('previewid', preappsp1[id][0]);
    window.location.href = 'preview.html';
}

// preview functions ^