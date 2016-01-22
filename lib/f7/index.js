require("./core");
var style = require("./ios.css");
// 要保证框架样式在最上面
var head = document.getElementsByTagName("head")[0];
head.insertBefore(style, head.firstChild);

Dom7._ajax = Dom7.ajax;

Dom7.ajax = function(options){
	var success = options.success || function(){},
		error = options.error || function(){},
		complete = options.complete || function(){};

	options.dataType = options.dataType || "json";
	
	if(options.dataType === "json"){
		options.success = function(result){
			var code = result.code;
			if(code >= 200 && code < 300 || code == 304){
				success(result.value);
			}else if(code >= 500 && code < 600){
				error(result.msg);
			}else if(code == 302){
			}else{
				error();
			}
		};
	}
	return Dom7._ajax(options);
};

module.exports = {
    Framework: Framework7,
    Dom: Dom7,
    Template: Template7
};