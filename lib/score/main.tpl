<span class="score score-{{value}}">
	<a class="i-score-{{value > 1 ? value : 1}}" v-on:click="select(1)"></a>
	<a class="i-score-{{value > 2 ? value : 2}}" v-on:click="select(2)"></a>
	<a class="i-score-{{value > 3 ? value : 3}}" v-on:click="select(3)"></a>
	<a class="i-score-{{value > 4 ? value : 4}}" v-on:click="select(4)"></a>
	<a class="i-score-{{value > 5 ? value : 5}}" v-on:click="select(5)"></a>
</span>