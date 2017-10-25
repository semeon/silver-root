import {logger} from 'logger'
import {Q} from 'qObject'

// Player assets
import playerImg from 'graphics/player/character_001.png'


// Area Obect Assets - Generic
import groundGeneric1Img from 'graphics/env/generic/generic_ground_1.png'
import aoGenericBush1Img from 'graphics/env/generic/generic_object_bush_1.png'
import aoGenericRock1Img from 'graphics/env/generic/generic_object_rock.png'


// Area Obect Assets - Desert
import groundDesert1Img from 'graphics/env/desert/desert_ground_1.png'
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
		    case "generic":
					this.loadGenericAssets()
		      break

		    case "desert":
					this.loadDesertAssets()
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
	
	loadGenericAssets(props) {
		this.assets["uiMarker"] = uiMarker1Img
		this.assets["uiPathStep"] = uiPathStep1Img
		this.assets["uiPlayerHighlight"] = uiPlayerHighlight1Img

		this.assets["groundTileImg"] = groundGeneric1Img
		this.assets["aoBush1Img"] = aoGenericBush1Img
		this.assets["aoRock1Img"] = aoGenericRock1Img
	}

	loadDesertAssets(props) {
		this.assets["uiMarker"] = uiMarker1Img
		this.assets["uiPathStep"] = uiPathStep1Img
		this.assets["uiPlayerHighlight"] = uiPlayerHighlight1Img

		this.assets["groundTileImg"] = groundDesert1Img
		this.assets["aoBush1Img"] = aoDesertBush1Img
		this.assets["aoRock1Img"] = aoDesertRock1Img
	}
	
}