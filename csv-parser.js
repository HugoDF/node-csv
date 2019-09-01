const {EOL} = require('os');

const getValues = csv => csv.split(',');
const getRows = csv => csv.split(EOL);

function csvParser(csvText) {
  if (!csvText) {
    return [];
  }

  const [firstLine, ...lines] = getRows(csvText);

  const headingEntries = getValues(firstLine);
  const nameByColumnNumber = headingEntries.reduce((acc, curr, idx) => {
    acc[idx] = curr;
    return acc;
  }, {});
  const columnCount = headingEntries.length;

  return lines.map(csv => {
    return getValues(csv).reduce((acc, curr, idx) => {
      if (idx > columnCount) return acc;
      const fieldName = nameByColumnNumber[idx];
      if (!fieldName) return acc;
      acc[fieldName] = curr;
      return acc;
    }, {});
  });
}

module.exports = csvParser;
