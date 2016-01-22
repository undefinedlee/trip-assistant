var Page = require("page");
var $ = require("f7").Dom;
var weixin = require("weixin");
var commonData = require("util").commonData;
var template = require("./main.tpl");
var Day = require("./day/index");
var CommentBar = require("./comment-bar/index");
require("./main.styl");

// 微信签名配置
weixin.config({
	debug: false,
	appId: commonData.appId,
	timestamp: commonData.timestamp,
	nonceStr: commonData.nonceStr,
	signature: commonData.signature,
	jsApiList: ["chooseImage", "previewImage", "uploadImage", "downloadImage",
				"startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"]
});

module.exports = Page({
	name: "trip",
	title: "行程",
	template: template,
	model: {
		tour: null,
		// 多媒体面板是否展示
		multiMediaIsShow: false
	},
	components: {
		"day": Day,
		"comment-bar": CommentBar
	},
	actions: {
		// 前一天
		prev: function(){
			this.swiper && this.swiper.slidePrev();
		},
		// 后一天
		next: function(){
			this.swiper && this.swiper.slideNext();
		},
		getDay: function(){
			return this.$refs.day[this.swiper.activeIndex];
		},
		// 发布评论
		publish: function(comment){
			this.getDay().publish(comment);
		}
	},
	init: function(){
		this.tour = commonData.currentTour;
		this.$nextTick(function(){
			// 初始化左右滚动
			this.swiper = this.$app.swiper($(this.$page.container).find(".swiper-container").eq(0), {
				initialSlide: 1,
				touchAngle: 20,
				onSlideChangeStart: function(swiper){
					// 切换到某一天后加载这一天的数据
					this.$refs.day[swiper.activeIndex].load();
				}.bind(this)
			});
		}.bind(this));
	}
});