<div class="navbar">
	<div class="navbar-inner"></div>
</div>
<div data-page="<$= Model.name $>" class="page no-navbar no-toolbar">
	<div id="login" class="page-content">
		<div class="container">
			<div class="content-block-title">请输入护照号查看</div>
			<div class="content-block">
				<p>
					<input class="input input-big" type="text" v-model="passportNo" />
				</p>
				<p>
					<a class="button button-fill button-big color-orange" v-on:click="confirm">查看</a>
				</p>
			</div>
		</div>
	</div>
</div>