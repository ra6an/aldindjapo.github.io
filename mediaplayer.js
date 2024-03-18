const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("artist-name"),
  progress = document.getElementById("progress"),
  songProgress = document.getElementById("song-progress"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  btnPrev = document.getElementById("prev"),
  btnPlay = document.getElementById("play"),
  btnNext = document.getElementById("next"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "/songs/Djapo - Force (Original Mix).mp3",
    displayName: "Force",
    cover: "/images/1080X1080DJAPO.jpg",
  },
  {
    path: "songs/Djapo - Exception (Original Mix).mp3",
    displayName: "Exception",
    cover: "/images/ambi_records_djapo.jpg",
  },
  {
    path: "songs/Liguligu (Djapo Remix) premaster.wav",
    displayName: "Let It Go",
    cover: "images/letitgo_djapo.webp",
  },
  {
    path: "songs/Djapo - Toxic (Original Mix).mp3",
    displayName: "Toxic",
    cover: "images/1080X1080DJAPO.jpg",
  },
  {
    path: "songs/DEVIDE_REMIX_DJAPO.wav",
    displayName: "Devided",
    cover: "images/devided.webp",
  },
  {
    path: "songs/Djapo - Viper (Original Mix).mp3",
    displayName: "Viper",
    cover: "images/prospect records.jpg",
  },
  {
    path: "songs/Dosia - After Dark (Djapo Remix) premaster final.wav",
    displayName: "After Dark",
    cover: "/images/afterdark_djapo.webp",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  btnPlay.classList.replace("fa-play", "fa-pause");
  // btnPlay.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  btnPlay.classList.replace("fa-pause", "fa-play");
  // btnPlay.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgress() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgress(e) {
  const width = songProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

btnPlay.addEventListener("click", togglePlay);
btnPrev.addEventListener("click", () => changeMusic(-1));
btnNext.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgress);
songProgress.addEventListener("click", setProgress);

loadMusic(songs[musicIndex]);

console.log(musicIndex);
console.log(songs[musicIndex]);
