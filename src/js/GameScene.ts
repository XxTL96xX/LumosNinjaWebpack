import { io } from "socket.io-client";
import * as weapons from "../data/weapon.json";

var playerSprite;

var ground;
var allEnemy = [];

var keyObjA;
var keyObjD;
var keyObjW;
var keyObjS;
var keyObjSpace;

var playerSpeed = 200;

var bulletGroup;
var weaponKey = "kunai";

var BG1, BG2, BG3;

var mainMenuScene;

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    //super('Game-Scene')
    super({ key: 'Game-Scene', active: false });
  }

  preload() {
        
  }

  create() {
    mainMenuScene = this.scene.get("MainMenu-Scene");
    //console.log(mainMenuScene.data.get("weaponKey"));
    //this.data.set("weaponKey", weaponKey);

    if(mainMenuScene.data.get("weaponKey") == weaponKey){
      this.data.set("weaponKey", weaponKey);
    }
    else{
      this.data.set("weaponKey", mainMenuScene.data.get("weaponKey"));
    }

    //console.log("Game Data : " + this.data.get("weaponKey"));

    bulletGroup = this.add.group();

    BG3 = this.add.tileSprite(0, 0, 50 * 70, 20 * 70, "Layer3BG")
      .setOrigin(0)
      .setScale(1.025)
      .setScrollFactor(0, 1);

    /* BG2 = this.add.tileSprite(0, 0, 50 * 70, 20 * 70, "Layer2BG")
        .setOrigin(0)
        .setScale(1.025)
        .setScrollFactor(0, 1);

    BG1 = this.add.tileSprite(0, 0, 50 * 70, 20 * 70, "Layer1BG")
        .setOrigin(0)
        .setScale(1.025)
        .setScrollFactor(0, 1); */

    this.anims.create({
      key: 'PlayerLeft',
      frames: this.anims.generateFrameNumbers('PlayerLeft', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'PlayerRight',
      frames: this.anims.generateFrameNumbers('PlayerRight', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    const baseMap = this.make.tilemap({ key: "baseMap" });
    //const baseMGTileset = baseMap.addTilesetImage("tileset", "MGTilesExtruded", 48, 48, 1, 2);
    const baseTileset = baseMap.addTilesetImage("iceworld", "iceworld");

    ground = baseMap.createLayer('ground', baseTileset)
    ground.setCollisionByProperty({ collides: true })

    baseMap.createLayer('obstacles', baseTileset)

    playerSprite = this.physics.add.sprite(1 * 70, 10 * 70, 'PlayerLeft').setOrigin(0.5);
    playerSprite.setDepth(10);
    playerSprite.scale = 3;
    playerSprite.flipX = false;
    playerSprite.body.setSize(16, 16);
    playerSprite.body.setGravityY(500);
    //playerSprite.body.setOffset(174, 116);
    //playerSprite.body.setMaxSpeed(800);

    //playerSprite.setPosition(0, 0);
    //playerHP = 8;

    this.cameras.main.startFollow(playerSprite)
    this.cameras.main.zoom = 1//0.7;
    this.cameras.main.setBounds(0, 0, 50 * 70, 15 * 70);
    this.physics.world.setBounds(0, 0, (50 * 70), (15 * 70));//(69 * 48));

    this.physics.world.enable([playerSprite]);
    playerSprite.setCollideWorldBounds(true);

    playerSprite.anims.play("PlayerRight");

    this.physics.add.collider(playerSprite, ground, null, null, this);

    keyObjA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, false);  // Get key object
    keyObjA.on('down', function (event) {
      //if (!isDisabled) {
      if (!playerSprite.anims.currentAnim.key.includes("PlayerLeft")) {
        playerSprite.anims.play("PlayerLeft");
      }
      //}
    }, this);
    keyObjA.on('up', function (event) {
      //if (!isDisabled) {
      //if (!keyObjD.isDown && !playerSprite.anims.currentAnim.key.includes("Idle")) {
      playerSprite.anims.play("");
      //}
      //}
    });

    keyObjD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false);
    keyObjD.on('down', function (event) {
      //if (!isDisabled) {
      if (!playerSprite.anims.currentAnim.key.includes("PlayerRight")) {
        playerSprite.anims.play("PlayerRight");
      }
      //}
    }, this);
    keyObjD.on('up', function (event) {
      //if (!isDisabled) {
      //if (!keyObjA.isDown && !playerSprite.anims.currentAnim.key.includes("Idle")) {
      playerSprite.anims.play("");
      //}
      //}
    });

    keyObjS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, false);
    keyObjS.on('down', function (event) {

    }, this);
    keyObjS.on('up', function (event) {

    }, this);

    keyObjW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, false);
    keyObjW.on('down', function (event) {
      if (playerSprite.body.onFloor()) {
        playerSprite.body.setVelocityY(-425);
      }
    }, this);
    keyObjW.on('up', function (event) {

    });

    var bullet;

    keyObjSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, false);
    keyObjSpace.on('down', function (event) {
      //console.log(playerSprite.texture.key)
      if (playerSprite.texture.key == "PlayerLeft") {
        bullet = this.add.sprite(playerSprite.x - 30, playerSprite.y, this.data.get("weaponKey")).setOrigin(0.5);
        this.physics.world.enable(bullet)
        bullet.flipX = true;
        bullet.body.setVelocityX(-150);
        bullet.body.allowGravity = false
        bullet.scale = 3;
        bullet.body.setSize(16, 16);
        bulletGroup.add(bullet);
        var bulletCollider = this.physics.add.overlap(bullet, playerSprite, null, null, this);
      }
      else if (playerSprite.texture.key == "PlayerRight") {
        bullet = this.add.sprite(playerSprite.x + 30, playerSprite.y, this.data.get("weaponKey")).setOrigin(0.5);
        this.physics.world.enable(bullet)
        bullet.body.setVelocityX(150);
        bullet.body.allowGravity = false
        bullet.scale = 3;
        bullet.body.setSize(16, 16);
        bulletGroup.add(bullet);
        var bulletCollider = this.physics.add.overlap(bullet, playerSprite, null, null, this);
      }
    }, this);

    this.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
      //playerSprite.x = pointer.worldX;
      //playerSprite.y = pointer.worldY;
    });

    //var spawnTimer = this.time.addEvent({ delay: 1500, callback: this.SpawnEnemy, args: [this], callbackScope: this, loop: true });
    var spawnTimer2 = this.time.addEvent({ delay: 1500, callback: this.SpawnEnemy2, args: [this], callbackScope: this, loop: true });
  }

  SpawnEnemy(theGame) {
    var enemy = theGame.add.sprite(1 * 70, 10 * 70, 'Enemy').setOrigin(0.5);
    enemy.setScale(2)

    theGame.physics.world.enable(enemy)

    theGame.physics.moveToObject(enemy, playerSprite, 200);

    allEnemy.push(enemy);

    var enemyCollider = this.physics.add.overlap(enemy, bulletGroup, this.OnBulletCollide, null, this);
    this.physics.add.collider(enemy, ground, null, null, this);
  }

  SpawnEnemy2(theGame) {
    var enemy = theGame.add.sprite(25 * 70, 10 * 70, 'Enemy').setOrigin(0.5);
    enemy.setScale(2)

    theGame.physics.world.enable(enemy)

    theGame.physics.moveToObject(enemy, playerSprite, 200);

    allEnemy.push(enemy);

    var enemyCollider = this.physics.add.overlap(enemy, bulletGroup, this.OnBulletCollide, null, this);
    this.physics.add.collider(enemy, ground, null, null, this);
  }

  OnBulletCollide(body1, body2) {
    //console.log("Collided");
    body1.destroy();
    bulletGroup.remove(body2);
    body2.destroy();
  }

  update(time: number, delta: number): void {
    if (keyObjA.isDown) {
      playerSprite.body.setVelocityX(-playerSpeed);
    }
    else if (keyObjD.isDown) {
      playerSprite.body.setVelocityX(playerSpeed);
    }
    else {
      playerSprite.body.setVelocityX(0);
    }

    //BG1.setTilePosition(this.cameras.main.scrollX / 2);
    //BG2.setTilePosition(this.cameras.main.scrollX / 4);
    BG3.setTilePosition(this.cameras.main.scrollX / 6);
  }

  LoadWeapon(theGame, key, url) {
    theGame.load.image(key, url);   // add task
    // scene.load.image(config); // config: {key, url}
    theGame.load.once('complete', () => {
      weaponKey = key;
      theGame.data.set("weaponKey", key);
    }, theGame);  // add callback of 'complete' event

    theGame.load.start();
  }
}
