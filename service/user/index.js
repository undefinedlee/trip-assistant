var Service = require("service");

module.exports = {
	// 绑定护照号
	BindPassportNo: Service({
		url: "",
		transfer: function(){
			return {
				UserId: 123
			};
		}
	})
};