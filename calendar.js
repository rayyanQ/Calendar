//Constructor
function Calendar(cal, events){

	this.target = cal
	this.create();
	var today = new Date();
	this.populate(today, events);
};

//Create calendar
Calendar.prototype.create = function(){

	//create elements
	var d = new Date();

	//head
	this.head = document.createElement("div");
	this.head.id = "calendar-head";
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	this.month = document.createElement("div");
	this.month.id = "calendar-head-month";
	this.month.innerHTML = months[d.getMonth()];
	var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	this.week = document.createElement("div");
	this.week.id = "calendar-head-weeks";
	var temp;
	for (var i = 0; i < 7; i++) {
		temp = document.createElement("div");
		temp.className = "calendar-head-week";
		temp.innerHTML = weeks[i];
		this.week.appendChild(temp);
	}

	//body
	this.body = document.createElement("div");
	this.body.id = "calendar-body";

	this.row = [];
	this.cell = [];
	for(var i=0; i<6; i++){
		this.row.push(document.createElement("div"));
		this.row[i].className = "calendar-body-week"
		for(var j=0; j<7; j++){
			this.cell.push(document.createElement("div"));
			this.cell[i*7+j].className = "calendar-body-day";
			this.row[i].appendChild(this.cell[i*7+j]);
		}
		this.body.appendChild(this.row[i]);
	}

	for(var i=0; i<42; i++){
		temp = document.createElement("div");
		temp.className = "calendar-body-day-text";
		this.cell[i].appendChild(temp);
		this.cell[i] = temp;
	}

	//insert elements
	this.head.appendChild(this.month);
	this.head.appendChild(this.week);
	this.target.appendChild(this.head);
	this.target.appendChild(this.body);
};

//Calculate the number of days in a month
Date.prototype.daysInMonth= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}

//Populate the calendar
Calendar.prototype.populate = function(d, e) {
	for (var i = 0; i < 42; i++) {
		this.cell[i].innerHTML = "";
	}
	var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
	var date = 1;
	for(var i=0; i<d.daysInMonth(); i++){
		this.cell[i+firstDay.getDay()].innerHTML += date;
		if(e[date] != undefined){
			if(e[date] == "P"){
				this.cell[i+firstDay.getDay()].className += " green";
				this.cell[i+firstDay.getDay()].setAttribute("title","Present");
			}
			else if(e[date] == "L"){
				this.cell[i+firstDay.getDay()].className += " yellow";
				this.cell[i+firstDay.getDay()].setAttribute("title","Late");
			}
			else if(e[date] == "A"){
				this.cell[i+firstDay.getDay()].className += " red";
				this.cell[i+firstDay.getDay()].setAttribute("title","Absent");
			}
		}
		date++;
	}
};

//Find and initialize all calendars
Calendar.init = function(){
	var calendars = document.getElementsByClassName("calendar");
	var events;
	for (var i = 0; i < calendars.length; i++) {
		events = JSON.parse(calendars[i].getAttribute("data-events"));
		new Calendar(calendars[i], events);
	}
};

Calendar.init();
