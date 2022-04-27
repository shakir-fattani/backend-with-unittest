const fs = require('fs');
const CsvReadableStream = require('csv-reader');

const readSampleData = (filePath) => new Promise((promiseRes, promiseRej) => {
    const inputStream = fs.createReadStream(filePath, 'utf8');
    const result = [];
    let header = false;
    inputStream
        .on('error', promiseRej)
        .pipe(new CsvReadableStream({ parseNumbers: true, delimiter: '\t' }))
        .on('data', (row) => { 
            if (header === false) {
                header = row;
                return;
            }
            const obj = {}
            header.forEach((element, i) => { obj[element] = row[i] });
            result.push(obj) 
        })
        .on('end', () => promiseRes(result));
})

const main = async () => {
    const result = await readSampleData('./bin/cities_canada-usa.tsv');
    console.log(result)
    console.log(result[0])
}
main();