/**
 * Game, the
 */

class Game extends GameAbstract {

    protected context: any;
    protected beingPressed = {
        'upArrow': false,
        'downArrow': false
    }
    protected ball: Ball;
    protected player1: Player;
    protected player2: Player;
    protected score = {
        player1: 0,
        player2: 0
    }
    protected level = [
        {
            id: 1,
            humanPlayerVeloc: 15,
            cpuPlayerVeloc: 20,
            ballVeloc: 12
        },
        {
            id: 2,
            humanPlayerVeloc: 13,
            cpuPlayerVeloc: 22,
            ballVeloc: 14
        },
    ];
    protected timeout = 0;

    constructor(protected canvas: any) {
        super();
        console.log("Em game.ts:constructor");
        this.context = canvas.getContext("2d"); // recupera o contexto 2d
    }

    /**
     * Sets the game up, creating its elements
     */
    protected setup() {
        // controls
        document.addEventListener('keyup', this.keyUp, false); // adiciona evento para keyup
        document.addEventListener('keydown', this.keyDown, false); // adiciona evento para keydown

        // field

        // ball
        this.ball = new Ball(1, 10, this.level[0].ballVeloc);
        this.ball.moveTo(this.canvas.width / 2, this.canvas.height / 2);
        this.ball.angle = Math.floor(Math.random() * 21) - 10;
        this.ball.direction.left = true;

        // players
        this.player1 = new Player(1, true, this.level[0].humanPlayerVeloc);
        this.player1.moveTo(0, (this.canvas.height - this.player1.height) / 2)
        this.player1.originalColor = "#888888";

        this.player2 = new Player(2, false, this.level[0].cpuPlayerVeloc);
        this.player2.moveTo(this.canvas.width - this.player2.width, 0);
        this.player2.originalColor = "#333333";

    }

    // callback : Tratamento de botão apertada
    protected keyDown = (e: any) => {
        if (e.keyCode == 38) { // up
            this.beingPressed.upArrow = true;
        } else if (e.keyCode == 40) { // down
            this.beingPressed.downArrow = true;
        } else if (e.keyCode == 80) { // p
            //this.paused = !this.paused;
            this.togglePause();
        } else if (e.keyCode == 81) { // q
            this.stop();
        }
    }

    // callback : Tratamento de botão solto
    protected keyUp = (e: any) => {
        if (e.keyCode == 38) { // up
            this.beingPressed.upArrow = false; // jogador soltou tecla cima
        } else if (e.keyCode == 40) { // down
            this.beingPressed.downArrow = false; // jogador soltou tecla baixo
        }
    }

    protected renderBall() {
        this.context.strokeStyle = this.ball.color;
        this.context.fillStyle = this.ball.color;
        this.context.beginPath(); // inicia o modo de desenho
        this.context.arc(this.ball.pos.x, this.ball.pos.y, this.ball.radius, 0, Math.PI * 2, true); // desenha o círculo desejado com as coordenadas no centro.
        this.context.closePath(); // finaliza o caminho (opcional)
        this.context.fill();
    }

    protected renderScore() {
        //var pontosA = pontosJogador;// variável temporária para não alterar pontosJogador
        //var pontosB = pontosOponente;// variável temporária para não alterar pontosOponente
        var pontosA, pontosB: string;
        if (this.score.player1 < 10) { // se o número de pontos for menor que 10, colocamos o zero á esquerda
            pontosA = "0" + this.score.player1;
        } else {
            pontosA = "" + this.score.player1;
        }
        if (this.score.player2 < 10) { // se o número de pontos for menor que 10, colocamos o zero á esquerda
            pontosB = "0" + this.score.player2;
        } else {
            pontosB = "" + this.score.player2;
        }

        this.context.font = "42pt Helvetica"; // tamanho e fonte para desenhar o texto
        this.context.fillStyle = "#000000"; // cor preta (opcional)
        this.context.fillText(pontosA + " " + pontosB, (this.canvas.width / 2) - 70, 50); // escreve texto na tela na posição desejada
    }

    protected renderPlayer(player: Player) {
        this.context.fillStyle = player.color;
        this.context.fillRect(player.pos.x, player.pos.y, player.width, player.height);
    }

    protected renderField() {
        this.context.beginPath(); // inicia o modo de desenho
        this.context.moveTo(this.canvas.width / 2, 0); // posiciona o para desenhar
        this.context.lineTo(this.canvas.width / 2, this.canvas.height); // faz o "risco" na tela
        this.context.strokeStyle = "#000000"; // cor preta (opcional)
        this.context.stroke(); // aplica o risco na tela
        this.context.closePath(); // finaliza o caminho (opcional)
    }

    protected renderScene() {
        // Desenha tudo na tela
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // limpa a tela antes de desenhar

        // Jogador e Oponente
        this.renderPlayer(this.player1);
        this.renderPlayer(this.player2);

        // Bola
        this.renderBall();

        // Placar
        this.renderScore();

        // Linha divisória
        this.renderField();
    }

