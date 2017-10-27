import {logger} from 'logger'
import {Q} from 'qObject'


export class PathController {
  constructor(props) {
		this.pathSprites = []
		this.stage = props.ui.stage
		this.spriteFactory = props.ui.spriteFactory
  }	
	
	reset() {
		this.clearPath()
	}
	
	setPath(props) {
		this.reset()
		this.path = props.path
		this.drawPath()
	}
	
	draw(props) {
		this.path = props.path
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
	
}