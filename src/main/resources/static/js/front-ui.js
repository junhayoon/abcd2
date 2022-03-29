
$(function() {
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function(){
			$(this).attr('placeholder','');
		});
		$(this).focusout(function(){
			$(this).attr('placeholder', $(this).data('holder'));
		});
	}); // placehoder

	$(".scroll-wrap").mCustomScrollbar(); // scroll

//	$('.quick-menu').find('.control > .btn').on('click', function(){
//		$('.quick-menu').find('.link > li > a').removeClass('on');
//		$(this).toggleClass('on');
//	});
//	$('.quick-menu').find('.control > ul > li > a').on('click', function(){
//		if($(this).hasClass('on')){
//			$(this).removeClass('on');
//		}else {
//			$('.quick-menu').find('.control > ul > li > a').removeClass('on');
//			$(this).addClass('on');
//		}
//	});
//	$('.quick-menu').find('.link > li > a').on('click', function(){
//		$('.quick-menu').find('.control > .btn').removeClass('on');
//		if($(this).hasClass('on')){
//			$(this).removeClass('on')
//		} else {
//			$('.quick-menu').find('.link > li > a').removeClass('on');
//			$(this).addClass('on')
//		}
//	});
//	$('.quick-menu').find('.link > li > ul > li > a').on('click', function(){
//		var lyID = $(this).data('target');
//		if($(this).hasClass('on')){
//			$(lyID).removeClass('on');
//			$(this).removeClass('on');
//		} else {
//			$(lyID).addClass('on')
//			$(this).addClass('on');
//		}
//	});
	$('aside').find('.btn-closed').on('click', function(){
		var id='#'+$(this).closest('aside').attr('id');
		console.log(id);
		$(this).closest('aside').removeClass('on');
		$('*[data-target="'+id+'"]').removeClass('on');
	});
	$('.quick-menu').find('.map > a').on('click', function(){
		//$('.quick-menu').find('.map > a').removeClass('active');
		//$(this).addClass('active');
	});
	$('.map-wrap').hover(function(){
		$('.quick-menu .link .map').addClass('hover');
	},function() {
		$('.quick-menu .link .map').removeClass('hover')
	});
});