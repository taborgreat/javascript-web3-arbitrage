import fs from 'fs'
import bigCoinList from '../NegaCoinList.js' 

const smallList = bigCoinList.slice(0,3)

const coinList=[]
const coinAddresses =smallList.map(( coin,index )=>{
fetch(`https://api.dexscreener.com/latest/dex/search/?q=${coin}`)
	.then(response=>response.json())
	.then(data=>{
fs.writeFile(`CoinAddresses${coin}.js`,JSON.stringify(data),err=>{
	if(err){console.err(err)}
})
			const nameAddy = {token:data.pairs[0].baseToken.name,address:data.pairs[0].baseToken.address}
			console.log(nameAddy)
			coinList.push(nameAddy)
	})
	console.log("im happy", coinList)
}) 
console.log("im sad", coinList)
