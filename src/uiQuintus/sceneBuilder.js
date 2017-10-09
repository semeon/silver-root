// UI Implementation using Quintus

import {logger} from 'logger'
import {Q} from 'qObject'

import {UiElementFactory} from './uiElementFactory.js'

export class SceneBuilder {
  constructor(props) {
		this.assets
		this.session
		this.uiFactory = new UiElementFactory({assets: this.assets})
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


		// Player
		let playerSprite = new Q.PlayerSprite()
		playerSprite.p.x = 16
		playerSprite.p.y = 16
		playerSprite.linkModel({model: "model!!"})

		// Other Creatures
		// ...

		// Terrain Object
		let terrain = this.uiFactory.createTerrain({data: locData.terrain})
		// console.dir(terrain)


		let groundTiles = this.uiFactory.createGround({w: locData.width, h: locData.height})
		// console.dir(groundTiles)

		let marker = this.uiFactory.createMarker()
		console.dir(marker)

		Q.scene("mainScene", function(stage) {

			stage.context = {}
			stage.context.marker = marker

			console.dir(stage)
			
			// Order is important for displaying the sprites!

			for (let i=0; i<groundTiles.length; i++) 	stage.insert(groundTiles[i])
			for (let i=0; i<terrain.length; i++) 	stage.insert(terrain[i])
			let player = stage.insert(playerSprite)

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

