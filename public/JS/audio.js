///// barra de progresso /////


var canvasWidth = 300
var audio = document.getElementById("audio")
var canvas = document.getElementById("progress").getContext('2d')


// barra de progresso inicial

audio.addEventListener('loadedmetadata', function() {
    canvas.fillStyle = "#b3e6ed";
    var duration = audio.duration
    var currentTime = audio.currentTime

    document.getElementById("duration").innerHTML = convertElapsedTime(duration)
    document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)
    canvas.fillRect(0, 0, canvasWidth, 500);
});


// atualização da barra de progresso

audio.ontimeupdate = function() {
    canvas.clearRect(0, 0, canvasWidth, 500)
    canvas.fillStyle = "#b3e6ed";
    canvas.fillRect(0, 0, canvasWidth, 500)
  
    var currentTime = audio.currentTime
    var duration = audio.duration

    if (currentTime == duration) {
        document.getElementById('play-pause').src = './public/icons/play_circle_outline-24px.svg';
    }
  
    document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)
  
    var percentage = currentTime / duration
    var progress = (canvasWidth * percentage)
    canvas.fillStyle = "#079fb3"
    canvas.fillRect(0, 0, progress, 500)
}


// conversão de segundos para relógio digital

function convertElapsedTime(inputSeconds) {
    var seconds = Math.floor(inputSeconds % 60)
    
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    
    var minutes = Math.floor(inputSeconds / 60)
    return minutes + ":" + seconds
}



///// botões /////


// play - pause

document.getElementById('play-pause').onclick = function() {
    if (audio.paused) {
        audio.play();
        document.getElementById('play-pause').src = './public/icons/pause_circle_outline-24px.svg';
    } else {
            audio.pause();
            document.getElementById('play-pause').src = './public/icons/play_circle_outline-24px.svg';
    }
}


// recomeçar

document.getElementById('recomecar').onclick = function() {
    audio.currentTime = 0
}


// voltar - avançar

document.getElementById('voltar').onclick = function() {
    audio.currentTime -= 10
}

document.getElementById('avancar').onclick = function() {
    audio.currentTime += 10
}


// volume

document.getElementById('abaixaVol').onclick = function() {
    if (audio.muted == true) {
        audio.muted = false
        document.getElementById('mute').src = './public/icons/volume_up-24px.svg'
    }
    audio.volume -= 0.2
}

document.getElementById('aumentaVol').onclick = function() {
    if (audio.muted == true) {
        audio.muted = false
        document.getElementById('mute').src = './public/icons/volume_up-24px.svg'
    }
    audio.volume += 0.2
}


// mutar - desmutar

document.getElementById('mute').onclick = function() {
    if (audio.muted == false) {
        audio.muted = true
        document.getElementById('mute').src = './public/icons/volume_off-24px.svg'
    } else {
            audio.muted = false
            document.getElementById('mute').src = './public/icons/volume_up-24px.svg'
        }
}