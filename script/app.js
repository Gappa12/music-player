const musicContainer = document.querySelector(".music-container"),
  playBtn = document.querySelector("#play"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  audio = document.querySelector("#audio"),
  progressContainer = document.querySelector(".progress-container"),
  progress = document.querySelector(".progress"),
  title = document.querySelector("#title"),
  cover = document.querySelector("#cover");

// * Song Title
const songs = ["arcade", "the lion sleeps tonighttelepatía", "telepatía"];

// * Keep track of the songs
let songIndex = 2;

// * Initially load song info DOM
loadSong(songs[songIndex]);

// * Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList = "fas fa-pause";

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList = "fas fa-play";

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement,
    progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth,
    clickX = e.offsetX,
    duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// ! Event Listeners
playBtn.addEventListener("click", () => {
  let isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// * Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgress);
