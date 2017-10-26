import {logger} from 'logger'
import {Q} from 'qObject'

import {CursorController} from './uiControllers/cursorController.js'

export class UiController {
  constructor(props) {
		this.stage = props.stage
		this.spriteFactory = props.spriteFactory

		this.states = ["goto", "examine", "attack", "interact"]

		this.defaultState = 0
		this.state = this.defaultState
		this.stateName = this.states[this.state]

		this.stateMap = {
			
		}


		this.cursor = new CursorController({ui: this})


		this.marker = props.marker
		this.pathSprites = []
		this.path
  }	
	
	updateStateOnHover(props) {
		let hoverTarget = props.hover
		let type = ""
		if (hoverTarget.p.model) type = hoverTarget.p.model.type

		if (type == "creature") 		{	this.setState({state: 2})	} 
		else if (type == "terrain") { this.setState({state: 1}) } 
		else 												{ this.setState({state: 0})	}
	}
	
	setState(props) {
		this.state = props.state
		this.cursor.reset()
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