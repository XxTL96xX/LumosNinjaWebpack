var gameScene;
var inventoryActive = false;

export default class UIScene extends Phaser.Scene {
    constructor() {
        //super({ key: 'UI-Scene', active: true });
        super({ key: 'UI-Scene', active: false });
    }

    preload() {

    }

    create() {
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

        var inventoryGroup = this.add.group();

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
            this.LoadWeapon(this, "weaponA", "https://www.models-resource.com/resources/big_icons/47/46765.png");
        })

        item2Purchase.on("pointerdown", () => {
            this.LoadWeapon(this, "weaponB", "https://ipfs.io/ipfs/bafybeiftozlbi6xzus4cwafyx7fchi4wgqqrzszy3c6edzft5fj7k6fnre/Sprite.png");
        })

        item3Purchase.on("pointerdown", () => {
            this.LoadWeapon(this, "weaponC", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP59xUwswU7oPpPUZ_CbN1rzneNS8Nj6gIQuMxVIAyaVQyKTu5AF2Pz9T3RT5AuIb3QRc&usqp=CAU");
        })

        item4Purchase.on("pointerdown", () => {
            this.LoadWeapon(this, "weaponD", "https://www.tldevtech.com/wp-content/uploads/2020/09/sword_hrey_02.png");
        })


        inventoryIcon.on("pointerdown", () => {
            //inventoryMenu.setVisible(!inventoryMenu.visible);
            inventoryActive = !inventoryActive;
            inventoryGroup.setVisible(inventoryActive);

            if (inventoryActive) {
                gameScene.scene.pause();
            }
            else {
                gameScene.scene.resume();
            }
        })

        inventoryGroup.setVisible(false);
    }

    update(time: number, delta: number): void {

    }

    LoadWeapon(theGame, key, url) {
        theGame.load.image(key, url);   // add task
        // scene.load.image(config); // config: {key, url}
        theGame.load.once('complete', () => {
            theGame.scene.get("MainMenu-Scene").data.set("weaponKey", key);
            console.log("Set to : " + theGame.scene.get("MainMenu-Scene").data.get("weaponKey"));
            theGame.RestartGameWithWeapon(theGame);
        }, theGame);  // add callback of 'complete' event
    
        theGame.load.start();
    }

    RestartGameWithWeapon(theGame){      
        theGame.data.set("weaponKey", this.scene.get("Game-Scene").data.get("weaponKey"));  

        theGame.scene.run("MainMenu-Scene");
        //theGame.scene.start("Game-Scene");
        //theGame.scene.start("UI-Scene");
        theGame.scene.get("Game-Scene").scene.stop();
        theGame.scene.get("UI-Scene").scene.stop();
        console.log(theGame.scene.get("MainMenu-Scene").scene);
    }
}
