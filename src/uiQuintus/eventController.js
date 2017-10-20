import {logger} from 'logger'
import {Q} from 'qObject'
const clone = require('clone')

export class EventController {
  constructor(props) {
		this.context = props.context
  }	

	onAnyTouch(props) {
		// if ( this.context.gm.isBusy() ) this.context.gm.abortAction()
	}
	
	onEmptyTileTouch(props){
		
		if ( this.context.gm.isBusy() ) {
			this.context.gm.abortAction()
			return
		}
		
		let fromX = Q.pointToTile(this.context.selectedPlayer.p.x)
		let fromY = Q.pointToTile(this.context.selectedPlayer.p.y)
		let toX = Q.pointToTile(props.x)
		let toY = Q.pointToTile(props.y)

		let stageItems = this.context.stage.index
		let collisionMatrix = clone(this.context.locData.emptyGrid)

		for(let i in stageItems) {
			let item = stageItems[i]
			if (item.p.isCollidable) {
				let coord = item.p.model.getGridCoordinates()
				collisionMatrix[coord.y][coord.x] = 1
			}
		}
		
		let path = this.context.gm.buildPath({	fromX: fromX,	fromY: fromY,	toX: toX,	toY: toY, matrix: collisionMatrix })
		this.context.uiController.setPath({	path: path })
		this.context.uiController.marker.hide()
		this.context.uiController.marker.switchToGoTo()
		this.context.uiController.marker.show({x: props.x, y: props.y})
	}


	onGotoMarkerTouch(props){
		// Request GM to move the selected player to X.Y

		let gridX = Q.pointToTile( props.x )
		let gridY = Q.pointToTile( props.y )		
		let path = this.context.uiController.path
		
		this.context.uiController.clearPath()
		this.context.uiController.marker.hide()
		this.context.gm.do({
			action: "walk",
			actor: this.context.selectedPlayer.p.model,
			target: {x: gridX, y: gridY},
			data: path
		})
	}

	onPlayerTouch(props) {
		if ( this.context.gm.isBusy() ) return

		for (let i=0; i<this.context.players.length; i++) {
			let player = this.context.players[i].hideHl()
		}
		props.player.select()
	}
	
}