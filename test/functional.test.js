// import fs from 'fs';
// import Promise from 'bluebird';
import {
  runWebpackExampleInMemory,
  // fs as sharedFs
} from '../test/test-utils';

// const readdir = Promise.promisify(fs.readdir, { context: sharedFs });
// const readFile = Promise.promisify(fs.readFile, { context: sharedFs });
// const fsReaddir = Promise.promisify(fs.readdir, { context: sharedFs });
// const fsReadFile = Promise.promisify(fs.readFile, { context: sharedFs });
// const fsStat = Promise.promisify(fs.stat, { context: sharedFs });
// const fsExists = Promise.promisify(fs.exists, { context: sharedFs });

test('should run with no errors or warnings', async () => {
  const buildStats = await runWebpackExampleInMemory('simple');
  const { errors, warnings } = buildStats;

  expect([...errors, ...warnings].length).toBe(0);
});

test('should append transformations to JavaScript module', async () => {
  const buildStats = await runWebpackExampleInMemory('simple');
  const { modules } = buildStats;

  const moduleToTest = modules[0].source()._source._value; //eslint-disable-line
  const loadedString = '* Original Source From Loader';

  expect(moduleToTest).toEqual(expect.stringContaining(loadedString));
  expect(moduleToTest).toMatchSnapshot();
});
