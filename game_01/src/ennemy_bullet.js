import configKeys from './config.json';

export default class EnnemyBullet extends Phaser.GameObjects.Sprite {

    constructor(scene, sprite, animation = false) {
        super(scene)

        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'laser_sprite');

        this.speed = 1000;
  
        this.scene = scene;
        this.animation = animation;
        this.isExplosed = false;
    }

    fire(x, y, angle) {
        this.angle = angle;
        this.setPosition(x, y)
            .setRotation(angle)
            .setActive(true)
            .setVisible(true)
            .setScale(0.8);
        this.scene.physics.world.enable(this);

        this.scene.physics.velocityFromRotation(Math.PI / 2 + angle, this.speed, this.body.velocity);
        this.collideGround = this.scene.physics.add.collider(this, this.scene.ground);
        console.log(this.scene.playerHitBox)
        this.collideSpace = this.scene.physics.add.collider(this, this.scene.playerHitBox, (bullet, player) => {
          
            bullet.explosed();
            // player.hit();

        });
        // this.scene.physics.add.overlap(
        //     this.bullet,
        //     balls,
        //     function overlap(_logo, ball) {
        //       ball.setFrame(5).disableBody();
        //     },
        //     function process(_logo, ball) {
        //       // It would be more efficient to create a CanvasTexture and check that instead.
        //       // But getPixelAlpha() is convenient for an example.
        
        //       return (
        //         this.textures.getPixelAlpha(
        //           Math.floor(ball.body.center.x - logoTopLeft.x),
        //           Math.floor(ball.body.center.y - logoTopLeft.y),
        //           "logo"
        //         ) === 255
        //       );
        //     },
        //     this
        //   );
        // this.body.world.on('worldbounds', function (body) {

        //     if (body.gameObject === this) {

        //         this.setActive(false);
        //         this.setVisible(false);
        //     }
        // }, this);
    }
    update(time, delta) {
        if (this.body.onFloor()) {
        this.y = configKeys.GAMEHEIGHT - 32
            this.explosed()
        }
        if (this.body && this.body.x && (this.body.x < -50 || this.body.x > configKeys.GAMEWIDTH || this.body.y > configKeys.GAMEHEIGHT)) {
        this.y = configKeys.GAMEHEIGHT - 32
            this.explosed()
        }
    }

    explosed() {
        this.body.setVelocity(0, 0);
        this.scene.physics.world.removeCollider(this.collideSpace);
        this.scene.physics.world.removeCollider(this.collideGround);
       
        this.anims.play('bulletDust', true);
        this.on('animationcomplete', () => {
            this.destroy();
        });

       
    }


}