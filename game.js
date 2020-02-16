var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#2ca3c7',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 30 },
            debug: false
        }
    },
    scene: [Level_1],
    physics:{
        default:'arcade',
        // arcade:{debug:true}
    }
};

var game = new Phaser.Game(config);
/*
function preload () {
    this.load.image('ground', 'images/ground.png');
    this.load.atlas('spaceship', 'images/space.png','images/space.json');
    this.load.atlas('power', 'images/power.png','images/test.json');

    this.anims.create({
        key:'powerShip',
        frameRate:10,
        frames: this.anims.generateFrameNames('power',{
            prefix:'power',
            sufix:'.png',
            start:1,
            end:3,
        }),
        repeat:-1
    })
 
}

function create () {
    const level = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    const map = this.make.tilemap({data:level,tileWidth:32,tileHeight:32});
    const tiles = map.addTilesetImage('ground');
    map.createStaticLayer(0, tiles, 0, 736);

    
    this.mainSpaceship = this.add.sprite(0,0,"spaceship", "spaceship.png");
     this.power = this.add.sprite(47,5,"power");
     console.log(this.textures.get('power').getFrameNames())

     const spaceship__container = this.add.container(200,100,[this.mainSpaceship,this.power]);
     
     this.power.play('powerShip');

}

function update (){
}*/