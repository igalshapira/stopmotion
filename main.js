// main.js
window.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('webcam');
    const captureButton = document.getElementById('capture');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

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
        video.style.display = 'none';
        canvas.style.display = 'block';
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            video.style.display = 'none';
            canvas.style.display = 'block';
        }
    });
});