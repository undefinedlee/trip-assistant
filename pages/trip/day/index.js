var Vue = require("vue");
var template = require("./main.tpl");
var Score = require("score");
var TourService = require("service:tour");
var weixin = require("weixin");
var ResourceEnum = require("enum/day-resource");
var commonData = require("util").commonData;
var commentCache = require("./comment-cache");
var Comment = require("../comment/index");

// 头像颜色
var colors = ["69c", "9c6", "96c", "c69", "c96", "6c9", "c66", "6c6", "66c", "89a", "8a9", "9a8", "98a", "a89", "a98"];

// 头像分配信息
var headerIndex = 0;
var headerCache = {};

function getHeader(userId){
	if(!headerCache[userId]){
		headerCache[userId] = {
			header: "i-header-" + ((headerIndex % 36) + 1),
			color: "#" + colors[headerIndex % colors.length]
		};

		headerIndex ++;
	}

	return headerCache[userId];
}

var Day = Vue.extend({
	template: template(),
	props: ["model", "tourId", "index", "dayCount"],
	data: function(){
		return {
			loaded: false,
			ResourceEnum: ResourceEnum,
			Scores: {},
			scored: false,
			scoreChanged: false,
			// 显示模式
			mode: "info",
			// 评论列表
			comments: [],
			// 评论正在加载中
			loading: false,
			// 所有评论都已加载完毕
			loadedAll: false
		};
	},
	methods: {
		load: function(){
			if(!this.loaded){
				TourService.DayInfo({
					tourId: this.tourId,
					day: this.index
				}).then(function(info){
					info.Date = this.model.Date;
					this.model = info;
					this.loaded = true;

					var scores = {};
					for(var type in info.Resources){
						scores[type] = 0;
					}
					this.Scores = scores;

					TourService.DayScores({
						dayId: info.Id
					}).then(function(data){
						if(data){
							this.Scores = data;
							this.scored = true;
						}
					}.bind(this));
				}.bind(this));
			}
		},
		prev: function(){
			this.$emit("prev");
		},
		next: function(){
			this.$emit("next");
		},
		// 修改分数
		scoreChange: function(){
			this.scoreChanged = true;
		},
		cancelScore: function(){
			for(var type in this.Scores){
				this.Scores[type] = 0;
			}
			this.scoreChanged = false;
		},
		publishScore: function(){
			TourService.PublishDayScore({
				dayId: this.model.Id
			}, this.Scores).then(function(){});
			this.scored = true;
		},
		// 设置浏览模式
		setMode: function(mode){
			if(mode === "comment" && this.mode !== "comment"){
				this.loadNewComment();
			}

			this.mode = mode;
		},
		// 加载新的评论
		loadNewComment: function(){
			if(this.loading){
				return;
			}
			this.loading = true;
			commentCache(this.model.Id).load().then(function(items){
				items.forEach(function(item){
					item.IsSelf = item.UserId == commonData.userId;
					item.Header = getHeader(item.UserId);
				});

				this.comments = items.reverse();
				this.loadedAll = false;
				this.$nextTick(function(){
					this.$refs.comment.scrollTop();
					this.$refs.comment.pullToRefreshDone();
					this.loading = false;
				}.bind(this));
			}.bind(this));
		},
		// 加载以前的评论
		loadOldComment: function(){
			if(this.loading){
				return;
			}
			this.loading = true;
			commentCache(this.model.Id).load(this.comments.length ? this.comments[this.comments.length - 1].Id : 0).then(function(items){
				//var bottom = this.$refs.comment.getScrollBottom();
				if(items.length){
					items.reverse().forEach(function(item){
						item.IsSelf = item.UserId == commonData.userId;
						item.Header = getHeader(item.UserId);
						this.comments.push(item);
					}.bind(this));
				}else{
					this.loadedAll = true;
				}

				this.$nextTick(function(){
					//this.$refs.comment.scrollBottom(bottom);
					this.loading = false;
				}.bind(this));
			}.bind(this));
		},
		publish: function(comment){
			// 添加头像信息
			comment.Id = 0;
			comment.UserId = commonData.userId;
			comment.Header = getHeader(commonData.userId);
			comment.IsSelf = true;
			comment.Time = "刚刚";

			// 切换评论视图
			var isSwitch = false;
			if(this.mode !== "comment"){
				this.mode = "comment";
				isSwitch = true;
			}

			// 提交信息
			var publish = function(type, content){
				TourService.PublishDayComment({
					dayId: this.model.Id,
					type: type,
					content: content
				}).then(function(id){
					if(isSwitch){
						this.loadNewComment();
						this.$nextTick(function(){
							this.$refs.comment.scrollTop();
						}.bind(this));
					}

					comment.Id = id;
				}.bind(this));
			}.bind(this)

			if(comment.Type === "photo"){
				weixin.uploadImage({
					localId: comment.Content,
					isShowProgressTips: 0,
					success: function (res) {
						publish(comment.Type, res.serverId);
					}.bind(this)
				});
			}else if(comment.Type === "speech"){
				comment.LocalId = comment.Content;
				weixin.uploadVoice({
					localId: comment.Content,
					isShowProgressTips: 0,
					success: function (res) {
						publish(comment.Type, res.serverId);
					}.bind(this)
				});
			}else{
				publish(comment.Type, comment.Content);
			}

			// 将新数据加入列表
			this.comments.unshift(comment);

			this.$nextTick(function(){
				this.$refs.comment.scrollTop();
			}.bind(this));
		}
	},
	components: {
		"score": Score,
		"comment": Comment
	}
});

module.exports = Day;