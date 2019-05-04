var username = "";
var convertedusername = "";

try{
    username = localStorage.getItem('googleaccountemail');
    convertedusername = username.replace(new RegExp("\\.","g"),"?");
} catch (e){}


var tech = true;
var config = {
    apiKey: "AIzaSyDfAkKocOAk3Elv9V5x0Po4NXuuGGCfdng",
    authDomain: "dhypetest0.firebaseapp.com",
    databaseURL: "https://dhypetest0.firebaseio.com",
    projectId: "dhypetest0",
    storageBucket: "",
    messagingSenderId: "677082806183"
};
firebase.initializeApp(config);

// constant declarations ^
// page functions V

function $(name) {
    return document.getElementById(name);
}

//dragElement(document.getElementById(("dialogue")));

//dragElement(document.getElementById(("activationdialogue")));

sliderElement(document.getElementById(("savedslider")));

sliderElement(document.getElementById(("activationslider")));

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

function sliderElement(elmnt) {
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
        if ((elmnt.offsetLeft - pos1) < 33) {
            elmnt.style.left = "33px";
        } else if ((elmnt.offsetLeft - pos1) > 70) {
            elmnt.style.left = "70px";
        } else {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        var bool = false;
        if (parseInt(elmnt.style.left) < 50) {
            elmnt.style.left = "33px";
            elmnt.parentElement.style.backgroundColor = "grey";
            elmnt.parentElement.style.borderColor = "grey";
            bool = false;
        } else {
            elmnt.style.left = "70px";
            elmnt.parentElement.style.backgroundColor = "rgb(0, 32, 96)";
            elmnt.parentElement.style.borderColor = "rgb(0, 32, 96)";
            bool = true;
        }
        if (elmnt.id == "savedslider") {
            if (bool == true) {
                movefrompreappstonormal()
            } else {
                removefromnormal();
            }
        } else {
            if (bool == true) {
                activate()
            } else {
                deactivate();
            }
        }
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// page functions ^
// app info V

var currentappid = "";
currentappid = localStorage.getItem('previewid'); // given from apps.html

var dataserver;
dataserver = firebase.database().ref('/preappsstorage/' + currentappid + '/'); // preparing the app data storage server

var preapp; // raw from preapp server

var booting = true;
var loadingapp = true;
var queuewriteiframe = false;

firebase.database().ref('/preapps/' + currentappid + '/').on("value", function(snapshot) {
    preapp = snapshot.val();
    appcontent = preapp;
    loadingapp = false;
    if(!booting || queuewriteiframe){
        writeiframe();
    }
    booting = false;
});

dataserver.on("value",function(snapshot2){
    currentappdata = snapshot2.val();
    booting = false;
    if(!loadingapp){
        writeiframe();
    } else {
        queuewriteiframe = true;
    }
});

function writeiframe(){
    localStorage.setItem("preview",JSON.stringify(appcontent));
    $('nameinput').value = preapp["name"];
    $('currentversionnumber').innerHTML = "Latest version number:" + preapp["version"];
    if(preapp){
        var webpagetodisplay = '<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></sc'+'ript><script type="text/javascript">var config = {    apiKey: "AIzaSyDfAkKocOAk3Elv9V5x0Po4NXuuGGCfdng",    authDomain: "dhypetest0.firebaseapp.com",    databaseURL: "https://dhypetest0.firebaseio.com",    projectId: "dhypetest0",    storageBucket: "",   messagingSenderId: "677082806183"}; firebase.initializeApp(config); </sc'+'ript><script> var currentappdata = '+JSON.stringify(currentappdata)+'; try{var dataserver = firebase.database().ref(\'/appsstorage/\' + '+currentappid+' + \'/\');}catch(e){} try{dataserver.on("value",function(snapshot){currentappdata = snapshot.val();});}catch(e){} function getStudentYear(){return Number(localStorage.getItem("studentlvl"))} function getappdata(){return parent.sendappdata(); }</sc' + 'ript>' +  preapp["index?html"]; // injecting data adaptor
        if(tech == true){
            locationparser(currentappdata, "databasebox", 1);
            displayfiles();
            if(preapp["flag"]){
                flagsadaptor(Object.entries(preapp["flag"]));
            }
        }
        $('preview').src = "about:blank";
        setTimeout(function() { $('preview').contentDocument.write(webpagetodisplay); }, 1);
    }
}

var dataserverlisteneractivated = false;

function dataserverlistener(){
    
    dataserverlisteneractivated = true;
}

var appcontent = JSON.parse(localStorage.getItem('preview')); // given from apps.html

var currentappdata = ""; // getting ready the data storage

var saved = false; // download to phones
var activated = false; // visibility to student

// app info ^
// first screen V

function sendappdata() {
    return currentappdata;
}

// first screen ^
// page switching

function gotopage(html) {
    html = html.replace(new RegExp("\\.", "g"), "?");
    var apppage = preapp[html];
    apppage.replace(new RegExp("window.location.href","g"),"nextpage.location");
    var webpagetodisplay = `<script type="text/javascript">
    function getappdata(){
        return parent.sendappdata();
    }
    function newpage() {
        this.location = "";
    }

    var pagechange = {
        set(obj, prop, value) {
            if (prop === 'location') {
                parent.gotopage(value);
            }
        }
    }

    var newpage1 = new newpage();
    var nextpage = new Proxy(newpage1, pagechange);
     </sc` + "ript>" + apppage;
    $('preview').src = "about:blank";
    setTimeout(function() { $('preview').contentDocument.write(webpagetodisplay); }, 1);
}
// page switching ^
// saved and activation check V

var savedreadyappdata = {};
var readyappserver = firebase.database().ref('/apps/');
var readyappdata = firebase.database().ref('/appsstorage/'+currentappid+'/');
readyappserver.on("value", function(snapshot) {
    if (typeof snapshot.val()[currentappid] != "undefined") {
        var elmnt = $('savedslider');
        saved = true;
        elmnt.style.left = "70px";
        elmnt.parentElement.style.backgroundColor = "rgb(0, 32, 96)";
        elmnt.parentElement.style.borderColor = "rgb(0, 32, 96)";
    } else {
        saved = false;
        var elmnt = $('savedslider');
        elmnt.style.left = "33px";
        elmnt.parentElement.style.backgroundColor = "grey";
        elmnt.parentElement.style.borderColor = "grey";
    }
});
readyappdata.on("value",function(snapshot){
    savedreadyappdata = snapshot.val();
});

var CurrentVersion;
var appverserver = firebase.database().ref('appsversion/');
appverserver.on("value", function(snapshot) {
    var applist = [];
    if (snapshot.val().applist) {
        applist = snapshot.val().applist;
    }
    CurrentVersion = Number(snapshot.val().CurrentVersion);

    var exists = false;
    for (var l = 0; l < applist.length; l++) {
        if (applist[l][2] == currentappid) {
            exists = true;
        }
    }
    if (exists == true) {
        activated = true;
        var elmnt = $('activationslider');
        elmnt.style.left = "70px";
        elmnt.parentElement.style.backgroundColor = "rgb(0, 32, 96)";
        elmnt.parentElement.style.borderColor = "rgb(0, 32, 96)";
    } else {
        activated = false;
        var elmnt = $('activationslider');
        elmnt.style.left = "33px";
        elmnt.parentElement.style.backgroundColor = "grey";
        elmnt.parentElement.style.borderColor = "grey";
    }
});

// saved and activation check
// saving and activation functions

function movefrompreappstonormal() {
    if (saved == false) {
        appverserver.update({
            [currentappid]: preapp["version"]
        });
        readyappserver.update({
            [currentappid]: preapp
        });
        firebase.database().ref('/appsstorage/').update({
            [currentappid]: currentappdata
        });
    }
}

function removefromnormal() {
    if (saved == true) {
        appverserver.update({
            [currentappid]: null
        });
        readyappserver.update({
            [currentappid]: null
        });
        firebase.database().ref('/preappsstorage/').update({
            [currentappid]:savedreadyappdata
        });
        deactivate();
    }
}

function activate() {
    if (activated == false) {
        movefrompreappstonormal();
        appverserver.once("value", function(snapshot) {
            var applist = [];
            if (snapshot.val().applist) {
                applist = snapshot.val().applist;
            }
            applist.push([preapp["name"], preapp["version"], currentappid]);
            appverserver.update({ applist: applist });
            appverserver.update({ CurrentVersion: (CurrentVersion + 1) });
            appverserver.update({ [currentappid]: preapp["version"] });
        });
    }
}

function deactivate() {
    if (activated == true) {
        appverserver.once("value", function(snapshot) {
            var applist = [];
            if (snapshot.val().applist) {
                applist = snapshot.val().applist;
            }
            for (var l = 0; l < applist.length; l++) {
                if (applist[l][2] == currentappid) {
                    applist.splice(l, 1);
                }
            }
            appverserver.update({ applist: applist })
            appverserver.update({ CurrentVersion: (CurrentVersion + 1) });
        });
    }
}

// saving and activation functions ^
// check for dev update V

firebase.database().ref('/preapps/' + currentappid).on("value", function(snapshot) {
    if(snapshot.val()){
        var preversion = Number(snapshot.val()["version"]);
        firebase.database().ref('/apps/' + currentappid).on("value", function(snapshot2) {
            if(snapshot2.val()){
                $('activatedversionnumber').innerHTML = "Activated version number: "+snapshot2.val().version;
                if (preversion > Number(snapshot2.val().version)) {
                    $('updatenot').style.display = "inline-flex";
                } else {
                    $('updatenot').style.display = "none";
                }
            }
        });    
    }
});

// check for dev update ^
// admin and activation display V (deprecated)

function openadmin() {
    $('dialogue').style.display = "block";
    setTimeout(function() { $('dialogue').style.opacity = 1; }, 1);
    setTimeout(function() { $('dialogue').style.transition = "none"; }, 300)
}

function closeadmin() {
    $('dialogue').style.transition = "all 0.3s cubic-bezier(.25,.8,.25,1)";
    $('dialogue').style.opacity = 0;
    setTimeout(function() { $('dialogue').style.display = "none"; }, 300);
}

function openactivation() {
    $('activationdialogue').style.display = "block";
    setTimeout(function() { $('activationdialogue').style.opacity = 1; }, 1);
    setTimeout(function() { $('activationdialogue').style.transition = "none"; }, 300)
}

function closeactivation() {
    $('activationdialogue').style.transition = "all 0.3s cubic-bezier(.25,.8,.25,1)";
    $('activationdialogue').style.opacity = 0;
    setTimeout(function() { $('activationdialogue').style.display = "none"; }, 300);
}

// admin and activation display ^ (deprecated)
// admin adaptor V

var admins = [];
var isowner = false;
var adminserver = firebase.database().ref('/admins/' + currentappid);
adminserver.on("value", function(snapshot) {
    $('admins').innerHTML = '<div style="color:white; background-color: rgb(0, 32, 96);" class="admins"><div style="flex-grow:1;">Admins</div><div style="right:60px;" class="rights">Role</div></div>'
    currentappadmins = snapshot.val();
    if (currentappadmins) {
        admins = Object.entries(currentappadmins);
        for(admin in admins){
            if (admins[admin][0] == convertedusername){
                switch(admins[admin][1]){
                    case 0:
                        // owner
                        // can change owner rights
                        // all functions available
                        isowner = true;
                        $('deleteappdialogue').style.display = "block";
                        break;
                    case 1:
                        // sc ic
                        // can change everything but owner rights
                        // nontech functions available
                        $('databasedialogue').innerHTML = "";
                        $('databasedialogue').style.display = "none";
                        $('filesdialogue').innerHTML = "";
                        $('filesdialogue').style.display = "none";
                        $('flagdialogue').innerHTML = "";
                        $('flagdialogue').style.display = "none";
                        tech = false;
                        break;
                    case 2:
                        // technical ic
                        // cannot change everything but owner rights
                        // tech functions available
                        $('activationdialogue').innerHTML = "";
                        $('activationdialogue').style.display = "none";
                        break;
                    case 3:
                        // CCA IC
                        // no access to advanced settings
                        window.location.href = "apps.html";
                        break;
                    case 4:
                        // sc member
                        // cannot change rights
                        // nontech functions available
                        $('databasedialogue').innerHTML = "";
                        $('databasedialogue').style.display = "none";
                        $('filesdialogue').innerHTML = "";
                        $('filesdialogue').style.display = "none";
                        $('flagdialogue').innerHTML = "";
                        $('flagdialogue').style.display = "none";
                        tech = false;
                        break;
                    case 5:
                        // icc member
                        // cannot change rights
                        // tech functions available
                        $('activationdialogue').innerHTML = "";
                        $('activationdialogue').style.display = "none";
                        break;
                    case 6:
                        // sc ic + cca
                        // can change everything but owner rights
                        // nontech functions available
                        $('databasedialogue').innerHTML = "";
                        $('databasedialogue').style.display = "none";
                        $('filesdialogue').innerHTML = "";
                        $('filesdialogue').style.display = "none";
                        $('flagdialogue').innerHTML = "";
                        $('flagdialogue').style.display = "none";
                        tech = false;
                        break;
                }
            }
        }

        for (admin in admins) {
            
            var admindiv = document.createElement('div');
            admindiv.className = "admins";
            var actualname = admins[admin][0].replace(new RegExp("\\?","g"),".");
            if (isowner){
            admindiv.innerHTML = '<div class="adminname">'+actualname + '</div><div class="rights"><select style="position:relative; top:-3px;" onchange="admindropdown(this)" id="admin' + admin + '"><option value="0">Owner</option><option value="1">SC IC</option><option value="2">Technical IC</option><option value="3">CCA IC</option><option value="4">SC Member</option><option value="5">Comp/ICC Member</option><option value="6">SC/CCA</option></select><div id="removeadmin' + admin + '" style="margin-right:10px; display:inline; position:relative; left:10px;" onclick="removeadmin(this)">✖</div></div>';
        } else if (admins[admin][1] == 0){
            admindiv.innerHTML = '<div class="adminname">'+actualname + '</div><div class="rights"><div style="position:relative; top:-3px;" id="owner">Owner</div></div>';
        } else {
            admindiv.innerHTML = '<div class="adminname">'+actualname + '</div><div class="rights"><select style="position:relative; top:-3px;" onchange="admindropdown(this)" id="admin' + admin + '"><option value="1">SC IC</option><option value="2">Technical IC</option><option value="3">CCA IC</option><option value="4">SC Member</option><option value="5">Comp/ICC Member</option><option value="6">SC/CCA</option></select><div id="removeadmin' + admin + '" style="margin-right:10px; display:inline; position:relative; left:10px;" onclick="removeadmin(this)">✖</div></div>';

        }
            $("admins").appendChild(admindiv);
            if(isowner){
               $('admin' + admin).selectedIndex = admins[admin][1];
            } else if(admins[admin][1] == 0){

            } else {
               $('admin' + admin).selectedIndex = Number(admins[admin][1])-1;
            }
        }
    }
});

function admindropdown(input) {
    var l = input.selectedIndex;
    if(isowner){
        adminserver.update({
            [admins[input.id.slice(5)][0]]: input.selectedIndex
        });
    } else {
        adminserver.update({
            [admins[input.id.slice(5)][0]]: Number(input.selectedIndex)+1
        });       
    }
}

function addadmin() {
    var newadmins = $('addadmins').value.replace(/ /g, '').split(',');
    for (admin in newadmins) {
        if (newadmins[admin] != "") {
            if (Number($('newadminsright').value)!=3){
                var convertedusername = newadmins[admin].replace(new RegExp("\\.","g"),"?");
                adminserver.update({
                    [convertedusername]: (Number($('newadminsright').value)+3)
                });
            } else if (Number($('newadminsright').value)==3) {
                var convertedusername = newadmins[admin].replace(new RegExp("\\.","g"),"?");
                adminserver.update({
                    [convertedusername]: 3
                });
            } else if (Number($('newadminsright').value)!=4){
                var convertedusername = newadmins[admin].replace(new RegExp("\\.","g"),"?");
                adminserver.update({
                    [convertedusername]: 6
                });
            }
        }
    }
}

function removeadmin(input) {
    adminserver.update({
        [admins[input.id.slice(11)][0]]: null
    });
}

// admin adaptor ^
// database adaptor V

//testing
// var currentappdata = {
//     a: "A",
//     b: "B",
//     1: {
//         1: 1,
//         c2: "C2",
//         c3: {
//             c3a: "c3a"
//         }
//     }
// };

// locationparser(currentappdata, "databasebox", 1);

function locationparser(objectraw, dircontext, isroot) {
    // objectraw = {an:{"array"}}
    if(objectraw){
        var object = Object.entries(objectraw);
        // object = [["an",["array",{...}]]]
        for (var i = 0; i < object.length; i++) {
            // processing = ["key","value"]
            var newloc = document.createElement('div');
            newloc.className = "databaselocationwrapper";
            var newlocid;
            if (isroot == 1) {
                newlocid = object[i][0];
            } else {
                newlocid = dircontext + '/' + object[i][0];
            }
            newlocid = encodeURIComponent(newlocid.trim())
            if (typeof object[i][1] === "string" || typeof object[i][1] === "number") {
                if (i == 0) {
                    newloc.innerHTML = '<div class="dirarrow"></div><div class="treefirstnode"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + ' : <div id="edit' + newlocid + '" onblur="editnode(\'' + newlocid + '\',\'' + object[i][0] + '\')" class="pseudoinput" contenteditable="true">' + object[i][1] + '</div></div></div>';
                } else {
                    newloc.innerHTML = '<div class="dirarrow"></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + ' : <div id="edit' + newlocid + '" onblur="editnode(\'' + newlocid + '\',\'' + object[i][0] + '\')" class="pseudoinput" contenteditable="true">' + object[i][1] + '</div></div></div>';
                }
                $(dircontext).appendChild(newloc);
            } else {
                if (i == 0) {
                    newloc.innerHTML = '<div class="dirarrow" onclick="hidedir(\'' + newlocid + '\',\'' + object[i][0] + '\')"><div class="arrowicon"><div class="arrowicon">▼</div></div></div><div class="treelocationnode"></div></div><div class="treefirstnode"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + '</div></div>';
                } else if (i == (object.length - 1)) {
                    newloc.innerHTML = '<div class="dirarrow" onclick="hidedir(\'' + newlocid + '\',\'' + object[i][0] + '\')"><div class="arrowicon">▼</div></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + '</div></div>';
                } else {
                    newloc.innerHTML = '<div class="dirarrow" onclick="hidedir(\'' + newlocid + '\',\'' + object[i][0] + '\')"><div class="arrowicon">▼</div><div class="treelocationnode"></div></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + '</div></div>';
                }
                $(dircontext).appendChild(newloc);
                locationparser(object[i][1], newlocid);
            }
        }
    }
}

function hidedir(rdir, rkey) {
    var locationinfo = rdir.split("/");
    var pwd = currentappdata;
    for (var i = 0; i < (locationinfo.length - 1); i++) {
        pwd = pwd[locationinfo[i]];
    }
    var object = Object.entries(pwd);
    var i = 0;
    for (var j = 0; j < object.length; j++) {
        if (object[j][0] == rkey) {
            i = j;
        }
    }
    if (i == 0) {
        $(rdir).parentElement.innerHTML = '<div onclick="showdir(\'' + rdir + '\',\'' + rkey + '\')" class="dirarrow"><div class="arrowicon">▶</div></div><div class="treelocationnode"></div><div class="treefirstnode"></div><div class="treelocationnode"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + rdir + '><div class="databaselabel">' + rkey + '</div></div>';
    } else if (i == (object.length - 1)) {
        $(rdir).parentElement.innerHTML = '<div onclick="showdir(\'' + rdir + '\',\'' + rkey + '\')" class="dirarrow"><div class="arrowicon">▶</div></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + rdir + '><div class="databaselabel">' + rkey + '</div></div>';
    } else {
        $(rdir).parentElement.innerHTML = '<div onclick="showdir(\'' + rdir + '\',\'' + rkey + '\')" class="dirarrow"><div class="arrowicon">▶</div></div><div class="treelocationnode"></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + rdir + '><div class="databaselabel">' + rkey + '</div></div>';
    }
}

function showdir(rdir, rkey) {
    var locationinfo = rdir.split("/");
    var pwd = currentappdata;
    for (var i = 0; i < (locationinfo.length - 1); i++) {
        pwd = pwd[locationinfo[i]];
    }
    var object = Object.entries(pwd);
    var i = 0;
    for (var j = 0; j < object.length; j++) {
        if (object[j][0] == rkey) {
            i = j;
        }
    }
    if (i == 0) {
        $(rdir).parentElement.innerHTML = '<div onclick="hidedir(\'' + rdir + '\',\'' + rkey + '\')" class="dirarrow"><div class="arrowicon">▼</div></div><div class="treelocationnode"></div><div class="treefirstnode"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + rdir + '><div class="databaselabel">' + rkey + '</div></div>';
    } else if (i == (object.length - 1)) {
        $(rdir).parentElement.innerHTML = '<div onclick="hidedir(\'' + rdir + '\',\'' + rkey + '\')" class="dirarrow"><div class="arrowicon">▼</div></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + rdir + '><div class="databaselabel">' + rkey + '</div></div>';
    } else {
        $(rdir).parentElement.innerHTML = '<div onclick="hidedir(\'' + rdir + '\',\'' + rkey + '\')" class="dirarrow"><div class="arrowicon">▼</div></div><div class="treelocationnode"></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + rdir + '><div class="databaselabel">' + rkey + '</div></div>';
    }
    var object = Object.entries(pwd[rkey]);
    for (var i = 0; i < object.length; i++) {
        // processing = ["key","value"]
        var newloc = document.createElement('div');
        newloc.className = "databaselocationwrapper";
        var newlocid;
        newlocid = rdir + '/' + object[i][0];
        if (typeof object[i][1] === "string" || typeof object[i][1] === "number") {
            if (i == 0) {
                newloc.innerHTML = '<div class="dirarrow"></div><div class="treefirstnode"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + ' : ' + object[i][1] + '</div></div>';
            } else {
                newloc.innerHTML = '<div class="dirarrow"></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + ' : ' + object[i][1] + '</div></div>';
            }
            $(rdir).appendChild(newloc);
        } else {
            if (i == 0) {
                newloc.innerHTML = '<div onclick="showdir(\'' + newlocid + '\',\'' + object[i][0] + '\')" class="dirarrow"><div class="arrowicon">▶</div></div><div class="treelocationnode"></div><div class="treefirstnode"></div><div class="treelocationnode"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + '</div></div>';
            } else if (i == (object.length - 1)) {
                newloc.innerHTML = '<div onclick="showdir(\'' + newlocid + '\',\'' + object[i][0] + '\')" class="dirarrow"><div class="arrowicon">▶</div></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + '</div></div>';
            } else {
                newloc.innerHTML = '<div onclick="showdir(\'' + newlocid + '\',\'' + object[i][0] + '\')" class="dirarrow"><div class="arrowicon">▶</div></div><div class="treelocationnode"></div><div class="treesecondnodeonwards"></div><div class="treeallnodes"></div><div class="databaselocation" id=' + newlocid + '><div class="databaselabel">' + object[i][0] + '</div></div>';
            }
            $(rdir).appendChild(newloc);
        }
    }
}

function editnode(rdir) {
    var locationinfo = rdir.split("/");
    var tempobjnested = {
        [locationinfo[locationinfo.length - 1]]: $("edit" + rdir).innerHTML };
    for (var i = (locationinfo.length - 2); i >= 0; i--) {
        var tempobj = new Object;
        tempobj[locationinfo[i]] = tempobjnested;
        tempobjnested = tempobj;
    }
    update(currentappdata, tempobjnested);
}

function update(obj /*, …*/ ) {
    for (var i = 1; i < arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object") // this also applies to arrays or null!
                update(obj[prop], val);
            else
                obj[prop] = val;
        }
    }
    return obj;
}

$('export').addEventListener("click", function() {
    downloadasjson(currentappdata, "appdata");
});

function downloadasjson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function readasjson() {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    currentappdata = obj;
    $('databasebox').innerHTML = '<div class="databaselabel">/</div>';
    locationparser(currentappdata, "databasebox", 1);
    dataserver.update(currentappdata);
}

function triggerfileupload() {
    $('JSONupload').click();
}

// database adaptor ^
// files adaptor V


function displayfiles() {
    var ppreapp = [];
    if (preapp){
        ppreapp = Object.entries(preapp);
    }
    $('filesbox').innerHTML = "";
    for (var k = 0; k < ppreapp.length; k++) {
        if (ppreapp[k][0] != "name" && ppreapp[k][0] != "version" && ppreapp[k][0] != "flag") {
            var file = document.createElement('div');
            var filename = ppreapp[k][0].replace(/\?/g, ".");
            file.className = "file";
            file.innerHTML = '<div class="filename">' + filename + '</div><div onclick="deletefile(\'' + ppreapp[k][0] + '\')" class="deletefile">✖</div>';
            $('filesbox').appendChild(file);
        }
    }
}

function deletefile(file) {
    delete preapp[file];
    firebase.database().ref('/preapps/' + currentappid + '/' + file).remove();
    displayfiles();
}

window.addEventListener("dragover", function(e) {
    e = e || event;
    e.preventDefault();
}, false);
window.addEventListener("drop", function(e) {
    e = e || event;
    e.preventDefault();
}, false);

var uploadedfiles;
uploadedfiles = [];

function dropHandler(ev) {

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                if(ev.dataTransfer.items[i].type.slice(0,5) == 'image'){
                    var file = ev.dataTransfer.items[i].getAsFile();
                    var reader = new FileReader();
                    reader.onload = (function(reader) {
                        return function() {
                            var content = JSON.stringify(reader.result);
                            var filename = encodeURI(file.name);
                            filename = filename.replace(/\./g, "?");
                            uploadedfiles.push({
                                "filename": filename,
                                "contents": content
                            });
                            upload();
                        }
                    })(reader);

                    reader.readAsDataURL(file);
                } else if (ev.dataTransfer.items[i].type.slice(0,5) == 'text/'){
                    var file = ev.dataTransfer.items[i].getAsFile();
                    var reader = new FileReader();
                    reader.onload = (function(reader) {
                        return function() {
                            var content = JSON.stringify(reader.result);
                            var filename = encodeURI(file.name);
                            filename = filename.replace(/\./g, "?");
                            uploadedfiles.push({
                                "filename": filename,
                                "contents": content
                            });
                            upload();
                        }
                    })(reader);

                    reader.readAsText(file);
                }
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            if(ev.dataTransfer.files[i].type.slice(0,5) == 'image'){
                var reader = new FileReader();
                reader.onload = (function(reader) {
                    return function() {
                        var content = reader.result;
                        var filename = encodeURI(ev.dataTransfer.files[i].name);
                        filename = filename.replace(/\./g, "?");
                        uploadedfiles.push({
                            "filename": filename,
                            "contents": content
                        });
                        upload();
                    }
                })(reader);

                reader.readAsDataURL(ev.dataTransfer.files[i]);
            } else if (ev.dataTransfer.files[i].type.slice(0,5) == 'text/'){
                var reader = new FileReader();
                reader.onload = (function(reader) {
                    return function() {
                        var content = reader.result;
                        var filename = encodeURI(ev.dataTransfer.files[i].name);
                        filename = filename.replace(/\./g, "?");
                        uploadedfiles.push({
                            "filename": filename,
                            "contents": content
                        });
                        upload();
                    }
                })(reader);

                reader.readAsText(ev.dataTransfer.files[i]);
            }
        }
    }

    // Pass event to removeDragData for cleanup
    removeDragData(ev);
}

