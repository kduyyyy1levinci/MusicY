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

const menu = $(".playlist-icon");
const dashboard = $(".dashboard");
const theme = $("#theme");
let index = 0;
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isMenu: false,
  songs: [
    {
      id: 1,
      name: "Anh Biết",
      singer: " ❦ Xám x D.Blue",
      path: "./asset/music/song11.mp3",
      img: "./asset/img/Xam-1-scaled.jpg",
    },
    {
      id: 2,
      name: "Chìm Sâu",
      singer: " ❦ Tu Salmon",
      path: "./asset/music/song2.mp3",
      img: "./asset/img/TuSalmon.jpg",
    },
    {
      id: 3,
      name: "Tình yêu xanh lá",
      singer: " ❦ Thịnh Suy",
      path: "./asset/music/song3.mp3",
      img: "./asset/img/ThinhSuy.jpg",
    },
    {
      id: 4,
      name: "Mascara",
      singer: " ❦ Chillies",
      path: "./asset/music/song4.mp3",
      img: "./asset/img/Chillies.jpg",
    },
    {
      id: 5,
      name: "Tiny love",
      singer: " ❦ Thịnh Suy",
      path: "./asset/music/song1.mp3",
      img: "./asset/img/ThinhSuy.jpg",
    },
    {
      id: 6,
      name: "Mơ",
      singer: " ❦ Vũ Cát Tường",
      path: "./asset/music/song6.mp3",
      img: "./asset/img/VuCatTuong.jpg",
    },
    {
      id: 7,
      name: "Xe Đạp",
      singer: " ❦ Charles",
      path: "./asset/music/song7.mp3",
      img: "./asset/img/Charles.jpg",
    },
    {
      id: 8,
      name: "20 Năm Ở Thế Giới",
      singer: " ❦ Thịnh Suy",
      path: "./asset/music/song8.mp3",
      img: "./asset/img/ThinhSuy.jpg",
    },
    {
      id: 9,
      name: "Có Hẹn Với Thanh Xuân",
      singer: " ❦ Monstar",
      path: "./asset/music/song9.mp3",
      img: "./asset/img/Monstar.jpg",
    },
    {
      id: 10,
      name: "Crush 2",
      singer: " ❦ W/n...",
      path: "./asset/music/song10.mp3",
      img: "./asset/img/Wn.jpg",
    },
    {
      id: 11,
      name: "Your Smile",
      singer: " ❦ Obito ft hnhngan",
      path: "./asset/music/song5.mp3",
      img: "./asset/img/hnhngan.jpg",
    },
  ],
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
      randomBtn.classList.toggle("active", _this.isRandom); // toggle (  , boolean) => False thì xoá, True thì add
    };

    // Repeat songs

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
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
    (playlist.onclick = function (e) {
      // Xử lý khi click vào
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode) {
        _this.currentIndex = songNode.dataset.index;
        _this.loadCurrentSong();
        _this.hightlightSong();
        audio.play();
        if (_this.isMenu) {
          _this.isMenu = !_this.isMenu;
          dashboard.classList.toggle("display-none");
          theme.classList.toggle("display-none");
          playlist.classList.toggle("display-block");
          menu.classList.toggle("display-none", _this.isMenu);
          menu.animate({ opacity: 1 });
          playlist.style.width = "30vw";
        }
      }
    }),
      (menu.onclick = function () {
        _this.isMenu = !_this.isMenu;
        dashboard.classList.toggle("display-none");
        theme.classList.toggle("display-none");
        playlist.classList.toggle("display-block");
        menu.classList.toggle("display-none", _this.isMenu);
        playlist.style.width = "100vw";
      });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url("${this.currentSong.img}")`;
    audio.src = this.currentSong.path;
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
    // Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    // Lắng nghe xử sự kiện
    this.handleEvent();

    // Tải bài hát đầu tiên khi vào User interface
    this.loadCurrentSong();

    // Render playlists
    this.render();
  },
};
app.start();

//
