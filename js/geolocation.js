document.addEventListener("DOMContentLoaded",main)

function main() //A barebones function, yes, but I'd add more in a larger project.
{
	if (!geotest()) // Don't bother doing anything else if there's no geolocation.
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


function loaddata(loc)
{
	var canvas=document.createElement("canvas");
	document.querySelector("body").appendChild(canvas);
	canvas.setAttribute("height", 400);
	canvas.setAttribute("width", 400);
	var context=canvas.getContext("2d");
	
	var long=loc.coords.longitude;
	var lat=loc.coords.latitude;
	var URL="https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+long
		+"&markers=color:red|label:C|"+lat+","+long
		+"&zoom=14&size=400x400&key=AIzaSyDWuaomVmfQTx-qbLYmZ2-CmVlZLMAdI0M";
	
	var image=document.createElement("img");
	image.setAttribute("src",URL);
	
	context.drawImage(image,0,0);
}
