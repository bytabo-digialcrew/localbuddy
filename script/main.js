var lastState = "initial";

$(document).ready(function() {
	readState();
	loadContent("default");
});

function readState()
{
	
//	$.ajax("http://asklocalbuddy.bytabo.de/request.php", { dataType : "json", success: receiveState });
	$.ajax("request.php", { dataType : "json", success: receiveState, error: receiveError });

}

function receiveState(response)
{
	var newState = response.State;

	var timeout = 1000;

	if(newState != lastState && newState.length > 0)
	{
		setState(newState);
		timeout = 1000;
	}
	
	setTimeout(readState, timeout);

}

function receiveError(req, error, errorThrown)
{
	//alert("Es ist ein Fehler aufgetreten. " + errorThrown + " Bitte Seite neu laden.");
}

function setState(newState)
{
	lastState = newState;

	switch(lastState)
	{
		case "toilette":
		{
			setTitle("Gabelmann<br />antwortet:");
			setColor("#c8beb7", "black");
			setIcon("logoGabelmann");
			loadContent("toilet");
			break;
		}
		case "restaurants":
		{
			setTitle("Gabelmann<br />antwortet:");
			setColor("#c8beb7", "black");
			setIcon("logoGabelmann");
			loadContent("restaurants");
			break;
		}
		case "history":
		{
			setTitle("Gabelmann<br />antwortet:");
			setColor("#c8beb7", "black");
			setIcon("logoGabelmann");
			loadContent("history");
			break;
		}
		case "speisekarte":
		{
			setTitle("Die Tanzlinde antwortet:");
			setColor("#b7c8b7", "black");
			setIcon("logoTanzlinde");
			loadContent("speisekarte");
			break;
		}
		case "tanzlinde":
		{
			setTitle("Die Tanzlinde antwortet:");
			setColor("#b7c8b7", "black");
			setIcon("logoTanzlinde");
			loadContent("tanzlinde");
			break;
		}
		case "zuege": 
		{
			setTitle("Bahnhof Bamberg antwortet:");
			setColor("#e9afaf", "black");
			setIcon("logoBahnhof");
			loadContent("zuege");
			break;
		}
		case "bahnsteig": 
		{
			setTitle("Bahnhof Bamberg antwortet:");
			setColor("#e9afaf", "black");
			setIcon("logoBahnhof");
			loadContent("bahnsteig");
			break;
		}
		default:
		{
			setTitle("Frag<br />LocalBuddy");
			setColor("#4b8998", "white");
			setIcon("logoLocalBuddy");
			loadContent("default");
			break;
		}
	}
}

function setTitle(newTitle)
{
        $("h1 .headline").html(newTitle);

}

function setColor(color, fg)
{
	$(".header-index").css("background", color);
	$("h1").css("color", fg);
}

function setIcon(name)
{
	$("h1 img").attr("src","images/" + name + ".png");
}

function loadContent(id)
{
	$.ajax("pages/" + id + ".html", { dataType : "text", success: receiveContent, error: receiveError });
}

function receiveContent(response)
{
	//alert(response);
	$(".realContent").html(response);
}
