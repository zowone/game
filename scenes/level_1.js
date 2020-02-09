class Level_1 extends Phaser.Scene {
    constructor() {
        super('Level_1');
    };

    preload() {
        this.load.image('ground', 'images/ground.png'); 
        this.load.atlas('player', 'images/player/player.png', 'images/player/player.json');

    }

    create() {
        const level = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
        const map = this.make.tilemap({data:level,tileWidth:32,tileHeight:32});
        const tiles = map.addTilesetImage('ground');
        map.createStaticLayer(0, tiles, 0, config.height-32);

        this.player = this.add.sprite(500,config.height-79,'player','player_walk_000.png');
        this.player.setScale(.8);
    }
}