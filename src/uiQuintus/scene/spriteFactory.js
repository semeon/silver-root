import {logger} from 'logger'
import {Q} from 'qObject'


export class SpriteFactory {
  constructor(props) {
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

	createLocationObjects(props)	{
		let sprites = []
		for (let i=0; i<props.data.length; i++) {
			let model = props.data[i]
			let sprite = new Q.CreatureSprite({name: model.name, sheet: model.assetId})
			sprite.linkModel({model: model})
			sprite.p.x = Q.tileToPoint(model.getGridCoordinates().x)
			sprite.p.y = Q.tileToPoint(model.getGridCoordinates().y)
			let hl = new Q.SpritePlayerHighlight()
			sprite.linkHighlight({hl: hl})

			sprites.push(sprite)
		}
		return sprites
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
	
	createPathStep(props)	{
		let step = new Q.SpritePathStep()
		step.moveTo({
			x: Q.tileToPoint(props.x), 
			y: Q.tileToPoint(props.y)
		})
		return step
	}

	createPlayerHighlight(props)	{
		let player = props.player
		let step = new Q.SpritePlayerHighlight()
		step.moveTo({
			x: Q.tileToPoint(player.x), 
			y: Q.tileToPoint(player.y)
		})
		return step
	}


	createInfoContainer(props) {
		let container = new Q.UI.Container({
		      fill: "gray",
		      border: 1,
		      shadow: 0,
		      shadowColor: "rgba(0,0,0,0.5)",
		      y: 0,
		      x: 0
		    })
		container.hide()	
		return container
	}

	createInfoLabel(props)	{
		let label = new Q.InfoLabel({ x: 0, y: 0, labelText: "DEFAULT" })
		label.hide()
		return label
	}

	
}