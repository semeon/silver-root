import {logger} from 'logger'
import {Q} from 'qObject'


export class UiController {
  constructor(props) {
		this.marker = props.marker
		this.stage = props.stage
		this.spriteFactory = props.spriteFactory
		this.path
		this.pathSprites = []
  }	
	
	setPath(props) {
		this.clearPath()
		this.path = this.stage.context.gm.buildPath(props)
		this.drawPath()
	}
	
	drawPath(props) {
		let pathSteps = this.path
		for(let i=1; i<pathSteps.length-1; i++) {
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