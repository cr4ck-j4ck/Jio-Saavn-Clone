const row = document.querySelectorAll(".row");
const leftButtons = document.querySelectorAll(".fa-less-than");
const rightButtons = document.querySelectorAll(".fa-greater-than");
const containers = document.querySelectorAll(".scrollable");
const playButtons = document.querySelectorAll(".play-button");
const currentSongImage = document.querySelector("#currentImage");
const songDetails = document.querySelector(".song-details");
const audio = document.querySelector("audio");
const playPauseButton = document.querySelector(".play-pause-button");
const rangeInput = document.querySelector('input[type="range"]');
const printDuration = document.querySelector(".duration p");
let audioTimeInMinAndSecond = audio.duration;

async function getSongData() {
    const data = await fetch('./songsData.json')
    return await data.json();
}

async function playSong(src) {
    rangeInput.value = 0;
    const songData = await getSongData();
    const songObj = songData.find(el => {
        return el.songImage === src;
    });

    const data = await fetch(songObj.songURL);
    const song = await data.blob();
    const url = URL.createObjectURL(song);
    audio.src = url;
    await audio.play();
    currentSongImage.src = songObj.songImage;
    songDetails.querySelector("h3").innerText = songObj.songName;
    songDetails.querySelector("p").innerText = songObj.songDetail;
    playPauseButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    rangeInput.max = audio.duration;
    audioTimeInMinAndSecond = `${parseInt(audio.duration / 60)}:${parseInt(audio.duration % 60).toString().length == 1 ? "0"+parseInt(audio.duration % 60) : parseInt(audio.duration % 60)}`;
    console.log("audioTimeInMinAndSeconds",audioTimeInMinAndSecond);
    printDuration.innerText = `0:00 / ${audioTimeInMinAndSecond}`;
}

for (let button of playButtons) {
    button.addEventListener("click", async function () {
        await playSong(this.parentElement.firstElementChild.src);
    });
}

for (let button of leftButtons) {
    button.addEventListener("click", function () {
        if (this.nextElementSibling.scrollLeft > 0) {
            this.nextElementSibling.scrollTo({ left: 0, behavior: 'smooth' })
        }
    });
}

for (let button of rightButtons) {
    button.addEventListener("click", function () {
        const row = this.previousElementSibling; {
            row.scrollTo({ left: row.scrollWidth, behavior: 'smooth' })
        }
    });
}

containers.forEach(container => {
    const row = container.querySelector(".row");
    const leftButton = container.querySelector(".fa-less-than");
    const rightButton = container.querySelector(".fa-greater-than");
    
    container.addEventListener("mouseenter", function () {
        if (row.scrollLeft > 0) {
            leftButton.style.opacity = 1;
        } else {
            leftButton.style.opacity = 0.1;
        }
        if (Math.floor(row.scrollLeft) >= (row.scrollWidth - row.clientWidth) - 1) {
            rightButton.style.opacity = 0.1;
        } else {
            rightButton.style.opacity = 1;
        }
    });
    
    container.addEventListener("mouseleave", function () {
        leftButton.style.opacity = 0;
        rightButton.style.opacity = 0;
    });
})

function playAndPause() {
    if (audio.paused === false) {
        audio.pause();
        playPauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        if (audio.src.slice(0, 4) === "blob") {
            playPauseButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            audio.play();
        }
    }
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
        if (event.target.type !== "text") {
            playAndPause();
        }
        if (event.target.tagName === "BODY") {
            event.preventDefault();
        }
    }
});

playPauseButton.addEventListener("click", function () {
    playAndPause();
});

audio.addEventListener("timeupdate", function () {
    rangeInput.value = audio.currentTime;
    printDuration.innerText = `${parseInt(audio.currentTime / 60)}:${parseInt(audio.currentTime % 60).toString().length == 1 ? "0"+parseInt(audio.currentTime % 60) : parseInt(audio.currentTime % 60)} / ${audioTimeInMinAndSecond}`;
    const songPercent = parseInt((audio.currentTime / audio.duration) * 100);

    rangeInput.style.background = `linear-gradient(to right, #2BC5B4 0%, #2BC5B4 ${songPercent}%, #ddd ${songPercent}%,#ddd 100%)`;

    if (audio.currentTime === audio.duration) {
        rangeInput.value = 0;
        playPauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});


rangeInput.addEventListener("input", function (e) {
    audio.currentTime = rangeInput.value;
});

