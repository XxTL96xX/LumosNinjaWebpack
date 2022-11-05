import "phaser";
import LoaderScene from "./LoaderScene";
import GameScene from "./GameScene";
import MainMenuScene from './MainMenu'
import UIScene from './UIScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "#135873",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug:true
		}
	},
	scene: [LoaderScene, MainMenuScene, GameScene, UIScene]
};

window.addEventListener("load", () => {
  new Phaser.Game(config);
});
