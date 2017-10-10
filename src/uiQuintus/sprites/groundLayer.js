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

		this.stage.context.marker.hide()
		this.stage.context.marker.switchToGoTo()
		this.stage.context.marker.show({x: this.p.x, y: this.p.y})
  }
	
}