import {logger} from 'logger'
import {Q} from 'qObject'


Q.SpriteGroundTile_1 = class extends Q.SpriteCustom {
	constructor(props) {
		let p = {
			name: "Ground Tile",
			sheet: "GroundTile_1"
		}
		super(p)
	}

  onTouch(col) {
		super.onTouch(col)

		this.stage.context.marker.hide()
		this.stage.context.marker.p.frame = 0
		this.stage.context.marker.moveTo({x: this.p.x, y: this.p.y})
		this.stage.context.marker.show()
  }
	
}
