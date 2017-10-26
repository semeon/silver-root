import {logger} from 'logger'
import {Q} from 'qObject'


export class MarkerController {
  constructor(props) {

  }	
	
	setPath(props) {
		this.clearPath()
		this.path = props.path
		this.drawPath()
	}
	
	drawPath(props) {
		let pathSteps = this.path
		for(let i=1; i<pathSteps.length; i++) {
			let step = pathSteps[i]
			let stepSprite = this.spriteFactory.createPathStep({x: step[0], y: step[1]})
			this.pathSprites.push(stepSprite)
			this.stage.insert(stepSprite)
		}
	}
	
	clearPath(props) {
		this.pathSprites.forEach(function(element) {   element.destroy()	});		
	}
	
	reset(props) {
		this.marker.hide()
		this.clearPath()
	}
}