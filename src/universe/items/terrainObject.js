import {dice} from 'dice'
import {logger} from 'logger'
import {GameObject} from '../_prototype/gameObject.js'


export class TerrainObject extends GameObject {

	constructor(props) {
  	super(props)
		this.type = "terrain"
		this.destructable = true
	}
}

