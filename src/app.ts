/**
 * PONG HTML5 TS
 * Main app.TS
 * onload creates a new game into canvas identified by id
 */

window.onload = () => {
    var canvas = document.getElementById('canvas');
    var pong : Game = new Game(canvas);
    pong.start();
}