    protected handlePlayer(player: Player) {
        // 1
        if (player.human) {
            if (this.beingPressed.upArrow != this.beingPressed.downArrow) { // se o jogador estiver pressionando a tecla baixo ou cima
                if (this.beingPressed.upArrow) { // se for para cima...
                    if (player.pos.y > 0) { // se não sair da tela...
                        player.moveUp(); // muda a posição
                    }
                } else { // se for para baixo...
                    if (player.pos.y < (this.canvas.height - player.height)) { // se não sair da tela...
                        player.moveDown(); // muda a posição
                    }
                }
            }
        }
        // 2
        else {
            // CPU lvl 11
            // if ( this.level.id==1 ) {
            if (player.direction.up) { // se o oponente estiver se movendo para cima...
                player.moveUp(); // muda a posição
                if (player.pos.y <= 0) { // se estiver saindo da tela...
                    player.direction.up = false; // muda a direção
                    player.direction.down = true; // muda a direção
                }
            } else { // se o oponente estiver se movendo para baixo...
                player.moveDown(); // muda a posição
                if (player.pos.y >= this.canvas.height - player.height) { // se estiver saindo da tela...
                    player.direction.up = true; // muda a direção
                    player.direction.down = false; // muda a direção
                }
            }
            //} else if ( this.level.id==2 ) {
            //
            //}
        }

    }

    protected handleBall() {
        if (this.timeout <= 0) { // se a bola estiver em jogo, o tempo é zero (após marcar ponto, a bola fica invisível por um tempo)
            this.ball.keepMoving();
        }
    }

    protected handleCollisions() {
        // colisao com player1?
        // if ((this.ball.pos.x - this.ball.radius) <= (this.player1.pos.x + this.player1.width)) { // se o jogador enconstar na bola (eixo X)...
        //     if ((this.ball.pos.y + this.ball.radius > this.player1.pos.y) && (this.ball.pos.y - this.ball.radius < this.player1.pos.y + this.player1.height)) { // se o jogador enconstar na bola (eixo Y)...
        if (this.ball.colisionWith(this.player1)) {
            //this.ball.direction.right = true; // a bola muda de lado e é rebatida para o oponente
            if (this.beingPressed.upArrow) { // se o jogador estiver indo para cima quando tocar na bola...
                // this.ball.angle = Math.floor(Math.random() * 10) - 9; // mandamos a bola na diagonal pra cima
                this.ball.strikeUp();
            } else { // se o jogador estiver indo para baixo quando tocar na bola...
                // this.ball.angle = Math.floor((Math.random() * 10)); // mandamos a bola na diagonal pra baixo
                this.ball.strikeDown();
            }
            //}
            // colisao com player2?
            // } else if ((this.ball.pos.x + this.ball.radius) >= this.player2.pos.x) { // se o oponente enconstar na bola (eixo X)...
            //     if ((this.ball.pos.y + this.ball.radius > this.player2.pos.y) && (this.ball.pos.y - this.ball.radius < this.player2.pos.y + this.player2.height)) { // se o oponente enconstar na bola (eixo Y)...
            //         this.ball.direction.right = false; // a bola muda de lado e é rebatida para o jogador
        } else if (this.ball.colisionWith(this.player2)) {
            if (this.player2.direction.up) { // se o oponente estiver indo para cima quando tocar na bola...
                // this.ball.angle = Math.floor(Math.random() * 10) - 9; // mandamos a bola na diagonal pra cima
                this.ball.strikeUp();
            } else { // se o oponente estiver indo para baixo quando tocar na bola...
                // this.ball.angle = Math.floor((Math.random() * 10)); // mandamos a bola na diagonal pra baixo
                this.ball.strikeUp();
            }
            // }
        // colisao com bordas?
        } else if ((this.ball.pos.y - this.ball.radius <= 0) || (this.ball.pos.y + this.ball.radius > this.canvas.height)) { // se a bola bater em cima ou em baixo da tela...
            this.ball.angle = this.ball.angle * -1; // multiplicamos por -1 para inverter o sinal e a direção da bola no eixo Y
        }
        // this.ball.pos.y += this.ball.angle; // movemos a bola para cima ou para baixo, de acordo com o cáculo acima

        // if (this.ball.direction.right) { // se a bola estiver indo para a direita...
        //     this.ball.pos.x += this.ball.veloc; // movemos a bola para a direita
        // } else { // se estiver indo para a esquerda...
        //     this.ball.pos.x -= this.ball.veloc; // movemos a bola para a esquerda
        // }

        // Detector de gol/score
        else if ((this.ball.pos.x <= -this.ball.radius) || (this.ball.pos.x > this.canvas.width)) { // se a bola saiu da tela...
            if (this.timeout >= 50) { // se so tempo de deixar a bola invisível passou...
                if (this.ball.pos.x <= -this.ball.radius) { // se a bola saiu na esquerda...
                    this.score.player2++; // ponto do oponente!
                } else { // se a bola saiu na direita...
                    this.score.player1++; // ponto do jogador!
                }

                this.ball.pos.x = this.canvas.width / 2; // posiciona a bola no meio da tela
                this.ball.pos.y = this.canvas.height / 2; // posiciona a bola no meio da tela
                this.ball.direction.left = true; // faz ela ir em direção ao jogador
                this.ball.direction.right = false;
                this.ball.angle = Math.floor(Math.random() * 21) - 10; // faz a bola ir para uma direção aleatória
                this.timeout = 0; // zera o tempo de deixar a bola invisível e a coloca em jogo novamente
            } else { // se o tempo de deixar a bola invisível ainda não passou...
                this.timeout++; // continuamos contando até 50
            }
        }
    }

    // GAME loop
    async gameLoop() {

        if (!this.paused) {

            // Bola
            this.handleBall();

            // Jogador
            this.handlePlayer(this.player1);

            // Oponente
            this.handlePlayer(this.player2);

            // Collisions
            this.handleCollisions();

            // Atualizar a cena
            this.renderScene();

        } else {

            await sleep(200);

        }

    }

}