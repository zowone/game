import EnnemyBullet from './ennemy_bullet';

export default class Spaceship02__container extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, bullets) {
        super(scene, x, y, children);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setVelocityX(-300).setBounce(1, 1).setCollideWorldBounds(true).setSize(150, 75);
        this.positionStartY = this.body.y;
        this.isDown = true;
        this.deltaFire = 0;
        this.bullets = bullets;
    }
    // ...
    preUpdate(time) {
        if (this.isDown) {
            this.body.velocity.y = 100;
        } else {
            this.body.velocity.y = -100;
        }
        if (this.body.y > this.positionStartY + 100) {
            this.isDown = false;
        }
        if (this.body.y < this.positionStartY) {
            this.isDown = true;
        }
        if ( Math.abs(this.body.x - this.scene.player__container.body.x) < 100 && this.deltaFire < time ){
            const bullet1 = this.bullets.get();
            const bullet2 = this.bullets.get();
            const bullet3 = this.bullets.get();
            if(bullet1 && bullet2 && bullet3){
                bullet1.fire(this.body.x+this.body.sourceWidth/2,this.body.y+this.body.sourceHeight,0);
                bullet2.fire(this.body.x+this.body.sourceWidth/2+30,this.body.y+this.body.sourceHeight,-.3);
                bullet3.fire(this.body.x+this.body.sourceWidth/2-30,this.body.y+this.body.sourceHeight,.3);
            }
            this.deltaFire = time + 1000;
        }
    }

    explosed() {

    }
}  