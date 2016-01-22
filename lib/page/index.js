var Vue = require("vue");
var Promise = require("async/promise");
var Util = require("util");
var $ = require("f7").Dom;

module.exports = function(config, controller){
	return function loadPage(_config){
		if(!Util.commonData.userId && config.name !== "login"){
			_config.view.$go("login", null, {
				animatePages: false,
				noHistory: true
			});
			return;
		}

		config.model = config.model || {};

		var model = {
			$app: _config.app,
			$view: _config.view,
			$params: _config.params || {},
			$promise: new Promise()
		};

		if(!config.beforeInit || config.beforeInit.call(Util.extend(config.model, model)) !== false){
			var initHandler = _config.app.onPageInit(config.name, function (page) {
				model.$page = page;

				if(config.title){
					document.title = config.title;

					var $iframe = $('<iframe src="/empty.gif" style="display:none;"></iframe>').on("load", function(){
						setTimeout(function(){
							$iframe.off("load").remove();
						}, 1);
					}).appendTo(document.body);
				}

				model = Util.extend(new Vue({
					el: page.container,
					data: config.model,
					methods: config.actions,
					components: config.components
				}), model);

				try{
					config.init && config.init.call(model);
				}catch(e){
					console.error(e);
				}
			});

			var removeHandler = _config.app.onPageBeforeRemove(config.name, function(){
				initHandler.remove();
				removeHandler.remove();
			});

			//_config.view.allowPageChange = true;
			_config.view.router.load({
				content: config.template({
					name: config.name
				}),
				animatePages: _config.animatePages
			});
		}

		return model;
	};
};