function removeDragData(ev) {

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to remove the drag data
        ev.dataTransfer.items.clear();
    } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
    }
}

var ignoreduplicates = false;
var duplicatedfiles = [];
var pendingduplicates = 0;

function upload() {
    firebase.database().ref('/preapps/' + currentappid + '/').once("value").then(function(snapshot) {
        var appcontent = snapshot.val();
        for (var i = 0; i < uploadedfiles.length; i++) {
            if (appcontent.hasOwnProperty(uploadedfiles[i].filename) && ignoreduplicates == false) {
                // duplicate
                duplicatedfiles.push(uploadedfiles[i]);
            } else {
                writefile(uploadedfiles[i].filename, uploadedfiles[i].contents);
                displayfiles();
                ignoreduplicates = false;
            }        
        }
        if(duplicatedfiles.length > 0){
            pendingduplicates = duplicatedfiles.length;
            handleduplicates();
        }
        if(duplicatedfiles.length != uploadedfiles.length){
            firebase.database().ref('/preapps/'+currentappid+'/').update({"version":(appcontent.version)+1});
        }
    });
}

function handleduplicates(){
    for(var i = 0; i < duplicatedfiles.length; i++){
        var actualfilename = duplicatedfiles[i].filename.replace(/\?/g, ".");
        var duplicatefilebox = document.createElement('div');
        duplicatefilebox.className = "duplicatefilebox";
        duplicatefilebox.id = "duplicatefilebox"+i;
        duplicatefilebox.innerHTML = '<div class="duplicatename">'+actualfilename+'</div><div class="overwritesingular" onclick="overwritesingular('+i+')" id="overwritesingular'+i+'">Overwrite</div><div id="cancelsingular'+i+'" onclick="cancelsingular('+i+')" class="cancelsingular">Cancel</div>';
        $('duplicatescontainer').appendChild(duplicatefilebox);
    }
    $('darken').style.left = "0";
}

