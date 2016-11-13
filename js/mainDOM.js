$(document).ready(function(){
	console.log("loaded dom")
	//Expand projects when clicked
	
	$(".projectTile").click(function(){
		activeProject = false;
		var thisDiv = this;
		var child = $(this).find(".project");
		var img = $(this).find(".thumb")[0];
		var popup = $(this).find(".popUp")[0];
		var tag = $(this).find(".thumbTitle")[0];

		var defaultClass = $(this).attr("class").split(' ')[0];
		var defaultWidth;

		switch(defaultClass){
			case 'col-md-8':
				 defaultWidth = '66.6666666666%';
			break
			case 'col-md-6':
				defaultWidth = '50%';
			break
			case 'col-md-4':
				defaultWidth = '33.333333333333%';
			break
		}
		
		if(!$(this).hasClass("active")){
			
			$(this).addClass("active");

			TweenLite.to(this, .3, {
				css:{
					width:"100%",
				}, 
				ease:Power2.easeOut
			});

			TweenLite.to(child, .3, {
				css:{
					height:"100vh",
				}, 
				ease:Power2.easeOut,
				onComplete: function(){
					TweenLite.to(window, .3, {
						scrollTo:{
							x:0,
							y:thisDiv
						},
						ease:Power2.easeOut,
						onComplete: function(){
							//
							activeProject = true;
						}
					});
				}
			});
			$(this).find("iframe").css("display","block");

			TweenLite.to(tag, .3, {
				css:{
					opacity:0,
				}, 
				ease:Power2.easeOut
			});

			TweenLite.to(popup, .3, {
				css:{
					opacity:1,
				}, 
				ease:Power2.easeOut
			});
		}else{
			$(this).removeClass("active");

			TweenLite.to(popup, .5, {
				css:{
					opacity:0,
				}, 
				ease:Power2.easeOut
			});

			$(this).find("iframe").css("display","none");

			TweenLite.to(tag, .3, {
				css:{
					opacity:1,
				}, 
				ease:Power2.easeOut
			});
			
			TweenLite.to(this, .5, {
				css:{
					width:defaultWidth,
				}, 
				ease:Power2.easeOut
			});

			TweenLite.to(child, .5, {
				css:{
					height:"300px",
				}, 
				ease:Power2.easeOut,
				onComplete: function(){
					//TweenLite.to(window, .3, {scrollTo:thisDiv});
					TweenLite.to(window, .3, {
						scrollTo:{
							x:0,
							y:thisDiv
						},
						ease:Power2.easeOut,
						onComplete: function(){
							//
							//activeProject = true;
							//if(scrollY<$(document).height()-window.innerHeight){
								oldScroll = window.scrollY	
								scrollAmnt = window.scrollY
							// }else{
							// 	oldScroll = $(document).height()-window.innerHeight
							// 	scrollAmnt = $(document).height()-window.innerHeight
							// }
							

							//$(thisDiv).offset().top;
							// if(scrollAmnt>$(document).height()-window.innerHeight){
							// 	scrollAmnt=$(document).height()-window.innerHeight;
							// }
							
						}
					});
					
				}
			});
		}
	});
});