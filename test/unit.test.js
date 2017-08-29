import fs from 'fs';
import { runLoaders } from 'loader-runner';
import Promise from 'bluebird';
import { getFixtureResource, getFixture, getLoader } from './test-utils';

const runLoadersPromise = Promise.promisify(runLoaders);
const readFilePromise = Promise.promisify(fs.readFile, { context: fs });

const mockReplacementCodeString = 'console.log("I am the real code")';
const mockReplacementFilename = 'filename.imnotreal.js';

const loaders = getLoader({
  code: mockReplacementCodeString,
  filename: mockReplacementFilename,
});

describe('Example Loader Tests: Fixture: simple-file', () => {
  const fixtureName = 'simple-file';
  const resource = getFixture(fixtureName);

  test('loaded file should be different', async () => {
    const originalSource = await readFilePromise(resource);
    const { result } = await runLoadersPromise({ resource: getFixtureResource(fixtureName), loaders });

    expect(result).not.toEqual(originalSource);
  });

  test('source of loader should be equal to code option', async () => {
    const result = await runLoadersPromise({ resource: getFixtureResource(fixtureName), loaders });
    const resultMatcher = expect.arrayContaining([
      expect.stringContaining('console.log("I am the real code")'),
    ]);

    expect(result.result).toEqual(resultMatcher);
    expect(result).toMatchSnapshot();
  });
});