function cancelupload() {
    uploadedfiles = [];
    displayfiles();
}

function overwritesingular(i){
    writefile(duplicatedfiles[i].filename, duplicatedfiles[i].contents);
    $('duplicatefilebox'+i).parentElement.removeChild($('duplicatefilebox'+i));
    pendingduplicates--;
    if(pendingduplicates == 0){
        duplicatedfiles = [];
        $('darken').style.left = "100vw";
        $('duplicatescontainer').innerHTML = "";
        uploadedfiles = [];
        firebase.database().ref('/preapps/'+currentappid+'/').update({"version":(appcontent.version)+1});
    }
}

function overwriteall(){
    for(var i = 0; i < duplicatedfiles.length; i++){
        if(duplicatedfiles[i] != "cancelled"){
            writefile(duplicatedfiles[i].filename, duplicatedfiles[i].contents);
        }
    }
    duplicatedfiles = [];
    $('darken').style.left = "100vw";
    $('duplicatescontainer').innerHTML = "";
    pendingduplicates = 0;
    uploadedfiles = [];
    firebase.database().ref('/preapps/'+currentappid+'/').update({"version":(appcontent.version)+1});
}

function cancelsingular(i){
    duplicatedfiles[i] = "cancelled";
    $('duplicatefilebox'+i).parentElement.removeChild($('duplicatefilebox'+i));
    pendingduplicates--;
    if(pendingduplicates == 0){
        duplicatedfiles = [];
        $('darken').style.left = "100vw";
        $('duplicatescontainer').innerHTML = "";
        uploadedfiles = [];
        firebase.database().ref('/preapps/'+currentappid+'/').update({"version":(appcontent.version)+1});
    }
}

