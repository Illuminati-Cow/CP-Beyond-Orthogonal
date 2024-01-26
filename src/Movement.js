class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 5
        this.PHYSICS_VELOCITY_MULT = 100
        this.lastDirection = new Phaser.Vector2(0,.1)
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
            frames: this.anims.generateFrameNumbers('characteer', {
                start:1,
                end: 1
            }),
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('characteer', {
                start:0,
                end: 2
            }),
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('characteer', {
                start:6,
                end: 8
            }),
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('characteer', {
                start:3,
                end: 5
            }),
            key: 'walk-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('characteer', {
                start:9,
                end: 11
            }),
        })

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
        let playerAnimation = ""
        playerAnimation = inputVector.length() > 0 ? "walk" : "idle-"
        playerAnimation += inputVector.x > 0 ?    
        this.player.setVelocity(inputVector.x * this.PHYSICS_VELOCITY_MULT * this.PLAYER_VELOCITY, inputVector.y * this.PHYSICS_VELOCITY_MULT * this.PLAYER_VELOCITY)
    }
}