// UI Implementation using Quintus

import {logger} from 'logger'
import {Q} from 'qObject'


export class LocationBuilder {
  constructor(props) {
		this.assets
  }	

	build(props) {
		
		let self = this
		
		logger.log("Building location area...")
		let locData = props.data
		this.assets = props.assets

		logger.log("Location name: " + locData.name + " (" + locData.id + ")")
		
		

		Q.scene("mainScene",function(stage) {

			// let tileLayer = new Q.TileLayer({
			// 	tileW: 32,  // Default tile width
			// 	tileH: 32,  // Default tile height
			// 	blockTileW: 10,  // Default pre-render size
			// 	blockTileH: 10,
			// 	type: Q.SPRITE_DEFAULT, // Default type (for collisions)
			// 	dataAsset: self.assets["tileData"],
			// 	sheet: "tiles"
			// });

			stage.collisionLayer(
				new Q.TileLayer({
								dataAsset: self.assets["tileData"],
								sheet: "tiles"
							})

			)
			stage.add("viewport")

		  // var label = stage.insert(new Q.UI.Text({
		  //   x: Q.width/2,
		  //   y: Q.height/2,
		  //   label: stage.options.label
		  // }))
			
		});


		Q.stageScene("mainScene", 0, { 
		  label: "This is the label"
		});


		// this.buildArea()
		// this.startScene()
	}

	buildArea() {

		
		let tileLayer = new Q.TileLayer({
			tileW: 32,  // Default tile width
			tileH: 32,  // Default tile height
			blockTileW: 10,  // Default pre-render size
			blockTileH: 10,
			type: Q.SPRITE_DEFAULT, // Default type (for collisions)
			dataAsset: this.assets["tileData"],
			sheet: "tiles"
		});

	}
	
	startScene() {
		
	}
	
}
