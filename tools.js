(function ($) {
/*---图片预加载---*/
/**
*调用方法：$.preload(imgs, {each:fun, all:fun, order:ordered});
*
**/
	function PreLoad(imgs, options) {
		this.imgs = (typeof imgs === "string") ? [imgs] : imgs,
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);	

		if (this.opts.order === 'ordered') {
			this._ordered();
		} else {
			this._unOrdered();
		}
	}
	PreLoad.DEFAULTS = {
		order: 'unordered',
		each: null,
		all: null
	}
	// 有序预加载
	PreLoad.prototype._ordered = function () {
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

			load();

			function load() {
				var imgObj = new Image();

				$(imgObj).on('load error', function () {
					opts.each && opts.each();

					if (count >= len) {
						opts.all && opts.all();
					} else {
						load();
					}
					count++;
				});

				imgObj.src = imgs[count];
			}
			
			
	}
	//无序预加载
	PreLoad.prototype._unOrdered = function () {	
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src) {
			if (typeof src != 'string') return;

			var imgObj = new Image();

			$(imgObj).on('load error', function () {
				opts.each && opts.each();

				if (count >= len - 1) {
					opts.all && opts.all();
				}
				count++;

			});

			imgObj.src = src;
		});
		
	}

	$.extend({
		preload: function (imgs, options) {
			new PreLoad(imgs, options);
		}
	});
	
})(jQuery)

// 判断是否为json
function isJson(obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
// 简单数组去重
function uniqueArray(a) {
	a.sort();
	var t = [a[0]];
	for (var i = 1; i < a.length; i++) {
		a[i] !== t[t.length - 1] && t.push(a[i]);
	}
	return t;
}