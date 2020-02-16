const Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Bullet(scene) {
            Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(700, 1);
        },

    fire(x, y, angle, ctx) {
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
        this.body.world.on('worldbounds', function (body) {
           
            if (body.gameObject === this) {
               
                this.setActive(false);
                this.setVisible(false);
            }
        }, this);
    },
    update(time, delta) {

        if (this.body.onFloor()) {
            this.anims.play('bulletDust', true)
            this.on('animationcomplete', function () {
                this.destroy();
            }, this);
        } else if (!this.body.blocked.none) {
            this.destroy();
        }

    }


});

export default Bullet;