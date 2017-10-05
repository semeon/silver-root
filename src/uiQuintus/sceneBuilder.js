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
		let self = this
		
		// logger.log("Building location area...")
		// let locData = props.data
		//
		// logger.log("Location name: " + locData.name + " (" + locData.id + ")")
		
		

		Q.scene("mainScene",function(stage) {
			stage.collisionLayer(
				new Q.TileLayer({
								dataAsset: self.assets["tileData"],
								sheet: "TILES"
							})
			)

			stage.add("viewport")

		  var label = stage.insert(new Q.UI.Text({
		    x: Q.width/2,
		    y: Q.height/2,
		    label: stage.options.label
		  }))
			
		});
	}


	
	startScene() {
		Q.stageScene("mainScene", 0, { 
		  label: "This is the label"
		});		
	}
	
}
