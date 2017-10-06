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
		
		console.dir(this.assets)

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
							type: Q.SPRITE_DEFAULT, // Default type (for collisions)
							dataAsset: assets["tileData"],
							sheet: "Desert"
						})
		
		let playerSprite = new Q.Player()

		Q.scene("mainScene",function(stage) {
			stage.insert(groundLayer)
			var player = stage.insert(new Q.Player())
			stage.add("viewport").follow(player)
		});
	}


	
	startScene() {
		Q.stageScene("mainScene", 0, { 
		  label: "This is the label"
		});		
	}
	
}

