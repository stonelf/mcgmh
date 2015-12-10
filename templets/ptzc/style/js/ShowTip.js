//提示
var ShowTip = function() {

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
			$j("#ShowTipDiv").css({ "top": y + "px", "left": x + "px" }).stop().fadeTo("fast",1);
		},
		hiden: function() {
			if (!isshow) return;
			isshow = false;
			$j("#ShowTipDiv").stop().fadeOut("fast",0); 

		}
	}
} ();