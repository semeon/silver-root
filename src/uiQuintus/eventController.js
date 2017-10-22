import {logger} from 'logger'
import {Q} from 'qObject'
const clone = require('clone')

export class EventController {
  constructor(props) {
		this.context = props.context
		this.target = null
  }	

	
	
	onAnyGameObjectTouch(props) {
		this.target = props.target
		if ( this.context.gm.isBusy() ) this.context.gm.abortAction()
		console.log("!!! ANY TOUCH !!! Target: " + this.target.p.name)
		this.context.uiController.clearPath()
		this.context.uiController.marker.hide()
	}

	onKeyDown(props) {
		let event = props.event
		console.dir(event)
		let code = event.code
		
		switch(code) {
		    case "Space":
						this.context.uiController.marker.toggle()
		        break
		    default:
		}
	}	

	// ===========================================================================
	onPlayerTouch(props) {
		if ( this.context.gm.isBusy() ) return

		for (let i=0; i<this.context.players.length; i++) {
			let player = this.context.players[i].hideHl()
		}
		props.player.select()
	}
	
	
	// ===========================================================================
	onEmptyTileTouch(props){
		
		if ( this.context.gm.isBusy() ) {
			this.context.gm.abortAction()
			return
		}
		
		let fromX = Q.pointToTile(this.context.selectedPlayer.p.x)
		let fromY = Q.pointToTile(this.context.selectedPlayer.p.y)
		let toX = Q.pointToTile(props.tile.p.x)
		let toY = Q.pointToTile(props.tile.p.y)

		let path = this.context.gm.buildPath({	
			fromX: fromX,	fromY: fromY,	
			toX: toX,	toY: toY, 
			matrix: this.context.collisionMatrix.update() 
		})
		this.context.uiController.setPath({	path: path })
		this.context.uiController.marker.hide()
		this.context.uiController.marker.switchToGoTo()
		this.context.uiController.marker.show({x: props.tile.p.x, y: props.tile.p.y})
	}



	// ===========================================================================
	onAreaObjectTouch(props) {
		this.context.uiController.marker.hide()
		this.context.uiController.marker.switchToExamine()
		this.context.uiController.marker.show({x: props.areaObject.p.x, y: props.areaObject.p.y})		
	}



	// ===========================================================================
	onGotoMarkerTouch(props){
		// Request GM to move the selected player to X.Y

		let self = this
		let marker = props.marker
		let coord = marker.getGridCoordinates() // {x: .., y: .. }
		let path = this.context.uiController.path
		
		// this.context.uiController.clearPath()
		// this.context.uiController.marker.hide()
		this.context.gm.do({
			action: "walk",
			actor: this.context.selectedPlayer.p.model,
			target: coord,
			data: path,
			callback: function() {
				self.context.uiController.clearPath()
				self.context.uiController.marker.hide()
				
			}
		})
	}


	// ===========================================================================
	onExamineMarkerTouch(props) {
		let m = "You see " + this.target.p.name
		logger.log(m)
	}

	onAttackMarkerTouch(props) {
		console.log("ATTACK! Target: " + this.target.p.name)
	}


	
}