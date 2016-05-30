$(document).ready(function() {
	var i = 0;
	var $clone = $('.banner .img li').first().clone();
	$('.banner .img').append($clone);

	$('.banner_cont .btn_r').click(function(event) {
		/* Act on the event */
		i++;
		move();

	});
	$('.banner_cont .btn_l').click(function(event) {
		/* Act on the event */
		i--;
		move();
	});
	function move() {
		if(i == -1) {
			$('.banner').css({
				marginLeft: -4*1200,
			});
			i = 3;
		}
		$('.banner').stop().animate({
	        marginLeft:-i*1200,
		}, 500,function(){
			if(i == 4) {
				$('.banner').css({
					marginLeft:0,
				});
				i = 0;
			}
		});

		if(i==4)
		$('.banner_cont .num li').eq(0).addClass('on').siblings().removeClass('on');
		else
		$('.banner_cont .num li').eq(i).addClass('on').siblings().removeClass('on');
	};	

	/*鼠标点击圆点*/
	$('.banner_cont .num li').click(function(event) {
		/* Act on the event */
		var $index = $(this).index();
		i = $index;
		move();
		$('.banner_cont .num li').eq(i).addClass('on').siblings().removeClass('on');
	});

	/*自动轮播*/
	auto = setInterval(function(){i++;move();},5000);
	/*鼠标停留 轮播暂停*/
	$('.banner_cont').hover(function() {
		/* Stuff to do when the mouse enters the element */
		clearInterval(auto);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		auto = setInterval(function(){i++;move();},5000);
	});	
});