<template>
  <video ref="videoPlayer" class="video-js" controls></video>
</template>
  
<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'VideoPlayer',
  props: {
    videoData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.initializeVideoPlayer();
  },
  methods: {
    initializeVideoPlayer() {
      const videoElement = this.$refs.videoPlayer;
      const videoUrl = this.videoData.videoUrl;

      console.log(videoUrl)

      // Use the CORS proxy URL to make the request
      const proxyUrl = `http://localhost:3000/?url=${encodeURIComponent(videoUrl)}`;

      this.videoPlayer = videojs(videoElement);
      this.videoPlayer.src({
        src: proxyUrl,
        type: 'application/x-mpegURL',
      });

      this.videoPlayer.play();
    },
  },
  beforeDestroy() {
    // Dispose the video player instance when the component is destroyed
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  },
};
</script>
  
<style scoped>
.video-js {
  width: 100%;
  height: 100%;
}
</style>
