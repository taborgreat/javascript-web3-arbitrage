import tokenAddresses from './tokenAddresses.js'
import axios from "axios"

async function margins(coin) {
	function getData(coin) {
		return new Promise((resolve, reject) => {
			let tokenDataLocal = []
			axios.get(`https://api.dexscreener.com/latest/dex/tokens/${coin}`)
				.then((response) => {
					response.data.pairs.forEach((pair) => {
						tokenDataLocal.push({
							pairDex: pair.dexId,
							pairToken: pair.quoteToken.name,
							pairAddress: pair.pairAddress,
							pairPriceUSD: pair.priceNative,
						});
					});
					resolve(tokenDataLocal);
				})
				.catch((error) => {
					console.error("Error during axios request:", error);
					reject(error);
				});
		});
	}

	try {
		const tokenData = await getData(coin);

		let lowestPair = tokenData.reduce((lowest, current) => {
			return parseFloat(current.pairPriceUSD) < parseFloat(lowest.pairPriceUSD) ? current : lowest
		}, tokenData[0]);

		let highestPair = tokenData.reduce((highest, current) => {
			return parseFloat(current.pairPriceUSD) > parseFloat(highest.pairPriceUSD) ? current : highest;
		}, tokenData[0]);

		return {
			lowestPair: lowestPair,
			highestPair: highestPair,
			profitMargin: (((highestPair.pairPriceUSD - lowestPair.pairPriceUSD) / lowestPair.pairPriceUSD) * 100).toFixed(2)
		};
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

margins(tokenAddresses.WAVAX).then(response => console.log(response))
margins(tokenAddresses.JOE).then(response => console.log(response))
