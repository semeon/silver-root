// UI Implementation using Quintus

import {logger} from 'logger'
import {Q} from 'qObject'


export class SceneBuilder {
  constructor(props) {
		this.assets
		this.session
  }	

	setSession(props) {
		this.session =  props.session
	}

	start(props) {
		logger.log("Scene Builder started.")
		this.assets = props.assets
		this.initScene()
		this.startScene()
	}


	initScene(props) {

		let assets = this.assets

		let groundLayer = new Q.TileLayer({
							tileW: 32,  // Default tile width
							tileH: 32,  // Default tile height
							blockTileW: 8,  // Default pre-render size
							blockTileH: 6,
							type: Q.SPRITE_NONE, // Default type (for collisions)
							dataAsset: assets["envData"],
							sheet: "environment"
						})
		
		
		logger.log("CREATING INSTANCES")
		
		let playerSprite = new Q.PlayerSprite()
		playerSprite.p.x = 32*5 + 16
		playerSprite.p.y = 16
		playerSprite.linkModel({model: "model!!"})
						

		let bushSprite = new Q.SpriteBush_1()
		bushSprite.p.x = 49
		bushSprite.p.y = 48
		bushSprite.linkModel({model: "model!!"})

		Q.scene("mainScene",function(stage) {
			stage.insert(groundLayer)
			var bush = stage.insert(bushSprite)
			var player = stage.insert(playerSprite)
			stage.add("viewport").follow(player)

		});
	}


	
	startScene() {
		Q.stageScene("mainScene", 0, { 
		  label: "This is the label"
		});		
	}
	
}

