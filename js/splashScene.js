/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Splash Scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: "splashScene" })
  }
  init (data) {
  this.cameras.main.setBackgroundColor("#ff0000")
  }
  
  preload () {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "./assets/splashSceneImage.png")
  }
  
  create (data) {
    this.splashSceneBackgroundImage = this.addsprite(0,0, "splashSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.x = 1080 / 2
  }
  
  update (time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene")
    }   
  }
}

export default SplashScene