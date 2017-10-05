import {logger} from 'logger'
import {Q} from 'qObject'

import exampleImage from 'assets/images/example.png'
import groundImage from 'assets/images/ground-32x32.png'
// import groundSheet from 'assets/images/ground_4_32x32.png'


import tileSheet from 'assets/images/ground_4_32x32.png'
import tileData from 'assets/json/tiles.json'

export class AssetLoader {
  constructor(props) {
		this.onFinish
		this.assets = {}
		this.assets["exampleImage"] = exampleImage
		this.assets["groundImage"] = groundImage
		this.assets["tileSheet"] = tileSheet
		this.assets["tileData"] = tileData
  }	

	setOnFinish(props) {
		this.onFinish = props.callback
	}

	startLoading(props) {
		let self = this




		logger.log("Loading image: " + exampleImage)
		Q.preload(exampleImage)
		
		logger.log("Loading image: " + groundImage)
		Q.preload(groundImage)

		logger.log("Loading image: " + tileSheet)
		Q.preload(tileSheet)

		logger.log("Loading json: " + tileData)
		Q.preload(tileData)


		Q.preload(function() {
			logger.log("Preload finished")

			Q.sheet("tiles",
	        tileSheet,
	        {
	          tilew: 32,
	          tileh: 32,
						w: 128,
						h: 32,
						cols: 4,
	          sx: 0,   // start the sprites at x=0
	          sy: 0    // and y=0
	         }
				 );



			Q.Sprite.extend("Ground", {
			  init: function(p) {
			    this._super({
			      asset: groundImage,
						scale: 1,
						w: 32,
						h: 32
			    });
			  }
			});
			
			self.onFinish()
		})
		
	}
	
}