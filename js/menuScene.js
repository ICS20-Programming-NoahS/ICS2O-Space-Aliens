/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: "menuScene" })

    // Initialize the menu scene background image to null
    this.menuSceneBackgroundImage = null

    // Initialize the start button image to null
    this.startButton = null

    // Initialize the instructions button image as null
    this.instructionsButton = null

    // Initialize the menu soundtrack as null
    this.soundtrack = null
  }
  
  init (data) {

    // Set the background color to purple
    this.cameras.main.setBackgroundColor("#a020f0")
  }
  
  preload () {
    console.log("Menu Scene")

    // images
    this.load.image("menuSceneBackground", "images/space_background2.png")
    this.load.image("startButton", "images/start.jpeg")
    this.load.image("instructionsButton", "images/instructions.png")

    // load soundtrack for the menu scene
    this.load.audio("menusoundtrack", "sounds/menu_soundtrack.mp3")
  }
  
  create (data) {

    // add the menu scene soundtrack
    this.soundtrack = this.sound.add("menusoundtrack")
    this.soundtrack.loop = true
    this.soundtrack.resume()
    this.soundtrack.play()
    
    // scale and center the menu scene background image
    this.menuSceneBackgroundImage = this.add.sprite(0,0, "menuSceneBackground").setScale(2.77)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // position the start button and have it respond to user's click
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.clickStartButton())

    // position the instructions button and have it respond to user's click
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 400, "instructionsButton")
    this.instructionsButton.setInteractive({ useHandCursor: true })
    this.instructionsButton.on("pointerdown", () => this.clickInstructionsButton())
  }

  update (time, delta) {
  }

  shutdown() {
    if (this.soundtrack !== null) {
      this.soundtrack.stop()
    }
  }
  
  // go to the game scene if the user clicks the start button
  clickStartButton () {
    this.soundtrack.stop()
    this.scene.start("gameScene")
  }

  // go to the instruction scene if the user clicks the instructions button
  clickInstructionsButton () {
    this.soundtrack.stop()
      this.scene.start("instructionScene")
  }
}

export default MenuScene

