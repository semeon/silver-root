import {logger} from 'logger'
import {Q} from 'qObject'


export class UiController {
  constructor(props) {
		this.path
		this.stage = props.stage
		this.spriteFactory = props.spriteFactory
		this.pathSprites = []
  }	
	
	setPath(props) {
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
}