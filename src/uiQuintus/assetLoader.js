import {logger} from 'logger'
import {Q} from 'qObject'

// Player assets
import playerImg from 'graphics/player/droid_r2.png'

// Area Obect Assets - Desert

import groungDesert1Img from 'graphics/env/desert/desert_sand_1.png'

import aoDesertBush1Img from 'graphics/env/desert/desert_object_bush_1.png'

import aoDesertRock1Img from 'graphics/env/desert/desert_object_rock.png'

// User Interface
import uiMarker1Img 					from 'graphics/ui/marker.png'
import uiPathStep1Img 				from 'graphics/ui/pathStep.png'
import uiPlayerHighlight1Img 	from 'graphics/ui/playerHighlight.png'



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
		this.assets["aoRock1Img"] = aoDesertRock1Img
	}
	
}