// UI Implementation using Quintus

import {logger} from 'logger'
// let Quintus = require('quintus')

import {Q} from 'qObject'

import {AssetLoader} from './assetLoader.js'
import {UiElementFactory} from './uiElementFactory.js'
import {SceneBuilder} from './sceneBuilder.js'

export class UI {
  constructor(props) {

		// logger.log("Quintus started.")
		this.sceneBuilder = new SceneBuilder()
		this.uiFactory = new UiElementFactory()
		this.assetLoader = new AssetLoader({ callback: this.sceneBuilder.start.bind(this.sceneBuilder) })

  }	


	launch(props) {
		this.assetLoader.setSession({session: props.session})
		this.sceneBuilder.setSession({session: props.session})
		this.uiFactory.start()
		this.assetLoader.start()
	}
	
}
