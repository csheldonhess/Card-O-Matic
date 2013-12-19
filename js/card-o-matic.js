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
	$("#canvas").css("background-image", thetexture);
}); 

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