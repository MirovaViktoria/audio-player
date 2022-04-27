
const audio = document.querySelector('audio');
const pause = document.querySelector('.play');
const duration = document.querySelector('.durationTime');
const currentTime = document.querySelector('.currentTime');
const songs =
    [
        {
            url: "./audio/beyonce.mp3",
            artist: "Beyonce",
            name: "Don't Hurt Yourself",
            image: "./img/lemonade.png"
        },
        {
            url: "./audio/assets_audio_dontstartnow.mp3",
            artist: "Beyonce2",
            name: "assets_audio_dontstartnow",
            image: "./img/dontstartnow.png"
        }
    ]
let currentTrackNumber = 0;
let isPlaing = false;
function prepareDuration() {
    var date = new Date(0);
    date.setSeconds(audio.duration)
    duration.innerHTML = `${date.getMinutes()}:${String(date.getSeconds()).padStart(2, '0')}`
}

function playAudio() {
    if (audio.paused) {
        audio.play();
        prepareDuration();
        pause.src = "./img/pause.png"
        isPlaing = true;
    }
    else {
        audio.pause();
        pause.src = "./img/play.png"
        isPlaing = false;
    }
}
pause.addEventListener('click', playAudio);
audio.addEventListener('canplay', canplay);
function canplay() {
    prepareDuration();
    if (isPlaing)
        audio.play();
}
const progress = document.querySelector("#progress");
function changeProgressBar(value) {
    audio.currentTime = audio.duration * value / 100;
}
audio.ontimeupdate = (event) => {
    let duration = audio.duration;
    if (!duration) {
        return;
    }
    let st = audio.currentTime / duration;
    progress.value = st * 100;
    var date = new Date(0);
    date.setSeconds(audio.currentTime)
    currentTime.innerHTML = `${date.getMinutes()}:${String(date.getSeconds()).padStart(2, '0')}`
};
function nextSong(change) {
    if (currentTrackNumber + change < 0)
        currentTrackNumber = songs.length - 1;
    else
        if (currentTrackNumber + change > songs.length - 1)
            currentTrackNumber = 0;
        else
            currentTrackNumber += change;
    const currentTrack = songs[currentTrackNumber];
    document.querySelector('.song-artist').innerHTML = currentTrack.artist;
    audio.src = currentTrack.url;
    audio.currentTime = 0;
    progress.value = 0;

}