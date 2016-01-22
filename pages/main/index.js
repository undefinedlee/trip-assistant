var F7 = require("f7");
require("./theme.styl");
var Router = require("router");
var lazylist = require("async/lazylist");
var Util = require("util");
var template = require("./main.tpl");
var login = require("pages:login");
var $ = F7.Dom;

module.exports = function(config){
	Util.extend(Util.commonData, config);

	$(document.body).append(template());

	var App = new F7.Framework({
		router: false,
		dynamicNavbar: true,
		dynamicPageUrl: "{{name}}"
	});

	var mainView = App.addView(".view-main", {
		dynamicNavbar: true
	});

	var router = Router(App, {
		"main": mainView
	});

	mainView.$go = function(pageName, params, config){
		if(config){
			if(config.animatePages === false){
				router.animatePages = false;
			}
			router.noHistory = config.noHistory;
			router.forced = config.forced;
		}

		//var hash = "main:" + pageName;
		var hash = pageName;
		params = Util.toQueryString(params);
		if(params){
			hash += "?" + params;
		}
		router.$go(location.href.split("#")[0] + "#" + hash);
		//location.hash = hash;
	};

	// 图片浏览器
	Util.commonData.viewPhoto = function(url){
		App.photoBrowser({
			photos : [url],
			theme: 'dark'
		}).open();
	};

	// 解决click事件300ms延时的问题
	var current,
		y;
	document.body.addEventListener("touchstart", function(e){
		current = e.target;
		y = e.changedTouches[0].pageY;
	}, false);
	document.body.addEventListener("touchend", function(e){
		if(e.target === current && e.changedTouches[0].pageY === y){
			if(/^(a)$/.test(current.tagName.toLowerCase())){
				if(current.href){
					var url = current.href.split("#")[1].split("?");
					mainView.$go(url[0], Util.parseQueryString(url[1]));
				}

				current.click();
				e.preventDefault();
				e.stopPropagation();
			}
		}
	}, false);

	mainView.$go("order-list", null, {
		animatePages: false,
		noHistory: true,
		forced: true
	});
};