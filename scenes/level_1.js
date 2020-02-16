

class Level_1 extends Phaser.Scene {
    constructor() {
        super('Level_1');
        this.isJump = false;
        this.jumpTimer = 0;
        this.lastFired = 0;
    };

    preload() {
        this.load.image('ground', 'images/ground.png');
        this.load.image('physic_player', 'images/player/player_hitbox.png');
        this.load.image('gun', 'images/player/gun.png');
        this.load.image('bullet', 'images/player/bullet.png');
        this.load.multiatlas('player', 'images/player/player.json', 'images/player');
        this.load.atlas('spaceship', 'images/space.png', 'images/space.json');
        this.load.atlas('power', 'images/power.png', 'images/power.json');
        this.load.atlas('bullet_dust', 'images/dust/bullet_dust.png', 'images/dust/bullet_dust.json');

    }

    create() {
        const Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Sprite,
        
            initialize:
        
                function Bullet(scene) {
                    Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bullet');
        
                    this.speed = Phaser.Math.GetSpeed(600, 1);
                },
        
            fire: function (x, y, angle,ctx) {
                this.angle = angle;
                this.ctx = ctx
                this.setPosition(x, y);
                this.setRotation(angle)
                this.setActive(true);
                this.setVisible(true);
                this.setScale(0.8)
                ctx.physics.velocityFromRotation(angle, 600, this.body.velocity);
                this.body.setCollideWorldBounds(true);
                ctx.physics.add.collider(this, ctx.ground);
                this.body.world.on('worldbounds', function(body) {
                    // Check if the body's game object is the sprite you are listening for
                    if (body.gameObject === this) {
                      // Stop physics and render updates for this object
                      this.setActive(false);
                      this.setVisible(false);
                    }
                  }, this);
            },
        update(time,delta){
            
            if(this.body.onFloor()){
                this.anims.play('bulletDust',true)
                this.on('animationcomplete', function () {
                    this.destroy();
                  }, this);  
            }else  if(!this.body.blocked.none){
                this.destroy();
            }  
              
        }

        
        });

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
                start: 60,
                end: 62,
                frames: [60, 61, 62, 61]
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
                start: 66,
                end: 71,
                frames: [66, 67, 68, 69, 70, 71, 70, 68, 67, 66]
            })
        });

        this.anims.create({
            key: 'landing',
            frameRate: 60,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start: 60,
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

        this.anims.create({
            key: 'bulletDust',
            frameRate: 30,
            frames: this.anims.generateFrameNames('bullet_dust', {
                prefix: 'bullet_dust_',
                suffix: '.png',
                zeroPad: 3,
                start: 0,
                end: 4,
            }),
        })

        // LEVEL
        const level = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
        const tiles = map.addTilesetImage('ground');
        this.ground = map.createStaticLayer(0, tiles, 0, config.height - 32);
        this.ground.setCollision([0], true);

        // PLAYER
        this.player = this.add.sprite(0, 10, 'player')
        this.player.setScale(.776);

        this.gun = this.add.sprite(0, 2, 'gun');
        this.gun.setOrigin(0.5).setScale(0.51)

        this.player__container = this.add.container(500, config.height / 2, [this.player, this.gun]);
        this.physics.world.enable(this.player__container);
        this.player__container.body.setGravityY(300).setSize(1, 78);
        this.player__container.body.setCollideWorldBounds(true);

        this.physics.add.collider(this.player__container, this.ground);

        // BULLET

        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 15,
            runChildUpdate: true
        });

        // SPACESHIP

        this.mainSpaceship = this.add.sprite(32, 16, "spaceship", "spaceship.png");
        this.power = this.add.sprite(79, 21, "power");
        this.power.play('powerShip');

        this.spaceship__container = this.add.container(config.width, 100, [this.mainSpaceship, this.power]);

        this.physics.world.enable(this.spaceship__container);
        this.spaceship__container.body.setVelocityX(-300).setBounce(1, 1).setCollideWorldBounds(true).setSize(64, 32);

        //CURSOR

        this.input.setDefaultCursor('url(images/player/scope.cur), pointer');
        this.input.on('pointermove', function (pointer) {
            const angle = Phaser.Math.Angle.BetweenPoints(this.player__container, pointer);

            this.gun.setRotation(angle)

        }, this);

      

        // INPUT

        this.pointer = this.input.activePointer;

        this.keys = this.input.keyboard.addKeys('Q,D,SPACE');

      
    }

    update(time, delta) {
        

        if (this.spaceship__container.body.velocity.x > 0) {
            this.mainSpaceship.setScale(-1, 1)
            this.power.setScale(-1, 1);
            this.power.x = -15;
        } else {
            this.mainSpaceship.setScale(1, 1);
            this.power.setScale(1, 1);
            this.power.x = 79;

        }

        // PLAYER CONTROL

        if (this.player__container.body.onFloor()) {
            if (this.keys.Q.isDown) {
                this.player__container.body.setVelocityX(-200);
                this.player.anims.play('left', true);

            } else if (this.keys.D.isDown) {
                this.player.anims.play('right', true);
                this.player__container.body.setVelocityX(200);
            } else {
                this.player__container.body.setVelocityX(0);
                this._stopAnimation(this.player.anims);
            }
            if (this.keys.SPACE.isUp) {
                this.isJump = false
                this.player.y = 10
            }
            if (this.keys.SPACE.isDown) {
                this.isJump = true;
                this.jumpToright = this.player__container.body.velocity.x > 0
                this.jumptimer = 1;
                this.player__container.body.velocity.y = -150;
                this.player.anims.stop();

            }
        } else {
            if (this.keys.SPACE.isDown && (this.jumptimer != 0)) {

                if (this.jumptimer > 45) {
                    this.jumptimer = 0;
                    this.isJump = false
                } else {
                    this.jumptimer++
                    this.player__container.body.velocity.y = -150 + this.jumptimer * 2;
                }
            } else if (this.jumptimer != 0) {
                this.jumptimer = 0;
                this.isJump = false
            }

            if (this.keys.Q.isDown && this.jumpToright) {
                this.player__container.body.velocity.x -= 4;


            }
            if (this.keys.D.isDown && !this.jumpToright) {

                this.player__container.body.velocity.x += 4;
            }

            if (this.isJump) {
                switch (this.jumptimer) {
                    case 1:
                        this.player.setFrame('player_067.png')
                        this.player.y = 10;
                        break;
                    case 2:
                        this.player.setFrame('player_068.png')
                        this.player.y = 15;
                        break;
                    case 6:
                        this.player.setFrame('player_069.png')
                        this.player.y = 20;
                        break;
                    case 7:
                        this.player.setFrame('player_070.png')
                        this.player.y = 25;
                        break;
                    case 9:
                        this.player.setFrame('player_071.png')
                        this.player.y = 29;
                        break;
                }
            } else {
                this.player.setFrame('player_059.png')
                this.player.y = 10
            }
        }

        //FIRE

        if(!this.pointer.leftButtonReleased() && time > this.lastFired){
            var bullet = this.bullets.get();
            const angle = Phaser.Math.Angle.BetweenPoints(this.player__container, this.pointer);
            if (bullet) {
                bullet.fire(this.player__container.body.x, this.player__container.body.y,angle,this);
                this.lastFired = time + 200;
            }
            if( angle < 1.5 && angle >-1.5){
                
                this.player__container.body.setVelocityX(this.player__container.body.velocity.x -= 30)
            }else{
                this.player__container.body.setVelocityX(this.player__container.body.velocity.x += 30)
            }
            if( angle > 0){
                if(this.player__container.body.y>this.cameras.main.centerY){
                    this.player__container.body.setVelocityY(this.player__container.body.velocity.y -= 100)
                }
            }
        }

    }

    _stopAnimation(animation) {

        if (animation.isPlaying) {
            const totalFrames = animation.getTotalFrames();
            const currentFrame = animation.currentFrame.index
            if (currentFrame / totalFrames > 0.5) {
                this.player.anims.stopOnRepeat()
            } else {
                this.player.anims.stop();
                this.player.setFrame('player_059.png')
            }

        } else {
            this.player.setFrame('player_059.png')
        }
    }
}