var lastState = "initial";

$(document).ready(function() {
	readState();

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
		timeout = 10000;
	}
	
	setTimeout(readState(), timeout);

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
			//setTitle("Gabelmann antwortet:");
			break;
		}


	}
	setTitle(lastState);
}

function setTitle(newTitle)
{
        $("h1 span").html(newTitle);

}
