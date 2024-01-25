import fs from 'fs'
import bigCoinList from '../NegaCoinList.js'

const coinData = []
for (let index = 0; index < 230; index++) {
	extract(bigCoinList[index])
}

function extract(coin) {
	// console.log(coin)
	fs.readFile(`intermediate${coin}.js`, 'utf8', (err, data) => {
		// if (err) console.log(err)
		if (data != undefined) {
			const fixedData = JSON.parse(data)
			const tokenData = fixedData.pairs[0].baseToken
			console.log(tokenData)
			fs.writeFile(`cutDownW${coin}.js`, `${JSON.stringify(tokenData)}`, err => {
				// if (err) { console.err(err) }
			})
		}
	})
}

