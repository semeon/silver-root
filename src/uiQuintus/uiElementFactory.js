import {logger} from 'logger'
import {Q} from 'qObject'
import './sprites/_defCustomSprite.js'

import './sprites/areaObjects.js'
import './sprites/player.js'


export class UiElementFactory {
  constructor(props) {
		this.assets = props.assets
  }


	createGroundLayer(props) {
		let groundLayer = new Q.TileLayer({
			tileW: Q.CONST.tileSize,  // Default tile width
			tileH: Q.CONST.tileSize,  // Default tile height
			blockTileW: 8,  // Default pre-render size
			blockTileH: 6,
			type: Q.SPRITE_NONE, // Default type (for collisions)
			dataAsset: props.asset,
			sheet: "environment"
		})

		return groundLayer
	}

	createGround(props)	{
		let h = props.h
		let w = props.w
		let result = []
		for (let x=0; x<w; x++) {
			for (let y=0; y<h; y++) {
				let sprite = new Q.SpriteGroundTile_1()
				sprite.p.x = this.calcCoordinate(x)
				sprite.p.y = this.calcCoordinate(y)				
				result.push(sprite)
			}
		}
		return result
	}

	
	createTerrain(props)	{
		let data = props.data
		let result = []

		// console.dir(data)

		for (let i=0; i<data.length; i++) {
			let model = data[i]
			let name = model.object.name
			let sprite
			switch(name) {
		    case "Bush":
					sprite = new Q.SpriteBush_1()
		      break

		    case "Rock":
					sprite = new Q.SpriteRock_1()
		      break

		    default:
					sprite = null
			}
			
			sprite.moveTo({x:this.calcCoordinate(model.x), y:this.calcCoordinate(model.y)})
			sprite.linkModel({model: model})

			result.push(sprite)
		}
		return result
	}


	createMarker(props)	{
		let marker = new Q.SpriteMarker()
		marker.moveTo({x:this.calcCoordinate(0), y:this.calcCoordinate(0)})
		marker.hide()
		return marker
	}
	

	calcCoordinate(prop) {
		let result = prop * Q.CONST.tileSize + Q.CONST.tileSize/2
		// result = Math.floor(result)
		return result
	}
	
}