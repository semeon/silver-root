import {dice} from 'dice'
import {Actor} from '../universe/actor/actor.js'
import {TerrainObject} from '../universe/items/terrainObject.js'
import {Location} from '../universe/location/location.js'


var Chance = require('chance')

class Generator {
  constructor(props) {
		this.counter = 0
		
  }

	// =============================
		
	generateBush(props) {
		return this.generateTerrainObject({name: "Bush",	assetId: "aoBush1Img", hp: 10})
	}

	generateRock(props) {
		return this.generateTerrainObject({name: "Rock",	assetId: "aoRock1Img", hp: 1000})
	}

	generateCreature(props) {
		let name = chance.name()
		let assets = ["human1Img", "human2Img"]
		let groupIds = ["human1Img", "human2Img"]
		let num = chance.integer({min: 0, max: 1});
		return this.generateActor({name: name,	assetId: assets[num], group: groupIds[num] })
	}

	generateActor(props) {
		let id
		if (props && props.id) {
			id = props.id
		}	 else {
			id = "actor-"
			id += Date.now()
			id += "-"
			id += this.getCount()
		}

		let special = {}
		special.S = dice.rollD10().value
		special.P = dice.rollD10().value
		special.E = dice.rollD10().value
		special.C = dice.rollD10().value
		special.I = dice.rollD10().value
		special.A = dice.rollD10().value
		special.L = dice.rollD10().value
		
		let control = props.control
		if (!props.control) control = "ai"

		let char = new Actor({id: id, name: props.name, control: control, special: special, assetId: props.assetId})
		// char.print({special: true, health: true, attack: true, defense: true})
		return char
	}


	generateTerrainObject(props) {

		let id
		if (props && props.id) {
			id = props.id
		}	 else {
			id = "terrain-"
			id += Date.now()
			id += "-"
			id += this.getCount()
		}

		let hp
		if (props && props.hp) {
			hp = props.hp
		}	else {
			hp = dice.rollD10(5).value
		}
		
		let object = new TerrainObject({id: id, name: props.name, hpMax: props.hp, assetId: props.assetId})
		
		return object
	}

	// =============================

	getCount(props) {
		this.counter += 1
		return this.counter
	}


	generateLocation(props) {
		
		let id
		if (props && props.id) {
			id = props.id
		} else {
			id = "map-"
			id += Date.now()
			id += "-"
			id += this.getCount()
		}
		
		let name = chance.city()

		let loc = new Location({
			id: id,
			name: name,
			environment: "desert",
			areaSize: "L"
		})
				
    for (var y = 0; y < loc.height; y++) {
      for (var x = 0; x < loc.width; x++)  {
				
				if (x>2) {
					// Add Terrain
					let obj = {}
					if (dice.rollBool(10)) {
						if (dice.rollBool(20)) obj = this.generateRock()
							else 	obj = this.generateBush()							
						obj.setGridCoordinates({x: x, y: y})
						loc.addGameObject({type: "terrain", object: obj})

					} else if (dice.rollBool(2)) { // creature?
						obj = this.generateCreature()
						obj.setGridCoordinates({x: x, y: y})
						loc.addGameObject({type: "creatures", object: obj})
					}
				} 
      }
    }		
		
		return loc
	}







}

export let generator = new Generator();