function cancelall(){
    duplicatedfiles = [];
    $('darken').style.left = "100vw";
    $('duplicatescontainer').innerHTML = "";
    pendingduplicates = 0;
    uploadedfiles = [];
    firebase.database().ref('/preapps/'+currentappid+'/').update({"version":(appcontent.version)+1});
}

function writefile(filename, content) {
    var previewid = localStorage.getItem("previewid");
    firebase.database().ref('/preapps/' + previewid + '/').update({
        [filename]: content
    });
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    for (var i = 0; i < files.length; i++) {
        readfile(files,i,files.length);
    }
}

function readfile(files,i,flen){
    var f = files[i]
    var reader = new FileReader();
    if(f.type.slice(0,5) == "image"){
        reader.onload = (function(reader) {
            return function() {
                var content = reader.result;
                var filename = encodeURI(f.name)
                filename = filename.replace(/\./g, "?");
                uploadedfiles.push({
                    "filename": filename,
                    "contents": content
                });
                if ((i+1) == flen){
                    upload();
                }
                document.getElementById('choosefile').innerHTML = '<div style="margin-top: 30px;">Choose a file</div><input id="upload" multiple type="file" />';
                document.getElementById('upload').addEventListener('change', handleFileSelect, false);

            }
        })(reader);

        reader.readAsDataURL(f);
    } else if(f.type.slice(0,5) == "text/"){
        reader.onload = (function(reader) {
            return function() {
                var content = reader.result;
                var filename = encodeURI(f.name)
                filename = filename.replace(/\./g, "?");
                uploadedfiles.push({
                    "filename": filename,
                    "contents": content
                });
                if ((i+1) == flen){
                    upload();
                }
                document.getElementById('choosefile').innerHTML = '<div style="margin-top: 30px;">Choose a file</div><input id="upload" multiple type="file" />';
                document.getElementById('upload').addEventListener('change', handleFileSelect, false);

            }
        })(reader);

        reader.readAsText(f);
    }
}

