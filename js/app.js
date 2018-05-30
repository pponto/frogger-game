/**
 ********** CLASSES
 */

/**
 * Enemy class parameters:
 * xPosition: constant at -200
 * yPosition: randomly select along stone tiles
 * speed: generate random speed
 * sprite: image
 */
const Enemy = function () {
    /* Initital xPosition (same) */
    this.x = -200;
    /* Initital yPosition ramdomised across the stone tiles */
    const yPosition = () => {
        const y = [65, 145, 225];
        return y[Math.floor(Math.random() * y.length)];
    };
    this.y = yPosition();
    /* Generate random speed beetween 60 and 210 */
    this.speed = 60 + Math.floor(Math.random() * 180);
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Enemy methods
 */

/* Update the enemy's position, required method for game */
/* Parameter: dt, a time delta between ticks */
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
};

/* Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Player class methods:
 * xPosition
 * yPosition
 * moveX: when pressing left or right key
 * moveY: when pressing up or down key
 * speed
 * sprite: image
 */
const Player = function () {
    /* Initial */
    this.x = 200;
    this.y = 400;
    /* Direction */
    this.moveX = 0;
    this.moveY = 0;
    /* Update speed so player can move in blocks */
    this.speedX = 100;
    this.speedY = 85;
    /* Player image */
    this.sprite = 'images/char-boy.png';
};

/**
 * Key input code
 */
Player.prototype.handleInput = function (hi) {
    if (hi === 'up') {
        this.moveX = 0;
        this.moveY = -1;
    } else if (hi === 'down') {
        this.moveX = 0;
        this.moveY = 1;
    } else if (hi === 'right') {
        this.moveX = 1;
        this.moveY = 0;
    } else if (hi === 'left') {
        this.moveX = -1;
        this.moveY = 0;
    }
};

/**
 * Update player position based on movement
 * Limited within the game screen
 */
Player.prototype.update = function () {
    /* Player move */
    const changeX = this.x + this.moveX * this.speedX;

    if ((changeX < 450 && this.moveX === 1) ||
        (changeX > -50 && this.moveX === -1)) {
        this.x += this.moveX * this.speedX;
    }
    const changeY = this.y + this.moveY * this.speedY;

    if ((changeY < 450 && this.moveY === 1) ||
        (changeY > -50 && this.moveY === -1)) {
        this.y += this.moveY * this.speedY;
    }

    /* Reset move after pressing */
    this.moveX = 0;
    this.moveY = 0;
};

/* Draw player on the screen */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Collision detection function
 * Occurs when player is whithin 50px x-axis and/or 50px y-axis from enemy
 */
Player.prototype.checkCollision = function () {
    const playerPosX = this.x;
    const playerPosY = this.y;
    /* constiable to refer to call the player */
    const p = this;
    allEnemies.forEach(function (enemy) {
        const enemyPositionX = enemy.x;
        const enemyPositionY = enemy.y;
        if (Math.abs(enemyPositionX - playerPosX) < 50 &&
            Math.abs(enemyPositionY - playerPosY) < 50) {
            /* If collision happened, alert and reset position */
            alert("Game Over!");
            p.reset();
        }
    });
};

/* Winner detection function */
Player.prototype.checkVictory = function () {
    const playerPosY = this.y;
    /* constiable to refer to call the player */
    const p = this;
    if (playerPosY <= 0) {
        /* If player wins, alert and reset position */
        alert("You Win!");
        p.reset();
    }
}

/* Player reset function */
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

/**
 ********** INSTANTIATIONS
 */

/* Instantiate enemies */
const allEnemies = [];
/* Add a new enemy every 0.8 seconds */
setInterval(function () {
        allEnemies.push(new Enemy());
    },
    800);

/* Instantiate a player */
const player = new Player();

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});