var viewportwidth = "";
var fldata;
function updatecontentwidth(){
	viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewportwidth >= 1000){
		$('nav').style.backgroundColor = "transparent";
		$('nav').style.background = "linear-gradient(to right, rgb(0, 32, 96), rgba(0,0,0,0) 95%);";
		$('nav').innerHTML = `<div style="user-select:none; font-family:'Lobster'; color: white; position: absolute; top: 15px;font-size: 20px; left: 20px;">d.hype#</div>
		<div id="links" style="font-family:'Roboto Thin';user-select:none; color: white; position: absolute; font-size: 20px; left: 120px;">
			<div style="left:0;" class="navlinks" onclick="window.location.href='maintenance.html'"><span class="linkstext">Maintenance</span></div>
			<div class="navlinks" style="left:150px;" onclick="window.location.href='maintenance.html'"><span class="linkstext">Projects</span></div><div style="left:300px" class="navlinks" onclick="window.location.href='maintenance.html'"><span class="linkstext">Archive</span></div><div style="left:450px" class="navlinks" onclick="window.location.href='apps.html'"><span class="linkstext">Apps</span></div>
		</div>`;
	} else if (viewportwidth <= 1000 && viewportwidth >= 600){
		$('nav').style.backgroundColor = "transparent";
		$('nav').style.background = "linear-gradient(to right, rgb(0, 32, 96), rgba(0,0,0,0) 95%);";
		$('nav').innerHTML = `<div style="user-select:none; font-family:'Lobster'; color: white; position: absolute; top: 15px;font-size: 20px; left: 20px;">d.hype#</div>
		<div id="links" style="font-family:'Roboto Thin';user-select:none; color: white; position: absolute; font-size: 20px; left: 120px;">
			<div style="left:0;" class="navlinks" onclick="window.location.href='maintenance.html'"><span class="linkstext">Maintenance</span></div>
			<div class="navlinks" style="left:150px;" onclick="window.location.href='maintenance.html'"><span class="linkstext">Projects</span></div><div style="left:300px" class="navlinks" onclick="window.location.href='maintenance.html'"><span class="linkstext">Archive</span></div><div style="left:450px" class="navlinks" onclick="window.location.href='apps.html'"><span class="linkstext">Apps</span></div>
		</div>`;
	} else {
		$('nav').style.backgroundColor = "rgb(0, 32, 96)";
		$('nav').innerHTML = `<div style="user-select:none; font-family:'Lobster'; color: white; position: absolute; top: 15px;font-size: 20px; left: 20px;">d.hype♯</div>
		<img src="menu.png" style="width: 40px; padding: 10px; right: 0; position: absolute;" onclick="openlinks();" alt="">
		<div id="links" style="font-family:'Roboto Thin';user-select:none; color: white; position: absolute; top: -100vh; font-size: 20px; ">
			<div style="left:0;" class="mobilenavlinks" onclick="window.location.href='maintenance.html'"><span class="linkstext">Maintenance</span></div>
			<div class="mobilenavlinks"  onclick="window.location.href='maintenance.html'"><span class="linkstext">Projects</span></div><div class="mobilenavlinks" onclick="window.location.href='maintenance.html'"><span class="linkstext">Archive</span></div><div class="mobilenavlinks" onclick="window.location.href='apps.html'"><span class="linkstext">Apps</span></div>
		</div>`;
	}
}
window.addEventListener("resize", function(event) {
	updatecontentwidth();
});
var islinksopen = "closed";
function openlinks(){
	if (islinksopen == "closed"){
		$('links').style.top="60px";
		$('menuoverlay').style.zIndex = 1;
		var links = document.getElementsByClassName('mobilenavlinks');
		for(var k = 0; k < links.length; k++){
			links[k].style.opacity = 1;
			links[k].style.top = 0;
		}
		islinksopen = "open";
	} else {
		$('menuoverlay').style.zIndex = -1;
		var links = document.getElementsByClassName('mobilenavlinks');
		for(var k = 0; k < links.length; k++){
			links[k].style.opacity = 0;
			links[k].style.top = "-300px";
		}
		islinksopen = "closed";
		setTimeout(function(){$('links').style.top="-100vh";},300);
	}
}



var d = new Date();
var datetoday = (d.getFullYear())+"-"+((function(){if((d.getMonth()+1)<10 ){return "0"+(d.getMonth()+1)}else{return d.getMonth()}})())+"-"+((function(){if((d.getDate())<10 ){return "0"+(d.getDate())}else{return d.getDate()}})());


function $(name){
	return document.getElementById(name);
}

var selectboxlist = ["a",1,2,3,"date",4,5,6];
var daydata = [];
var fldata = {};
function dropdown(input)
{
			if (input.getAttribute("data-ordered")==0){
				var l = input.selectedIndex;
				fldata[datetoday] = [l,l,l,l,daydata[4],l,l,l];
			}
			var k = input.getAttribute("data-ordered");
			fldata[datetoday][k] = input.selectedIndex;
			daydata = fldata[datetoday];
			updatedatedata();
		}

function reloaddate(input){
	var hasdate = 0;
	for (var j = 0; j < fldata.length;j++){
		if (fldata[j][4] == input.value){
			daydata = fldata[j];
			hasdate = 1;
			updatedatedata();
		}
	}
	if (hasdate == 0){
		createdate(input.value);
	}
}

function updatedatedata(){
	for (var i = 0; i < 8; i++){
		if (i != 4){
			var dropdown = $('fl'+selectboxlist[i]);
			dropdown.selectedIndex = daydata[i];
			writedata(daydata);
		} else {
			$('fld').value = daydata[4];
		}
	}
	for (var i = 0; i < 8; i++){
		if (i != 4){
			var dropdown = $('mfl'+selectboxlist[i]);
			dropdown.selectedIndex = daydata[i];
			writedata(daydata);
		} else {
			$('mfld').value = daydata[4];
		}
	}
}

function createdate(newdate){
	var newdatedata = [0,0,0,0,newdate,0,0,0];
	fldata[newdate] = newdatedata;
	daydata = newdatedata;
	updatedatedata();
}

function writedata(data){
firebase.database().ref('appsstorage/-LAPoHDD297w_bh6rVMg/').update({
  [data[4]]: data
});
}
