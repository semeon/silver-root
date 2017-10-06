import {logger} from 'logger'
import {Q} from 'qObject'

export class UiElementFactory {
  constructor(props) {
	  this.callback = props.callback
		this.assets
  }	

	start(props) {
		logger.log("UI Factory started.")
		// this.assets = props.assets

		// create UI item classes here

		Q.Sprite.extend("Player",{
		  init: function(p) {
		    this._super(p, { 
					sheet: "Player", 
					x: 17, 
					y: 16,
					stepDistance: 32,
					stepDelay: 0.2
				})
		    this.add('stepControls')
		  }
		})
	
		this.onFinish()
	}

	onFinish(props) {

		// this.callback({assets: this.assets})
	}

	
}