import fs from 'fs'
import bigCoinList from '../NegaCoinList.js' 

const smallList = bigCoinList.slice(0,3)

const coinList=[]
const fetches = smallList.map(coin=>{
	return fetch(`https://api.dexscreener.com/latest/dex/search/?q=${coin}`)
		.then(response=>response.json())
		.then(data=>{
			const token = data.pairs[0].baseToken
			coinList.push({token:token.name,address:token.address})
			coinList.push("sucka")
		})
	}) 
coinList.push("trashKid")
Promise.all(fetches)
	.then(()=>{

		coinList.push("Last chance")
		fs.writeFile(`CoinAddresses.js`,JSON.stringify(coinList),err=>{
			if(err){
				console.err(err)
			}
		})
	})

