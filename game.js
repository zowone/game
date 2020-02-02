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

function preload ()
{
    this.load.image('ground', 'images/ground.png');
}

function create ()
{
    const level = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    const map = this.make.tilemap({data:level,tileWidth:32,tileHeight:32});
    const tiles = map.addTilesetImage('ground');
    const layer = map.createStaticLayer(0, tiles, 0, 736)
}

function update ()
{
}