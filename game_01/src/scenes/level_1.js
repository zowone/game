import ground_sprite from '../assets/level/ground.png';
import physicPlayer_sprite from '../assets/player/player_hitbox.png';
import gun_sprite from '../assets/player/gun.png';
import bullet_sprite from '../assets/player/bullet.png';
import player_json from '../assets/player/player.json';
import player_sprite from '../assets/player/player.png';
import spaceship_sprite from '../assets/enemies/spaceship_01/space.png';
import spaceship_json from '../assets/enemies/spaceship_01/space.json';
import power_sprite from '../assets/enemies/spaceship_01/power.png';
import power_json from '../assets/enemies/spaceship_01/power.json';
import bulletDust_sprite from '../assets/player/bullet_dust.png';
import bulletDust_json from '../assets/player/bullet_dust.json';
import cursor_sprite from '../public/scope.cur'

import Bullet from '../bullets';
import Spaceship__container from '../spaceship'

import configKeys from '../config.json';


export class Level_1 extends Phaser.Scene {
    constructor() {
        super('Level_1');
        this.isJump = false;
        this.jumpTimer = 0;
        this.lastFired = 0;
    };

    preload() {
        this.load.image('ground', ground_sprite);
        this.load.image('physic_player', physicPlayer_sprite);
        this.load.image('gun', gun_sprite);
        this.load.image('bullet', bullet_sprite);
        this.load.atlas('player',player_sprite ,player_json );
        this.load.atlas('spaceship', spaceship_sprite, spaceship_json);
        this.load.atlas('power', power_sprite, power_json);
        this.load.atlas('bullet_dust', bulletDust_sprite, bulletDust_json);

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
        this.ground = map.createStaticLayer(0, tiles, 0, configKeys.GAMEHEIGHT - 32);
        this.ground.setCollision([0], true);

        // PLAYER
        this.player = this.add.sprite(0, 10, 'player')
        this.player.setScale(.776);

        this.gun = this.add.sprite(0, 2, 'gun');
        this.gun.setOrigin(0.5).setScale(0.51)

        this.player__container = this.add.container(500, configKeys.GAMEHEIGHT / 2, [this.player, this.gun]);
        this.physics.world.enable(this.player__container);
        this.player__container.body.setGravityY(1000).setSize(1, 78);
        this.player__container.setDepth(2);  
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

        this.spaceship__container = new Spaceship__container(this,configKeys.GAMEWIDTH, 100, [this.mainSpaceship, this.power])

        //CURSOR

        this.input.setDefaultCursor(`url(${cursor_sprite}), pointer`);
        this.input.on('pointermove', function (pointer) {
            const angle = Phaser.Math.Angle.BetweenPoints(this.player__container, pointer);

            this.gun.setRotation(angle)

        }, this);

      

        // INPUT

        this.pointer = this.input.activePointer;

        this.keys = this.input.keyboard.addKeys('Q,D,SPACE');

      
    }

    update(time, delta) {
        

        // PLAYER CONTROL

        if (this.player__container.body.onFloor()) {
            if (this.keys.Q.isDown) {
                this.player__container.body.setVelocityX(-250);
                this.player.anims.play('left', true);

            } else if (this.keys.D.isDown) {
                this.player.anims.play('right', true);
                this.player__container.body.setVelocityX(250);
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
                this.jumptimer = 1;
                this.player__container.body.velocity.y = -300;
                this.player.anims.stop();

            }
        } else {
            if (this.keys.SPACE.isDown && (this.jumptimer != 0)) {

                if (this.jumptimer > 45) {
                    this.jumptimer = 0;
                    this.isJump = false
                } else {
                    this.jumptimer++
                    this.player__container.body.velocity.y = -300 + this.jumptimer * 2;
                }
            } else if (this.jumptimer != 0) {
                this.jumptimer = 0;
                this.isJump = false
            }

            if (this.keys.Q.isDown) {
                this.player__container.body.velocity.x -= 4;
            }
            if (this.keys.D.isDown) {
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
                    this.player__container.body.setVelocityY(this.player__container.body.velocity.y -= 300)
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