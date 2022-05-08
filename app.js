const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2 ");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const playBtn = $(".btn-toggle-play");
const player = $(".player");

const progress = $("#progress");

const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const playlist = $(".playlist");

const PLAYER_STOGARE_KEY = "ABC_PLAYER";

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STOGARE_KEY)) || {},
  songs: [
    {
      name: "Si mê em",
      singer: "Nguyên - Koo",
      path: "./asset/music/song1.mp3",
      img: "./asset/img/img1.jpg",
    },
    {
      name: "Phi Hành Gia",
      singer: "95G",
      path: "./asset/music/song2.mp3",
      img: "./asset/img/img2.jpg",
    },
    {
      name: "Tích Tắc",
      singer: "Bray",
      path: "./asset/music/song3.mp3",
      img: "./asset/img/img3.jpg",
    },
    {
      name: "Basstoven",
      singer: "Kyle Exum ",
      path: "./asset/music/song4.mp3",
      img: "./asset/img/img4.jpg",
    },
    {
      name: "Bạc Hà",
      singer: "Hennessy - Nhật Hoàng",
      path: "./asset/music/song5.mp3",
      img: "./asset/img/img5.jpg",
    },
    {
      name: "Chìm Sâu",
      singer: "RPT MCK",
      path: "./asset/music/song6.mp3",
      img: "./asset/img/img6.jpg",
    },
    {
      name: "Cướp Nhà Băng ",
      singer: "BTCM",
      path: "./asset/music/song7.mp3",
      img: "./asset/img/img7.jpg",
    },
    {
      name: "Quả đào cà tím",
      singer: "Hale",
      path: "./asset/music/song8.mp3",
      img: "./asset/img/img8.jpg",
    },
    {
      name: "23:59",
      singer: "Negav",
      path: "./asset/music/song9.mp3",
      img: "./asset/img/img9.jpg",
    },
    {
      name: "Better Days",
      singer: "Sol7 & DCOD",
      path: "./asset/music/song10.mp3",
      img: "./asset/img/img10.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config = value;
    localStorage.setItem(PLAYER_STOGARE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div data-index = "${index}" class="song ${
        index === this.currentIndex ? "active" : ""
      }">
            <div class="thumb" style="background-image: url('${song.img}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
          `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;

    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay

    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();

    // Xử lý play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    //Khi bấm nút random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom); // toggle (  , boolean) => False thì xoá, True thì add
    };

    // Repeat songs

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //Khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.hightlightSong();
      _this.scrolltoActiveSong();
    };

    //Khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.hightlightSong();
      _this.scrolltoActiveSong();
    };

    // Khi audio ended

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    //  Lắng nghe hành vi vào playlists

    playlist.onclick = function (e) {
      // Xử lý khi click vào
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = songNode.dataset.index;
          _this.loadCurrentSong();
          _this.hightlightSong();
          audio.play();
        }
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url("${this.currentSong.img}")`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  hightlightSong: function () {
    let songBlock = $$(".song");
    for (var i = 0; i < songBlock.length; i++) {
      songBlock[i].classList.remove("active");
    }
    songBlock[this.currentIndex].classList.add("active");
  },
  scrolltoActiveSong: function () {
    setTimeout(function () {
      $(".active").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 250);
  },
  start: function () {
    //Gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    // Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    // Lắng nghe xử sự kiện
    this.handleEvent();

    // Tải bài hát đầu tiên khi vào User interface
    this.loadCurrentSong();

    // Render playlists
    this.render();

    // Hiển trạng thái ban đầu của random và repeat
    repeatBtn.classList.toggle("active", this.isRepeat);
    randomBtn.classList.toggle("active", this.isRandom);
  },
};
app.start();
