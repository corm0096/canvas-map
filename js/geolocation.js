document.addEventListener("DOMContentLoaded",main)

var mainpage, canvas; //Elements for the webpage.
var loadedcounts=0; //Incremented when google maps loads and the geodata loads.

function main()
{

	mainpage=document.querySelector("body");

	if (!geotest()) // Don't bother doing anything else if there's no geolocation.
	{
		return;
	}
	showdata();
}


function geotest()//This function will determine if there's geolocation code and initiate the request.
{
	var param={enableHighAccuracy:false, timeout:10000, maximumAge:3600}//Ten seconds for GPS, 1 hour for location
	
	if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(showdata,GPSerror,param);
			return true;
		}
	else
		{
			mainpage.innerHTML="<p>Your browser does not support geolocation.</p>";
			return false;
		}	
}

function GPSerror(error)
{
	switch (error.code)
		{
			case 1:
				mainpage.innerHTML="<p>Permission denied.</p>";
				break;
			case 2:
				mainpage.innerHTML="<p>Position unavailable.</p>";
				break;
			case 3:
				mainpage.innerHTML="<p>GPS Timeout</p>";
				break;
		}
}

	//position.coords.latitude, longitude, etc.


function showdata()
{
	loadedcounts++;
	alert(loadedcounts);
	if (loadedcounts<2)
		{
			return;
		}
	canvas=document.createElement("canvas");
	mainpage.appendChild(canvas);
	
	var long=position.coords.longitude;
	var lat=position.coords.latitude;
	var map=new google.maps.Map(canvas,
								{center:{lat:lat, lng:long},zoom:14});
	
}
//corm0096-gmaps-key
//AIzaSyAOfw2qcUZlRwI-rlauKJb7pJr388ihyT0
