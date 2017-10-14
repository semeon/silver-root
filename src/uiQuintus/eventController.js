import {logger} from 'logger'
import {Q} from 'qObject'


export class EventController {
  constructor(props) {
		this.context = props.context
  }	
	
	onEmptyTileTouch(props){
		let fromX = Q.pointToTile(this.context.selectedPlayer.p.x)
		let fromY = Q.pointToTile(this.context.selectedPlayer.p.y)
		let toX = Q.pointToTile(props.x)
		let toY = Q.pointToTile(props.y)

		this.context.uiController.setPath({	fromX: fromX,	fromY: fromY,	toX: toX,	toY: toY })
		
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

	
}