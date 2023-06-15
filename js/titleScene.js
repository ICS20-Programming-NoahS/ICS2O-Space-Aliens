/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene" })

    // initialize the title scene background image as null
    this.titleSceneBackgroundImage = null

    // initialize the title scene text as null
    this.titleSceneText = null

    // Add the style for the title scene text
    this.titleSceneTextStyle = { font: "200px Impact", fill: "#ff0000", align: "center" }
  }
  
  init (data) {

    // set the background color to purple
    this.cameras.main.setBackgroundColor("#a020f0")
  }
  
  preload () {
    console.log("Title Scene")

    // load the title scene background image
    this.load.image("titleSceneBackground", "images/space_background.png")
  }
  
  create (data) {

    // scale and center the title scene background image
    this.titleSceneBackgroundImage = this.add.sprite(0,0, "titleSceneBackground").setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    // Create and position the title scene text
    this.titleSceneText = this.add.text(1920 /2, (1080 /2) - 250, "Space Aliens", this.titleSceneTextStyle).setOrigin(0.5)
  }
  
  update (time, delta) {

    // switch to the menu scene after 8 seconds
    if (time > 8000) {
      this.scene.switch("menuScene")
    }   
  }
}

export default TitleScene