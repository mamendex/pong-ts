/**
 * Game Player
 */
class Player {

    public pos = {
        x: 0,
        y: 0
    }
    public direction = {
        up: false,
        down: false
    }
    //public veloc : number = 0;
    public width = 30;
    public height = 90;
    public originalColor : string = "#111111";
    public color : string;

    constructor (public id : number,
                public human : boolean,
                public veloc : number)
    {
        this.color = this.originalColor;
    }

    public moveTo(x: number, y: number) : boolean {
        this.pos.x = x;
        this.pos.y = y;
        return true;
    }

    public moveUp() {
        this.pos.y -= this.veloc;
        this.direction.up = true;
        this.direction.down = false;
    }

    public moveDown() {
        this.pos.y += this.veloc;
        this.direction.up = false;
        this.direction.down = true;
    }

    public keepMoving() {
        if (this.direction.up) {
            this.moveUp();
        } else if (this.direction.down) {
            this.moveDown();
        }
        return this.pos;
    }
}