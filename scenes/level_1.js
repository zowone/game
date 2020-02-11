class Level_1 extends Phaser.Scene {
    constructor() {
        super('Level_1');
        this.isJump = false;
        this.jumpPower = 0;
    };

    preload() {
        this.load.image('ground', 'images/ground.png');
        this.load.image('physic_player', 'images/player/player_hitbox.png');
        this.load.image('gun', 'images/player/gun.png');
        // this.load.atlas('player', 'images/player/player.png', 'images/player/player.json');
        this.load.multiatlas('player', 'images/player/player.json', 'images/player');
        this.load.atlas('spaceship', 'images/space.png', 'images/space.json');
        this.load.atlas('power', 'images/power.png', 'images/power.json');

    }

    create() {

        this.anims.create({
            key: 'left',
            frameRate: 60,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start: 0,
                end: 29
            })
        });

        this.anims.create({
            key: 'pause',
            frameRate: 3,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start:60,
                end: 62,
                frames:[60,61,62,61]
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frameRate: 60,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start: 30,
                end: 59
            })
        });

        this.anims.create({
            key: 'jump',
            frameRate: 30,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start:66,
                end: 71,
                frames:[66,67,68,69,70,71,70,68,67,66]
            })
        });

        this.anims.create({
            key: 'landing',
            frameRate: 60,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start:60,
                end: 65
            })
        });

        this.anims.create({
            key: 'powerShip',
            frameRate: 10,
            frames: this.anims.generateFrameNames('power', {
                prefix: 'power',
                suffix: '.png',
                start: 1,
                end: 3,
            }),
            repeat: -1
        })
// LEVEL
        // this.ground = this.physics.add.staticGroup();
        const level = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
        const tiles = map.addTilesetImage('ground');
        this.ground = map.createStaticLayer(0, tiles, 0, config.height - 32);
        this.ground.setCollision([0], true);

// PLAYER
        this.player = this.add.sprite(0,10, 'player')
        this.player.setScale(.776);

        this.gun = this.add.sprite(0,2,'gun');
        this.gun.setOrigin(0.5).setScale(0.51)

        this.player__container = this.add.container(500, config.height / 2,[this.player,this.gun]);
        this.physics.world.enable(this.player__container);
        this.player__container.body.setGravityY(300).setSize(1,75);
        this.player__container.body.setCollideWorldBounds(true);

        this.physics.add.collider(this.player__container, this.ground);


// SPACESHIP

        // this.player.play('left');
        this.mainSpaceship = this.add.sprite(32, 16, "spaceship", "spaceship.png");
        this.power = this.add.sprite(79, 21, "power");
        this.power.play('powerShip');

        this.spaceship__container = this.add.container(config.width, 100, [this.mainSpaceship, this.power]);
       
        this.physics.world.enable(this.spaceship__container);
        this.spaceship__container.body.setVelocityX(-300).setBounce(1,1).setCollideWorldBounds(true).setSize(64, 32);
      
//CURSOR

        this.input.setDefaultCursor('url(images/player/scope.cur), pointer');

// INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey('SPACE');
        this.spacebar.on('down',this._startJump,this);
        this.spacebar.on('up',this._endJump,this);
        // this.input.on('space', this._jump,this)

        this.input.on('pointermove', function (pointer) {
            const angle = Phaser.Math.Angle.BetweenPoints(this.player__container, pointer);
            console.log(angle)
            this.gun.setRotation(angle)
            // Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y, angle, 128);
            // gfx.clear().strokeLineShape(line);
        }, this);

    }

    update() {
    
        
        if(this.spaceship__container.body.velocity.x > 0){
            this.mainSpaceship.setScale(-1,1)
            this.power.setScale(-1,1);
            this.power.x = -15;
            // this.spaceship__container.setScale(-1,1)
        }else{
            // this.spaceship__container.setScale(1,1)
            this.mainSpaceship.setScale(1,1);
            this.power.setScale(1,1);
            this.power.x = 79;

        }
        

        if (this.cursors.left.isDown ) {
            this.player__container.body.setVelocityX(-200);

            if( !this.isJump){
                this.player.anims.play('left', true);
               }
        }else if (this.cursors.right.isDown) {
            this.player__container.body.setVelocityX(200);
           if( !this.isJump){
             this.player.anims.play('right', true);
            }
        }else if(!this.isJump){
            this.player__container.body.setVelocityX(0);
                this._stopAnimation(this.player.anims);
            }
            if( this.player__container.body.velocity.y > 0 &&  this.player__container.body.position.y > 610){
                this.isJump = false
            }
       

// console.log( this.player.body.position.y,this.player.anims.currentAnim)
//         if(this.isJump && this.player.body.position.y === 620){
//             this.isJump = false;
//             this.player.anims.play('landing', true);                     
//         }
    }

    _stopAnimation(animation){
       
        if(animation.isPlaying){
            const totalFrames = animation.getTotalFrames();
            const currentFrame = animation.currentFrame.index
            if(currentFrame/totalFrames>0.5){
                this.player.anims.stopOnRepeat()
            }else{
                this.player.anims.stop();
                this.player.setFrame('player_059.png')
            }
        
        }else{
            this.player.setFrame('player_059.png')
        }
    }

    _updateJumpPower(){
        if(this.jumpPower < 2 ){
            this.jumpPower +=  0.05;
        }
    }

    _startJump(){
        this.timer = this.time.addEvent({delay:10, callback: this._updateJumpPower, callbackScope: this, loop: true})        
    }

    _endJump(){
        this.timer.remove();
        if( this.player__container.body.velocity.y === 0){
            this.isJump = true;
            this.player.anims.play('jump', true);
            function playerJump (){ this.player__container.body.setVelocityY(-this.jumpPower*200);this.jumpPower = 0;}
            this.time.delayedCall(120,playerJump,['salut'],this);
        }else{
            this.jumpPower = 0;
        }
        
    }
}