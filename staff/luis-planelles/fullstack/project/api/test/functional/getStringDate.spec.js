const { expect } = require('chai');

const { getStringDate } = require('../../logic/helpers');

describe('getStringDate', () => {
  it('success on format a Date object"', () => {
    const date = new Date('2023-09-15');

    const formattedDate = getStringDate(date);

    expect(formattedDate).to.equal('2023-09-15');
  });

  it('should format a Date object for single-digit months and days', () => {
    const date = new Date('2023-01-05');

    const formattedDate = getStringDate(date);

    expect(formattedDate).to.equal('2023-01-05');
  });

  it('should raise a TypeError if date is not a valid Date object', () => {
    const date = '2023-01-05';

    try {
      getStringDate(date);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('date is not a valid Date object');
    }
  });
});
