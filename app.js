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

const LOFI_SONGS = [
  {
    id: 1,
    name: "Tại Vì Sao",
    singer: " ❦ MCK",
    path: "./asset/music/song13.mp3",
    img: "./asset/img/MCk.jpg",
  },
  {
    id: 2,
    name: "Cuộc Gọi Đêm",
    singer: " ❦ Uyên Tố...",
    path: "./asset/music/song12.mp3",
    img: "./asset/img/UyenTo.jpg",
  },
  {
    id: 3,
    name: "Crush 2",
    singer: " ❦ W/n...",
    path: "./asset/music/song10.mp3",
    img: "./asset/img/Wn.jpg",
  },
  {
    id: 4,
    name: "Your Smile",
    singer: " ❦ Obito ft hnhngan",
    path: "./asset/music/song5.mp3",
    img: "./asset/img/hnhngan.jpg",
  },
  {
    id: 5,
    name: "Anh Biết",
    singer: " ❦ Xám x D.Blue",
    path: "./asset/music/song11.mp3",
    img: "./asset/img/Xam-1-scaled.jpg",
  },
  {
    id: 6,
    name: "Chìm Sâu",
    singer: " ❦ Tu Salmon",
    path: "./asset/music/song2.mp3",
    img: "./asset/img/TuSalmon.jpg",
  },
  {
    id: 7,
    name: "Mascara",
    singer: " ❦ Chillies",
    path: "./asset/music/song4.mp3",
    img: "./asset/img/Chillies.jpg",
  },
  {
    id: 8,
    name: "Xe Đạp",
    singer: " ❦ Charles",
    path: "./asset/music/song7.mp3",
    img: "./asset/img/Charles.jpg",
  },
  {
    id: 9,
    name: "20 Năm Ở Thế Giới",
    singer: " ❦ Thịnh Suy",
    path: "./asset/music/song8.mp3",
    img: "./asset/img/ThinhSuy.jpg",
  },
  {
    id: 10,
    name: "Có Hẹn Với Thanh Xuân",
    singer: " ❦ Monstar",
    path: "./asset/music/song9.mp3",
    img: "./asset/img/Monstar.jpg",
  },
  {
    id: 11,
    name: "Tiny love",
    singer: " ❦ Thịnh Suy",
    path: "./asset/music/song1.mp3",
    img: "./asset/img/ThinhSuy.jpg",
  },
  {
    id: 12,
    name: "Mơ",
    singer: " ❦ Vũ Cát Tường",
    path: "./asset/music/song6.mp3",
    img: "./asset/img/VuCatTuong.jpg",
  },

  {
    id: 13,
    name: "Tình yêu xanh lá",
    singer: " ❦ Thịnh Suy",
    path: "./asset/music/song3.mp3",
    img: "./asset/img/ThinhSuy.jpg",
  },
]

const SPEED_UP_SONGS = [
  {
    id: 14,
    name: "Anh Đã Lạc Vào",
    singer: " ❦ Green",
    path: "./asset/music/anh-da-lac-vao-green.mp3",
    img: "./asset/img/cat1.jpg",
  },
  {
    id: 15,
    name: "Chỉ Cần Có Em",
    singer: " ❦ Twenty, Darki",
    path: "./asset/music/chi-can-co-em-twenty-darki.mp3",
    img: "./asset/img/cat2.jpg",
  },
  {
    id: 16,
    name: "Chỉ Cần Có Em",
    singer: " ❦ DMean",
    path: "./asset/music/iu-em-roi-tinh-sao-dmean.mp3",
    img: "./asset/img/cat3.jpg",
  },
  {
    id: 17,
    name: "Matchanah",
    singer: " ❦ Híu x Bâu",
    path: "./asset/music/matchanah-hiu-bau.mp3",
    img: "./asset/img/cat4.jpg",
  },
  {
    id: 18,
    name: "Miên Man",
    singer: " ❦ Minh Huy",
    path: "./asset/music/mien-man-minhhuy.mp3",
    img: "./asset/img/cat5.jpg",
  },
  {
    id: 19,
    name: "Mộng Mơ",
    singer: " ❦ RedT",
    path: "./asset/music/mong-mo-redt.mp3",
    img: "./asset/img/cat6.jpg",
  },
  {
    id: 20,
    name: "Nụ Cười Em Là Nắng",
    singer: " ❦ Green",
    path: "./asset/music/nu-cuoi-em-la-nang-green.mp3",
    img: "./asset/img/cat7.jpg",
  },
  {
    id: 21,
    name: "Phỏng Lài Em",
    singer: "❦ Daduc, Dipper",
    path: "./asset/music/phong-lai-em-daduc-dipper.mp3",
    img: "./asset/img/cat8.jpg",
  },
  {
    id: 22,
    name: "Say Đắm Trong Lần Đầu",
    singer: "❦ Winno",
    path: "./asset/music/say-dam-trong-lan-dau-winno.mp3",
    img: "./asset/img/cat9.jpg",
  },
  {
    id: 23,
    name: "Tình Cờ Yêu Em",
    singer: "❦ Linh Thộn, Kuun Đức Nam",
    path: "./asset/music/tinh-co-yeu-em.mp3",
    img: "./asset/img/cat10.jpg",
  },
  {
    id: 24,
    name: "Tình Đơn Phương",
    singer: "❦ Nguyên, Koo",
    path: "./asset/music/tinh-don-phuong-nguyen-koo.mp3",
    img: "./asset/img/cat11.jpg",
  },
  {
    id: 25,
    name: "Từng Quen",
    singer: "❦ Wren EVans",
    path: "./asset/music/tung-quen-wren-evans.mp3",
    img: "./asset/img/cat12.jpg",
  },
  {
    id: 26,
    name: "Unfollow",
    singer: "❦ Freaky",
    path: "./asset/music/unfollow-freaky.mp3",
    img: "./asset/img/cat13.jpg",
  },
]

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isMenu: false,
  songs: SPEED_UP_SONGS,
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div data-index = "${index}" class="song ${index === this.currentIndex ? "active" : ""
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

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

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

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    (playlist.onclick = function (e) {
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
      if (_this.isMenu) {
        _this.isMenu = !_this.isMenu;
        dashboard.classList.toggle("display-none");
        theme.classList.toggle("display-none");
        playlist.classList.toggle("display-block");
        menu.classList.toggle("display-none", _this.isMenu);
        menu.animate({ opacity: 1 });
        playlist.style.width = "30vw";
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
    this.defineProperties();

    this.handleEvent();

    this.loadCurrentSong();

    this.render();
  },
};
app.start();

