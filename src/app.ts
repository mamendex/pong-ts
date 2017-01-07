

window.onload = () => {
    var canvas = document.getElementById('canvas');
    var pong : Game = new Game(canvas);
    pong.start();
}