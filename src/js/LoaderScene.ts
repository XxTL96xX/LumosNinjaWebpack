export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.image("smallUIBox", 'assets/ui/SmallUIBox.png');
    this.load.image("UIBox", 'assets/ui/UIBox.png');
    this.load.image("choiceBox", 'assets/ui/ChoiceBox.png');
    this.load.image("buyBox", 'assets/ui/BuyBox.png');
    this.load.image("equipBox", 'assets/ui/EquipBox.png');
    this.load.image('kunai', 'assets/weapons/Kunai.png');

    this.load.tilemapTiledJSON("baseMap", "assets/game.json");
    this.load.image('iceworld', 'assets/ice-tileset.png');

    this.load.spritesheet("PlayerLeft", "assets/character/Samurai-Left.png", {
        frameWidth: 16,
        frameHeight: 16
    });

    this.load.spritesheet("PlayerRight", "assets/character/Samurai-Right.png", {
        frameWidth: 16,
        frameHeight: 16
    });

    this.load.image('Layer1BG', 'assets/ui/Layer1Grass.png');
    this.load.image('Layer2BG', 'assets/ui/Layer2Forest.png');
    this.load.image('Layer3BG', 'assets/ui/Layer3Mountain.png');
  }

  public create() {
    this.scene.start("MainMenu-Scene");
  }
}
