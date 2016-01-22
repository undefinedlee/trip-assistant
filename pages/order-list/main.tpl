<div class="navbar">
    <div class="navbar-inner"></div>
</div>
<div data-page="<$= Model.name $>" class="page no-navbar no-toolbar">
	<div id="order-list" class="page-content pull-to-refresh-content infinite-scroll" data-ptr-distance="60" data-distance="100">
		<template v-if="tours">
			<div class="pull-to-refresh-layer">
				<div class="preloader"></div>
				<div class="pull-to-refresh-arrow"></div>
			</div>
			<ul class="tours">
				<li class="tour" v-for="tour in tours">
					<h2 class="date">
						<span class="start">{{tour.StartDate}}</span>
						<span class="count"><em>{{tour.Days}}天</em></span>
						<span class="back">{{tour.BackDate}}</span>
					</h2>
					<div class="detail">
						<h3 class="tour-name">{{tour.TourName}}</h3>
						<p class="info">
							<span>{{tour.StartCity}}出发</span>
						</p>
						<div class="leader" v-for="leader in tour.Leaders">
							<span class="i-leader"></span>
							<div>
								<span>
									<span>{{leader.Name}}</span>
									<span>{{leader.Tel}}</span>
								</span>
								<a class="i-tel" href="tel:{{leader.Tel}}"></a>
							</div>
						</div>
						<p class="actions">
							<a href="#trip?tourId={{tour.Id}}" v-on:click="shareTour(tour)">查看行程</a>
							<a href="#comment?tourId={{tour.Id}}">评论</a>
						</p>
					</div>
				</li>
			</ul>
			<div class="infinite-scroll-preloader" v-if="hasMore">
				<div class="preloader"></div>
			</div>
		</template>
		<p class="loading" v-else>loading...</p>
	</div>
</div>