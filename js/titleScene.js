/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: "200px Impact", fill: "#ff0000", align: "center" }
  }
  init (data) {
  this.cameras.main.setBackgroundColor("#a020f0")
  }
  
  preload () {
  console.log("Title Scene")
  this.load.image("titleSceneBackground", "assets/space_background.png")
  }
  
  create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0,0, "titleSceneBackground").setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
    this.titleSceneText = this.add.text(1920 /2, (1080 /2) - 250, "Space Aliens", this.titleSceneTextStyle).setOrigin(0.5)
  }
  
  update (time, delta) {
     if (time > 6000) {
      this.scene.switch("menuScene")
    }   
  }
}

export default TitleScene