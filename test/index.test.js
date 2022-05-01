const { expect } = require('./utils/chai');
const { request } = require('./utils/app');
const { LocationService } = require('../services/index');

describe('Location Suggestion', async () => {
    it('should get 404', async () => {
        const response = await request.get('/test/suggestions');

        expect(response).to.have.status(404);
    });

    it('suggestions with location', async () => {
        const suggestions = await LocationService.getSuggestion({
            latitude: 43.70011,
            longitude: -79.4163,
            sort: 'distance',
        });

        expect(suggestions).to.be.an('array');
        expect(suggestions.length).to.be.greaterThan(0);
        let distance = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const loc of suggestions) {
            expect(loc).to.contain.keys(['name', 'distance', 'latitude', 'longitude']);
            expect(loc.distance).to.be.greaterThanOrEqual(distance);
            distance = loc.distance;
        }
    });

    it('suggestions with location, radius in KM', async () => {
        const suggestions = await LocationService.getSuggestion({
            latitude: 43.70011,
            longitude: -79.4163,
            radius: 2000,
            sort: 'distance',
        });

        // eslint-disable-next-line max-len
        // const response = await request.get('/location/suggestions?latitude=43.70011&longitude=-79.4163&radius=200&sort=distance&q=londo');

        expect(suggestions).to.be.an('array');
        expect(suggestions.length).to.be.greaterThan(0);
        let distance = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const loc of suggestions) {
            expect(loc).to.contain.keys(['name', 'distance', 'latitude', 'longitude']);
            expect(loc.distance).to.be.greaterThanOrEqual(distance);
            distance = loc.distance;
        }
    });

    it('suggestions with location, radius in KM, query: `london`', async () => {
        const suggestions = await LocationService.getSuggestion({
            latitude: 43.70011,
            longitude: -79.4163,
            radius: 2000,
            query: 'london',
            sort: 'distance',
        });

        expect(suggestions).to.be.an('array');
        expect(suggestions.length).to.be.greaterThan(0);
        let distance = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const loc of suggestions) {
            expect(loc).to.contain.keys(['name', 'distance', 'latitude', 'longitude']);
            expect(loc.distance).to.be.greaterThanOrEqual(distance);
            distance = loc.distance;
        }
    });

    it('suggestions with query: `london`', async () => {
        const suggestions = await LocationService.getSuggestion({
            query: 'london',
        });

        expect(suggestions).to.be.an('array');
        expect(suggestions.length).to.be.greaterThan(0);
        // eslint-disable-next-line no-restricted-syntax
        for (const loc of suggestions) {
            expect(loc).to.contain.keys(['name', 'latitude', 'longitude']);
        }
    });
});
