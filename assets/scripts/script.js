
// const getMusic = async () => {
//     const url = 'https://shazam8.p.rapidapi.com/artist/top_track?artist_id=40543550&limit=5';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '4c42defb66mshb3cf281e130d24dp1616eejsn9436488d52ea',
//             'X-RapidAPI-Host': 'shazam8.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result , 'result is ');
//         let music = result.tracks[0].url;
//         console.log(music , 'music url is')
//     } catch (error) {
//         console.error(error);
//     }
// }



// document.getElementById("music").addEventListener('click' , () => {
//     getMusic()
// })
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Music_Player_D2D";

const player = $(".c-player");
const cd = $(".c-player__cd");
const cdThumb = $(".c-player__cd-thumb");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const progress = $(".c-player__progress-bar");
const audio = $("#js-player-audio");
const playList = $(".c-player__playlist");

const app = {
    currentIndex : 0 , 
    indexArray : [],
    indexSum: 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,

    songs : [
        {
        index: 1,
       name: "Walk Away From The Dark",
       singer: "Amon The Sign",
       duration: "4:01",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/walk-away-from-the-dark.mp3"
     },
     {
       index: 2,
       name: "Under The Shadows",
       singer: "Amon The Sign",
       duration: "5:10",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/under-the-shadows.mp3"
     },
     {
       index: 3,
       name: "I Believe In You",
       singer: "Amon The Sign",
       duration: "4:22",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/i-believe-in-you.mp3"
     },
     {
       index: 4,
       name: "Waiting Into Darkness",
       singer: "Amon The Sign",
       duration: "443",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/waiting-into-darkness.mp3"
     },
     {
       index: 5,
       name: "In The Room",
       singer: "Amon The Sign",
       duration: "5:04",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/in-the-room.mp3"
     },
     {
       index: 6,
       name: "Spilled Blood",
       singer: "Amon The Sign",
       duration: "5:33",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path:
         "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/spilled-blood.mp3"
     },
     {
       index: 7,
       name: "The Hunger",
       singer: "Amon The Sign",
       duration: "5:16",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/the-hunger.mp3"
     },
     {
       index: 8,
       name: "Heartbeat",
       singer: "Amon The Sign",
       duration: "5:02",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/heartbeat.mp3"
     },
     {
       index: 9,
       name: "They Won't Destroy Me",
       singer: "Amon The Sign",
       duration: "5:19",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/they-wont-destroy-me.mp3"
     },
     {
       index: 10,
       name: "Without Words, Without Tears",
       singer: "Amon The Sign",
       duration: "5:08",
       image: "https://f4.bcbits.com/img/a0568269163_16.jpg",
       path: "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/without-words-without-tears.mp3"
     }
    ],

    defineProperties : function() {
        Object.defineProperty(this, "currentSong" , {
            get : function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    renderSongs : function() {
        let htmls = this.songs.map((song , index) => {

            return `
            <div class="c-player__song" data-index=${index}>
                     <div class="c-player__song-number">${song.index}</div>
                     <div class="c-player__song-infos">
                         <h3 class="c-player__song-title">${song.name}</h3>
                         <p class="c-player__song-author">${song.singer}</p>
                     </div>
                     <div class="c-player__song-duration">${song.duration}</div>
                 </div>
            `;
        });

        playList.innerHTML = htmls.join("");
    },

    handleEvents : function() {
        const _this = this;
        const cdWidth = '250px';

        document.onscroll = function(){
            let scrollHeight = window.scrollY ||
            document.documentElement.scrollTop;
            let cdNewWidth = cdWidth - scrollHeight;
            cd.style.width = cdNewWidth > 0 ? `${cdNewWidth}px` : 0;
            cd.style.opacity = cdNewWidth / cdWidth;
        };

        playBtn.onclick = function () {
            if (_this.isPlaying) {
              audio.pause();
            } else {
              _this.loadCurrentSong();
              audio.play();
            }
          };

          audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdRotate.play();
          };
          audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdRotate.pause();
          };

          audio.ontimeupdate = function () {
            if (audio.currentTime) {
              progress.value = (audio.currentTime / audio.duration) * 100;
            }
          };

          progress.onchange = function () {
            audio.currentTime = (progress.value * audio.duration) /100;
          };

          const cdRotate = cdThumb.animate([{
            transform : "rotate(360deg)"}] , {
              duration : 10000,
              iterations : Infinity
            });
            cdRotate.pause();

            nextBtn.onclick = function() {
              let songList = Array.prototype.slice.call($$(".c-player__song"));

              let oldIndex = _this.currentIndex;
              let oldItemSong = songList.find(function (value) {
                return value.dataset.index == oldIndex;

              });

              oldItemSong.classList.remove("active");
              if(_this.isRandom){
                _this.playRandomSong();
              }else{
                _this.currentIndex++;

                if(_this.currentIndex >= _this.songs.length){
                  _this.currentIndex = 0 ;
                }
              }

                _this.loadCurrentSong();
                audio.play();

            };

            prevBtn.onclick = function () {
              let songList = Array.prototype.slice.call($$(
                ".c-player__song"
              ));
              let oldIndex = _this.currentIndex;
              let oldItemSong = songList.find(function (value){
                return value.dataset.index = oldIndex;
              });
              oldItemSong.classList.remove("active");
              if(_this.isRandom){
                _this.playRandomSong();
              }else{
                _this.currentIndex--;
                if(_this.currentIndex < 0 ) {
           
                  _this.currentIndex = _this.songs.length -1 ;

                }
              }

              _this.loadCurrentSong();
              audio.play();
            };

            randomBtn.onclick = function () {
              _this.isRandom = !_this.isRandom;
              randomBtn.classList.toggle("active", _this.isRandom);
            };

            audio.onended = function () {
              if (_this.isRepeat) {
                audio.play();
              } else {
                nextBtn.click();
              }
            };

            repeatBtn.onclick = function () {
              _this.isRepeat = !_this.isRepeat;
              repeatBtn.classList.toggle("active", _this.isRepeat);
            };

            playList.onclick = function (e) {
              let songNode = e.target.closest(".c-player__song:not(.active)");
              let optionNode = e.target.closest(".c-player__song-duration");
              let oldIndex = _this.currentIndex;
              let songList = Array.prototype.slice.call($$(".c-player__song"));
              let oldItemSong = songList.find(function (value) {
                return value.dataset.index == oldIndex;
              });
              if (songNode || optionNode) {
                if (songNode && !optionNode) {
                  oldItemSong.classList.remove("active");
                  _this.currentIndex = songNode.dataset.index;
                  _this.loadCurrentSong();
                  audio.play();
                }
                if (optionNode) {
                  console.log(optionNode);
                }
              }
            };
    },

    playRandomSong: function () {
      let newIndex = 0;
      if (this.indexSum >= this.songs.length) {
        this.indexSum = 0;
        this.indexArray = [];
      }
      do {
        newIndex = Math.floor(Math.random() * this.songs.length);
      } while (
        newIndex === this.currentIndex ||
        this.indexArray.indexOf(newIndex) !== -1
      );
      this.indexArray.push(newIndex);
      this.indexSum++;
      this.currentIndex = newIndex;
    },


    loadCurrentSong: function () {
      let playingNow = document.querySelector("#js-playing-now h2");
      let durationSong = document.querySelector('#js-duration-song');
      
      playingNow.innerText = this.currentSong.index + '. ' + this.currentSong.name;
      durationSong.innerText = this.currentSong.duration;
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src = this.currentSong.path;
 
      let songList = Array.prototype.slice.call($$(".c-player__song"));
      let itemSong = songList.find((value) => {
        return value.dataset.index == this.currentIndex;
      });
      if (itemSong) {
        itemSong.classList.add("active");
      }
 
      setTimeout(() => {
        let songActive = $(".c-player__song.active");
        if (songActive) {
          songActive.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        }
      }, 200);
    },

    start: function () {
      this.defineProperties();
      this.handleEvents();
      this.loadCurrentSong();
      this.renderSongs();
    }
};

app.start();










