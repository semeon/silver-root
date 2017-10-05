import {logger} from 'logger'
import {Q} from 'qObject'

import exampleImage from 'assets/images/example.png'
import groundImage from 'assets/images/ground-32x32.png'
import tileSheet from 'assets/images/ground_4_32x32.png'
import tileData from 'assets/json/tiles.json'

export class AssetLoader {
  constructor(props) {
		this.callback = props.callback
		this.assets = {}
		this.assets["exampleImage"] = exampleImage
		this.assets["groundImage"] = groundImage
		this.assets["tileSheet"] = tileSheet
		this.assets["tileData"] = tileData
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

		Q.sheet("TILES", tileSheet,
				    {
				      tilew: 32,
				      tileh: 32,
							w: 128,
							h: 32,
							cols: 4,
				      sx: 0,   // start the sprites at x=0
				      sy: 0    // and y=0
				     }
		);
		
		this.onFinish()
	}

	onFinish() {
		console.log(":: AssetLoader")
		console.dir(this.callback)
		
		this.callback({assets: this.assets})
	}
	
}