const row = document.querySelectorAll(".row");
const leftButtons = document.querySelectorAll(".fa-less-than");
const rightButtons = document.querySelectorAll(".fa-greater-than");
const containers = document.querySelectorAll(".scrollable");
const playButtons = document.querySelectorAll(".play-button");
const currentSongImage = document.querySelector("#currentImage");
const songDetails = document.querySelector(".song-details");

async function getSongData() {
    const data = await fetch('./songsData.json')
    return await data.json();
}

document.querySelector(".content").addEventListener("keydown",function(){
    console.log("clicked");
});

async function playSong(src) {
    const songData = await getSongData();
    const songObj = songData.find(el =>{
        return el.songImage === src;
    });

    const data = await fetch(songObj.songURL);
    const song = await data.blob();
    const url = URL.createObjectURL(song);
    const audio = document.querySelector("audio");
    audio.src = url;
    audio.play();
    currentSongImage.src = songObj.songImage;
    songDetails.querySelector("h3").innerText = songObj.songName    
    songDetails.querySelector("p").innerText = songObj.songDetail
}

for (let button of playButtons) {
    button.addEventListener("click", async function () {
        console.log(this.parentElement.firstElementChild.src);
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