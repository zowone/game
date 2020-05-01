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
        this.collideSpace = this.scene.physics.add.collider(this, this.scene.player__container, (bullet, player) => {
            bullet.explosed();
            // player.hit();

        });
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