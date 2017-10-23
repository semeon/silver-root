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

		let from = this.context.selectedPlayer.getGridCoordinates()
		let to = props.tile.getGridCoordinates()
		let path = this.context.gm.buildPath({	
			fromX: from.x,	fromY: from.y,	
			toX: to.x,	toY: to.y, 
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
		
		this.context.uiController.clearPath()
		// this.context.uiController.marker.hide()

		this.context.gm.do({
			action: "walk",
			actor: this.context.selectedPlayer.p.model,
			target: coord,
			data: {path: path},
			success: function(props) {
				console.log("WALK success callback")
				self.context.uiController.clearPath()
				self.context.uiController.marker.hide()
			},
			fail: function(props) {
				let m = "WALK Action failed" 
				if (props && props.reason) m = m + ": " + props.reason
				logger.log(m)
			}
		})
	}


	// ===========================================================================
	onExamineMarkerTouch(props) {
		let m = "You see " + this.target.p.name
		logger.log(m)
	}


	// ===========================================================================
	onSwitchingToAttack(props) {
		let actor = this.context.selectedPlayer
		let target = this.target
		
		if (!this.context.uiController.marker.isActive()) return
		
		let distance = this.context.gm.calculateDistance({
			from: actor.getGridCoordinates(),
			to: target.getGridCoordinates()
		})
		
		console.log("Attack Mode is ON:")
		console.log(" --  Actor: " + actor.p.name + " [" + actor.getGridCoordinates().x + ", " +  actor.getGridCoordinates().y + "]")
		console.log(" -- Target: " + target.p.name + " [" + target.getGridCoordinates().x + ", " +  target.getGridCoordinates().y + "]")
		console.log(" --   Dist: " + distance + " m")
		
	}

	// ===========================================================================
	onAttackMarkerTouch(props) {
		let self = this

		let actor = this.context.selectedPlayer
		let target = this.target

		this.context.gm.do({
			action: "attack",
			actor: actor.p.model,
			target: target.p.model,
			data: null,
			success: function(props) {
				// console.log("ATTACK success callback")

				if (target.p.model.isDestroyed()) {
					console.log(target.p.name + " is destroyed.")
					target.destroy()
					self.context.uiController.reset()
				}
			},
			fail: function(props) {
				let m = "ATTACK Action failed" 
				if (props && props.reason) m = m + ": " + props.reason
				logger.log(m)
			}
		})
		
	}


	
}