var $ = require("f7").Dom;
var Util = require("util");
var Promise = require("async/promise");

module.exports = function(app, views){
	var promise = new Promise();

	var _history = [];

	promise.$go = function(url){
		if(url.split("#")[1] === _history[_history.length - 2]){
			history.back();
		}else{
			if(url === location.href){
				if(promise.forced){
					loadPage();
				}
			}else{
				if(promise.noHistory){
					//history.replaceState(null, null, url);
					location.replace(url);
				}else{
					//history.pushState(null, null, url);
					location.href = url;
				}
			}
		}
		promise.forced = false;
	};

	function loadPage(){
		var hash = location.hash.replace(/^#/, "");
		var url = hash.split("?");
		var params = Util.parseQueryString(url[1]);
		var viewName, pageName;

		url = url[0].split(":");
		if(url.length === 1){
			viewName = "main";
			pageName = url[0];
		}else{
			viewName = url[0];
			pageName = url[1];
		}

		var noHistory;
		if(promise.noHistory){
			noHistory = true;
			promise.noHistory = false;
		}

		if(hash === _history[_history.length - 2]){
			views[viewName].router.back();
			_history.pop();
		}else{
			if(noHistory){
				_history[Math.max(0, _history.length - 1)] = hash;
			}else{
				_history.push(hash);
			}

			require.async("pages:" + pageName, function(page){
				var animatePages;
				if(promise.animatePages === false){
					animatePages = false;
					promise.animatePages = true;
				}

				try{
					page({
						app: app,
						view: views[viewName],
						params: params,
						animatePages: animatePages
					});
				}catch(e){
					if(!noHistory){
						_history.pop();
					}
					history.back();
					console.error(e);
				}
			});
		}
	}

	$(window).on("hashchange", loadPage);

	return promise;
};