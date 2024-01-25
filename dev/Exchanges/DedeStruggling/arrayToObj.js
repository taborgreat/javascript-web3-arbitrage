import fs from 'fs'
import tokenAdresses from './full.js'


const tokenAddys = {}

tokenAdresses.forEach(token => {
	tokenAddys[token.name] = token.address
})

fs.writeFile('locked.js', JSON.stringify(tokenAddys), err => {
	if (err) console.err(err)
})
