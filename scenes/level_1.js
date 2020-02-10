class Level_1 extends Phaser.Scene {
    constructor() {
        super('Level_1');
    };

    preload() {
        this.load.image('ground', 'images/ground.png');
        this.load.image('physic_player', 'images/player/player_hitbox.png');
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
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'pause',
            frameRate: 3,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start:60,
                end: 62
            }),
            loop:true,
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
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frameRate: 60,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start:66,
                end: 71
            }),
            loop:true,
            repeat: -1
        });

        this.anims.create({
            key: 'prejump',
            frameRate: 60,
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player_',
                suffix: '.png',
                zeroPad: 3,
                start:60,
                end: 65
            }),
            loop:true,
            repeat: -1
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
        // this.ground = this.physics.add.staticGroup();
        const level = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
        const tiles = map.addTilesetImage('ground');
        this.ground = map.createStaticLayer(0, tiles, 0, config.height - 32);
        this.ground.setCollision([0], true);


        this.player = this.physics.add.sprite(500, config.height / 2, 'player', 0) .setSize(95, 145)
        .setOffset(135, 35)       ;
        
        this.player.setScale(.8);
        this.player.setGravityY(300);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.ground)


        // this.player.play('left');
        this.mainSpaceship = this.add.sprite(32, 16, "spaceship", "spaceship.png");
        this.power = this.add.sprite(79, 21, "power");
        this.power.play('powerShip');

        this.spaceship__container = this.add.container(config.width, 100, [this.mainSpaceship, this.power]);
        this.physics.world.enable(this.spaceship__container);
        this.spaceship__container.body.setVelocityX(-300).setBounce(1,1).setCollideWorldBounds(true).setSize(64, 32);
        

    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        console.log(cursors)
        if(this.spaceship__container.body.velocity.x > 0){
            this.spaceship__container.setScale(-1,1)
        }else{
            this.spaceship__container.setScale(1,1)

        }
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-160);

            this.player.anims.play('left', true);
        }else if (cursors.right.isDown) {
            this.player.body.setVelocityX(160);

            this.player.anims.play('right', true);

        }else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('pause', true);
        }
    }
}