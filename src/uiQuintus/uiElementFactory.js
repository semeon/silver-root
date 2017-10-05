import {logger} from 'logger'
import {Q} from 'qObject'

export class UiElementFactory {
  constructor(props) {
	  this.callback = props.callback
		this.assets
  }	

	start(props) {
		logger.log("UI Factory started.")
		this.assets = props.assets

		// create UI item classes here
		
		this.onFinish()
	}

	onFinish(props) {

		this.callback({assets: this.assets})
	}

	
}