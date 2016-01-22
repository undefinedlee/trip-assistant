function toDoubel(num){
	return (num < 10 ? "0" : "") + num;
}

module.exports = function(date){
	date = date.split("-").map(function(item){
		return +item;
	});

	return {
		add: function(day){
			var d = new Date(date[0], date[1] - 1, date[2] + day);
			return [d.getFullYear(), toDoubel(d.getMonth() + 1), toDoubel(d.getDate())].join("-");
		}
	};
};