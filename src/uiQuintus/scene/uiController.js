import {logger} from 'logger'
import {Q} from 'qObject'

import {CursorController} from './uiControllers/cursorController.js'
import {MarkerController} from './uiControllers/markerController.js'
import {PathController} from './uiControllers/pathController.js'

export class UiController {
  constructor(props) {
		this.stage = props.stage
		this.context = props.stage.context
		this.spriteFactory = props.spriteFactory

		this.cursor = new CursorController({ui: this})
		this.marker = new MarkerController({ui: this, marker: props.marker})

		this.path = new PathController({ui: this})


		this.cursor.reset()
		this.marker.reset()
  }	



	// CURSOR
	// ----------------------------------------------------------------------
	getCursorState(props) {
		return this.cursor.getState()
	}
	updateCursor(props) {
		this.cursor.updateState(props)
	}
	toggleCursor(props) {
		this.resetMarker()
		this.resetPath()
		this.cursor.toggleState(props)
	}
	resetCursor(props) {
		this.cursor.reset(props)
	}
	updateCursorCoords(props) {
		this.cursor.updateCoords(props)
	}
	
	
	
	// MARKER
	// ----------------------------------------------------------------------
	getMarkerState(props) {
		return this.marker.getState()
	}
	updateMarker(props) {
		let cursorState = this.getCursorState()
		this.marker.update({state: cursorState, coords: props.target.getPointCoordinates()})
	} 
	resetMarker(props) {
		this.marker.reset()
	} 




	// PATH
	// ----------------------------------------------------------------------
	resetPath(props) {
		this.path.reset()
	}

	showPath(props) {
		let from = this.context.selectedPlayer.getGridCoordinates()
		let to = props.target.getGridCoordinates()
		let path = this.context.gm.buildPath({	
			fromX: from.x,	fromY: from.y,	
			toX: to.x,	toY: to.y, 
			matrix: this.context.collisionMatrix.update() 
		})
		this.path.draw({path: path})
	}
	//
	// setPath(props) {
	// 	this.clearPath()
	// 	this.path = props.path
	// 	this.drawPath()
	// }
	//
	// drawPath(props) {
	// 	let pathSteps = this.path
	// 	for(let i=1; i<pathSteps.length; i++) {
	// 		let step = pathSteps[i]
	// 		let stepSprite = this.spriteFactory.createPathStep({x: step[0], y: step[1]})
	// 		this.pathSprites.push(stepSprite)
	// 		this.stage.insert(stepSprite)
	// 	}
	// }
	//
	// clearPath(props) {
	// 	this.pathSprites.forEach(function(element) {   element.destroy()	});
	// }
	

}