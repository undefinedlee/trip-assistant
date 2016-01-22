var Page = require("page");
var Score = require("score");
var TourService = require("service:tour");
var TourResourceEnum = require("enum/tour-resource");
var template = require("./main.tpl");
require("./main.styl");

module.exports = Page({
	name: "trip",
	title: "点评",
	template: template,
	model: {
		hasComment: null,
		TourResourceEnum: TourResourceEnum,
		Scores: {},
		TripComment: "",
		LeaderComment: ""
	},
	actions: {
		publish: function(){
			TourService.PublishTourComment({
				tourId: this.$params.tourId
			}, {
				Scores: this.Scores,
				TourComment: this.TripComment,
				LeaderComment: this.LeaderComment
			}).then(function(){
				this.hasComment = true;
			}.bind(this));
		}
	},
	components: {
		"score": Score
	},
	init: function(){
		TourService.TourComment({
			tourId: this.$params.tourId
		}).then(function(data){
			if(data){
				this.hasComment = true;
				this.Scores = data.Scores;
				this.TripComment = data.TripComment;
				this.LeaderComment = data.LeaderComment;
			}else{
				this.hasComment = false;
				this.Scores = (function(){
					var scores = {};
					for(var key in TourResourceEnum){
						scores[TourResourceEnum[key]] = 0;
					}
					return scores;
				})();
			}
		}.bind(this));
	}
});