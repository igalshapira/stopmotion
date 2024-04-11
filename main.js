// main.js
let framePerSecond = 10;
let opacity = 80;

window.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('webcam');
    const captureButton = document.getElementById('capture');
    const resetButton = document.getElementById('reset'); // new reset button
    const imageCounter = document.getElementById('counter'); // new image counter
    const playButton = document.getElementById('play');
    const canvas = document.getElementById('canvas');
    const fpsElement = document.getElementById("fps");
    const opacityElement = document.getElementById("opacity");
    const context = canvas.getContext('2d');
    const images = [];

    canvas.style.opacity = opacity / 100;
    opacityElement.value = opacity;
    fpsElement.value = framePerSecond;

    // Function to update the image counter
    function updateCounter() {
        imageCounter.textContent = `Images: ${images.length}`;
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

    captureButton.addEventListener('click', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        images.push(canvas.toDataURL());
        updateCounter(); // update the counter after capturing an image
    });

    playButton.addEventListener('click', function() {
        let i = 0;
        const interval = setInterval(function() {
            if (i < images.length) {
                let img = new Image();
                img.src = images[i];
                context.clearRect(0, 0, canvas.width, canvas.height);
                img.onload = function() {
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                i++;
            } else {
                clearInterval(interval);
            }
        }, 1000 / framePerSecond);
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            images.push(canvas.toDataURL());
        } else if (event.key === 'Enter') {
            let i = 0;
            setInterval(function() {
                if (i < images.length) {
                    let img = new Image();
                    img.src = images[i];
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    img.onload = function() {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                    };
                    i++;
                }
            }, 1000);
        }
    });

    // Event listener for the reset button
    resetButton.addEventListener('click', function() {
        images.length = 0; // clear the images array
        updateCounter(); // update the counter after resetting
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
});