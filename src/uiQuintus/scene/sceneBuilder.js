// UI Implementation using Quintus
import {logger} from 'logger'
import {Q} from 'qObject'

import {SpriteFactory} from './spriteFactory.js'
import {UiController} from './uiController.js'
import {EventController} from './eventController.js'

import {CollisionMatrix} from './collisionMatrix.js'


export class SceneBuilder {
  constructor(props) {
		this.session
		this.spriteFactory = new SpriteFactory()
  }	

	setSession(props) {
		this.session =  props.session
	}

	start(props) {
		logger.log("Scene Builder started.")
		this.initScene()
		this.startScene()
	}

	initScene(props) {
		let self = this
		let assets = Q.assets
		let locData = this.session.currentLocation

		logger.log("Creating sprites instances..")

		// Order is important for intercepting touch events!

		// Marker
		let marker = this.spriteFactory.createMarker()

		// Player
		let players = this.spriteFactory.createPlayers({players: this.session.getPlayers()})

		// Other Creatures
		// ...

		// Terrain Object
		let terrain = this.spriteFactory.createTerrain({data: locData.terrain})
		// console.dir(terrain)


		let groundTiles = this.spriteFactory.createGround({w: locData.width, h: locData.height})
		// console.dir(groundTiles)


		Q.scene("mainScene", function(stage) {
			logger.log("Loading scene..")

			// Order is important for displaying the sprites!
			for (let i=0; i<groundTiles.length; i++) 	stage.insert(groundTiles[i])
			for (let i=0; i<terrain.length; i++) 	stage.insert(terrain[i])
			stage.insert(marker)
			for (let i=0; i<players.length; i++) 	stage.insert(players[i])
			for (let i=0; i<players.length; i++) 	stage.insert(players[i].p.hl)
				


			stage.add("viewport") //.follow(player)

			stage.context = {}

			stage.context.stage = stage
			stage.context.session = self.session
			stage.context.gm = self.session.gm
			stage.context.players = players
			stage.context.uiController = new UiController({ stage: stage, marker: marker, spriteFactory: self.spriteFactory})
			stage.context.eventController = new EventController({ context: stage.context })
			stage.context.locData = locData
			stage.context.collisionMatrix = new CollisionMatrix({stage: stage})
			stage.context.collisionMatrix.update()

			players[0].select()

			Q.el.addEventListener('keydown', function(e) {
				stage.context.eventController.onKeyDown({event: e})
			})

			Q.el.addEventListener('mousemove', function(e) {
					let x = e.offsetX || e.layerX
        	let y = e.offsetY || e.layerY
					let stageX = Q.canvasToStageX(x, stage)
        	let	stageY = Q.canvasToStageY(y, stage)
					let obj = stage.locate(stageX, stageY)
					
			    if(obj) {
						stage.context.eventController.onMouseMove({
							sprite: obj, 
							coords: {x: stageX, y: stageY} 
						})
			    }
			})

			Q.el.addEventListener('contextmenu', function(e) {
				console.log("EVENT")
			})


		})


	}


	
	startScene() {
		logger.log("Starting the scene..")
		Q.stageScene("mainScene", 0, { 
		  label: "This is the label"
		})		

		logger.log("Ba dum tss!")
	}
	
}

