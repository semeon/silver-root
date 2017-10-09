import {logger} from 'logger'
import {Q} from 'qObject'

import './sprites/_defCustomSprite.js'
import './sprites/groundLayer.js'
import './sprites/areaObjects.js'
import './sprites/player.js'

import {AssetLoader} from './assetLoader.js'
import {SceneBuilder} from './sceneBuilder.js'

export class UI {
  constructor(props) {
		this.sceneBuilder = new SceneBuilder()
		this.assetLoader = new AssetLoader({ callback: this.sceneBuilder.start.bind(this.sceneBuilder) })
  }	

	launch(props) {
		this.assetLoader.setSession({session: props.session})
		this.sceneBuilder.setSession({session: props.session})
		this.assetLoader.start()
	}
}
