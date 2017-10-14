import {logger} from 'logger'
import {Q} from 'qObject'
import './sprites/_defCustomSprite.js'

import './sprites/areaObjects.js'
import './sprites/player.js'


export class SpriteFactory {
  constructor(props) {
		this.assets = props.assets
		this.grid = props.grid
  }

	createGround(props)	{
		let h = props.h
		let w = props.w
		let result = []
		for (let x=0; x<w; x++) {
			for (let y=0; y<h; y++) {
				let sprite = new Q.SpriteGroundTile_1()
				sprite.p.x = Q.tileToPoint(x)
				sprite.p.y = Q.tileToPoint(y)				
				result.push(sprite)
			}
		}
		return result
	}

	
	createTerrain(props)	{
		let data = props.data
		let result = []

		for (let i=0; i<data.length; i++) {
			let item = data[i]
			let model = data[i].object
			
			let name = model.name
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

			sprite.linkModel({model: model})
			sprite.moveTo({
				x: Q.tileToPoint(item.x), 
				y: Q.tileToPoint(item.y)
			})

			result.push(sprite)
		}
		return result
	}

	createPlayers(props)	{

		let players = []

		for (let i=0; i<props.players.length; i++) {
			let playerModel = props.players[i]
			let playerSprite = new Q.PlayerSprite()
			playerSprite.linkModel({model: playerModel})
			let x = playerSprite.p.model.getGridCoordinates().x
			let y = playerSprite.p.model.getGridCoordinates().y
			playerSprite.p.x = Q.tileToPoint(x)
			playerSprite.p.y = Q.tileToPoint(y)
			players.push(playerSprite)
		}
		return players
	}


	createMarker(props)	{
		let marker = new Q.SpriteMarker()
		marker.moveTo({
			x: Q.tileToPoint(0), 
			y: Q.tileToPoint(0)
		})
		marker.hide()
		return marker
	}
	


	
}