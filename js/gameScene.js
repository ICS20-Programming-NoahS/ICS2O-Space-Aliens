/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Game Scene

class GameScene extends Phaser.Scene {

  // reset the score to 0
  resetScore() {
    this.score = 0
    this.scoreText.setText("Score: " + this.score.toString())
  }

  // create an alien
  createAlien () {

    // This will get a number between 1 and 1920
    const alienXLocation = Math.floor(Math.random() * 1920) + 1

    // This will get a number between 1 and 50
    let alienXVelocity = Math.floor(Math.random() * 50) + 1

    // This will add minus sign in 50% of cases
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1

    // create an alien
    const anAlien = this.physics.add.sprite(alienXLocation, -100, "alien")

    // set the x and y velocity of the alien to make it move
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity

    // add the alien to the alien group
    this.alienGroup.add(anAlien)
  }
  
  constructor () {
    super({ key: "gameScene" })

    // initialize the background as null
    this.background = null

    // initialize the space ship as null
    this.ship = null

    // initialize firing a missile as false
    this.fireMissile = false

    // initialize the score as 0
    this.score = 0

    // initialize the score text as null
    this.scoreText = null

    // add the style for the score text
    this.scoreTextStyle = { font: "65px Ariel", fill: "#ffffff", align: "center" }

    // initialize the game over text as null
    this.gameOverText = null

    // add the style for the gamer over text
    this.gameOverTextStyle = { font: "65px Ariel", fill: "#ffffff", align: "center"}
  }
  
  init (data) {

    // set the background to purple
    this.cameras.main.setBackgroundColor("#a020f0")
  }
  
  preload () {
    console.log("Game Scene")

    // images
    this.load.image("space_background2", "images/space_background2.png")
    this.load.image("ship", "images/spaceShip.png")
    this.load.image("missile", "images/missile.png")
    this.load.image("alien", "images/alien.png")

    // sounds
    this.load.audio("laser", "sounds/laser.wav")
    this.load.audio("explosion", "sounds/explosion.wav")
    this.load.audio("gameOver", "sounds/gameOver.mp3")
    this.load.audio("soundtrack", "sounds/soundtrack.mp3")
  }
  
  create (data) {

    // scale and center the background image
    this.background = this.add.image(0, 0, "space_background2").setScale(3.6)
    this.background.setOrigin(0, 0)

    // Create and position the score text
    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)

    // create a ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship")

     // add the game scene soundtrack
    const soundtrack =  this.sound.add("soundtrack")
    soundtrack.loop = true

    // play the soundtrack
    soundtrack.play()

    // Create a timer to spawn an alien every second
    this.spawnAlienTimer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.createAlien,
      callbackScope: this,
    });

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()

    // create a group for the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    // collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {

      // Destroy the alien and the missile that collided
      alienCollide.destroy()
      missileCollide.destroy()

      // Play an explosion sound effect when a missile and an alien collide
      this.sound.play("explosion")

      // increase the score by one
      this.score++

      // update the score text
      this.scoreText.setText("Score: " + this.score.toString())

      // Create two aliens for every alien destroyed
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {

      // Stop the music when the ship gets hit
      this.sound.stopAll()

      // Play the gameover music
      this.sound.play("gameOver")

      // Stop all movement and destroy the ship
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()

      // Create and position the game over text and have the click to play again react to the user's click
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over!\nClick to play again.", this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on("pointerdown", () => {
        
        // reset the score to zero after the user clicks to play again
        this.resetScore()
        this.scene.start("gameScene")
      })
    }.bind(this))
  }
  
  update (time, delta) {

    // create a keyboard input for the LEFT key
    const keyLeftObj = this.input.keyboard.addKey("LEFT")

    // create a keyboard input for the RIGHT key
    const keyRightObj = this.input.keyboard.addKey("RIGHT")

    // create a keyboard input for the space bar
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    // move the ship to the left when the LEFT key is pressed
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15

      // wrap the ship around to the right side of the screen if it goes off the left edge
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    // move the ship to the right when the RIGHT key is pressed
    if (keyRightObj.isDown === true) {
      this.ship.x += 15

      // wrap the ship around to the left side of the screen if it goes off the right edge
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

    // fire a missile when the space bar is pressed
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, "missile")
        this.missileGroup.add(aNewMissile)

        // play a laser sound when a missile is shot
        this.sound.play("laser")
      }
    }

    // Make the user unable to hold down the space bar to shoot
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    // destroy the missile if it goes off the screen
    this.missileGroup.children.each(function (item) {
      item.y -= 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene