<div class="comment-bar">
	<input class="input" type="text" v-model="content" />
	<a class="button" v-on:click="publish">吐槽</a>
	<a class="multi-media i-add" v-on:click="switchMultiMedia($event)"></a>
</div>
<ul class="multi-media-panel">
	<li>
		<a class="i-photo green" v-on:click="chooseImage"></a>
	</li>
	<li>
		<a class="i-speech blue" v-on:click="startRecord"></a>
	</li>
	<li>
		<!--a class="i-place orange"></a-->
	</li>
	<li></li>
</ul>
<div class="record-mask" v-if="viewRecordPanel">
	<div class="container">
		<p class="record-control">
			<a v-if="recording || playing" class="i-stop" v-on:click="stop">点击停止</a>
			<a v-else class="i-play" v-on:click="play">点击播放</a>
		</p>
		<p class="record-animate" style="visibility:{{recording || playing ? '' : 'hidden'}}">
			<span class="i-recording">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</span>
		</p>
		<p class="publish-control" style="visibility:{{recording ? 'hidden' : ''}}">
			<span>
				<a class="button button-fill button-big color-gray" v-on:click="cancelSpeech">取消</a>
			</span>
			<span>
				<a class="button button-fill button-big color-orange" v-on:click="publishSpeech">发送</a>
			</span>
		</p>
	</div>
</div>