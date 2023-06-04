/* global Phaser */

// Copyright (c) 2023 Noah Smith All rights reserved
//
// Created by: Noah Smith
// Created on: June 2023
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene" })
  }
  init (data) {
  this.cameras.main.setBackgroundColor("#ff0000")
  }
  
  preload () {
  console.log("Title Scene")
  }
  
  create (data) {
  }
  
  update (time, delta) { 
  }
}

export default TitleScene