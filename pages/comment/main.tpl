<div class="navbar">
    <div class="navbar-inner">
    	<div class="left sliding"><a href="#order-list" class="link i-back"></a></div>
    	<div class="center">点评</div>
    </div>
</div>
<div data-page="<$= Model.name $>" class="page no-navbar no-toolbar">
	<div id="comment" class="page-content">
		<p class="loading" v-if="hasComment===null">loading...</p>
		<template v-else>
			<ul class="resource-scores">
				<li>航班
					<score v-bind:value.sync="Scores[TourResourceEnum.Flight]" v-bind:disabled="hasComment"></score>
				</li>
				<li>签证
					<score v-bind:value.sync="Scores[TourResourceEnum.Visa]" v-bind:disabled="hasComment"></score>
				</li>
				<li>行程
					<score v-bind:value.sync="Scores[TourResourceEnum.Trip]" v-bind:disabled="hasComment"></score>
				</li>
				<li>领队
					<score v-bind:value.sync="Scores[TourResourceEnum.Leader]" v-bind:disabled="hasComment"></score>
				</li>
			</ul>
			<h2>吐槽行程</h2>
			<div class="desc" v-if="hasComment">
				<p v-for="desc in TripComment.split('\n')">{{desc}}</p>
			</div>
			<textarea class="input input-big" v-else v-model="TripComment" placeholder="吧啦吧啦~~~" style="height:100px;"></textarea>
			<h2>领队印象</h2>
			<div class="desc" v-if="hasComment">
				<p v-for="desc in LeaderComment.split('\n')">{{desc}}</p>
			</div>
			<textarea class="input input-big" v-else v-model="LeaderComment" placeholder="吧啦吧啦~~~" style="height:60px;"></textarea>
			<a class="button button-fill button-big color-orange" v-if="!hasComment" v-on:click="publish">发布</a>
		</template>
	</div>
</div>