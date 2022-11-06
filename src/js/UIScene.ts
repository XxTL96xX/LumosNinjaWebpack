import { io } from "socket.io-client";
import * as weapons from "../data/weapon.json";

var gameScene;
var inventoryActive = false;

var inventoryGroup;
var boughtItemUIGroup;
var successItemGroup;
var failItemGroup;
var gameOverGroup;

var item1Group;
var item2Group;
var item3Group;
var item4Group;

var allItemGroups = [];
var shouldActivateItems = [false, false, false, false];

var weaponKeyNames = ["weaponA", "weaponB", "weaponC", "weaponD"];
var weaponUrls = [];


export default class UIScene extends Phaser.Scene {
    constructor() {
        //super({ key: 'UI-Scene', active: true });
        super({ key: 'UI-Scene', active: false });
    }

    preload() {

    }

    create() {
        //WEAPON LIST FOR SHOP
        /**
         * SAMPLE DATA THAT WILL BE RECEIVED FROM SOCKET
         * 
         * 
         * 
         *{
            "func": "get_shop_weapon_list",
            "data": [
                "https://ipfs.io/ipfs/bafybeih2sc4vgcjc6nyi5p3arnadxuav34rsnogkagvyec7p247cova3uq/Axe.png",
                "https://ipfs.io/ipfs/bafybeie6t7nqxmhzkmjpksuxgtxhqx272glvxgv6n4gtr7j4kdmh5fcxea/Kunai.png",
                "https://ipfs.io/ipfs/bafybeidax2phyhpknvh6mge3ku5q5bvnze7pubsuuvmcmp2ltgydwrqlxu/Sword.png",
                "https://ipfs.io/ipfs/bafybeicfup4hp6acdlp7tst6i7jx3626t7gnqsbfi76smo6aunt7srnpje/Hammer.png"
            ]
        }  
        */

        try {
            var socket = io("http://localhost:3010");

            socket.emit('get_shop_weapon_list', weapons);

            socket.on('output_weapon_shop', function (msg) {
                console.log("msg", msg)
                weaponUrls = msg.data;
                for (var i = 0; i < msg.data.length; i++) {
                    this.LoadShopWeapons(this, weaponKeyNames[i], msg.data[i], i);
                }
            });

        } catch (e) {
            console.log(e)
        }

        gameScene = this.scene.get('Game-Scene');

        var inventoryTxt = this.make.text({
            x: this.game.canvas.width / 2 - 50,
            y: this.game.canvas.height / 2 - 200,
            text: 'Shop Menu',
            style: {
                font: '20px monospace',
                color: "#FF00FF",
                wordWrap: { width: 270, useAdvancedWrap: true }
            }
        }).setDepth(100);

        var inventoryIcon = this.add.sprite(this.game.canvas.width - 50, 50, "smallUIBox").setInteractive();
        inventoryIcon.setScrollFactor(0);

        var inventoryIconTxt = this.make.text({
            x: inventoryIcon.x,
            y: inventoryIcon.y,
            text: 'Shop',
            style: {
                font: '10px monospace',
                color: "#FFFFFF",
                wordWrap: { width: 270, useAdvancedWrap: true }
            }
        }).setDepth(100).setOrigin(0.5);

        inventoryGroup = this.add.group();
        boughtItemUIGroup = this.add.group();
        successItemGroup = this.add.group();
        failItemGroup = this.add.group();
        gameOverGroup = this.add.group();
        item1Group = this.add.group();
        item2Group = this.add.group();
        item3Group = this.add.group();
        item4Group = this.add.group();

        var inventoryMenu = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "UIBox");
        inventoryMenu.setScale(3);
        inventoryMenu.setScrollFactor(0);


        var item1 = this.add.sprite(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 - 100, "smallUIBox");
        item1.setScale(2);
        item1.setScrollFactor(0);

        var item1Image = this.add.sprite(item1.x, item1.y, "kunai");
        item1Image.setScale(3);
        item1Image.setScrollFactor(0);

