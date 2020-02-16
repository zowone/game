const Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

    fire: function (x, y, angle,ctx) {
        this.angle = angle;
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
   if(!this.body.blocked.none){
    this.destroy();
   }

        // if (this.y < -50) {
        //     this.setActive(false);
        //     this.setVisible(false);
        // }
}
    // update: function (time, delta) {
    //     this.y -= this.speed * delta;

    //     if (this.y < -50) {
    //         this.setActive(false);
    //         this.setVisible(false);
    //     }
    // }

});
export default Bullet;