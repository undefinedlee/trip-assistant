var Vue = require("vue");
var template = require("./main.tpl");
var weixin = require("weixin");
var CommentTypeEnum = require("enum/comment-type");

var documentClickListeners = [];
function fireClick(){
	documentClickListeners.forEach(function(listener){
		listener();
	});
}
document.addEventListener("click", fireClick);
document.addEventListener("touchend", fireClick);

var weixinListener = {
	"record-end": null,
	"play-end": null
};
weixin.ready(function(){
	weixin.onVoiceRecordEnd({
		// 录音时间超过一分钟没有停止的时候会执行 complete 回调
		complete: function (res) {
			if(weixinListener["record-end"]){
				weixinListener["record-end"](res);
			}
		}.bind(this)
	});
	weixin.onVoicePlayEnd({
		success: function (res) {
			if(weixinListener["play-end"]){
				weixinListener["play-end"](res);
			}
		}
	});
});

var CommentBar = Vue.extend({
	template: template(),
	props: ["multiMediaIsShow"],
	data: function(){
		return {
			content: "",
			recording: false,
			playing: false,
			recordLocalId: 0,
			viewRecordPanel: false
		};
	},
	ready: function(){
		// 关闭多媒体面板
		this.closeHandler = function(){
			if(!document.body.contains(this.$el)){
				documentClickListeners.splice(documentClickListeners.indexOf(this.closeHandler), 1);
				return;
			}
			if(this.multiMediaIsShow){
				this.multiMediaIsShow = false;
			}
		}.bind(this);

		documentClickListeners.push(this.closeHandler);
	},
	methods: {
		publish: function(value){
			if(/^\s*$/.test(this.content)){
				return;
			}

			this.$emit("publish", {
				Type: CommentTypeEnum.Text,
				Content: this.content
			});

			this.content = "";
		},
		switchMultiMedia: function(e){
			this.multiMediaIsShow = !this.multiMediaIsShow;
			e.stopPropagation();
		},
		// 选择图片
		chooseImage: function(){
			weixin.chooseImage({
				// 默认9
				count: 5,
				// 可以指定是原图还是压缩图，默认二者都有
				//sizeType: ['original', 'compressed'],
				sizeType: ['compressed'],
				// 可以指定来源是相册还是相机，默认二者都有
				sourceType: ['album', 'camera'],
				success: function (res) {
					var localIds = res.localIds;

					localIds.forEach(function(localId){
						this.$emit("publish", {
							Type: CommentTypeEnum.Photo,
							Content: localId
						});
					}.bind(this));
				}.bind(this)
			});
		},
		startRecord: function(){
			this.recording = true;
			weixinListener["record-end"] = function(res){
				this.recording = false;
				this.recordLocalId = res.localId;
			}.bind(this);
			weixin.startRecord();
			this.viewRecordPanel = true;
		},
		stop: function(){
			if(this.recording){
				this.recording = false;
				weixin.stopRecord({
					success: function (res) {
						this.recordLocalId = res.localId;
					}.bind(this)
				});
			}else if(this.playing){
				this.playing = false;
				// weixin.pauseVoice({
				// 	localId: this.recordLocalId
				// });
				weixin.stopVoice({
					localId: this.recordLocalId
				});
			}
		},
		play: function(){
			this.playing = true;
			weixinListener["play-end"] = function(res){
				this.playing = false;
			}.bind(this);
			weixin.playVoice({
				localId: this.recordLocalId
			});
		},
		publishSpeech: function(){
			this.viewRecordPanel = false;
			this.$emit("publish", {
				Type: CommentTypeEnum.Speech,
				Content: this.recordLocalId
			});
			this.recordLocalId = 0;
		},
		cancelSpeech: function(){
			this.viewRecordPanel = false;
		}
	}
});

module.exports = CommentBar;