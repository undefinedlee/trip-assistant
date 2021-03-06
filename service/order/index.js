var Service = require("service");

module.exports = {
	// 获取用户订单列表
	OrderList: Service({
		url: "",
		cache: 20,
		transfer: function(data){
			return {
				orders: [{
					tourId: 1,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 2,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 3,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 4,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 5,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 6,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 7,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 8,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 9,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}, {
					tourId: 10,
					startDate: "2016-02-06",
					days: 12,
					backDate: "2016-02-18",
					tourName: "英爱9天7晚(BA)•温德米尔湖区游船+爱丁古堡",
					startCityName: "上海",
					leaderName: "江左梅郎",
					tel: 13600000000
				}],
				hasMore: true
			};
		}
	})
};