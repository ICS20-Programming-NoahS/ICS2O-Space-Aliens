/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Instruction Scene

class InstructionScene extends Phaser.Scene {
  constructor () {
    super({ key: "instructionScene" })

    // initialize the instruction scene background image as null
    this.instructionSceneBackgroundImage = null

    // initialize the menu button image as null
    this.menuButton = null

    // initialize the instruction scene text as null
    this.instructionSceneText = null

    // Add the style for the instruction scene text
    this.instructionSceneTextStyle = { font: "35px Roboto", fill: "#ffa500", align: "left" }
  }
  
  init (data) {

    // set the background color to purple
    this.cameras.main.setBackgroundColor("#a020f0")
  }
  
  preload () {
    console.log("Instruction Scene")

    // load the instruction scene background image
    this.load.image("instructionSceneBackground", "images/space_background2.png")

    // load the menu button image
    this.load.image("menuButton", "images/menu.png")
  }
  
  create (data) {

    // scale and center the instruction scene background image
    this.instructionSceneBackgroundImage = this.add.sprite(0,0, "instructionSceneBackground").setScale(2.77)
    this.instructionSceneBackgroundImage.x = 1920 / 2
    this.instructionSceneBackgroundImage.y = 1080 / 2

    // position the menu button and have it respond to the user's click
    this.menuButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, "menuButton")
    this.menuButton.setInteractive({ useHandCursor: true })
    this.menuButton.on("pointerdown", () => this.clickButton())

    // Create and position the instruction scene text with line breaks
    this.instructionSceneText = this.add.text(1920 /2, (1080 /2) - 350, "You are traveling through space trying to escape the aliens that are trying to prevent you from getting home to earth. \n You need to dodge or destroy the aliens trying to stop you. \n Every time you destroy an alien, you gain a point and two others spawn, so it gets progressively harder. \n Use the left and right arrow keys to move your spaceship and use the spacebar to shoot. \n Try to get the highest score possible. Good luck!", this.instructionSceneTextStyle).setOrigin(0.5)
  }
  
  update (time, delta) { 
  }

  // go to the menu scene if the user clicks the menu button
  clickButton () {
    this.scene.start("menuScene")
  }
}

export default InstructionScene