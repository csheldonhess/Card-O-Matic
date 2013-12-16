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