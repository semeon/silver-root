import {logger} from 'logger'
import {ActorGroup} from '../actorGroup/actorGroup.js'

export class Location {

	constructor(props) {
		this.id = props.id
		this.name = props.name
		this.environment = props.environment
		this.areaSize = props.areaSize
		this.height = 0
		this.width = 0

		this.terrain = []
		this.creatures = []
		this.items = []

		this.emptyGrid = []
		
		this.groups = {}
		this.playerGroup = {}
		
		this.init()
	}

	init() {
		this.setSize({size: this.areaSize})
		this.buildEmptyGrid()
		this.playerGroup = this.cerateNewGroup({id: "player"})
	}
	
	addGameObject(props) {
		switch(props.type) {
	    case "terrain":
				this.terrain.push(props.object)
	      break
				
	    case "creatures":
				this.creatures.push(props.object)
	      break

	    case "items":
				this.items.push(props.object)
	      break
		}		
	}
	
	addPlayer(props) {
		this.playerGroup.addMember({member: props.player})
	}
	
	getGroups(props) {
		return this.groups
	}

	getPlayerGroup(props) {
		return this.playerGroup
	}

	getGroupById(props) {
		return this.groups[props.id]
	}

	cerateNewGroup(props) {
		let result = null
		if (!this.groups[props.id]) {
			this.groups[props.id] = new ActorGroup({id: props.id})
			result = this.groups[props.id]
		}
		return result
	}

	buildEmptyGrid(props) {
		this.emptyGrid = []
    for (let y = 0; y < this.height; y++) {
			this.emptyGrid[y] = []
      for (let x = 0; x < this.width; x++)  {
				this.emptyGrid[y][x] = 0
			} 
    }
	}

	setSize(props) {
		switch(props.size) {
	    case "XS":
				this.setHW({ w:12, h:9 })
	      break
				
	    case "S":
				this.setHW({ w:16, h:12 })
        break

	    case "M":
				this.setHW({ w:20, h:15 })
        break

	    case "L":
				this.setHW({ w:24, h:18 })
        break

	    default:
				this.setHW({ w:20, h:15 })
		}
	}

	setHW(props) {
		this.height = props.h
		this.width = props.w
	}
	
}

// let loc = {
// 	id: id,
// 	name: name,
//
// 	environment: "desert",
// 	areaSize: areaSize,
//
// 	height: height,
// 	width: width,
//
// 	terrain: terrain,
// 	creatures: creatures,
// 	items: items,
//
// 	emptyGrid: emptyGrid
// }