        var item1Purchase = this.add.sprite(item1.x, item1.y + 50, "buyBox").setInteractive();
        item1Purchase.setScrollFactor(0);


        var item2 = this.add.sprite(this.game.canvas.width / 2 + 75, this.game.canvas.height / 2 - 100, "smallUIBox");
        item2.setScale(2);
        item2.setScrollFactor(0);

        var item2Image = this.add.sprite(item2.x, item2.y, "kunai");
        item2Image.setScale(3);
        item2Image.setScrollFactor(0);

        var item2Purchase = this.add.sprite(item2.x, item2.y + 50, "buyBox").setInteractive();
        item2Purchase.setScrollFactor(0);


        var item3 = this.add.sprite(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 + 75, "smallUIBox");
        item3.setScale(2);
        item3.setScrollFactor(0);

        var item3Purchase = this.add.sprite(item3.x, item3.y + 50, "buyBox").setInteractive();
        item3Purchase.setScrollFactor(0);

        var item3Image = this.add.sprite(item3.x, item3.y, "kunai");
        item3Image.setScale(3);
        item3Image.setScrollFactor(0);


        var item4 = this.add.sprite(this.game.canvas.width / 2 + 75, this.game.canvas.height / 2 + 75, "smallUIBox");
        item4.setScale(2);
        item4.setScrollFactor(0);

        var item4Image = this.add.sprite(item4.x, item4.y, "kunai");
        item4Image.setScale(3);
        item4Image.setScrollFactor(0);

        var item4Purchase = this.add.sprite(item4.x, item4.y + 50, "buyBox").setInteractive();
        item4Purchase.setScrollFactor(0);

        item1Group.add(item1);
        item1Group.add(item1Image);
        item1Group.add(item1Purchase);
        item2Group.add(item2);
        item2Group.add(item2Image);
        item2Group.add(item2Purchase);
        item3Group.add(item3);
        item3Group.add(item3Image);
        item3Group.add(item3Purchase);
        item4Group.add(item4);
        item4Group.add(item4Image);
        item4Group.add(item4Purchase);

        item1Group.setVisible(false);
        item2Group.setVisible(false);
        item3Group.setVisible(false);
        item4Group.setVisible(false);

        allItemGroups.push(item1Group, item2Group, item3Group, item4Group);

        inventoryGroup.add(inventoryTxt);
        inventoryGroup.add(inventoryMenu);
        inventoryGroup.add(item1Group);
        inventoryGroup.add(item2Group);
        inventoryGroup.add(item3Group);
        inventoryGroup.add(item4Group);

        item1Purchase.on("pointerdown", () => {
            boughtItemUIGroup.setVisible(true);
            
            if(weaponUrls.length >= 1){
                var url = weaponUrls[0];
            }
            //IfSuccess
            successItemGroup.setVisible(true);
            successOkButton.on("pointerdown", () => {
                this.LoadWeapon(this, "weaponA", "https://www.models-resource.com/resources/big_icons/47/46765.png");
            });

            //If Fail
            //this.FailPurchaseUI();
        })

        item2Purchase.on("pointerdown", () => {
            boughtItemUIGroup.setVisible(true);
            
            if(weaponUrls.length >= 2){
                var url = weaponUrls[1];
            }
            //IfSuccess
            successItemGroup.setVisible(true);
            successOkButton.on("pointerdown", () => {
                this.LoadWeapon(this, "weaponB", "https://ipfs.io/ipfs/bafybeiftozlbi6xzus4cwafyx7fchi4wgqqrzszy3c6edzft5fj7k6fnre/Sprite.png");
            });

            //If Fail
            //this.FailPurchaseUI();
        })

