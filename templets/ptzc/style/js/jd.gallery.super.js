
var MyGalleria = function() {
	$j(document).ready(function() {
		MyGalleria.init();
	});
	return {
		currentIndex: 0,
		imgList: [],
		isshow: false,
		imgWidth: 0,
		imgHeight: 0,
		CallBack: null,
		show: function() {
			if (!MyGalleria.isshow) {
				MyGalleria.isshow = true;
				$j(".galleria-lightbox-overlay").show();
				$j(".galleria-lightbox-box").show();
				$j(window).bind("resize", function() {
					$j(".galleria-lightbox-box").css(MyGalleria.getBoxSize());
				});
			}
			MyGalleria.showimg();
		},
		hide: function() {
			if (this.isshow) {
				this.isshow = false;
				$j(".galleria-lightbox-overlay").hide();
				$j(".galleria-lightbox-box").hide();
			}
			$j(window).unbind("resize");
			if (this.CallBack) {
				this.CallBack();
			}
		},
		showimg: function() {
			$j(".galleria-image img").fadeOut(300, function() {
				$j(".galleria-lightbox-infog").fadeOut(0);
				$j(".galleria-image img").css({
					width: "",
					height: "",
					zIndex: -999
				});
				$j(".galleria-image img").load(function() {
					//延迟读取图片尺寸，否则读取错误。
					window.setTimeout(function() {
						MyGalleria.imgWidth = $j(".galleria-image img").width();
						MyGalleria.imgHeight = $j(".galleria-image img").height();
						MyGalleria.resize();
					}, 10);
				});
				try {
					var imgsrc = "http://www.ptz.cc" + MyGalleria.imgList[MyGalleria.currentIndex].imgpathLarge;
					$j(".galleria-image img").attr({ src: imgsrc });
					$j(".galleria-lightbox-counter").html((MyGalleria.currentIndex + 1) + " / " + MyGalleria.imgList.length + "&nbsp;&nbsp;<a href='" + imgsrc + "' target='_blank'>下载</a>");
					$j(".galleria-lightbox-title").html(MyGalleria.imgList[MyGalleria.currentIndex].imgtitle);
				}
				catch (e) {
				}
			});
		},
		getBoxSize: function() {
			var wHeight = $j(window).height();
			var wWidth = $j(window).width();
			var mHeight = this.imgHeight;
			var mWidth = this.imgWidth;

			var u = Math.min(wWidth - 40, mWidth);
			var H = Math.min(wHeight - 60, mHeight);
			H = Math.min(u / mWidth, H / mHeight);
			u = Math.round(mWidth * H) + 40;
			H = Math.round(mHeight * H) + 60;
			return {
				width: u,
				height: H,
				"margin-top": Math.ceil(H / 2) * -1,
				"margin-left": Math.ceil(u / 2) * -1
			};
		},
		resize: function() {
			$j(".galleria-lightbox-box").stop().animate(this.getBoxSize(), 200, function() {
				$j(".galleria-image img").css({
					width: "100%",
					height: "100%",
					top: 0,
					zIndex: 99998
				});
				$j(".galleria-lightbox-info").fadeIn(0);
				$j(".galleria-image img").fadeIn();
			});

		},
		showpre: function() {
			if (this.currentIndex > 0) {
				this.currentIndex--;
			}
			else {
				this.currentIndex = this.imgList.length - 1;
			}
			this.showimg();
		},
		shownext: function() {
			if (this.currentIndex < this.imgList.length - 1) {
				this.currentIndex++;
			}
			else {
				this.currentIndex = 0;
			}
			this.showimg();
		},
		loadData: function(classid) {
			var URL = "../inc/gallery/JsonResponse.aspx?type=gallery&newsid=" + classid;
			$j.getJSON(URL, function(backinfo) {
				if (backinfo) {
					MyGalleria.imgList = backinfo.Images;
					this.currentIndex = 0;
				}
			});
		},
		setImgList: function(imglist) {
			this.imgList = imglist;
			this.currentIndex = 0;
		},
		showimgbyid: function(imgid) {
			for (i = 0; i < this.imgList.length; i++) {
				if (this.imgList[i].ID == imgid) {
					this.currentIndex = i;
					break;
				}
			}
			this.show();
		},
		hideCallBack: function(evt) {
			this.CallBack = evt;
		},
		init: function() {
			var divhtml =
'	<div class="galleria-lightbox-overlay" style="display: none;">                                     '
+ '	</div>                                                                                             '
+ '	<div class="galleria-lightbox-box" style="display: none; width: 500px; height: 500px;              '
+ '		margin-top: -285px; margin-left: -620px;">                                                     '
+ '		<div class="galleria-lightbox-shadow">                                                         '
+ '		</div>                                                                                         '
+ '		<div class="galleria-lightbox-content">                                                        '
+ '			<div class="galleria-lightbox-info" style="opacity: 1; -moz-transition: none 0s ease 0s;"> '
+ '				<div class="galleria-lightbox-title">                                                  '
+ '				</div>                                                                                 '
+ '				<div class="galleria-lightbox-counter">                                                '
+ '					0 / 0                                                                              '
+ '				</div>                                                                                 '
+ '			</div>                                                                                     '
+ '			<div class="galleria-lightbox-image">                                                      '
+ '				<div class="galleria-image" style="overflow: hidden; position: relative;">             '
+ '					<img style="display: block; opacity: 1; width: 100.5%; height: 100.5%; top: 0px;   '
+ '						z-index: 99998; -moz-transition: none 0s ease 0s;"></div>                      '
+ '			</div>                                                                                     '
+ '		</div>                                                                                         '
+ '		<div class="galleria-lightbox-close">                                                          '
+ '			×</div>                                                                                   '
+ '		<div class="galleria-lightbox-prevholder">                                                     '
+ '			<div class="galleria-lightbox-prev" style="display: none;">                                '
+ '				‹&nbsp;</div>                                                                          '
+ '		</div>                                                                                         '
+ '		<div class="galleria-lightbox-nextholder">                                                     '
+ '			<div class="galleria-lightbox-next" style="display: none;">                                '
+ '				&nbsp;›</div>                                                                          '
+ '		</div>                                                                                         '
+ '	</div>';
			$j("body").append(divhtml);

			$j(".galleria-lightbox-prevholder").hover(
						function(e) {
							$j(".galleria-lightbox-prev").show();
						},
						function() {
							$j(".galleria-lightbox-prev").hide();
						}
					);
			$j(".galleria-lightbox-nextholder").hover(
						function(e) {
							$j(".galleria-lightbox-next").show();
						},
						function() {
							$j(".galleria-lightbox-next").hide();
						}
					);
			$j(".galleria-lightbox-nextholder").click(function() {
				MyGalleria.shownext()
			});
			$j(".galleria-lightbox-prevholder").click(function() {
				MyGalleria.showpre()
			});
			$j(".galleria-lightbox-close").click(function() {
				MyGalleria.hide()
			});
			$j(".galleria-lightbox-overlay").click(function() {
				MyGalleria.hide()
			});
		}
	}
} ();
