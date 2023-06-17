<template>
      <video ref="videoPlayer" class="video-js" controls></video>
  </template>
  
  <script>
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  
  export default {
    name: 'VideoPlayer',
    props: {
      episodeData: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.initializeVideoPlayer();
    },
    methods: {
      initializeVideoPlayer() {
        // Get the video element reference
        const videoElement = this.$refs.videoPlayer;
  
        // Create a new instance of Video.js
        this.videoPlayer = videojs(videoElement);
  
        // Set the source of the video using the episodeData
        this.videoPlayer.src({
          src: this.episodeData.videoUrl,
          type: 'application/x-mpegURL',
        });
  
        // Optionally, you can customize and configure the video player here
  
        // Play the video
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
  