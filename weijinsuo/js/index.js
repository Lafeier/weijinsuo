$(function(){
	banner();
});

var banner=function(){
	// 动态轮播图
	// 1.获取轮播图数据	ajax
	// 2.根据数据动态渲染	根据当前设备	判断屏幕宽度
		// 2.1	准备数据
		// 2.2	将数据转换成html格式的字符串（动态创建元素、字符串拼接、模板引擎[artTemplate]）
		// 2.3	把字符渲染到页面中
	// 3.测试功能	即页面尺寸发生改变时重新渲染
	// 4.移动端手势切换
	

	//UI框架：bootstrap、妹子UI、jQueryUI、easeyUI、jQueryMobile、mui、framework7
	//关于移动端的UI框架：bootstrap、jQueryMobile、mui、framework7
	//模板引擎：artTemplate、handlebars、mustache、baiduTemplate、velocity
	
	//做数据缓存
	var getData=function(callback){
		if(window.data){
			callback&&callback(window.data);
		}else{
			// 1.获取轮播图数据	ajax
			$.ajax({
				type:"get",
				url:"js/data.json",
				// 表示强制转换后台返回的数据为json数据格式
				// 强制转换不成功程序会报错，不会执行success，而是执行error回调
				dataType:"json",
				data:"",
				success:function(data){
					window.data=data;
					callback&&callback(window.data);
				}
			});
		}
		
	}
	
	var render=function(){
		getData(function(data){
			// 2.根据数据动态渲染	根据当前设备	判断屏幕宽度
			var isMobile=$(window).width()<768?true:false;

			// 2.1	准备数据
			// 2.2	/将数据转换成html格式的字符串
			// 使用模板引擎：哪些html静态结构需要编程成动态的
			// 发现：点容器、图片容器	新建模板
			// 开始使用
			// <% console.log(list); %>	模板引擎内不能使用外部变量
			var pointHtml=template("pointTemplate",{list:data});
			// console.log(pointHtml);
			var imageHtml=template("imageTemplate",{list:data,isMobile:isMobile});
			// console.log(imageHtml);

			// 2.3	把字符渲染到页面中
			$(".carousel-indicators").html(pointHtml);
			$(".carousel-inner").html(imageHtml);
		});
	}

	render();	//一开始调用banner()时就先执行一次render()

	// 3.测试功能
	$(window).on("resize",function(){	//以后每一次页面尺寸变化时都调用
		render();
	});

	// 4.移动端手势切换
	var startX=0;
	var distanceX=0;
	var isMove=false;
	// originalEvent代表JS原生事件
	$(".wjs_banner").on("touchstart",function (e){
		startX=e.originalEvent.touches[0].clientX;
	}).on("touchmove",function (e){
		var moveX=e.originalEvent.touches[0].clientX;
		distanceX=moveX-startX;
		isMove=true;
	}).on('touchend',function (e) {
		// 距离足够50px的话 说明一定是滑动过
		 if(isMove && Math.abs(distanceX) > 50){
            if(distanceX < 0){	/*左滑手势*/
                console.log('下一张');
                $(".carousel").carousel("next");
            }else{
				console.log("上一张");
				$(".carousel").carousel("prev");
			}
		}
		startX=0;
		distanceX=0;
		isMove=false;
	});

}