var TourService = require("service:tour");
var Promise = require("async/promise");
var weixin = require("weixin");
var caches = {};
var dayCache = {};

var pageCount = 20;

function transResourceId(item){
	switch(item.Type){
		case "photo":
			if(!/http\:\/\//.test(item.Content)){
				wx.downloadImage({
					serverId: item.Content,
					isShowProgressTips: 1,
					success: function (res) {
						item.Content = res.localId;
					}
				});
			}
			break;
		//case "speech":
		//	break;
	}
}

function getDataer(dayId){
	if(!caches[dayId]){
		caches[dayId] = [];
	}
	var cache = caches[dayId];
	var loaded = false;

	return {
		load: function(commentId){
			var promise = new Promise();

			var cacheItems = [],
				rangeIndex = -1;

			if(commentId){
				// 查找缓存数据
				cache.some(function(range, _rangeIndex){
					return range.some(function(item, index){
						if(item.Id === commentId){
							rangeIndex = _rangeIndex;

							cacheItems = range.slice(Math.max(0, index - pageCount), Math.max(0, index));

							if(_rangeIndex === 0 && loaded || cacheItems.length === pageCount){
								// 假如已经查找到最老的一块，或者当前块已包含pageCount条数据
								commentId = -1;
							}else{
								// 否则从当前块最老一条开始查找
								commentId = range[0].Id;
							}

							return true;
						}
					});
				});
			}

			if(commentId === -1){
				// 如果缓存中数据已符合条件，直接返回
				promise.resolve(cacheItems);
			}else{
				TourService.DayComment({
					dayId: dayId,
					commentId: commentId
				}).then(function(result){
					var items = result.Items || [],
						beginId,
						endId,
						newCache = [],
						tempRange,
						tempId,
						i, l;

					if(items.length){
						beginId = items[0].Id;
						endId = items[items.length - 1].Id;

						items.forEach(function(item){
							transResourceId(item);
						});

						if(rangeIndex === -1){
							// 如果缓存中没有请求起始点，则从缓存尾部混入新数据
							if(cache.length === 0 || (tempRange = cache[cache.length - 1]) && (tempId = tempRange[tempRange.length - 1].Id) < beginId){
								cache.push([].concat(items));
							}else{
								items.forEach(function(item){
									if(item.Id > tempId){
										tempRange.push(item);
									}
								});
							}
							promise.resolve(items);
						}else{
							if(rangeIndex > 0){
								// 如果请求起始点不在第一块
								// 导入之前无连续缓存块
								for(i = 0, l = rangeIndex - 1; i < l; i ++){
									newCache.push(cache[i]);
								}
								// 如果新数据能跟上一条缓存块相接，则将缓存块链接在一起
								tempRange = cache[rangeIndex - 1];
								if((tempId = tempRange[tempRange.length - 1].Id) && tempId > endId){
									items.forEach(function(item){
										if(item.Id > tempId){
											tempRange.push(item);
										}
									});
									newCache.push(tempRange);
								}else{
									newCache.push(tempRange);
									newCache.push([].concat(items));
								}
							}else{
								newCache.push([].concat(items));
							}
							// 链接查找起始缓存块
							newCache[newCache.length - 1] = newCache[newCache.length - 1].concat(cache[rangeIndex]);
							// 导入查找起始缓存块之后的缓存块
							for(i = rangeIndex + 1, l = cache.length; i < l; i ++){
								newCache.push(cache[i]);
							}
							cache = newCache;

							promise.resolve(items.slice(Math.max(0, items.length + cacheItems.length - pageCount)).concat(cacheItems));
						}
					}else{
						promise.resolve(items);
					}

					if(!result.HasMore){
						loaded = true;
					}
				});
			}

			return promise;
		}
	};
}

module.exports = function(dayId){
	if(dayCache[dayId]){
		return dayCache[dayId];
	}else{
		return dayCache[dayId] = getDataer(dayId);
	}
};