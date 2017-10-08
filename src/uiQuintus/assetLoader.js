import {logger} from 'logger'
import {Q} from 'qObject'

// Environment assets
import envDesertImg from 'assets/ui/env/desert/desert.png'
import envDesertDataL from 'assets/ui/env/desert/desert_L.json'
import envDesertDataM from 'assets/ui/env/desert/desert_M.json'
import envDesertDataS from 'assets/ui/env/desert/desert_S.json'
import envDesertDataXS from 'assets/ui/env/desert/desert_XS.json'

// Player assets
import playerImg from 'assets/ui/player/droid_32x32.png'

// Area Obect Assets
import aoBush1Img from 'assets/ui/env/desert/desert_object_bush_1.png'
import aoBush2Img from 'assets/ui/env/desert/desert_object_bush_2.png'
import aoBush3Img from 'assets/ui/env/desert/desert_object_bush_3.png'
import aoBush4Img from 'assets/ui/env/desert/desert_object_bush_4.png'
import aoBush5Img from 'assets/ui/env/desert/desert_object_bush_5.png'
import aoBush6Img from 'assets/ui/env/desert/desert_object_cactus.png'

import aoRock1Img from 'assets/ui/env/desert/desert_object_rock.png'


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
					this.loadDesertAssets({areaSize: areaSize})
	        break

		    default:
					this.loadDesertAssets()
		}

		this.assets["playerImg"] = playerImg
	}

	preload(props) {
		let self = this

		for (let i in this.assets) {
			// logger.log("Loading asset: " + this.assets[i])
			Q.preload(this.assets[i])
		}

		Q.preload(function() {
			logger.log("Preload finished.")
			self.createSpriteSheets()
		})
	}

	createSpriteSheets() {
		logger.log("Creating sprite sheets..")

		Q.sheet("environment", this.assets["envImg"], {
	      tilew: Q.CONST.tileSize,
	      tileh: Q.CONST.tileSize,
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

		Q.sheet("Bush_1", aoBush1Img, { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("Bush_2", aoBush2Img, { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("Player", playerImg, 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		
		this.onFinish()
	}

	onFinish() {
		this.callback({assets: this.assets})
	}
	
	loadDesertAssets(props) {
		let areaSize = props.areaSize

		this.assets["envImg"] = envDesertImg

		this.assets["aoBush1Img"] = aoBush1Img
		this.assets["aoBush2Img"] = aoBush2Img
		this.assets["aoBush3Img"] = aoBush3Img
		this.assets["aoBush4Img"] = aoBush4Img
		this.assets["aoBush5Img"] = aoBush5Img
		this.assets["aoBush6Img"] = aoBush6Img

		this.assets["aoRock1Img"] = aoRock1Img

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

		
	}
	
}