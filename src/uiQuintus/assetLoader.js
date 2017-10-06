import {logger} from 'logger'
import {Q} from 'qObject'

// Environment assets
import envDesertImg from 'assets/ui/env/desert.png'
import envDesertDataL from 'assets/ui/env/desert_L.json'
import envDesertDataM from 'assets/ui/env/desert_M.json'
import envDesertDataS from 'assets/ui/env/desert_S.json'
import envDesertDataXS from 'assets/ui/env/desert_XS.json'

// Player assets
import playerImg from 'assets/ui/player/droid_32x32.png'

// Area Obect Assets


export class AssetLoader {
  constructor(props) {
		this.session
		this.assets = {}
		this.callback = props.callback
  }	

	setSession(props) {
		this.session = props.session
	}
	
	start() {
		this.prepareAssets()
		this.preload()
	}

	prepareAssets() {
		let locData = this.session.currentLocation
		let environment = locData.environment
		let areaSize = locData.areaSize
		
		switch(environment) {
		    case "desert":
					this.assets["envImg"] = envDesertImg
	        break

		    default:
					this.assets["envImg"] = envDesertImg
		}


		switch(areaSize) {
	    case "XS":
				this.assets["envData"] = envDesertDataXS
	      break

	    case "S":
				this.assets["envData"] = envDesertDataS
        break

	    case "M":
				this.assets["envData"] = envDesertDataM
        break

	    case "L":
				this.assets["envData"] = envDesertDataL
        break

	    default:
				this.assets["envData"] = envDesertDataM
		}

		this.assets["playerImg"] = playerImg
		
	}


	preload(props) {
		let self = this

		for (let i in this.assets) {
			let asset = this.assets[i]
			logger.log("Loading asset: " + asset)
			Q.preload(asset)
		}

		Q.preload(function() {
			logger.log("Preload finished.")
			self.createSpriteSheets()
		})
	}

	createSpriteSheets() {
		logger.log("Creating sprite sheets..")

		Q.sheet("environment", this.assets["envImg"], {
	      tilew: 32,
	      tileh: 32,
				w: 160,
				h: 96,
				cols: 5,
				spacingX: 0, // - spacing between each tile x (after 1st)
				spacingY: 0, // - spacing between each tile y
				marginX: 0, // - margin around each tile x
				marginY: 0, // - margin around each tile y							
	      sx: 0,   // start the sprites at x=0
	      sy: 0    // and y=0
    });

		Q.sheet("Player", playerImg, { 
			tilew: 32, 
			tileh: 32 
		});

		
		this.onFinish()
	}

	onFinish() {
		console.log(":: AssetLoader")
		console.dir(this.callback)
		
		this.callback({assets: this.assets})
	}
	
}