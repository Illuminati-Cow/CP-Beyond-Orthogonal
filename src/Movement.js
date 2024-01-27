class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 5
        this.PHYSICS_VELOCITY_MULT = 100
        this.lastDirection = "down"
        this.lastAnimation = "idle-down"
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
        
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)

        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:1,
                end: 1
            })
        });
        this.anims.create({
            key: 'idle-up',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:10,
                end: 10
            })
        });
        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:4,
                end: 4
            })
        });
        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:7,
                end: 7
            })
        });
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:0,
                end: 2
            })
        });
        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:6,
                end: 8
            })
        });
        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:3,
                end: 5
            }),
        });
        this.anims.create({
            key: 'walk-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start:9,
                end: 11
            }),
        });

        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'character', 1).setOrigin(0.5).setScale(2)
        this.player.body.setCollideWorldBounds(true, 0, 0)
        this.player.setSize(32, 32).setOffset(8, 16)
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // Get player movement input and move
        let inputVector = new Phaser.Math.Vector2()
        if (this.cursors.up.isDown) {
            inputVector.y -= this.PLAYER_VELOCITY
        }
        if (this.cursors.down.isDown) {
            inputVector.y += this.PLAYER_VELOCITY
        }
        if (this.cursors.left.isDown) {
            inputVector.x -= this.PLAYER_VELOCITY
        }
        if (this.cursors.right.isDown) {
            inputVector.x += this.PLAYER_VELOCITY
        }
        inputVector.normalize()
        
        let playerAnimation = inputVector.lengthSq() > 0 ? "walk-" : "idle-"
        let dir = ""
        if (inputVector.lengthSq() == 0) {
            dir = this.lastDirection
            playerAnimation += dir
            this.player.play(playerAnimation)
        }
        else {
            dir = this.cardinalFromVector(inputVector)
        }
        playerAnimation += dir
        this.lastAnimation = this.player.anims.getName()
        if (playerAnimation != this.lastAnimation)
            this.player.play(playerAnimation)
        this.player.setVelocity(inputVector.x * this.PHYSICS_VELOCITY_MULT * this.PLAYER_VELOCITY, inputVector.y * this.PHYSICS_VELOCITY_MULT * this.PLAYER_VELOCITY)
        this.lastDirection = dir
    }

    // Returns the string 'zero' if the vector 2 is zero
    cardinalFromVector(vector2) {
        if (vector2.lengthSq() == 0)
            return "zero"
        let dir = ""
        let max = 1
        if (Math.abs(vector2.x) >= Math.abs(vector2.y))
            max = vector2.x
        else
            max = vector2.y
        let x = vector2.x / max
        let y = vector2.y / max
        if (Math.abs(x) == 1)
            dir += (vector2.x > 0) ? "right" : "left"
        else if (Math.abs(y) == 1)
            dir += (vector2.y > 0) > 0 ? "down" : "up"
        //console.log(vector2)
        return dir
    }
}