'use strict';
import images from './img/*.jpg';
import songsSrc from './music/*.mp3';

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audioPlayer = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const curTime = document.getElementById('current-time');
const durTime = document.getElementById('duration');
const songs = [
  {
    name: 'Yanix - Алкоголь',
    displayName: 'Не говори им',
    artist: 'Yanix',
  },
  {
    name: 'Yanix - Не говори им',
    displayName: 'Не говори им',
    artist: 'Yanix',
  },
  {
    name: 'Yanix - Первый раз',
    displayName: 'Первый раз',
    artist: 'Yanix',
  },
  {
    name: 'Yanix - Покажи как',
    displayName: 'Покажи как',
    artist: 'Yanix',
  },
];

let isPlaying = false;

const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  audioPlayer.play();
};

const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  audioPlayer.pause();
};

const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audioPlayer.src = `${songsSrc[song.name]}`;
  image.src = `${images[song.name]}`;
};

let songIndex = 0;

const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const prevSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    if (durationSeconds)
      durTime.textContent = `${durationMinutes}:${durationSeconds}`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    curTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

const setProgressBar = function (e) {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
};

loadSong(songs[songIndex]);

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioPlayer.addEventListener('ended', nextSong);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
