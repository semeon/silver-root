import {logger} from 'logger'
import {Q} from 'qObject'


export class MarkerController {
  constructor(props) {
		this.sprite = props.marker
  }	

	reset(props) {
		this.sprite.hide()
	}	

	update(props) {
		switch(props.state) {
	    case "goto":
				this.sprite.switchToGoTo()
	      break

	    case "examine":
				this.sprite.switchToExamine()				
        break

	    case "attack":
				this.sprite.switchToAttack()				
        break
		}
		this.sprite.show(props.coords)
	}

	getState() {
		return this.sprite.getCurrentState()
	}

}