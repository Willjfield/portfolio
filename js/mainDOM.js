$(document).ready(function(){
	console.log("loaded dom")
	//Expand projects when clicked

	$(".projectTile").click(function(){

		var child = $(this).find(".project");

		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			TweenLite.to(this, .5, {
				css:{
					width:"100%",
				}, 
				ease:Power2.easeOut
			});

			TweenLite.to(child, .5, {
				css:{
					height:"100vh",
				}, 
				ease:Power2.easeOut
			});
		}else{
			$(this).removeClass("active");
			$(this).addClass("active");
			TweenLite.to(this, .5, {
				css:{
					width:"66.66666%",
				}, 
				ease:Power2.easeOut
			});

			TweenLite.to(child, .5, {
				css:{
					height:"100%",
				}, 
				ease:Power2.easeOut
			});
		}
	});
});