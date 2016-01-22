<div class="comment-container" v-on:scroll="checkScroll">
	<div>
		<div class="pull-to-refresh-layer">
			<div class="preloader"></div>
			<div class="pull-to-refresh-arrow"></div>
		</div>
		<ul class="comments" v-if="comments">
			<li class="comment {{comment.IsSelf ? 'self' : ''}}" v-for="comment in comments">
				<span class="header {{comment.Header.header}}" v-bind:style="{backgroundColor:comment.Header.color}"></span>
				<span class="content text" v-if="comment.Type==CommentTypeEnum.Text">{{comment.Content}}</span>
				<span class="content photo" v-if="comment.Type==CommentTypeEnum.Photo" v-on:click="viewBigImage(comment.Content)"><img v-bind:src="comment.Content" /></span>
				<span class="content speech {{comment.playStatus || 'i-play'}}" v-if="comment.Type==CommentTypeEnum.Speech" v-on:click="playSpeech(comment, $event)">
					<span v-if="!comment.playStatus">点击播放</span>
					<span v-if="comment.playStatus=='i-loading'">加载中...</span>
					<span v-if="comment.playStatus=='i-stop'">
						<span class="i-recording" style="color:#0c0;width:30px;height:14px;margin:8px 8px 0;">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</span>
					</span>
				</span>
				<p class="extend">
					<span v-if="comment.Id" class="time">{{comment.Time}}</span>
					<span v-else class="time i-loading"></span>
				</p>
			</li>
		</ul>
		<p v-if="!loadedAll" style="position: relative;height: 44px;">
			<span class="preloader" style="width:20px;height:20px;margin: -10px 0 0 -10px;"></span>
		</p>
	</div>
</div>