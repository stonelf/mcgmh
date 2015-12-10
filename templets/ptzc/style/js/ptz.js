//解决jquery 和mootools冲突
var $j = jQuery.noConflict();

//子菜单动画
function setMenuEvent(menu, submenu, cWidth, way) {
	var $menu = $j('#' + menu);
	var $submenu = $j('#' + submenu);
	var $ul = $submenu.children('ul');
	var currentName = "";
	var showoption;
	var hiddenoption;
	var isIE = !!window.ActiveXObject;
	var isIE6 = isIE && !window.XMLHttpRequest;
	var isIE8 = isIE && !!document.documentMode;
	var isIE7 = isIE && !isIE6 && !isIE8;
	var menuFly = isIE6 || isIE7;
	if (way == 'left') { //从左向右滑动
		if (!menuFly) {
			$ul.css('margin-left', cWidth);
		}
		currentName = "current";
		showoption = { 'marginLeft': '0px' };
		hiddenoption = { 'marginLeft': cWidth };
	} else {	//从右向左滑动
		if (!menuFly) {
			$ul.css('margin-right', cWidth);
		}
		currentName = "currentR";
		showoption = { 'marginRight': '0px' };
		hiddenoption = { 'marginRight': cWidth };
	};

	return {
		isshow: false,
		show: function() {
			if (this.isshow) return;
			this.isshow = true;
			if (!menuFly) {
				$submenu.show();
				$ul.stop().animate(showoption, 300);
			} else {
				$submenu.stop().show(300);
			}
			$menu.children('a').addClass(currentName);
		},
		hide: function() {
			if (!this.isshow) return;
			if (!menuFly) {
				$ul.stop().animate(hiddenoption, 300, function() {
					$submenu.hide();
					$menu.children('a').removeClass(currentName);
				});
			} else {
				$submenu.stop().hide(300)
				$menu.children('a').removeClass(currentName);
			}
			this.isshow = false;
		},
		click: function(e) {
			if (!this.isshow) return;
			if ($j(e.target).parent('#' + menu).length == 0 && $j(e.target).parent('#' + submenu).length == 0) {
				this.hide();
			}
		},
		init: function() {
			var me = this;
			$menu.bind('click', function() {
				if (!me.isshow) {
					me.show();
				} else {
					me.hide();
				}
			});
			$j('#wrap').mouseup(function(e) {
				me.click(e);
			});
			$j('#wrapList').mouseup(function(ee) {
				me.click(ee);
			});
		}
	}.init();
}

//搜索框
function googleSearch(sdiv, inputname, butname) {
	var $input = $j("#" + inputname);
	var $but = $j("#" + butname);
	var $sdiv = $j("#" + sdiv);
	var DEFAULT_KEYWORD = '站内搜索';
	var isshow = false;
	return {
		go: function() {
			var q = $input.val();
			if (q == DEFAULT_KEYWORD) {
				q = '';
			}
			window.open("http://www.google.com.hk/cse?cx=partner-pub-2736206127485445:8702608190&ie=UTF-8&q=#gsc.tab=0&gsc.q=&gsc.page=1" + encodeURIComponent(q));
		},
		input: function(e) {
			e = e || window.event;
			if (e.keyCode == 13) {
				$but.click();
				return false;
			}
			return true;
		},
		click: function(e) {

			if (!isshow) return;
			if ($j(e.target).parent('#' + sdiv).length == 0) {
				this.hide();
			}
		},
		show: function() {
			if (isshow) return;
			isshow = true;
			$j("#leaf").stop().hide(300);
			if ($input.val() == DEFAULT_KEYWORD) {
				$input.val('');
			}
		},
		hide: function() {
			if (!isshow) return;
			isshow = false;
			$j("#leaf").stop().show(300);
			if ($input.val() == '') {
				$input.val(DEFAULT_KEYWORD);
			}
		},
		init: function() {
			$input.val(DEFAULT_KEYWORD);
			var me = this;
			$but.bind('click', function() {
				me.go();
			});
			$input.bind('focus', function() {
				me.show();
			}).bind('keydown', function(e) {
				return me.input(e);
			});
			$j('#wrap').mouseup(function(ee) {
				me.click(ee);
			});
			$j('#wrapList').mouseup(function(ee) {
				me.click(ee);
			});
		}
	}.init();
}

