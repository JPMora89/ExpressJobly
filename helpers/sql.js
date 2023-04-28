const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

//  The function takes in two arguments: dataToUpdate and jsToSql.

// The dataToUpdate parameter is an object containing the data that needs to be updated in a SQL database. The jsToSql parameter is an optional object that maps the JavaScript object keys to the corresponding column names in the SQL database.

// The function first extracts the keys from the dataToUpdate object and checks if there are any keys. If there are no keys, it throws a BadRequestError with a message "No data".

// The function then uses the map() method to create an array of strings that represents the SQL query to update the data. It does this by iterating over each key in the dataToUpdate object and using the corresponding column name from the jsToSql object if it exists.
//  The string generated for each key-value pair looks like '"column_name"=$1', where $1 is a placeholder for the value that will be passed in later. The cols array is constructed from these strings.

// Finally, the function returns an object with two properties:

//     setCols: a string that can be used in a SQL SET statement to update the data in the database. It looks like '"column1_name"=$1, "column2_name"=$2, ...'.
//     values: an array of values that correspond to the placeholders in the setCols string. These values are taken from the dataToUpdate object. 

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
