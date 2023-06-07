/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Game Scene

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: "gameScene" })

    this.background = null
    this.ship = null
    this.fireMissile = false
  }
  init (data) {
  this.cameras.main.setBackgroundColor("#a020f0")
  }
  
  preload () {
  console.log("Game Scene")

  // images
  this.load.image("space_background2", "assets/space_background2.png")
  this.load.image("ship", "assets/spaceShip.png")
  this.load.image("missile", "assets/missile.png")
  }
  
  create (data) {
    this.background = this.add.image(0, 0, "space_background2").setScale(3.6)
    this.background.setOrigin(0, 0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship")

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()
  }
  
  update (time, delta) {
    // called 60 times a second
    
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }
    
    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, "missile")
        this.missileGroup.add(aNewMissile)
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
  }
}

export default GameScene