import {logger} from 'logger'

let rootNodeId = "gameUi"
let Quintus = require('quintus')

let options = {
	development: true,
	imagePath: "./",
  audioPath: "./",
  dataPath: "./"
}

let setup = {
  width:   800, // Set the default width to 800 pixels
  height:  600, // Set the default height to 600 pixels

  // upsampleWidth:  420,  // Double the pixel density of the
  // upsampleHeight: 320,  // game if the w or h is 420x320
  //                       // or smaller (useful for retina phones)
  // downsampleWidth: 1024, // Halve the pixel density if resolution
  // downsampleHeight: 768,  // is larger than or equal to 1024x768	
	scaleToFit: false
}

export let Q = Quintus(options).include("Sprites, Scenes, Input, Touch, UI, 2D").setup(rootNodeId, setup).touch(0xFFFF)

// Q.input.keyboardControls()
Q.controls()

Q.assets = {}

Q.CONST = {
	tileSize: 32,
	rootNodeId: rootNodeId
}

Q.tileToPoint = function (props) {
	// Returns pixel coordinates
	let result = props * Q.CONST.tileSize + Q.CONST.tileSize/2
	return result
}

Q.pointToTile = function (props) {
	// Returns Tile number
	let result = Math.floor( props / Q.CONST.tileSize )
	return result
}