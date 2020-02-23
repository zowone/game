class Spaceship__container extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        // ...
        scene.add.existing(this);
        
    }
    // ...

    // preUpdate(time, delta) {}
}