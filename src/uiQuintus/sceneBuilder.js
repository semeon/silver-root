// UI Implementation using Quintus

import {logger} from 'logger'
import {Q} from 'qObject'

import {SpriteFactory} from './spriteFactory.js'
import {UiController} from './uiController.js'
import {EventController} from './eventController.js'

export class SceneBuilder {
  constructor(props) {
		this.assets
		this.session
		this.spriteFactory = new SpriteFactory({assets: this.assets})
  }	

	setSession(props) {
		this.session =  props.session
	}

	start(props) {
		logger.log("Scene Builder started.")
		this.assets = props.assets
		this.initScene()
		this.startScene()
	}


	initScene(props) {
		let self = this
		let assets = this.assets
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
			for (let i=0; i<players.length; i++) 	stage.insert(players[i])

			stage.insert(marker)
			stage.add("viewport") //.follow(player)

			stage.context = {}
			stage.context.session = self.session
			stage.context.gm = self.session.gm
			stage.context.uiController = new UiController({ stage: stage, marker: marker, spriteFactory: self.spriteFactory})
			stage.context.eventController = new EventController({ context: stage.context })
			stage.context.selectedPlayer = players[0]

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

