var template = require("./main.tpl");
var Page = require("page");
var commonData = require("util").commonData;
var UserService = require("service:user");
require("./main.styl");

//var storeKey = "passport-no";

module.exports = Page({
	name: "login",
	title: "行程助手",
	template: template,
	model: {
		passportNo: ""
	},
	actions: {
		confirm: function(){
			if(this.passportNo){
				UserService.BindPassportNo({
					passportNo: this.passportNo
				}).then(function(result){
					commonData.userId = result.UserId;
					
					this.$view.$go("order-list", null, {
						animatePages: false,
						noHistory: true
					});
				}.bind(this));
			}else{
				alert("请输入护照号");
			}
		}
	},
	beforeInit: function(){
		if(commonData.userId){
			this.$view.$go("order-list", null, {
				animatePages: false,
				noHistory: true
			});
			return false;
		}
	}
});