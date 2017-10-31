import {logger} from 'logger'
import {Q} from 'qObject'

// Creatures
import human1Img from 'graphics/creatures/human_001.png'
import human2Img from 'graphics/creatures/human_002.png'


// Player assets
import player1Img from 'graphics/player/character_001.png'
import player2Img from 'graphics/player/droid_r2.png'


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

import uiCursorGoTo 		from 'graphics/ui/cursor_goto.png'
import uiCursorExamine 	from 'graphics/ui/cursor_examine.png'
import uiCursorAttack 	from 'graphics/ui/cursor_attack.png'
import uiCursorInteract from 'graphics/ui/cursor_interact.png'

import uiCursorSelect 	from 'graphics/ui/cursor_select.png'
import uiCursorTalk			from 'graphics/ui/cursor_goto.png'



export class AssetLoader {
  constructor(props) {
		this.session
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

		this.loadCommonAssets()
		
		switch(environment) {
		    case "generic":
					this.loadGenericEnvAssets()
		      break

		    case "desert":
					this.loadDesertEnvAssets()
	        break

		    default:
					this.loadDesertAssets()
		}
	}

	createSpriteSheets() {
		logger.log("Creating sprite sheets..")

		// Ground
		Q.sheet("GroundTile_1", Q.assets["groundTileImg"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		// Objects
		Q.sheet("aoBush1Img", Q.assets["aoBush1Img"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("aoRock1Img",	Q.assets["aoRock1Img"], { tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		// UI
		Q.sheet("Marker", Q.assets["uiMarker"], 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("PathStep", Q.assets["uiPathStep"], 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("PlayerHighlight", Q.assets["uiPlayerHighlight"], 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		// Creatures
		Q.sheet("player1Img", player1Img, 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("player2Img", player2Img, 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });

		Q.sheet("human1Img", human1Img, 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		Q.sheet("human2Img", human2Img, 	{ tilew: Q.CONST.tileSize, tileh: Q.CONST.tileSize });
		
		this.onFinish()
	}


	loadCommonAssets(props) {
		Q.assets["player1Img"] = player1Img
		Q.assets["player2Img"] = player2Img
		
		Q.assets["uiMarker"] = uiMarker1Img
		Q.assets["uiPathStep"] = uiPathStep1Img
		Q.assets["uiPlayerHighlight"] = uiPlayerHighlight1Img

		Q.assets["uiCursorGoTo"] = uiCursorGoTo
		Q.assets["uiCursorExamine"] = uiCursorExamine
		Q.assets["uiCursorAttack"] = uiCursorAttack
		Q.assets["uiCursorInteract"] = uiCursorInteract
		Q.assets["uiCursorSelect"] = uiCursorSelect
		Q.assets["uiCursorTalk"] = uiCursorTalk

		Q.assets["human1Img"] = human1Img
		Q.assets["human2Img"] = human2Img
	}
	
	loadGenericEnvAssets(props) {
		Q.assets["groundTileImg"] = groundGeneric1Img
		Q.assets["aoBush1Img"] = aoGenericBush1Img
		Q.assets["aoRock1Img"] = aoGenericRock1Img
	}

	loadDesertEnvAssets(props) {
		Q.assets["groundTileImg"] = groundDesert1Img
		Q.assets["aoBush1Img"] = aoDesertBush1Img
		Q.assets["aoRock1Img"] = aoDesertRock1Img
	}

	preload(props) {
		let self = this

		for (let i in Q.assets) {
			// logger.log("Loading asset: " + this.assets[i])
			Q.preload(Q.assets[i])
		}

		Q.preload(function() {
			logger.log("Preload finished.")
			self.createSpriteSheets()
		})
	}

	onFinish() {
		this.callback({assets: Q.assets})
	}
	
}