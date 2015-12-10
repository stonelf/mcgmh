
var gallerySet = {
	initialize: function(element, options) {
		this.setOptions({
			ajaxListData: [],
			embedLinks: false,
			enableSroller: false,
			allowPaging: true,
			pageSize: 8,
			showPagingLink: true,
			pagingLinkCount: 3, //图片分页链接的数量
			pagingLinkPosition: 'bottom'
		}, options);
		this.newsidOfCurrentGallery = 0;
		this.albumTitle = "";
		this.gallerySetElement = element; //--------
		this.gallerys = [];
		this.currentPage = 0;
		this.previousPage = 0;
		this.beginLink = 0;
		this.endLink = 0;
		this.currentData = [];
		this.feedData();
		if (this.options.allowPaging && this.options.showPagingLink) this.goToPage(0);
		if (this.options.enableScroller) {
			this.createScroller();
			new Element('div').setHTML('共' + this.options.ajaxListData.length + '个相册').addClass('gallerySetSummary').injectAfter(this.gallerySetElement);
		}
	},
	feedData: function() {
		this.options.ajaxListData.each(function(data) {
			var item = {
				title: data.GalleryTitle.length < 20 ? data.GalleryTitle : (data.GalleryTitle.substring(0, 19) + "…"),
				titleImg: data.GalleryTitleImg,
				imgCount: data.ImageCount,
				newsid: data.NewsID,
				TemplateUrl: data.TemplateUrl,
				IsNew: data.IsNew
			}
			this.gallerys.extend([item]);
		}, this);
	},
	goToPage: function(num) {
		this.createGalleryButtons(num);
		//-----------------生成分页链接
		if (this.options.showPagingLink) {
			if (this.currentPage >= this.beginLink && this.currentPage <= this.endLink)
				this.createLink(this.beginLink);
			else
				this.createLink(this.currentPage % this.options.pagingLinkCount == 0 ? this.currentPage : (this.currentPage - this.currentPage % this.options.pagingLinkCount));
		}
		//-------------------------------------
	},
	createLink: function(begin) {
		if (this.linkElement) this.linkElement.destroy();
		var outerDiv = new Element('div');

		var length = Math.ceil(this.gallerys.length / this.options.pageSize);
		var current = this.currentPage; //////////////////
		var showCount = this.options.pagingLinkCount;
		this.beginLink = begin; //---开始链接
		var end = begin;

		if (current != 0) {//-------生成上一页链接
			new Element('a').injectInside(outerDiv).setHTML('上一页').setStyle('cursor', 'pointer').addEvent('click', function() {
				this.goToPage((this.currentPage - 1) < 0 ? 0 : (this.currentPage - 1));
			} .bind(this));
			outerDiv.appendText('     ');
		};

		if (begin != 0) {
			new Element('a').injectInside(outerDiv).setHTML('1... ').setStyle('cursor', 'pointer').addEvent('click', function() {//-------生成第一页的链接
				this.goToPage(0); /////////////
			} .bind(this));
			outerDiv.appendText('   ');

			new Element('a').injectInside(outerDiv).setHTML('« «').setStyle('cursor', 'pointer').addEvent('click', function() {//生成<<箭头
				this.goToPage((begin - showCount) < 0 ? 0 : (begin - showCount)); ////////////////
			} .bind(this));
			outerDiv.appendText('   ');
		}

		for (var i = begin; i < begin + showCount; i++) {//-------中间的链接
			if (i < length && i >= 0) {
				outerDiv.appendText('  |  ');
				var alink = new Element('a').injectInside(outerDiv);
				alink.setHTML(i + 1).setStyle('cursor', 'pointer').addEvent('click', this.goToPage.pass(i, this)); //////////
				if (current == i) {
					alink.setStyle('color', '#6699CC');
				}
				end++;
			}
		}
		outerDiv.appendText('  |');
		this.endLink = end - 1; //---结束链接

		if (end < length) {//-------生成最后一页的链接
			outerDiv.appendText('   ');
			new Element('a').injectInside(outerDiv).setHTML('...' + length + ' ').setStyle('cursor', 'pointer').addEvent('click', function() {
				this.goToPage(length - 1); ////////////
			} .bind(this));

			outerDiv.appendText('   ');
			new Element('a').injectInside(outerDiv).setHTML('» »').setStyle('cursor', 'pointer').addEvent('click', function() {//生成>>箭头
				this.goToPage((begin + showCount) > (length - 1) ? (length - 1) : (begin + showCount)); ////////////
			} .bind(this));
		}

		if (current != (length - 1)) {
			outerDiv.appendText('      ');
			new Element('a').injectInside(outerDiv).setHTML('下一页').setStyle('cursor', 'pointer').addEvent('click', function() {//--------生成下一页链接
				this.goToPage((this.currentPage + 1) > (length - 1) ? (length - 1) : (this.currentPage + 1)); //////////
			} .bind(this));
		}

		if (this.options.pagingLinkPosition == 'top') {
			outerDiv.addClass('topLink');
			outerDiv.injectBefore(this.gallerySetElement);
		}
		else if (this.options.pagingLinkPosition == 'bottom') {
			outerDiv.addClass('gallerySetBottomLink');
			outerDiv.injectAfter(this.gallerySetElement);
		}

		this.linkElement = outerDiv;
	},
	createGalleryButtons: function(pageNum) {
		var galleryButtonWidth = 270;
		var data = [];
		if (this.options.allowPaging && this.options.showPagingLink) {
			this.gallerySetElement.getChildren().each(function(el) {
				el.destroy();
			}, this);
			this.currentData = [];
			for (var i = pageNum * this.options.pageSize; i < (pageNum + 1) * this.options.pageSize; i++) {
				if (this.gallerys[i]) this.currentData.extend([this.gallerys[i]]);
			}
			data = this.currentData;
		}
		else
			data = this.gallerys;

		data.each(function(galleryItem, index) {
			var button = new Element('div').addClass('galleryButton').injectInside(
				this.gallerySetElement
			).addEvents({
				'mouseover': function(myself) {
					myself.button.setStyle('backgroundColor', '#CC6633');
				} .pass(galleryItem, this),
				'mouseout': function(myself) {
					myself.button.setStyle('backgroundColor', '#B04023');
				} .pass(galleryItem, this),
				'click': function(myself, number) {
					if (galleryItem.TemplateUrl && galleryItem.TemplateUrl != "") {
						if (galleryItem.TemplateUrl.indexOf("_full.aspx") > 0) {
							//flash
							var x = window.screen.width;
							var y = window.screen.height;
							window.open("../../" + galleryItem.TemplateUrl + "?magid=" + galleryItem.newsid, "flashplay", "fullscreen=yes,status=no,location=no,toolbar=no,directories=no,menubar=no,resizable=yes,scrollbars=no");
						}
						else if (galleryItem.TemplateUrl.indexOf(".swf") > 0) {
							//flash
							var x = window.screen.width;
							var y = window.screen.height;
							window.open("../../" + galleryItem.TemplateUrl, "flashplay", "fullscreen=yes,status=no,location=no,toolbar=no,directories=no,menubar=no,resizable=yes,scrollbars=no");
						}
						else {
							//指定的模板显示
							location.href = "../../" + galleryItem.TemplateUrl + "?magid=" + galleryItem.newsid;
						}
						return;
					}
					if (this.galleryElement) {
						if (this.newsidOfCurrentGallery == galleryItem.newsid) {
							this.galleryElement.showMyself();
						}
						else {
							this.galleryElement.destroyElement();
							this.galleryElement = null;
							this.newsidOfCurrentGallery = galleryItem.newsid;
							this.albumTitle = galleryItem.title;
							this.createGallery();
						}
					}
					else {
						this.newsidOfCurrentGallery = galleryItem.newsid;
						this.albumTitle = galleryItem.title;
						this.createGallery();
					}
					this.gallerySetElement.setStyle('display', 'none');
					this.linkElement.setStyle('display', 'none');
					if ($("sdfg_title")) $("sdfg_title").setStyle('display', 'none');
				} .pass([galleryItem, index], this)
			}).setStyle('width', galleryButtonWidth);
			galleryItem.button = button;
			new Element('div').addClass('preview').setHTML("<img width='56px'  height='56px' src='" + this.options.serverPhotoPath + galleryItem.titleImg + "' />").injectInside(button);
			new Element('h3').setHTML(galleryItem.title).injectInside(button);
			if (galleryItem.TemplateUrl && (galleryItem.TemplateUrl.indexOf("flashplay") > 0 || galleryItem.TemplateUrl.indexOf(".swf") > 0)) {
				//有模板，不显示几张照片的提示
				new Element('p').addClass('info').setHTML('佛教名山ebook系列').injectInside(button);
			}
			else if (galleryItem.TemplateUrl && (galleryItem.TemplateUrl.indexOf("play_cs") > 0 || galleryItem.TemplateUrl.indexOf("play_ebook") > 0)) {
				//有模板，不显示几张照片的提示
				new Element('p').addClass('info').setHTML('丛书系列').injectInside(button);
			}
			else {
				if (!galleryItem.IsNew) {
					new Element('p').addClass('info').setHTML(galleryItem.imgCount + '张相片').injectInside(button);
				}
				else {
					new Element('p').addClass('info').setHTML(galleryItem.imgCount + '张相片 <img src="' + this.options.serverRootPath + 'images/images2/ico_new.gif">').injectInside(button);
				}
			}
		}, this);
		this.currentPage = pageNum;
	},
	createScroller: function() {
		this.scroller = new Scroller(this.gallerySetElement, {
			area: 70,
			velocity: 0.2
		});
		this.gallerySetElement.addEvent('mouseover', this.scroller.start.bind(this.scroller));
		this.gallerySetElement.addEvent('mouseout', this.scroller.stop.bind(this.scroller));
	},
	createGallery: function() {
		var xhr = new XHR({
			method: 'get',
			autoCancel: true,
			onSuccess: function(text) {
				var myGalleryData = Json.evaluate(text);
				this.galleryElement = new gallery($('myGallery'), {
					gallerySetObj: this,
					serverRootPath: this.options.serverRootPath,
					serverPhotoPath: this.options.serverPhotoPath,
					galleryType: 'set',
					ajaxData: myGalleryData,
					pagingLinkCount: 8,
					showAlbumTitle: true,
					showLeftBar: true,
					showRightBar: true,
					showPictureTitle: false,
					backToGallerySet: true,
					timed: true,
					showArrows: false,
					showCarousel: false,
					embedLinks: this.options.embedLinks,
					showInfopane: false,
					pagingLinkPosition: 'bottom',
					thumbIdleOpacity: 0.2
				});
				this.gallerySetElement.setStyle('display', 'none');
			} .bind(this),
			onFailure: function() {
				$('gallerySet').addClass('onError').innerHTML = "找不到图片";
			}
		}).send(this.options.serverRootPath + 'inc/gallery/JsonResponse.aspx', 'type=gallery&newsid=' + this.newsidOfCurrentGallery);
	}
};

gallerySet = new Class(gallerySet);
gallerySet.implement(new Events);
gallerySet.implement(new Options);	


