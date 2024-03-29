window.onload = function() {
	// 轮播
	slideLlx("slide");
	function slideLlx(slideID) {
		var slide = document.getElementById(slideID);
		var slideLis = slide.getElementsByTagName('li');
		var conut = slideLis.length;
		if (conut < 2) {
			return false;
		}
		var imgs = slide.getElementsByTagName("img");
		var firstSrc = imgs[0].getAttribute("src");
		var lastSrc = imgs[imgs.length - 1].getAttribute("src");
		var offset = slide.clientWidth;
		var index = 1;
		var slideUl = slide.getElementsByTagName("ul")[0];
		var Timer;
		var firstLi = document.createElement("li");
		var firstIMG = document.createElement("img");
		firstIMG.setAttribute("src", lastSrc);
		firstLi.appendChild(firstIMG);
		slideUl.insertBefore(firstLi, slideUl.firstChild);
		slideUl.style.transform = "translateX(" + (-offset) + "px)";
		var lastLi = document.createElement("li");
		var lastIMG = document.createElement("img");
		lastIMG.setAttribute("src", firstSrc);
		lastLi.appendChild(lastIMG);
		slideUl.appendChild(lastLi);
		var circle_btn = document.createElement("div");
		circle_btn.setAttribute("class", "circle_btn");
		for (var i = 0; i < conut; i++) {
			var cbtn = document.createElement("button");
			circle_btn.appendChild(cbtn);
		}
		slide.appendChild(circle_btn);
		var circles = Array.prototype.slice.call(circle_btn.getElementsByTagName("button"));
		circles[0].setAttribute("class", "active");
		circles.forEach(function(e, i) {
			e.onclick = function() {
				closeAutoSlide();
				openTransition();
				index = i + 1;
				goslide();
				beActive(this);
			}
		});
		var btn_prev = slide.getElementsByClassName("prev_btn")[0];
		btn_prev.onclick = function() {
			closeAutoSlide();
			openTransition();
			index--;
			goslide();
			if (index < 1) {
				index = conut;
				beActive(circles[index - 1]);
				setTimeout(function() {
					closeTransition();
					goslide();
				}, 600)
			} else {
				beActive(circles[index - 1]);
			}
		}
		var btn_next = slide.getElementsByClassName("next_btn")[0];
		btn_next.onclick = function() {
			openTransition();
			index++;
			goslide();
			if (index > conut) {
				index = 1;
				beActive(circles[index - 1]);
				setTimeout(function() {
					closeTransition();
					goslide();
				}, 600)
			} else {
				beActive(circles[index - 1]);
			}
		}
		openAutoSlide();

		function openAutoSlide() {
			if (Timer) {
				window.clearInterval(Timer);
			}
			Timer = setInterval(function() {
				beActive(circles[index - 1]);
				btn_next.onclick();
			}, 3000)
		}

		function closeAutoSlide() {
			window.clearInterval(Timer);
			setTimeout(function() {
				openAutoSlide();
			}, 6000);
		}
		btn_next.onmousedown = function() {
			closeAutoSlide();
		}
		btn_prev.onmousedown = function() {
			closeAutoSlide();
		}

		function beActive(btn) {
			circle_btn.getElementsByClassName("active")[0].setAttribute("class", "");
			btn.setAttribute("class", "active");
		}

		function openTransition() {
			slideUl.style.transition = "all .6s";
		}

		function closeTransition() {
			slideUl.style.transition = "none";
		}

		function goslide() {
			slideUl.style.transform = "translateX(-" + index * offset + "px)";
		}
		slideUl.style.width = slideLis.length * 100 + "%";
		var liWidth = 100 / slideLis.length + "%";
		for (var i = 0; i < slideLis.length; i++) {
			slideLis[i].style.width = liWidth;
		}
	}
}
