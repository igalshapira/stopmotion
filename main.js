requirejs(["gif-encoder-2/GIFEncoder"], function(GIFEncoder) {

let framePerSecond = 10;
let opacity = 80;

function initStopMotion() {
    const video = document.getElementById('webcam');
    const captureButton = document.getElementById('capture');
    const resetButton = document.getElementById('reset'); // new reset button
    const imageCounter = document.getElementById('counter'); // new image counter
    const playButton = document.getElementById('play');
    const canvas = document.getElementById('canvas');
    const fpsElement = document.getElementById("fps");
    const opacityElement = document.getElementById("opacity");
    const context = canvas.getContext('2d');
    const imageStrip = Dom.byId("imageStrip");
    const images = [];

    opacityElement.value = opacity;
    fpsElement.value = framePerSecond;

    // Function to update the image counter
    function updateCounter(number) {
        imageCounter.textContent = number ?? images.length;
    }

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!");
            });
    }

    function capture() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL();
        images.push(dataUrl);
        canvas.style.opacity = opacity / 100;
        updateCounter(); // update the counter after capturing an image

        Dom.Img(dataUrl).appendTo(imageStrip);
    }
    captureButton.addEventListener('click', capture);

    function play() {

        let i = 0;
        canvas.style.opacity = 100;
        const interval = setInterval(function() {
            if (i < images.length) {
                updateCounter(i);
                let img = new Image();
                img.src = images[i];
                img.onload = function() {
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                i++;
            } else {
                clearInterval(interval);
                canvas.style.opacity = opacity / 100;
            }
        }, 1000 / framePerSecond);
    }

    playButton.addEventListener('click', play);

    window.addEventListener('keydown', function(event) {
        if (event.key === ' ' || event.key === 'AudioVolumeUp') {
            capture();
        } else if (event.key === 'Enter') {
            play();
        }
    });

    // Event listener for the reset button
    resetButton.addEventListener('click', function() {
        images.length = 0; // clear the images array
        updateCounter(); // update the counter after resetting
        imageStrip.empty();
    });

    fpsElement.addEventListener("change", function(event) {
        const fps = parseInt(event.target.value);
        framePerSecond = isNaN(fps) ? 10 : fps;
    });

    opacityElement.addEventListener("change", function(event) {
        const newOpacity = parseInt(event.target.value);
        if (!isNaN(newOpacity)) {
            opacity = newOpacity;
            canvas.style.opacity = opacity / 100;
        }
    });
}

if (document.readyState !== 'loading') {
    initStopMotion();
} else {
    window.addEventListener('DOMContentLoaded', initStopMotion);
}

});