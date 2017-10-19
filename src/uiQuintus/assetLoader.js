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

// Area Obect Assets - Desert

import groungDesert1Img from 'assets/ui/env/desert/desert_sand_1.png'

import aoDesertBush1Img from 'assets/ui/env/desert/desert_object_bush_1.png'
import aoDesertBush2Img from 'assets/ui/env/desert/desert_object_bush_2.png'
import aoDesertBush3Img from 'assets/ui/env/desert/desert_object_bush_3.png'
import aoDesertBush4Img from 'assets/ui/env/desert/desert_object_bush_4.png'
import aoDesertBush5Img from 'assets/ui/env/desert/desert_object_bush_5.png'
import aoDesertBush6Img from 'assets/ui/env/desert/desert_object_cactus.png'

import aoDesertRock1Img from 'assets/ui/env/desert/desert_object_rock.png'

// User Interface
import uiMarker1Img from 'assets/ui/ui/marker.png'
import uiPathStep1Img from 'assets/ui/ui/pathStep.png'
import uiPlayerHighlight1Img from 'assets/ui/ui/playerHighlight.png'



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

		// Ground
		Q.sheet("GroundTile_1", this.assets["groundTileImg"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		// Objects
		Q.sheet("Bush_1", this.assets["aoBush1Img"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("Bush_2", this.assets["aoBush2Img"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("Rock_1",	this.assets["aoRock1Img"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		// UI
		Q.sheet("Marker", this.assets["uiMarker"], 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("PathStep", this.assets["uiPathStep"], 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("PlayerHighlight", this.assets["uiPlayerHighlight"], 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		// Creatures
		Q.sheet("Player", playerImg, 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		
		this.onFinish()
	}

	onFinish() {
		this.callback({assets: this.assets})
	}
	
	loadDesertAssets(props) {
		let areaSize = props.areaSize

		this.assets["groundTileImg"] = groungDesert1Img

		this.assets["uiMarker"] = uiMarker1Img
		this.assets["uiPathStep"] = uiPathStep1Img
		this.assets["uiPlayerHighlight"] = uiPlayerHighlight1Img

		this.assets["aoBush1Img"] = aoDesertBush1Img
		this.assets["aoBush2Img"] = aoDesertBush2Img
		this.assets["aoBush3Img"] = aoDesertBush3Img
		this.assets["aoBush4Img"] = aoDesertBush4Img
		this.assets["aoBush5Img"] = aoDesertBush5Img
		this.assets["aoBush6Img"] = aoDesertBush6Img

		this.assets["aoRock1Img"] = aoDesertRock1Img

		this.assets["envImg"] = envDesertImg



		
	}
	
}