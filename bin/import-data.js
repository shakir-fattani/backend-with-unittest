const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const { addLocations } = require('./../data-layer/index')
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
            const obj = {};
            header.forEach((element, i) => { obj[element] = row[i]; });
            result.push(obj);
        })
        .on('end', () => promiseRes(result));
});

const main = async () => {
    const result = await readSampleData('./bin/cities_canada-usa.tsv');
    
    const locationObjs = result.map(obj => ({
        id: obj.id,
        name: obj.name,
        ascii: obj.ascii,
        alt_name: obj.alt_name,
        lat: obj.lat,
        long: obj.long,
        feat_class: obj.feat_class,
        feat_code: obj.feat_code,
        country: obj.country,
        cc2: obj.cc2,
        admin1: obj.admin1,
        admin2: obj.admin2,
        admin3: obj.admin3,
        admin4: obj.admin4,
        population: obj.population,
        elevation: obj.elevation,
        dem: obj.dem,
        tz: obj.tz,
        modified_at: new Date(obj.modified_at),
    }))
    
    const locations = await addLocations(locationObjs);
    console.log(locations);
};
main();
