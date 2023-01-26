let now_playing = document.querySelector(".now-playing");
// let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
// let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");
let childContainer = document.querySelector(".child-container");
let cards = document.querySelector(".items");
let addback = document.querySelector(".add");
let deleteItem = document.querySelector(".delete");
let displayItem = document.querySelector(".display");
let track_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
  {
    artist: "Canon",
    music: "music/canon.mp3",
  },
  {
    artist: "Dream",
    music: "music/dream.mp3",
  },
  {
    artist: "Hero",
    music: "music/hero.mp3",
  },
  {
    artist: "Essam Sasa",
    music: "music/essamSasa.mp3",
  },
  {
    artist: "Wid Cards",
    music: "music/fallingdown.mp3",
  },
  {
    artist: "Essam Sasa",
    music: "music/sasa.mp3",
  },
  {
    artist: "Clean Bandit",
    music: "music/Rather Be.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  // clearInterval(updateTimer);
  // reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }

  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";

  childContainer.style.background = gradient;
  document.body.style.background = gradient;
}
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  console.log(music_list.length);
  loadTrack(Math.floor(Math.random() * music_list.length));
  playTrack();
}
function repeatTrack() {
  let current_index = track_index;

  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);

  curr_track.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    //silder
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    // left
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    //right
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    //display
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
let cardBlock = `<button class="add" onclick="addAudio()">Add</button>`;

function displayAudios() {
  for (let i = 0; i < music_list.length; i++) {
    cardBlock += `
  <div class="itemOne">
  ${music_list[i].artist}
  <i class="fa fa-close fa-2x " title="Delete" onclick="deleteAudio(${i})"></i>
  </div>
  `;
  }
  console.log(cardBlock);
  cards.innerHTML = cardBlock;
}

displayAudios();
// console.log(cardBlock);
cards.innerHTML = cardBlock;

function deleteAudio(index) {
  music_list.splice(index, 1);
  // displayAudios();
  return music_list;
  // console.log(music_list.length);
}
console.log(music_list.length);
function addAudio() {
  // console.log(cardBlock);
  music_list.push({
    artist: "Canon",
    music: "music/essamSasa.mp3",
  });
  return music_list;
  // displayAudios();
  // console.log(music_list.length);
}

cards.style.display = "none";
let a;
displayItem.addEventListener("click", () => {
  if (a == 1) {
    cards.style.display = "block";
    return (a = 0);
  } else {
    cards.style.display = "none";
    return (a = 1);
  }
});