        item3Purchase.on("pointerdown", () => {
            boughtItemUIGroup.setVisible(true);
            
            if(weaponUrls.length >= 3){
                var url = weaponUrls[2];
            }
            //IfSuccess
            successItemGroup.setVisible(true);
            successOkButton.on("pointerdown", () => {
                this.LoadWeapon(this, "weaponC", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP59xUwswU7oPpPUZ_CbN1rzneNS8Nj6gIQuMxVIAyaVQyKTu5AF2Pz9T3RT5AuIb3QRc&usqp=CAU");
            });

            //If Fail
            //this.FailPurchaseUI();
        })

        item4Purchase.on("pointerdown", () => {
            boughtItemUIGroup.setVisible(true);
            
            if(weaponUrls.length >= 4){
                var url = weaponUrls[3];
            }
            //IfSuccess
            successItemGroup.setVisible(true);
            successOkButton.on("pointerdown", () => {
                this.LoadWeapon(this, "weaponD", "https://www.tldevtech.com/wp-content/uploads/2020/09/sword_hrey_02.png");
            });

            //If Fail
            //this.FailPurchaseUI();
        })


        inventoryIcon.on("pointerdown", () => {
            //inventoryMenu.setVisible(!inventoryMenu.visible);
            inventoryActive = !inventoryActive;
            inventoryGroup.setVisible(inventoryActive);

            for (var i = 0; i < shouldActivateItems.length; i++) {
                if (inventoryActive) {
                    allItemGroups[i].setVisible(shouldActivateItems[i]);
                }
                else {
                    allItemGroups[i].setVisible(false);
                }
            }

            if (inventoryActive) {
                gameScene.scene.pause();
            }
            else {
                gameScene.scene.resume();
            }
        })

        inventoryGroup.setVisible(false);

        var boughtItemBG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "UIBox");
        boughtItemBG.setScale(1.5);
        boughtItemBG.setScrollFactor(0);

        var successBoughtTxt = this.make.text({
            x: boughtItemBG.x - 70,
            y: boughtItemBG.y - 20,
            text: 'Purchased Successfully!',
            style: {
                font: '20px monospace',
                color: "#000000",
                wordWrap: { width: 200, useAdvancedWrap: true },
                align: 'center'
            }
        }).setDepth(100).setVisible(false);

        var failedToBuyTxt = this.make.text({
            x: boughtItemBG.x - 77.5,
            y: boughtItemBG.y - 45,
            text: 'Failed to purchase/Already purchased!',
            style: {
                font: '18px monospace',
                color: "#000000",
                wordWrap: { width: 200, useAdvancedWrap: true },
                align: 'center'
            }
        }).setDepth(100).setVisible(false);

        var successOkButton = this.add.sprite(boughtItemBG.x, boughtItemBG.y + 75, "okBox").setInteractive();
        successOkButton.setScale(1);
        successOkButton.setScrollFactor(0);

        var failedOkButton = this.add.sprite(boughtItemBG.x, boughtItemBG.y + 75, "okBox").setInteractive();
        failedOkButton.setScale(1);
        failedOkButton.setScrollFactor(0);

        failedOkButton.on('pointerdown', () => {
            inventoryGroup.children.each(function (item) {
                if (item.input) {
                    item.input.enabled = true;
                }
            }, this);

            failItemGroup.setVisible(false);
        });

        boughtItemUIGroup.add(boughtItemBG);
        successItemGroup.add(successBoughtTxt);
        successItemGroup.add(successOkButton);
        failItemGroup.add(failedToBuyTxt);
        failItemGroup.add(failedOkButton);

        boughtItemUIGroup.setVisible(false);
        successItemGroup.setVisible(false);
        failItemGroup.setVisible(false);

        