//搜索框
function googleSearch2(sdiv, inputname, butname) {
	var $input = $j("#" + inputname);
	var $but = $j("#" + butname);
	var $sdiv = $j("#" + sdiv);
	var DEFAULT_KEYWORD = '站内搜索';
	var isshow = false;
	return {
		go: function() {
			var q = $input.val();
			if (q == DEFAULT_KEYWORD) {
				q = '';
			}
			window.open("http://www.google.com.hk/cse?cx=partner-pub-2736206127485445:8702608190&ie=UTF-8&q=#gsc.tab=0&gsc.q=&gsc.page=1" + encodeURIComponent(q));
		},
		input: function(e) {
			e = e || window.event;
			if (e.keyCode == 13) {
				$but.click();
				return false;
			}
			return true;
		},
		click: function(e) {

			if (!isshow) return;
			if ($j(e.target).parent('#' + sdiv).length == 0) {
				this.hide();
			}
		},
		show: function() {
			if (isshow) return;
			isshow = true;
			if ($input.val() == DEFAULT_KEYWORD) {
				$input.val('');
			}
		},
		hide: function() {
			if (!isshow) return;
			isshow = false;
			if ($input.val() == '') {
				$input.val(DEFAULT_KEYWORD);
			}
		},
		init: function() {
			$input.val(DEFAULT_KEYWORD);
			var me = this;
			$but.bind('click', function() {
				me.go();
			});
			$input.bind('focus', function() {
				me.show();
			}).bind('keydown', function(e) {
				return me.input(e);
			});
			$j('#main').mouseup(function(ee) {
				me.click(ee);
			});
		}
}.init();
	}

function ot(url, lrcID) {
	//暂停首页的背景音乐
	try {
		Player.stop();
	}
	catch (e) { ; }
	width = 510;
	height = 220;
	var isFF = (navigator.userAgent.toLowerCase().indexOf("firefox") != -1)
	var left = (screen.width - width) / 2;
	var top = (screen.height - height) / 2;
	var re = new RegExp("^[0-9]+$");
	if (lrcID != null && !isFF) {
		var d = lrcID.match(re)
		if (d && parseInt(lrcID) > 0) {
			top = 0;
			height = 510;
		}
	}
	window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',scrollbars=0,resizable=0,location=no');
	return false;
}

jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// CAUTION: Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};


var ShowMusicBox = function() {

	var isshow = false;
	$j(document).ready(function() {
		var divhtml = "<div id=\"ShowTipDiv\" style=\"display: none; position: absolute; width: 350px; height: auto;"
						+ "top: 24px; left: 550px; padding: 10px 20px; background-color: #23236E; color: #fff;"
						+ "border: 1px solid #000; z-index: 999; text-align: left;line-height:20px;\">"
						+ "<div id=\"ShowTipDivHTML\"></div></div>";
		$j("body").append(divhtml);
		$j("#ShowTipDiv").hover(
			function(e) {
				//ShowTip.show(e);
			},
			function() {
				ShowTip.hiden();
			}
		);
	});
	return {
		show: function(e, msg) {
			$j("#ShowTipDivHTML").html(msg);
			if (isshow) return;
			isshow = true;
			var mX = 0;
			var mY = 0;
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) {
				mX = e.pageX;
				mY = e.pageY;
			}
			else if (e.clientX || e.clientY) {
				mX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				mY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			var popWidth = $j("#ShowTipDiv").width();
			var popHeight = $j("#ShowTipDiv").height();
			var popLeftAdjust = 0, popTopAdjust = 0;
			if (mX + 40 + popWidth > $j(window).width() - 40 + $j(window).scrollLeft()) popLeftAdjust = -popWidth - 40;
			if (mY + 20 + popHeight > $j(window).height() - 40 + $j(window).scrollTop()) popTopAdjust = -popHeight - 20;
			var y = mY + popTopAdjust + 6;
			var x = mX + 6 + popLeftAdjust;
			$j("#ShowTipDiv").css({ "top": y + "px", "left": x + "px" }).stop().fadeTo("fast", 1);
		},
		hiden: function() {
			if (!isshow) return;
			isshow = false;
			$j("#ShowTipDiv").stop().fadeOut("fast", 0);

		}
	}
} ();


//页面初始化
$j(document).ready(function() {

	//菜单初始化 菜单长度，菜单方向
	setMenuEvent('menu_ccss', 'submenu_ccss', '-444px', 'left');
	setMenuEvent('menu_sszj', 'submenu_sszj', '-440px', 'left');
	setMenuEvent('menu_zxcl', 'submenu_zxcl', '-440px', 'left');
	setMenuEvent('menu_pxhs', 'submenu_pxhs', '-200px', 'left');
	setMenuEvent('menu_stzq', 'submenu_stzq', '-200px', 'left');
	setMenuEvent('menu_xmwk', 'submenu_xmwk', '-200px', 'right');
	setMenuEvent('menu_fzxy', 'submenu_fzxy', '-200px', 'right');
	

	//搜索
	googleSearch('searchDiv', 'searchKeyWord', 'searchBut');
	googleSearch2('searchDiv2', 'searchKeyWord2', 'searchBut2');
});