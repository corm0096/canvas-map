document.addEventListener("DOMContentLoaded",main)
var mainpage;

function main() //A barebones function, yes, but I'd add more in a larger project.
{

	mainpage=document.createElement("p");
	document.querySelector("body").appendChild(mainpage);
	mainpage.innerHTML="<p>Finding Location...</p>";
	
	if (!geotest()) // Don't bother doing anything else if there's no geolocation, error messaging is already sorted.
	{
		return;
	}
}


function geotest()//This function will determine if there's geolocation code and initiate the request.
{
	var param={enableHighAccuracy:false, timeout:10000, maximumAge:3600}//Ten seconds for GPS, 1 hour for location
	
	if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(loaddata,GPSerror,param);
			return true;
		}
	else
		{
			mainpage.innerHTML="Your browser does not support geolocation.";
			return false;
		}	
}


function GPSerror(error)
{
	switch (error.code)
		{
			case 1:
				mainpage.innerHTML="Permission denied.";
				break;
			case 2:
				mainpage.innerHTML="Position unavailable.";
				break;
			case 3:
				mainpage.innerHTML="GPS Timeout";
				break;
		}
}


function loaddata(loc)
{
	var canvas=document.createElement("canvas");
	mainpage.innerHTML="Your location, awaiting response from Google:";
	document.querySelector("body").appendChild(canvas);
	canvas.setAttribute("height", 400);
	canvas.setAttribute("width", 400);
	var context=canvas.getContext("2d");
	
	var long=loc.coords.longitude;
	var lat=loc.coords.latitude;
	var URL="https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+long
		+"&markers=color:red|label:C|"+lat+","+long
		+"&zoom=14&size=400x400&key=AIzaSyDWuaomVmfQTx-qbLYmZ2-CmVlZLMAdI0M";
	var map=new Image()
	//document.createElement("img");
	//map.setAttribute("src",URL);
	map.src=URL;
	map.onload=function()
	{
		context.drawImage(map,0,0);
		mainpage.innerHTML="YOUR LOCATION:";
	}
}
