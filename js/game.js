/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Phaser3 configuration file

//* Game scene */
const config = {
  type: Phaser.AUTO,
  width: 2520,
  height:1480,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  // Set background color
  backgroundColor: 0x166a71,
  scale: {
    mode: Phaser.Scale.FIT,
    // to center it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
console.log(game)