/**
 * Game Ball
 */
class Ball {

    public pos = {
        x: 0,
        y: 0
    }

    public direction = {
        left: false,
        right: false
    }

    //public veloc : number = 0;
    public angle: number;

    public originalColor : string = "#000000";
    public color : string;

    constructor(public id: number,
        public radius: number,
        public veloc: number) {
            this.color = this.originalColor;
    }

    public moveTo(x: number, y: number): boolean {
        this.pos.x = x;
        this.pos.y = y;
        return true;
    }

    /**
     * Order the ball to keep moving in the current direction and speed
     * not considering limits or collisions
     */
    public keepMoving() {
        // componente vertical
        this.pos.y += this.angle; // movemos a bola para cima ou para baixo, de acordo com o angulo

        // componente horizontal
        if (this.direction.right) { // se a bola estiver indo para a direita...
            this.pos.x += this.veloc; // movemos a bola para a direita
        } else { // se estiver indo para a esquerda...
            this.pos.x -= this.veloc; // movemos a bola para a esquerda
        }
    }

    private setDirectionRight() : void {
        this.direction.right = true;
        this.direction.left = false;
    }

    private setDirectionLeft() : void {
        this.direction.right = false;
        this.direction.left = true;
    }

    private invertDirection() : void {
        if ( this.direction.right ) {
            this.setDirectionLeft();
        } else {
            this.setDirectionRight();
        }
    }
    
    public strikeUp() : void {
        this.angle = Math.floor(Math.random() * 10) - 9; // mandamos a bola na diagonal pra cima
        this.invertDirection();
    }

    public strikeDown() : void {
        this.angle = Math.floor((Math.random() * 10)); // mandamos a bola na diagonal pra baixo
        this.invertDirection();
    }

/*
if ((this.ball.pos.x - this.ball.radius) <= (this.player1.pos.x + this.player1.width)) { // se o jogador enconstar na bola (eixo X)...
if ((this.ball.pos.y + this.ball.radius > this.player1.pos.y) && (this.ball.pos.y - this.ball.radius < this.player1.pos.y + this.player1.height)) { // se o jogador enconstar na bola (eixo Y)...
*/

    public colisionWith(player: Player) : boolean {
        // se a bola esta se movendo na direcao do jogador...
        if ((this.direction.left && player.pos.x < this.pos.x) ||
            (this.direction.right && player.pos.x > this.pos.x)) {
                //player.color = "#DDDDDD";
            // e ha colisao...
            if ((this.pos.x - this.radius) <= (player.pos.x + player.width) &&
                ((this.pos.x + this.radius) >= player.pos.x)) {
                if ((this.pos.y + this.radius > player.pos.y) &&
                    (this.pos.y - this.radius < player.pos.y + player.height)) {
                    //console.log("bola colidiu com player " + player.id);
                    player.color = "#EECC33";
                    return true;
                }
            } else {
                return false;
            }
        }
        player.color = player.originalColor;
        return false;
    }


}