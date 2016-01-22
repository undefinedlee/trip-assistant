var Page = require("page");
var $ = require("f7").Dom;
var Promise = require("async/promise");
var TourService = require("service:tour");
var commonData = require("util").commonData;
var $Date = require("date");
var template = require("./main.tpl");
require("./main.styl");

module.exports = Page({
	name: "order-list",
	title: "我参加过的团",
	template: template,
	model: {
		tours: null,
		page: 1,
		hasMore: false,
		loading: false
	},
	actions: {
		load: function(isRefresh){
			if(this.loading){
				return;
			}
			this.loading = true;

			var promise = new Promise();

			if(isRefresh){
				this.page = 1;
				this.$app.attachInfiniteScroll($(this.$page.container).find('.infinite-scroll'));
			}else{
				this.page ++;
			}

			TourService.TourList({
				page: this.page
			}).then(function(result){
				this.loading = false;

				// 计算回团日期
				result.Items.forEach(function(order){
					order.BackDate = $Date(order.StartDate).add(order.Days - 1);
				});

				if(isRefresh){
					this.tours = result.Items || [];
				}else{
					this.tours = (this.tours || []).concat(result.Items || []);
				}

				this.hasMore = result.HasMore;

				if(!result.HasMore){
					this.$app.detachInfiniteScroll($(this.$page.container).find('.infinite-scroll'));
				}

				promise.resolve();
			}.bind(this));

			return promise;
		},
		shareTour: function(tour){
			var startDate = $Date(tour.StartDate);

			commonData.currentTour = {
				Id: tour.Id,
				Days: new Array(tour.Days + 1).join(".").split("").map(function(item, index){
					return {
						Date: startDate.add(index)
					};
				})
			};
		}
	},
	init: function(){
		this.load(true);

		$(this.$page.container).find('.infinite-scroll').on('infinite', function () {
			this.load();
		}.bind(this));

		$(this.$page.container).find(".pull-to-refresh-content").on("refresh", function(){
			this.load(true).then(function(){
				this.$app.pullToRefreshDone();
			}.bind(this));
		}.bind(this));
	}
});