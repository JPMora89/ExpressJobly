const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe('sqlForPartialUpdate', () => {
  test('correctly generates SQL SET statement and values', () => {
    const data = { firstName: 'Aliya', age: 32 };
    const sqlMappings = { firstName: 'first_name' };

    const { setCols, values } = sqlForPartialUpdate(data, sqlMappings);

    expect(setCols).toBe('"first_name"=$1, "age"=$2');
    expect(values).toEqual(['Aliya', 32]);
  });



  test('throws error when dataToUpdate is empty', () => {
    expect(() => sqlForPartialUpdate({}, {})).toThrow(BadRequestError);
  });
});