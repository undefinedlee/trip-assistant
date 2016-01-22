var Vue = require("vue");
var template = require("./main.tpl");
require("./main.styl");

var Score = Vue.extend({
	template: template(),
	props: ["value", "disabled"],
	methods: {
		select: function(value){
			if(!this.disabled){
				this.value = value;
				this.$emit("select", value);
			}
		}
	}
});

//Vue.component('score', Score);

module.exports = Score;