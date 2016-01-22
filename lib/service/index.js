var $ = require("f7").Dom;
var Promise = require("async/promise");
var Util = require("util");

var storeKey = "";

/**
	config:
		url				请求地址
		transfer		数据转换
		cache			缓存时间（天）
 */

module.exports = function(config){
	config.transfer = config.transfer || function(data){ return data; };
	return function(params, data, nocache){
		var promise = new Promise();
		var queryString = Util.toQueryString(params);
		var queryUrl = [config.url, queryString].join("?");

		var cacheData;
		if(config.cache && !nocache && !data){
			cacheData = momo.store.get(storeKey);
			if(cacheData && (cacheData = JSON.parse(cacheData)) && (cacheData = cacheData[queryUrl]) && cacheData.expires < +new Date()){
				promise.resolve(cacheData.content);
				return promise;
			}
		}

		function success(data){
			data = config.transfer(data, params);
			var cache,
				now = +new Date();
			if(config.cache){
				cache = momo.store.get(storeKey);
				if(!cache || !(cache = JSON.parse(cache))){
					cache = {};
				}

				// 清除过期的缓存
				for(var _key in cache){
					if(cache[_key].expires >= now){
						delete cache[_key];
					}
				}

				cache[queryUrl] = {
					expires: now + config.cache * 24 * 3600 * 1000,
					content: data
				};

				momo.store.set(storeKey, JSON.stringify(cache));
			}
			promise.resolve(data);
		}

		// $.ajax({
		// 	url: queryUrl,
		// 	data: data,
		// 	success: success
		// });
		setTimeout(success, 500);

		return promise;
	};
};