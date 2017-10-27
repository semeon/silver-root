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
		// this.stage.context.eventController.onEmptyTileTouch({ tile: this })
  }

	getType() {
		let type = "ground"
		return type
	}
	
}
