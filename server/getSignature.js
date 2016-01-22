var https = require("https");
var fs = require("fs");
var crypto = require('crypto');

var appId = "wx0132475024c0c209";
var appsecret = "d4624c36b6795d1d99dcf0547af5443d";
var access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appid}&secret={appsecret}";
var jsapi_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={access_token}&type=jsapi";
var useUrl = "http://dev.ms.hyfiles.com:9999/trip-assistant/index.html";
var saveUrl = "C:\\Users\\Administrator\\.hyjs-publish\\trip-assistant\\weixinConfig.js";
var contentTemplate = "var weixinSignatureConfig = {access_token: '{access_token}', jsapi_ticket: '{jsapi_ticket}', timestamp: '{timestamp}', noncestr: '{noncestr}', string1: '{string1}', signature: '{signature}'};";

var tpl = function(template, data){
	return template.replace(/\{(\w+)\}/g, function(all, key){
		return data[key];
	});
};

var get = function(url, callback){
	https.get(url, function(res){
		if(res.statusCode != 200){
			console.log("error");
			return;
		}
		var chunks = [];
		var size = 0;
		res.on('data', function(chunk){
			size += chunk.length;
			chunks.push(chunk);
		});
		res.on('end', function(){
			var data = Buffer.concat(chunks, size);
			data = JSON.parse(data);
			//console.log(data);
			callback(data);
		});
	}).on('error', function(e) {
		console.log(e);
	});
};

function getJsapiTicket(){
	get(tpl(access_token_url, {
		appid: appId,
		appsecret: appsecret
	}), function(data){
		get(tpl(jsapi_ticket_url, {
			access_token: data.access_token
		}), function(data1){
			if(data1.errcode == 0){
				var timestamp = +new Date()/1000|0;
				var noncestr = Math.random()*1000000000|0;
				var string1 = ["noncestr=" + noncestr,
							"jsapi_ticket=" + data1.ticket,
							"timestamp=" + timestamp,
							"url=" + useUrl].sort().join("&");
				var hasher = crypto.createHash("sha1");
				hasher.update(string1);
				var signature = hasher.digest('hex');
				fs.writeFile(saveUrl, tpl(contentTemplate, {
					access_token: data.access_token,
					jsapi_ticket: data1.ticket,
					timestamp: timestamp,
					noncestr: noncestr,
					string1: string1,
					signature: signature
				}), function(){
					console.log("success");
				});
			}
		});
	});
}

getJsapiTicket();