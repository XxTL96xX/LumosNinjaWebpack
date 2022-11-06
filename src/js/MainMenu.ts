import { io } from "socket.io-client";
import * as weapons from "../data/weapon.json";

var inventoryActive;
var startGameTxt;

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu-Scene', active: true });
    }

    preload() {

    }

    create() {
        this.data.set("weaponKey", "kunai");
        
        if (typeof (window as any).ethereum !== "undefined") {
            (window as any).ethereum
                .request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                    const account = accounts[0]

                    console.log(account)

                    try {
                        var socket = io("http://localhost:3010");

                        socket.emit('get_current_weapon', account);

                        socket.on('output_current_weapon', function (msg) {
                            console.log("msg", msg)
                            
                            if(msg.data[0] != null){
                                this.LoadEquippedWeapon(this, "weaponDefault", msg.data[0])
                            }
                            else{
                                this.data.set("weaponKey", "kunai");
                            }
                        });

                    } catch (e) {
                        console.log(e)
                    }

                })
        } else {
            window.open("https://metamask.io/download/", "_blank");
        }

        /*if (this.data.get("weaponKey") == "kunai" || this.data.get("weaponKey") == null)
            this.data.set("weaponKey", "kunai");
        else
            this.data.set("weaponKey", this.data.get("weaponKey"));*/

            /*if(this.data.get("weaponKey") == "kunai" || this.data.get("weaponKey") == null){
                this.LoadEquippedWeapon(this, "weaponDefault", "https://ipfs.io/ipfs/bafybeidax2phyhpknvh6mge3ku5q5bvnze7pubsuuvmcmp2ltgydwrqlxu/Sword.png");
            }
            else{
                this.data.set("weaponKey", "kunai");
            }*/

        //BUY WEAPON
        // try{
        //     var socket = io("http://localhost:3010");

        //     socket.emit('buy_weapon', walletAddress, weapon_url_image);

        //     // socket.on('output_weapon_shop', function(msg) {
        //     // console.log("msg", msg)
        //     // });

        // }catch(e){
        //     console.log(e)
        // }

        startGameTxt = this.make.text({
            x: this.game.canvas.width / 2 + 15,
            y: this.game.canvas.height / 2,
            text: 'Start Game',
            style: {
                font: '20px monospace',
                color: "#FFFFFF",
                wordWrap: { width: 270, useAdvancedWrap: true }
            }
        }).setOrigin(0.5).setInteractive();

        /*var ShopText = this.make.text({
            x: StartGameText.x - 15,
            y: StartGameText.y + 50,
            text: 'Shop',
            style: {
                font: '20px monospace',
                color: "#FFFFFF",
                wordWrap: { width: 270, useAdvancedWrap: true }
            }
        }).setOrigin(0.5).setInteractive();*/

        startGameTxt.on("pointerdown", () => {
            this.scene.get("MainMenu-Scene").scene.pause();
            this.scene.start("Game-Scene");
            this.scene.start("UI-Scene");
        })

        /*var inventoryTxt = this.make.text({
            x: this.game.canvas.width / 2 - 50,
            y: this.game.canvas.height / 2 - 200,
            text: 'Shop Menu',
            style: {
                font: '20px monospace',
                color: "#FF00FF",
                wordWrap: { width: 270, useAdvancedWrap: true }
            }
        }).setDepth(100);*/

        //var inventoryGroup = this.add.group();

        var profileIcon = this.add.sprite(this.game.canvas.width - 50, 50, "smallUIBox").setInteractive();
        profileIcon.setScrollFactor(0);

        var profileIconTxt = this.make.text({
            x: profileIcon.x,
            y: profileIcon.y,
            text: 'Profile',
            style: {
                font: '10px monospace',
                color: "#FFFFFF",
                wordWrap: { width: 270, useAdvancedWrap: true }
            }
        }).setDepth(100).setOrigin(0.5);

        /*var inventoryMenu = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "UIBox");
        inventoryMenu.setScale(3);
        inventoryMenu.setScrollFactor(0);

        var item1 = this.add.sprite(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 - 100, "smallUIBox");
        item1.setScale(2);
        item1.setScrollFactor(0);

        var item1Image = this.add.sprite(item1.x, item1.y, "kunai");
        item1Image.setScale(3);
        item1Image.setScrollFactor(0);

        var item1Purchase = this.add.sprite(item1.x, item1.y + 50, "equipBox").setInteractive();
        item1Purchase.setScrollFactor(0);


        var item2 = this.add.sprite(this.game.canvas.width / 2 + 75, this.game.canvas.height / 2 - 100, "smallUIBox");
        item2.setScale(2);
        item2.setScrollFactor(0);

        var item2Image = this.add.sprite(item2.x, item2.y, "kunai");
        item2Image.setScale(3);
        item2Image.setScrollFactor(0);

        var item2Purchase = this.add.sprite(item2.x, item2.y + 50, "equipBox").setInteractive();
        item2Purchase.setScrollFactor(0);


        var item3 = this.add.sprite(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 + 75, "smallUIBox");
        item3.setScale(2);
        item3.setScrollFactor(0);

        var item3Purchase = this.add.sprite(item3.x, item3.y + 50, "equipBox").setInteractive();
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

        var item4Purchase = this.add.sprite(item4.x, item4.y + 50, "equipBox").setInteractive();
        item4Purchase.setScrollFactor(0);


        inventoryGroup.add(inventoryTxt);
        inventoryGroup.add(inventoryMenu);
        inventoryGroup.add(item1);
        inventoryGroup.add(item1Image);
        inventoryGroup.add(item1Purchase);
        inventoryGroup.add(item2);
        inventoryGroup.add(item2Image);
        inventoryGroup.add(item2Purchase);
        inventoryGroup.add(item3);
        inventoryGroup.add(item3Image);
        inventoryGroup.add(item3Purchase);
        inventoryGroup.add(item4);
        inventoryGroup.add(item4Image);
        inventoryGroup.add(item4Purchase);

        item1Purchase.on("pointerdown", () => {

        })

        item2Purchase.on("pointerdown", () => {

        })

        item3Purchase.on("pointerdown", () => {

        })

        item4Purchase.on("pointerdown", () => {

        })*/

        profileIcon.on("pointerdown", () => {
            //inventoryMenu.setVisible(!inventoryMenu.visible);
            //inventoryActive = !inventoryActive;
            //inventoryGroup.setVisible(inventoryActive);

            //Open Profile Here
        })

        //inventoryGroup.setVisible(false);
    }

    update(time: number, delta: number): void {
        startGameTxt.active = true;
        startGameTxt.setVisible(true);
    }

    LoadEquippedWeapon(theGame, key, url) {
        if (!theGame.textures.exists(key)) {
            theGame.load.image(key, url);
            theGame.load.once('complete', () => {
                this.data.set("weaponKey", key);
                //console.log("data in MM : " + this.data.get("weaponKey"));
            }, theGame);

            theGame.load.start();
        }
        else {
            this.data.set("weaponKey", key);
        }
    }
}
