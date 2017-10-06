import {logger} from 'logger'
import {Q} from 'qObject'

// import tiles from 'assets/images/tiles.png'
// import level from 'assets/json/level.json'

import playerImg from 'assets/images/droid_32x32.png'

import tileSheet from 'assets/images/desert_sheet.png'
import tileData from 'assets/json/ground.json'

import spritesImg from 'assets/images/sprites.png'
import spritesData from 'assets/json/sprites.json'


export class AssetLoader {
  constructor(props) {
		this.callback = props.callback
		this.assets = {}

		// this.assets["tiles"] = tiles
		// this.assets["level"] = level

		this.assets["playerImg"] = playerImg

		this.assets["tileSheet"] = tileSheet
		this.assets["tileData"] = tileData

		this.assets["spritesImg"] = spritesImg
		this.assets["spritesData"] = spritesData

  }	

	
	start() {
		this.preload()
	}

	preload(props) {
		let self = this
		for (let i in this.assets) {
			let asset = this.assets[i]
			logger.log("Loading image: " + asset)
			Q.preload(asset)
		}
	

		Q.preload(function() {
			logger.log("Preload finished.")
			self.createSpriteSheets()
		})
	}

	createSpriteSheets() {
		logger.log("Creating sprite sheets..")

		Q.compileSheets(spritesImg, spritesData);

		// Q.sheet("tiles", tiles, { tilew: 32, tileh: 32 });

		Q.sheet("Player", playerImg, { 
			tilew: 32, 
			tileh: 32 
		});

		Q.sheet("Desert", tileSheet, {
	      tilew: 33,
	      tileh: 33,
				w: 265,
				h: 199,
				cols: 8,
				spacingX: 0, // - spacing between each tile x (after 1st)
				spacingY: 0, // - spacing between each tile y
				marginX: 1, // - margin around each tile x
				marginY: 1, // - margin around each tile y							
	      sx: 1,   // start the sprites at x=0
	      sy: 1    // and y=0
    });
		
		this.onFinish()
	}

	onFinish() {
		console.log(":: AssetLoader")
		console.dir(this.callback)
		
		this.callback({assets: this.assets})
	}
	
}