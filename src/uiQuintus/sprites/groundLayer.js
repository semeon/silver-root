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
}

Q.TileLayer.extend("TileLayerCustom", {
  init: function(p) {
    this._super(p)
		this.on("touch", this, function(col) {console.log("RRRRRRRRRRRRRRR") })
	} 
})

// createGroundLayer(props) {
// 	let groundLayer = new Q.TileLayer({
// 		tileW: Q.CONST.tileSize,  // Default tile width
// 		tileH: Q.CONST.tileSize,  // Default tile height
// 		blockTileW: 8,  // Default pre-render size
// 		blockTileH: 6,
// 		type: Q.SPRITE_NONE, // Default type (for collisions)
// 		dataAsset: props.asset,
// 		sheet: "environment"
// 	})
// 	return groundLayer
// }
//
// Q.SpriteBush_1 = class extends Q.SpriteCustom {
// 	constructor(props) {
// 		let p = {
// 			sheet: "Bush_1",
// 		}
// 		super(p)
// 	}
// }
//
