var Service = require("service");

module.exports = {
	// 参加过的团列表
	TourList: Service({
		url: "",
		cache: 20,
		transfer: function(data){
			return {
				Items: [{
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}, {
					Id: 1,
					StartDate: "2016-02-06",
					Days: 12,
					TourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					StartCity: "上海",
					Leaders: [{
						Name: "江左梅郎",
						Tel: "13600000000"
					}]
				}],
				HasMore: true
			};
		}
	}),
	// 行程中某一天的信息
	DayInfo: Service({
		url: "",
		cache: 20,
		transfer: function(data){
			return {
				"Id": 1,
				"Title": "北京 - 巴黎",
				"Flights": [{
					"Code": "MU780",
					"StartAirport": "首都国际机场",
					"StartTime": "12:00",
					"EndAirport": "上海虹桥机场",
					"EndTime": "14:00"
				},{
					"Code": "CA123",
					"StartAirport": "上海虹桥机场",
					"StartTime": "12:00",
					"EndAirport": "首都国际机场",
					"EndTime": "14:00"
				}],
				"HotelInfo": "梅里号帆船酒店",
				"Breakfast": "酒店用餐",
				"Lunch": "十菜一汤",
				"Dinner": "自理",
				"Shops": ["王老五钻石店", "王小二酱牛肉", "武大郎烧饼"],
				"Desc": "今日搭乘东航航空公司国际航班途径上海转机前往美国西部城市洛杉矶。\n抵达后导游接机，【好莱坞星光大道】（不少于20分钟）--是条沿着美国好莱坞大道与藤街伸展的人行道，影迷们可以追寻到点点星迹，星光布道上排列着2000多镶铜的五角星，内有姓名和不同的图案，代表明星在电影，电视，广播，唱片及舞台表演方面的成就；【中国戏院】（外观不少于10分钟）--好莱坞大道上最吸引人的地方，这座剧院据说是建造者心仪中国文化而得名。【华特•迪士尼音乐厅】外观拍照留念，可以进入音乐厅大门内，但不进表演大厅（不少于20分钟），【斯坎普中心】是NBA“洛杉矶湖人队““洛杉矶快船队”的主场，也是冰球“国王队”的主场（不少于20分钟），晚餐后入住酒店休息调整时差。",
				"Resources": {
					"1": true,
					"2": true,
					"3": true,
					"4": true,
					"5": true,
					"6": true,
					"7": true
				}
			};
		}
	}),
	// 查询我对某一天的资源评分
	DayScores: Service({
		url: "",
		transfer: function(){
			return null;
			return {
				"1": 5,
				"2": 0,
				"3": 0,
				"4": 0,
				"5": 0,
				"6": 0,
				"7": 0
			};
		}
	}),
	// 对某一项资源评分
	PublishDayScore: Service({
		url: ""
	}),
	// 查询某一天的吐槽信息
	DayComment: Service({
		url: "",
		transfer: function(data, filters){
			var start = (filters.commentId || 61) - 20;
			var items = [];

			if(start > 0){
				for(var i = 0; i < 20; i ++){
					items[i] = {
						Id: start + i,
						UserId: start + i,
						Type: 1,
						Content: start + i,
						Time: "1天前"
					};
				}
				return {
					HasMore: start > 1,
					Items: items
				};
			}else{
				return {
					HasMore: false,
					Items: items
				};
			}
		}
	}),
	// 对某一天吐槽
	PublishDayComment: Service({
		url: "",
		transfer: function(){
			return 81;
		}
	}),
	// 整体评论
	PublishTourComment: Service({
		url: ""
	}),
	// 获取整体评论
	TourComment: Service({
		url: "",
		transfer: function(){
			//return null;
			return {
				Scores: {
					"1": 4,
					"2": 5,
					"3": 3,
					"4": 3
				},
				TripComment: "123",
				LeaderComment: "456"
			};
		}
	})
};