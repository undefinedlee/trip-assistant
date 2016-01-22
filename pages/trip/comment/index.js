var Vue = require("vue");
var weixin = require("weixin");
var Util = require("util");
var CommentTypeEnum = require("enum/comment-type");
var template = require("./main.tpl");
var $ = require("f7").Dom;

var weixinListener = {
	"play-end": null
};
weixin.ready(function(){
	weixin.onVoicePlayEnd({
		success: function (res) {
			if(weixinListener["play-end"]){
				weixinListener["play-end"](res);
			}
		}
	});
});

var Comment = Vue.extend({
	template: template(),
	props: ["comments", "loadedAll"],
	data: function(){
		return {
			CommentTypeEnum: CommentTypeEnum,
			currentPlay: null
		};
	},
	ready: function(){
		this.$watch("comments", function(){
			this.checkScroll();
		}.bind(this));

		var container = this.$el,
			content = container.getElementsByTagName("div")[0],
			y;

		content.addEventListener("transitionend", function(e){
			if(e.target === this && content.className === "pull-back"){
				content.className = "";
			}
		});
		content.addEventListener("webkitTransitionEnd", function(e){
			if(e.target === this && content.className === "pull-back"){
				content.className = "";
			}
		});

		function moveHandler(e){
			var offsetY = e.targetTouches[0].pageY - y,
				moveY;
			if(offsetY > 0){
				e.preventDefault();
				moveY = Math.min(offsetY / 2, Math.sqrt(offsetY) * 5);
				content.style.transform = 'translate3d(0, ' + moveY + 'px, 0)';

				if(moveY > 60){
					if(content.className !== "pull-up"){
						content.className = "pull-up";
					}
				}else if(content.className !== "pull-down"){
					content.className = "pull-down";
				}
			}
		}
		var endHandler = function(e){
			if(content.className === "pull-up"){
				content.className = "pull-load";
				this.$emit("refresh");
			}else{
				content.className = "pull-back";
			}

			content.style.transform = '';
			container.removeEventListener("touchmove", moveHandler);
			container.removeEventListener("touchend", endHandler);
		}.bind(this);

		container.addEventListener("touchstart", function(e){
			if(container.scrollTop === 0){
				e = e.targetTouches[0];
				y = e.pageY;
				container.addEventListener("touchmove", moveHandler);
				container.addEventListener("touchend", endHandler);
			}
		}.bind(this));
	},
	methods: {
		checkScroll: function(){
			if(this.$el.scrollHeight - this.$el.offsetHeight - this.$el.scrollTop < 44 && !this.loadedAll){
				this.$emit("load-old");
			}
		},
		scrollTop: function(){
			this.$el.scrollTop = 0;
		},
		pullToRefreshDone: function(){
			var content = this.$el.getElementsByTagName("div")[0];
			if(content.className){
				content.className = "pull-back";
			}
		},
		viewBigImage: function(serverId){
			Util.commonData.viewPhoto(serverId);
		},
		playSpeech: function(info, e){
			if(this.currentPlay){
				if(this.currentPlay.LocalId){
					this.currentPlay.playStatus = "";
					weixin.stopVoice({
						localId: this.currentPlay.LocalId
					});
				}
				if(this.currentPlay.Id === info.Id){
					this.currentPlay = null;
					return;
				}
			}

			this.currentPlay = info;
			weixinListener["play-end"] = function(){
				if(this.currentPlay){
					this.currentPlay.playStatus = "";
					this.currentPlay = null;
				}
			}.bind(this);

			if(!info.hasOwnProperty("playStatus")){
				Vue.set(info, "playStatus", "i-loading");
			}else{
				info.playStatus = "i-loading";
			}
			
			if(info.LocalId){
				info.playStatus = "i-stop";
				weixin.playVoice({
					localId: info.LocalId
				});
			}else{
				weixin.downloadVoice({
					serverId: info.Content,
					isShowProgressTips: 1,
					success: function (res) {
						info.LocalId = res.localId;
						if(this.currentPlay.Id === info.Id){
							info.playStatus = "i-stop";
							weixin.playVoice({
								localId: info.LocalId
							});
						}else{
							info.playStatus = "";
						}
					}.bind(this)
				});
			}
		}
	}
});

module.exports = Comment;