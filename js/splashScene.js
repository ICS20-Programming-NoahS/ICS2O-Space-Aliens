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
  // set background color to red
  this.cameras.main.setBackgroundColor("#ff0000")
  }
  
  preload () {
    console.log("Splash Scene")

    // load splash scene image
    this.load.image("splashSceneBackground", "./images/splashSceneImage.png")
  }
  
  create (data) {

    // center splash scene image
    this.splashSceneBackgroundImage = this.add.sprite(0,0, "splashSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2

    // Fade in effect
    function fadeInImage(scene, image, duration) {
      scene.tweens.add({
        targets: image,
        alpha: 1,
        duration: duration,
        ease: "Linear"
      })
    }
    
    // Fade out effect
    function fadeOutImage(scene, image, duration) {
      scene.tweens.add({
        targets: image,
        alpha: 0,
        duration: duration,
        ease: "Linear"
      })
    }
    
    // Example usage
    this.splashSceneBackgroundImage.alpha = 0
    
    // Fade in the image over 1 second
    fadeInImage(this, this.splashSceneBackgroundImage, 1000)
    
    // Fade out the image after 3 seconds
    setTimeout(() => {
      fadeOutImage(this, this.splashSceneBackgroundImage, 1000)
    }, 3000)
  }

  // switch to the title scene after 5 seconds
  update (time, delta) {
    if (time > 5000) {
      this.scene.switch("titleScene")
    }   
  }
}

export default SplashScene