import {dice} from 'dice'
import {Actor} from '../universe/actor/actor.js'
import {TerrainObject} from '../universe/items/terrainObject.js'


var Chance = require('chance')

class Generator {
  constructor(props) {
		this.counter = 0
		
  }

	// =============================
		
	generateBush(props) {
		return this.generateTerrainObject({name: "Bush",	assetId: "desert_bush_01", hp: 10})
	}

	generateRock(props) {
		return this.generateTerrainObject({name: "Rock",	assetId: "desert_rock", hp: 1000})
	}


	generateCreature(props) {
		let name = chance.name()
		return this.generateActor({name: name,	assetId: "droid"})
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
		
		let areaSize = "L"
		
		let height
		let width

		switch(areaSize) {
	    case "XS":
				width = 12
				height = 9
	      break
				
	    case "S":
				width = 16
				height = 12
        break

	    case "M":
				width = 20
				height = 15
        break

	    case "L":
				width = 24
				height = 18
        break

	    default:
				width = 20
				height = 15
		}
		
		let name = chance.city()

		let allObjects = []


		let collisionObjects = []

		let terrain = []
		let creatures = []
		let items = []
		let collisionMatrix = []
				
    for (var y = 0; y < height; y++) {

			collisionMatrix[y] = []
			
      for (var x = 0; x < width; x++)  {

				collisionMatrix[y][x] = 0
				
				if (x>2) {
					if (dice.rollBool(10)) {   // terrain?
						let obj = {}
						if (dice.rollBool(20)) {   // rock?
							obj = this.generateRock()
						} else {
							obj = this.generateBush()							
						}
						terrain.push({object: obj, x: x, y: y})
						collisionObjects.push({object: obj, x: x, y: y})
						collisionMatrix[y][x] = 1

					// actor?
					} else if (dice.rollBool(3)) { // creature?
						let obj = this.generateCreature()
						creatures.push({object: obj, x: x, y: y})
						// collisionObjects.push({object: obj, x: x, y: y})
						// collisionMatrix[y][x] = 1
					}
				} 
      }
    }		
		
		let loc = {
			id: id,
			name: name,
			
			environment: "desert",
			areaSize: areaSize,
			
			height: height,
			width: width,
			
			terrain: terrain,
			creatures: creatures,
			items: items,
			
			collisionObjects: collisionObjects,
			collisionMatrix: collisionMatrix,
		}
		
		return loc
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
		
		let char = new Actor({id: id, name: props.name, control: "ai", special: special, assetId: props.assetId})
		
		// char.print({special: true, health: true, attack: true, defense: true})
		
		return char
	}

}

export let generator = new Generator();