// UI Implementation using Quintus

import {logger} from 'logger'
// let Quintus = require('quintus')

import {Q} from 'qObject'

import {AssetLoader} from './assetLoader.js'
import {LocationBuilder} from './locationBuilder.js'

import exampleImage from 'assets/images/example.png'

export class UI {
  constructor(props) {

		// logger.log("Quintus started.")
		this.builder = new LocationBuilder({Q: this.Q})
		this.assetLoader = new AssetLoader()
  }	


	launch(props) {
		let self = this
		let session = props.session
		let assets = this.assetLoader.assets

		this.assetLoader.setOnFinish({callback: function() {
			self.builder.build({data: session.currentLocation, assets: assets})
		}})

		this.assetLoader.startLoading()

		// logger.log("Loading image: " + exampleImage)
		// Q.preload(exampleImage);
		//
		// Q.preload(function() {
		// 	logger.log("All assets are loaded.")
		// 	self.builder.build({data: session.currentLocation})
		// });
		
	}
	
}
