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
		let assetIds = ["human1Img", "human2Img"]
		let groupIds = ["raiders", "locals"]
		let num = chance.integer({min: 0, max: 1});
		return this.generateActor({name: name,	assetId: assetIds[num], groupId: groupIds[num] })
	}

	generateChar(props) {

		let id
		if (props && props.id) id = props.id
			else id = "actor-" + Date.now() + "-" + this.getCount() 

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
		return char
	}

	generateActor(props) {
		let actor = {
			char: this.generateChar(props),
			groupId: props.groupId
		}
		return actor
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
		if (props && props.id) id = props.id
			else id = "map-" + Date.now() + "-" + this.getCount()
		
		let loc = new Location({
			id: id,
			name: chance.city(),
			environment: "desert",
			areaSize: "L"
		})


		let raiders = loc.cerateNewGroup({id: "raiders"})
		let locals = loc.cerateNewGroup({id: "locals"})

		raiders.addEnemy({ group: locals })
		raiders.addEnemy({ group: loc.getPlayerGroup() })
		locals.addEnemy({ group: raiders })
		
		
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
						let actor = this.generateCreature()
						obj = actor.char
						obj.setGridCoordinates({x: x, y: y})
						loc.addGameObject({type: "creatures", object: obj})
						let group = loc.getGroupById({id: actor.groupId})
						if (!group) group = loc.cerateNewGroup({id: actor.groupId})
						
						group.addMember({member: actor.char})
						
					}
				} 
      }
    }		
		
		return loc
	}







}

export let generator = new Generator();