        //======GAMEOVER=====
        var gameOverBG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "UIBox");
        gameOverBG.setScale(1.5);
        gameOverBG.setScrollFactor(0);

        var gameOverTxt = this.make.text({
            x: gameOverBG.x - 45,
            y: gameOverBG.y - 20,
            text: 'Game Over',
            style: {
                font: '20px monospace',
                color: "#000000",
                wordWrap: { width: 200, useAdvancedWrap: true },
                align: 'center'
            }
        }).setDepth(100).setVisible(false);

        var gameOverOkButton = this.add.sprite(gameOverBG.x, gameOverBG.y + 75, "okBox").setInteractive();
        gameOverOkButton.setScale(1);
        gameOverOkButton.setScrollFactor(0);

        gameOverOkButton.on("pointerdown", () =>{
            this.RestartGame(this);
        })

        gameOverGroup.add(gameOverBG);
        gameOverGroup.add(gameOverTxt);
        gameOverGroup.add(gameOverOkButton);
        gameOverGroup.setVisible(false);

        this.data.set("GameOverMenu", gameOverGroup);

        //this.LoadShopWeapons(this, weaponKeyNames[0], "https://ipfs.io/ipfs/bafybeih2sc4vgcjc6nyi5p3arnadxuav34rsnogkagvyec7p247cova3uq/Axe.png", 0);
        //this.LoadShopWeapons(this, weaponKeyNames[1], "https://ipfs.io/ipfs/bafybeicfup4hp6acdlp7tst6i7jx3626t7gnqsbfi76smo6aunt7srnpje/Hammer.png", 1);
        //console.log(allItemGroups);
        //allItemGroups[1].setVisible(true);
    }

    update(time: number, delta: number): void {

    }

    SuccessPurchaseUI() {

    }

    FailPurchaseUI() {
        //IfFail
        inventoryGroup.children.each(function (item) {
            if (item.input) {
                item.input.enabled = false;
            }
        }, this);

        failItemGroup.setVisible(true);
    }

    LoadShopWeapons(theGame, key, url, index) {
        if (!theGame.textures.exists(key)) {
            theGame.load.image(key, url);
            theGame.load.once('complete', () => {
                //allItemGroups[index].setVisible(true);
                allItemGroups[index].children.entries[1].setTexture(key);
                shouldActivateItems[index] = true;
            }, theGame);

            theGame.load.start();
        }
        else {
            //allItemGroups[index].setVisible(true);
            shouldActivateItems[index] = true;
            allItemGroups[index].children.entries[1].setTexture(key);
            //console.log(allItemGroups[index].children.entries[1].texture.key);
        }
    }

    LoadWeapon(theGame, key, url) {
        if (!theGame.textures.exists(key)) {
            theGame.load.image(key, url);
            theGame.load.once('complete', () => {
                //theGame.scene.get("MainMenu-Scene").data.set("weaponKey", key);
                //console.log("Set to : " + theGame.scene.get("MainMenu-Scene").data.get("weaponKey"));
                theGame.RestartGameWithWeapon(theGame);
            }, theGame);

            theGame.load.start();
        }
        else {
            //theGame.scene.get("MainMenu-Scene").data.set("weaponKey", key);
            //console.log("Set to : " + theGame.scene.get("MainMenu-Scene").data.get("weaponKey"));
            theGame.RestartGameWithWeapon(theGame);
        }
    }

    RestartGameWithWeapon(theGame) {
        inventoryActive = false;
        allItemGroups = [];
        shouldActivateItems = [false, false, false, false];

        theGame.data.set("weaponKey", this.scene.get("Game-Scene").data.get("weaponKey"));

        theGame.scene.run("MainMenu-Scene");
        //theGame.scene.start("Game-Scene");
        //theGame.scene.start("UI-Scene");
        theGame.scene.get("Game-Scene").scene.stop();
        theGame.scene.get("UI-Scene").scene.stop();
        //console.log(theGame.scene.get("MainMenu-Scene").scene);
    }

    RestartGame(theGame){
        inventoryActive = false;
        allItemGroups = [];
        shouldActivateItems = [false, false, false, false];

        theGame.data.set("weaponKey", this.scene.get("Game-Scene").data.get("weaponKey"));

        theGame.scene.run("MainMenu-Scene");
        theGame.scene.get("Game-Scene").scene.stop();
        theGame.scene.get("UI-Scene").scene.stop();
    }
}
