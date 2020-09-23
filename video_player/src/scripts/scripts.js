(() => {
  const video = document.querySelector('#video');
  const play = document.querySelector('#play');
  const stop = document.querySelector('#stop');
  const progress = document.querySelector('#progress');
  const timestamp = document.querySelector('#timestamp');

  /* We want to update video time to display through
  the progress bar, but, when we do that,
  video timeupdate is triggered too.
  We use this variable to prevent that problem
  */
  let shouldUpdateVideo = true;

  // Play & pause video
  function toogleVideoStatus() {
    return video.paused ? video.play() : video.pause();
  }

  // update play/pause icon when user clicks on video or on play/pause icon
  function updatePlayIcon() {
    const icon = `<i class="fa fa-${
      video.paused ? 'play' : 'pause'
    } fa-2x"></i>`;
    play.innerHTML = icon;
  }

  // update the progress bar and timestamp to match the video time
  function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
  }

  function updateTimeStamp() {
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    timestamp.textContent = `${minutes}:${seconds}`;
  }

  function handleTimeUpdate() {
    if (!shouldUpdateVideo) return;
    updateProgress();
    updateTimeStamp();
  }

  // stop video
  // video.stop() doesn't exist
  function stopVideo() {
    video.currentTime = 0;
    video.pause();
  }

  // match video time with the value represented on progress bar
  function setVideoProgress() {
    shouldUpdateVideo = true;
    video.currentTime = (+progress.value * video.duration) / 100;
  }

  video.addEventListener('click', toogleVideoStatus);
  video.addEventListener('pause', updatePlayIcon);
  video.addEventListener('play', updatePlayIcon);
  video.addEventListener('timeupdate', handleTimeUpdate);
  play.addEventListener('click', toogleVideoStatus);
  stop.addEventListener('click', stopVideo);
  progress.addEventListener('change', setVideoProgress);
  // when the user touch the range this event is fired
  progress.addEventListener('input', () => {
    shouldUpdateVideo = false;
  });
})();
