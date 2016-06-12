$(document).ready(function () {
		//菜单显示形式
		$("#mainnavToggle").click(function(){
			var menuPopover=$("#container .mainnav li a.menuPopover"),
				menuLi=$("#container .mainnav li");
			if($("#container").hasClass("mainnav-sm")){
				menuPopover.unbind("mouseenter");
				menuLi.unbind("mouseleave");
				$("#container").attr("class","page-container effect mainnav-lg");
				$(this).removeClass("hidebtn");
			}else{
				$("#container").attr("class","page-container effect mainnav-sm");
				$(this).addClass("hidebtn");
			}
		});
}); 