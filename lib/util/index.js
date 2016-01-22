function extend(target, src){
	if(src){
		for(var key in src){
			if(src.hasOwnProperty(key)){
				target[key] = src[key];
			}
		}
	}
	return target;
}

function toQueryString(obj){
	var items = [];
	obj = obj || {};
	for(var key in obj){
		items.push(key + "=" + obj[key]);
	}
	return items.join("&");
}

function parseQueryString(queryString){
	var obj = {};
	if(queryString){
		queryString.split("&").forEach(function(item){
			item = item.split("=");
			obj[item[0]] = item[1];
		});
	}
	return obj;
}

module.exports = {
	extend: extend,
	toQueryString: toQueryString,
	parseQueryString: parseQueryString,
	commonData: {}
};