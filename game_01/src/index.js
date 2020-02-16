import Phaser from 'phaser';
import {Level_1} from './scenes/level_1';
import configKeys from './config.json';

var config = {
  type: Phaser.AUTO,
  width: configKeys.GAMEWIDTH,
  height: configKeys.GAMEHEIGHT,
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
      arcade:{debug:true}
  }
};

var game = new Phaser.Game(config);