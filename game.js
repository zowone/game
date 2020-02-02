var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#2ca3c7',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload (){
    this.load.image('ground', 'images/ground.png');
    this.load.atlas('spaceship', 'images/space.png','images/space.json');

    this.anims.create({
        key:'powerShip',
        frameRate:10,
        frames: this.anims.generateFrameNames('spaceship',{
            prefix:'power',
            sufix:'.png',
            start:1,
            end:3,
        }),
        repeat:-1
    })
}

function create (){
    const level = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    const map = this.make.tilemap({data:level,tileWidth:32,tileHeight:32});
    const tiles = map.addTilesetImage('ground');
    map.createStaticLayer(0, tiles, 0, 736);

    
    const mainSpaceship =  this.add.sprite(0,0,"spaceship", "spaceship");
     const power  =  this.add.sprite(47,5,"spaceship").play('powerShip');

     const spaceship__container = this.add.container(200,100,[mainSpaceship,power]);
}

function update (){
}