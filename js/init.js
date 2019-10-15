window.onload=function(){
	tabInit();
	function tabInit(){
		var tabCo = document.getElementsByClassName("whdx_tab")[0];
		var tabUl = tabCo.getElementsByTagName('ul')[0];
		var lis = tabUl.getElementsByTagName('li');
		// 循环绑定
			for (var i = 0; i < lis.length; i++) {
				// 将有类名的(活跃的)li存储起来
				if (lis[i].className) var obj = lis[i];
		 
				lis[i].onclick = function () {
					// 取消之前活跃的li
					obj.className = "";
					// 将自身设置为活跃状态
					this.className = "active";
					// 更新获取的对象
					obj = this;
				}
			}
	}
}