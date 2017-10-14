import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteGroundTile_1 = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Ground",
			sheet: "GroundTile_1"
		}
		super(p)
	}

  onTouch(col) {
		super.onTouch(col)

		let fromX = Q.pointToTile(this.stage.context.selectedPlayer.p.x)
		let fromY = Q.pointToTile(this.stage.context.selectedPlayer.p.y)
		let toX = Q.pointToTile(this.p.x)
		let toY = Q.pointToTile(this.p.y)

		this.stage.context.uiController.setPath({	fromX: fromX,	fromY: fromY,	toX: toX,	toY: toY })
		
		this.stage.context.marker.hide()
		this.stage.context.marker.switchToGoTo()
		this.stage.context.marker.show({x: this.p.x, y: this.p.y})
  }
	
}
