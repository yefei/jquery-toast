/**
 * Simple jquery toast
 * Yefei<316606233@qq.com> 2016-8-12
 */

+function($) {
	'use strict';

	var DEFAULTS = {
		hold : false,		// 一直保持显示，不自动关闭
		fadeIn : 200,		// 淡入时间
		fadeOut : 200,		// 淡出时间
		delay : 5000,		// 延迟显示多久
		width : 'auto'		// 宽度
	}

	var Toast = function(content, options) {
		this.opts = $.extend({}, DEFAULTS, options)
		this.ishover = false
		this.timeout = false
		this.div = $('<div/>').addClass('toast').html(content).css('width', this.opts.width).appendTo('body')

		this.div.css({
			marginLeft: '-' + (this.div.width() / 2) + 'px',
			marginTop: '-' + (this.div.height() / 2) + 'px'
		})

		this.div.hide().fadeIn(this.opts.fadeIn)

		// 鼠标悬停不自动关闭
		this.div.hover(
			$.proxy(function(){
				this.ishover = true
			}, this),
			$.proxy(function(){
				this.ishover = false
				if (this.timeout)
					this.close()
			}, this)
		)

		if (!this.opts.hold) {
			setTimeout($.proxy(function(){
				if (!this.ishover)
					this.close()
				this.timeout = true
			}, this), this.opts.delay)
		}
	}

	Toast.prototype.close = function() {
		this.div.fadeOut(this.opts.fadeOut, $.proxy(this.remove, this))
	}

	Toast.prototype.remove = function() {
		this.div.remove()
	}

	$.toast = function(content, options) {
		return new Toast(content, options)
	}

}(jQuery);
