import configKeys from './config.json';

export default class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene) {
        super(scene)
        Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bullet');

        // this.speed = Phaser.Math.GetSpeed(600, 1);   
        // this.scene = scene
    }

    fire(x, y, angle, ctx) {
        this.angle = angle;
        this.ctx = ctx
        this.setPosition(x + Math.cos(this.angle) * this.ctx.gun.width / 2 * this.ctx.gun.scale, y + Math.sin(this.angle) * this.ctx.gun.width / 2 * this.ctx.gun.scale)
            .setRotation(angle)
            .setActive(true)
            .setVisible(true)
            .setScale(0.8);
        ctx.physics.velocityFromRotation(angle, 1000, this.body.velocity);
         this.collideGround = ctx.physics.add.collider(this, ctx.ground);
        this.collideSpace = ctx.physics.add.collider(this, ctx.spaceship__container, (bullet, spaceship) => {
            this.explosed();
            spaceship.explosed();

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
            this.explosed()
        }
        if (this.body.x < -50 || this.body.x > configKeys.GAMEWIDTH || this.body.y < -50) {
            this.explosed()
        }

    }

    explosed() {

        this.body.setVelocity(0, 0);
        this.ctx.physics.world.removeCollider(this.collideSpace);
        this.ctx.physics.world.removeCollider(this.collideGround);
        this.anims.play('bulletDust', true);
        this.on('animationcomplete', () => {
            this.destroy();
        });

    }


}