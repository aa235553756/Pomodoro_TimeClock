const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    const timeSelect = document.querySelectorAll('.time-select button')
    const sounds = document.querySelectorAll('.sound-picker button')
    const timeDisplay =document.querySelector('.time-display')
    const outlineLength = outline.getTotalLength();

    let fakeDuration = 600;

    // 小於 outlineLength 一半 起始位置改變
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    // 轉換按鈕
    sounds.forEach(sound=>{
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    }) 

    // 播放
    play.addEventListener('click',()=>{
        checkPlaying(song);
    })

    // 時間選項
    timeSelect.forEach((option)=>{
        option.addEventListener('click',function(){
            song.currentTime = 0;
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        })
    })

    const checkPlaying = song =>{
        if (song.paused) {
            song.play();
            play.src = './svg/pause.svg';
            video.play();
        } else {
            song.pause();
            play.src = './svg/play.svg';
            video.pause();
        }
    }

    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration-currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        // 1400 - ( palying 10s / 600 )*1400
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    }
}

app();