import {logger} from 'logger'
import {Q} from 'qObject'

// ALL SPRITES
import './sprites/gameObjects/_defCustomSprite.js'
import './sprites/gameObjects/groundLayer.js'
import './sprites/gameObjects/areaObjects.js'
import './sprites/gameObjects/player.js'

import './sprites/userInterface/marker.js'
import './sprites/userInterface/uiElements.js'


import {AssetLoader} from './assetLoader.js'
import {SceneBuilder} from './scene/sceneBuilder.js'

export class UI {
  constructor(props) {
		this.sceneBuilder = new SceneBuilder()
		this.assetLoader = new AssetLoader({ callback: this.sceneBuilder.start.bind(this.sceneBuilder) })
  }	

	launch(props) {
		logger.log("Loading User Interface..")
		this.assetLoader.setSession({session: props.session})
		this.sceneBuilder.setSession({session: props.session})
		this.assetLoader.start()
	}
}
