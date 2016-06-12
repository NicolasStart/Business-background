/*---------------------angular.js-----------------*/
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.title= "网页标题";
	$scope.tScroll= "微信直播";
});
$(function(){
	/*-----------------文本滚动播放-----------------*/
	$(".app-textScroll-box").textScroll();
	/*-----------------hover待修改位置-----------------*/
	$(".edit-info").each(function(index, element) {
        $(this).append('<div class="edit-line"></div>');
    });
	$(".edit-info").click(function(){
		$(".edit-info").removeClass("has-line");
		$(".edit-info").find(".app-sidebar").hide();
		$(this).addClass("has-line");
		$(this).find(".app-sidebar").show();
	});
	/*---------------------编辑框-----------------*/
	KindEditor.options.filterMode = false;
	KindEditor.ready(function (K) {
		window.editor = K.create('#myEditor1,#myEditor2,#myEditor3', {
			uploadJson: '../../kindeditor/asp.net/upload_json.ashx',
			fileManagerJson: '../../kindeditor/asp.net/file_manager_json.ashx',
			allowFileManager: false,
			minWidth:'300px',
			minHeight:'90px',
			items: ['source', 'image', '|', 'link', 'unlink', ]
		});
	});
	/*---------------------滚动文字-----------------*/
	$("#tScrollRadio label").each(function(index, element) {
        $(this).change(function(){
			if(index==0){
				$(".app-textScroll").show();
			}else{
				$(".app-textScroll").hide();
			}
		});
    });
	/*---------------------tab-----------------*/
	$(".app-menu").on("click","li.edit-info", function(){
		$(".app-menu li").removeClass("has-line active");
		$(".edit-info").find(".app-sidebar").hide();
		$(this).addClass("has-line active");
		$(this).find(".app-sidebar").show();
		$(".app-info .app-info-body").hide();
		$("."+$(this).attr("id")+"-body").show();
	});
	/*---------------------保存操作-----------------*/
	$(".app-menu").on("click",".default-btn",function(event){
		var plVal=$(this).parents("li.edit-info").find(".menu-pl").val();
		plVal>4?plVal=3:plVal=plVal;
		plVal<1?plVal=1:plVal=plVal;
		var plNum=plVal-1;
		if(plNum!=$(this).parents("li").index()){
			var liHtml=$(this).parents("li").prop("outerHTML");
			if(plNum>$(this).parents("li").index()){
				$(".app-menu li:eq("+plNum+")").after(liHtml);
			}else{
				$(".app-menu li:eq("+plNum+")").before(liHtml);
			}
			$(this).parents("li").remove();
			$(".app-menu ul li.edit-info").each(function(index, element) {
				var indexI=index+1;
                $(this).find(".app-sidebar").attr("class","app-sidebar").addClass("left-"+indexI);
            });
		}
		event.stopPropagation();
	});
});
/*---------------------上传-----------------*/
//图片上传预览    IE是用了滤镜。
function previewImage(file,boxId,imgId)
{
  var MAXWIDTH  = 260; 
  var MAXHEIGHT = 180;
  var div = document.getElementById(boxId);
  if (file.files && file.files[0])
  {
	  div.innerHTML ='<img id='+imgId+'>';
	  var img = document.getElementById(imgId);
	  img.onload = function(){
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		img.width  =  rect.width;
		img.height =  rect.height;
	  }
	  var reader = new FileReader();
	  reader.onload = function(evt){img.src = evt.target.result;}
	  reader.readAsDataURL(file.files[0]);
  }
  else //兼容IE
  {
	var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
	file.select();
	var src = document.selection.createRange().text;
	div.innerHTML = '<img id='+imgId+'>';
	var img = document.getElementById('imghead');
	img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
	status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
	div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
  }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
	var param = {top:0, left:0, width:width, height:height};
	if( width>maxWidth || height>maxHeight )
	{
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		
		if( rateWidth > rateHeight )
		{
			param.width =  maxWidth;
			param.height = Math.round(height / rateWidth);
		}else
		{
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}