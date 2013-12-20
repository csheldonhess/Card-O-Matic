// if someone clicks a color-box...
$(".colors").click(function() {
	// pick the color!
	var thecolor = $(this).css("background-color");
	// now make the card the right color!
	$("#canvas, .textures").css("background-color", thecolor);
});

// if someone clicks a texture-box...
$(".textures").click(function(){
	// find the right texture
	var thetexture = $(this).css("background-image");
	// and make the card the right texture
	$("#canvas, .colors").css("background-image", thetexture);
}); 

// if someone clicks one of the messages...
$(".messages").click(function() {
	// who got clicked?
	var theradio = $(this);
	// ok, and which label does that go with?
	var thelabel = theradio.next();
	// what does the label say? (ring ding ding ding dingeding)
	var thetext = thelabel.html();
	// set the text up on the card
	$("#message-output").html(thetext);
});

// if someone types in the recipient box...
$("#recipient").keyup(function() {
	// what name did they type in?
	var thename = $(this).val();
	$("#recipient-output").html(thename);
	// is it too long?
	if (thename.length >= 14) {
		$("#text-error").html(" Max characters: 14");
	}
	else {
		$("text-error").html("");
	}
});

// if someone clicks a sticker, move it to the card
//$(".stickers").click(function() {
$("#controls").on("click", ".stickers", function() {
	// find out the location of the image file of the sticker
	var thesticker = $(this).clone();
	// give that sticker some class 
	thesticker.addClass("card-sticker");
	// put that sticker on the card
	$("#canvas").prepend(thesticker);
	thesticker.draggable({containment: "#canvas", opacity: 0.35});
	//thesticker.draggable("option", "opacity", 0.35);
});

// if someone clicks "Start Over"
$("#refresh-btn").click(function() {
	// get rid of the stickers
	$(".card-sticker").remove();
	// get rid of the text (even the error message)
	$("#text-error, #recipient-output, #message-output").html("");
	// clear the background of the card
	$("#canvas, .colors").css("background-image", "none");
	$("#canvas, .textures").css("background-color", "#FFFFFF");
	// things Coral wants added:
	// clear the sticker search results
	$("#sticker-search-results").html("");
	// I had to look it up - this works to uncheck the radio buttons
	$("input:radio").prop("checked", false);
	// this one doesn't - it leaves the last box checked, no matter what was checked before
	//$("#controls").find(".messages").prop("checked","false");
	// empty the textboxes (recipient and google search)
	$("input:text").prop("value", "");
});

// if someone clicks "Print"
$("#print-btn").click(function() {
	// get the html for the canvas
	var thecanvas = $("#canvas").prop("outerHTML");
	// build the content for the new tab
	var thetabcontents = "<html><head>";
	thetabcontents += "<link rel=\"stylesheet\" href=\"css/main.css\" type=\"text/css\">";
	thetabcontents += "<link rel=\"stylesheet\" href=\"css/features.css\" type=\"text/css\">";
	thetabcontents += "</head><body>";
	thetabcontents += thecanvas;
	thetabcontents += "</body></html>";
	// open a new tab, open the tab for writing, write, and close for writing (while leaving the tab open, obvs.)
	var thenewtab = window.open();
	thenewtab.document.open();
	thenewtab.document.write(thetabcontents);
	thenewtab.document.close();
});

// if someone wants google images
$("#sticker-search-btn").click(function() {
	// empties the div in case there were previous results
	$("#sticker-search-results").html("");
	// what's in the search box?
	var theterm = $("#sticker-search").val();
	// shamelessly copied
	// This is the URL for Google Image Search that we'll make the Ajax call to
	var google_url = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgsz=medium&q=" + theterm + "&callback=?";
	$.getJSON(google_url, function(data) {
		// make an array of data
		var images = data.responseData.results;
		if (images.length > 0) {
			// ... unpacking ? ...
			$.each(images, function(key, image) {
				// Create a new image element
	        	var new_image_element = "<img class=\"stickers circular\" src=\"" + image.url + "\">";
	        	// Now put the new image in our results div
	            $("#sticker-search-results").prepend(new_image_element);
	
	        });
		}
	});
});