// files adaptor ^
// name changer V

$('nameinput').addEventListener("change",function(){
    preapp["name"] = $('nameinput').value;
    firebase.database().ref('/preapps/' + currentappid + '/').update({"name":$('nameinput').value})
});

// name changer ^
// flags adaptor V

function flagsadaptor(flags){
    $('flags').value = "";
    for(var i = 0; i < flags.length; i++){
        $('flags').value += "--"+flags[i][0]+"\n";
    }
}

function saveflags(){
    var rawflags = $("flags").value.replace(new RegExp("\\n","g"),"").split("--");
    var flags = {};
    for(var i = 0; i < rawflags.length;i++){
        if(rawflags[i] != ""){
            flags[rawflags[i]] = true;
        }
    }
    firebase.database().ref('/preapps/' + currentappid + '/flag/').set(flags);
}

function deleteapp(){
    removefromnormal();
    firebase.database().ref('/preapps/' + currentappid).remove();
    firebase.database().ref('/preappsstorage/' + currentappid).remove();
    firebase.database().ref('/apps/' + currentappid).remove();
    firebase.database().ref('/appsstorage/' + currentappid).remove();
    firebase.database().ref('/preappsstorage/' + currentappid).remove();
    firebase.database().ref('/admins/' + currentappid).remove();
    firebase.database().ref('/appsversion/' + currentappid).remove();
    firebase.database().ref('/reccards/algo/' + currentappid).remove();
    window.location.href = "apps.html";
}

function trydeleteapp(){
    $('darken2').style.display = "block";
}

function canceldeleteapp(){
    $('darken2').style.display = "none";
}