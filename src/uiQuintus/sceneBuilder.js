// UI Implementation using Quintus

import {logger} from 'logger'
import {Q} from 'qObject'

import {SpriteFactory} from './spriteFactory.js'

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
		let assets = this.assets
		let locData = this.session.currentLocation

		logger.log("--- CREATING INSTANCES ---")

		// Order is important for intercepting touch events!

		// Marker
		let marker = this.spriteFactory.createMarker()

		// Player
		let playerSprite = new Q.PlayerSprite()
		playerSprite.p.x = 16
		playerSprite.p.y = 16
		playerSprite.linkModel({model: "model!!"})

		// Other Creatures
		// ...

		// Terrain Object
		let terrain = this.spriteFactory.createTerrain({data: locData.terrain})
		// console.dir(terrain)


		let groundTiles = this.spriteFactory.createGround({w: locData.width, h: locData.height})
		// console.dir(groundTiles)


		Q.scene("mainScene", function(stage) {

			stage.context = {}
			stage.context.marker = marker
			stage.context.selectedPlayer
			

			console.dir(stage)
			
			// Order is important for displaying the sprites!

			for (let i=0; i<groundTiles.length; i++) 	stage.insert(groundTiles[i])

			for (let i=0; i<terrain.length; i++) 	stage.insert(terrain[i])

			stage.insert(playerSprite)
			stage.context.selectedPlayer = playerSprite

			stage.insert(marker)

			stage.add("viewport") //.follow(player)

		})
	}


	
	startScene() {
		Q.stageScene("mainScene", 0, { 
		  label: "This is the label"
		})		
	}
	
}

