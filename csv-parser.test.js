const test = require('tape');
const csvParser = require('./csv-parser');

test('should support empty string', async t => {
  t.plan(1);
  const actual = await csvParser('');
  t.deepEqual(actual, [], 'returns [] when passed ""');
});

const singleLineCsv = `Title,Other,Values`;

test('should support title line', async t => {
  t.plan(1);
  const actual = await csvParser(singleLineCsv);
  t.deepEqual(actual, [], 'returns []');
});

const multilineCsv = `title,other,value
hello world,what,value`;

test('should parse standard entry', async t => {
  t.plan(1);
  const actual = await csvParser(multilineCsv);
  const expected = [{title: 'hello world', other: 'what', value: 'value'}];
  t.deepEqual(actual, expected);
});

const extraColumnsCsv = `title,other,value
hello world,what,value,extra,value`;

test('should ignore extra columns', async t => {
  t.plan(1);
  const actual = await csvParser(extraColumnsCsv);
  const expected = [{title: 'hello world', other: 'what', value: 'value'}];
  t.deepEqual(actual, expected);
});

const quoteCommaCsv = `title,other,value
"hello "comma", "world"",what,value`;

test.skip('should handle quoted commas', async t => {
  t.plan(1);
  const actual = await csvParser(quoteCommaCsv);
  const expected = [
    {title: 'hello "comma", "world"', other: 'what', value: 'value'}
  ];
  t.deepEqual(actual, expected);
});

const newLineCsv = `title,other,values
"Hello\nworld",what,value`;

test.skip('should parse quoted newline correctly', async t => {
  t.plan(1);
  const actual = await csvParser(newLineCsv);
  const expected = [{title: 'Hello\nworld', other: 'what', values: 'values'}];
  t.deepEqual(actual, expected);
});
