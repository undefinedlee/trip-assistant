<div class="swiper-slide day {{mode === 'comment' ? 'comment-mode' : ''}}">
	<h2 class="day-index">第{{index + 1}}天
		<small>{{model.Date}}</small>
		<a class="i-back prev-day" v-on:click="prev" v-if="index !== 0"></a>
		<a class="i-back next-day" v-on:click="next" v-if="index !== dayCount - 1"></a>
	</h2>
	<template v-if="loaded">
		<div class="info-container">
			<div class="info">
				<h3>{{model.Title}}</h3>
				<div class="flight" v-if="model.Flights && model.Flights.length">
					<template v-for="flight in model.Flights">
						<p class="airport i-place-fill" v-if="$index===0||flight.StartAirport!==model.Flights[$index-1].EndAirport">
							{{flight.StartAirport}}
							<span>{{flight.StartTime}}</span>
						</p>
						<p class="code">
							<span class="i-flight">{{flight.Code}}</span>
						</p>
						<p class="airport i-place-fill">
							{{flight.EndAirport}}
							<span v-if="$index===model.Flights.length-1||flight.EndAirport!==model.Flights[$index+1].StartAirport||flight.EndTime===model.Flights[$index+1].StartTime">{{flight.EndTime}}</span>
							<span v-else>{{flight.EndTime}} - {{model.Flights[$index+1].StartTime}}</span>
						</p>
					</template>
				</div>
				<dl>
					<!--dt class="i-flight" v-if="model.Flights && model.Flights.length"></dt>
					<dd v-if="model.Flights && model.Flights.length">
						<p v-for="flight in model.Flights">
							<span class="airport" v-if="$index===0||flight.StartAirport!==model.Flights[$index-1].EndAirport">
								{{flight.StartAirport}}
								<span>{{flight.StartTime}}</span>
							</span>
							<span class="code">
								<span>{{flight.Code}}</span>
							</span>
							<span class="airport">
								{{flight.EndAirport}}
								<span v-if="$index===model.Flights.length-1||flight.EndAirport!==model.Flights[$index+1].StartAirport||flight.EndTime===model.Flights[$index+1].StartTime">{{flight.EndTime}}</span>
								<span v-else>{{flight.EndTime}} - {{model.Flights[$index+1].StartTime}}</span>
							</span>
						</p>
					</dd-->
					<dt class="i-meal"></dt>
					<dd class="meal">
						<p v-if="model.Breakfast">早餐<strong>{{model.Breakfast}}</strong></p>
						<p v-if="model.Lunch">午餐<strong>{{model.Lunch}}</strong></p>
						<p v-if="model.Dinner">晚餐<strong>{{model.Dinner}}</strong></p>
					</dd>
					<dt class="i-shop" v-if="model.Shops && model.Shops.length"></dt>
					<dd v-if="model.Shops && model.Shops.length">
						<p v-for="shop in model.Shops">{{shop}}</p>
					</dd>
					<dt class="i-hotel" v-if="model.HotelInfo"></dt>
					<dd>{{model.HotelInfo}}</dd>
				</dl>
				<p class="desc" v-for="desc in model.Desc.split('\n')">{{desc}}</p>
			</div>
			<div class="resource-scores">
				<ul>
					<li v-if="model.Resources[ResourceEnum.Breakfast]">早餐
						<score v-bind:value.sync="Scores[ResourceEnum.Breakfast]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
					<li v-if="model.Resources[ResourceEnum.Lunch]">午餐
						<score v-bind:value.sync="Scores[ResourceEnum.Lunch]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
					<li v-if="model.Resources[ResourceEnum.Dinner]">晚餐
						<score v-bind:value.sync="Scores[ResourceEnum.Dinner]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
					<li v-if="model.Resources[ResourceEnum.Spot]">景点
						<score v-bind:value.sync="Scores[ResourceEnum.Spot]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
					<li v-if="model.Resources[ResourceEnum.Shop]">购物
						<score v-bind:value.sync="Scores[ResourceEnum.Shop]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
					<li v-if="model.Resources[ResourceEnum.Bus]">大巴
						<score v-bind:value.sync="Scores[ResourceEnum.Bus]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
					<li v-if="model.Resources[ResourceEnum.Hotel]">酒店
						<score v-bind:value.sync="Scores[ResourceEnum.Hotel]"
								v-bind:disabled="scored"
								v-on:select="scoreChange()"></score>
					</li>
				</ul>
				<p class="actions" v-if="!scored&&scoreChanged">
					<span>
						<a class="button button-fill button-big color-gray" v-on:click="cancelScore">取消</a>
					</span>
					<span>
						<a class="button button-fill button-big color-orange" v-on:click="publishScore">提交</a>
					</span>
				</p>
			</div>
			<a class="view-comment" v-on:click="setMode('comment')">查看评论<i class="i-back"></i></a>
		</div>
		<comment :comments="comments"
				:loaded-all="loadedAll"
				v-on:load-old="loadOldComment"
				v-on:refresh="loadNewComment"
				v-ref:comment></comment>
		<a class="view-info" v-show="mode==='comment'" v-on:click="setMode('info')">返回行程介绍<i class="i-back"></i></a>
	</template>
	<p class="loading" v-else>loading...</p>
</div>