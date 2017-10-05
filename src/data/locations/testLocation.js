import {logger} from 'logger'
import {generator} from 'generator'

export let testLocation = {
	id: "testLocations",
	name: "Test Location",

	height: 16,
	width: 24,

	terrain: [
		{	
			object: generator.generateBush(), 
			x: 3,	
			y: 1
		},
			
		{	
			object: generator.generateBush(), 
			x: 3,	
			y: 2
		},
		
		{	
			object: generator.generateBush(), 
			x: 5,	
			y: 10
		},
		
		{	
			object: generator.generateRock(), 
			x: 18,
			y: 12
		}		
	],

	creatures: [

		{	
			object: generator.generateCreature(), 
			x: 18,
			y: 12
		}	
		
	],

	items []

	
}