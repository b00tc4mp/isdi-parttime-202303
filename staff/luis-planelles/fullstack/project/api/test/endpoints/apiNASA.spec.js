require('dotenv').config();

const { expect } = require('chai');

describe('NASA API routes', () => {
  describe('Asteroids Neows', () => {
    const asteroids = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${process.env.NASA_KEY}`;

    it('should return a successful response for NASA API asteroids GET /', async () => {
      const res = await fetch(asteroids);
      const resBody = await res.text();

      expect(res.status).to.equal(200);

      if (resBody) {
        const data = JSON.parse(resBody);
        const asteroidsData = data.near_earth_objects;

        asteroidsData.map((asteroid) => {
          expect(asteroid.name_limited).to.be.a('string');
          expect(asteroid.links.self).to.contain(
            'api.nasa.gov/neo/rest/v1/neo/'
          );
          expect(asteroid.absolute_magnitude_h).to.be.a('number');
        });
      }
    });
  });

  describe('Space Weather Database Notifications DONKI', () => {
    const isDateBetween = (startDate, endDate, dateToCheck) => {
      return dateToCheck >= startDate && dateToCheck <= endDate;
    };

    const NASADonki = 'https://api.nasa.gov/DONKI';

    const startDate = '2023-06-22';
    const endDate = '2023-06-25';

    it('should return a successful response for NASA API mass ejection GET /', async () => {
      const eventName = 'CME';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);
      const resBody = await res.text();

      expect(res.status).to.equal(200);

      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.startTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.contain(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API geo storm GET /', async () => {
      const eventName = 'GST';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.startTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API planet shock GET /', async () => {
      const eventName = 'IPS';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.eventTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API solar flare GET /', async () => {
      const eventName = 'FLR';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.beginTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.classType[0]).to.equal('M');
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API solar particle GET /', async () => {
      const eventName = 'SEP';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.eventTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API magneto pause GET /', async () => {
      const eventName = 'MPC';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.eventTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API radiacion belt GET /', async () => {
      const eventName = 'RBE';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.eventTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }
    });

    it('should return a successful response for NASA API high speed steam GET /', async () => {
      const eventName = 'HSS';
      const endPoint = `${NASADonki}/${eventName}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_KEY}`;
      const res = await fetch(endPoint);

      expect(res.status).to.equal(200);

      const resBody = await res.text();
      if (resBody) {
        const eventData = JSON.parse(resBody);

        eventData.map((event) => {
          const isBetween = isDateBetween(
            startDate,
            endDate,
            event.eventTime.slice(0, 10)
          );

          expect(isBetween).to.be.true;
          expect(event.link).to.include(
            `/webtools.ccmc.gsfc.nasa.gov/DONKI/view/${eventName}/`
          );
        });
      }

      const remainingRequests = res.headers.get('x-ratelimit-remaining');
      console.log('Remaining Requests:', remainingRequests);
    });
  });
});
