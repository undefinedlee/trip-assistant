<div class="navbar">
    <div class="navbar-inner">
    	<div class="left sliding"><a href="#order-list" class="link i-back"></a></div>
    	<div class="center">行程</div>
    </div>
</div>
<div data-page="<$= Model.name $>" class="page no-navbar no-toolbar">
	<div id="trip" class="page-content {{multiMediaIsShow ? 'multi-media-show' : ''}}">
		<template v-if="tour">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<day v-for="day in tour.Days"
						:model="day"
						:tour-id="tour.Id"
						:index="$index"
						:day-count="tour.Days.length"
						v-ref:day
						v-on:prev="prev"
						v-on:next="next"></day>
				</div>
			</div>
			<comment-bar v-on:publish="publish" :multi-media-is-show.sync="multiMediaIsShow"></comment-bar>
		</template>
		<p class="loading" v-else>loading...</p>
	</div>
</div>