export default class Spaceship__container extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setVelocityX(-300).setBounce(1, 1).setCollideWorldBounds(true).setSize(64, 32);
        this.spaceship = this.first;
        this.power = this.last
    }
    // ...
    preUpdate() {
        if (this.body.velocity.x > 0) {
            this.spaceship.setScale(-1, 1)
            this.power.setScale(-1, 1);
            this.power.x = -15;
        } else {
            this.spaceship.setScale(1, 1);
            this.power.setScale(1, 1);
            this.power.x = 79;
        }
    }

    explosed() {
        this.body.setVelocity(0, 0)
        this.power.destroy()
        this.spaceship.play('bulletDust', true);
        this.spaceship.on('animationcomplete', () => {
            this.destroy();
        });
    }
}  