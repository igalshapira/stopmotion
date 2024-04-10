// main.js
window.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('webcam');
    const captureButton = document.getElementById('capture');
    const playButton = document.getElementById('play');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const images = [];

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .(function (stream) {
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
        video.style.display = 'none';
        canvas.style.display = 'block';
        images.push(canvas.toDataURL());
    });

    playButton.addEventListener('click', function() {
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
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            video.style.display = 'none';
            canvas.style.display = 'block';
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
});