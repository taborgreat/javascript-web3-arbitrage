import fs from 'fs'
import path from 'path'

const directoryPath = 'C:/Users/ddram/myCode/javascript-web3-arbitrage/dev/exchanges'; // Replace with the actual path to your files
const outputFile = './full.js'; // Replace with the desired output file path

const combinedObjects = [];

fs.readdirSync(directoryPath).forEach((filename) => {

	if (filename.startsWith('cutDownW') && filename.endsWith('.js')) {
		const filePath = path.join(directoryPath, filename);
		console.log("fp", filePath)
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		// Assuming each file contains a valid JSON object
		try {
			const jsonObject = JSON.parse(fileContent);
			combinedObjects.push(jsonObject);
		} catch (error) {
			console.error(`Error parsing JSON in file ${filename}:`, error.message);
		}
	}
});

// Write the combined array to the output file
fs.writeFileSync(outputFile, `const combinedObjects = ${JSON.stringify(combinedObjects, null, 2)};`);

console.log(`Objects combined and saved to ${outputFile}`);
