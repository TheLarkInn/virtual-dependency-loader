# virtual-dependency-loader
Take a single file, process pieces of that file as "dependencies" in loader chain. This is traditionally leveraged inside of other loaders.

## Usage

### Installation
`npm install --save virtual-dependency-loader`

### Inside of another loader implementation
**loader.js**
```javascript
import querystring from 'querystring';
import {stringifyRequest} from 'loader-utils';

export default function someLoader(source, map, ast) {
  const [normalSource, virtualizedSource] = source.split("__virtual_dependency__");
  const {loadModule, resourcePath, async} = this;
  const callback = async();
  const dummyFilePath = path.resolve(__dirname, "../dummy-file.js");

  const inlineLoaderOptions = queryString.stringify({
    code: virtualizedSource,
    filename: `${resourcePath}.script.js`
  });

  const resource = stringifyRequest(`virtual-dependency-loader?${inlineLoaderOptions}!${dummyFilePath}`)

  const virtualizedSourceProcessedByOtherLoaders = loadModule(resource, (err, code, map) => {
    const newSource = [normalSource, code].join("__virtual_dependency__");

    callback(null, newSource);
  });
};
```

**file-that-was-ran-through-loader.js**
```javascript
var hello = "hello";

/* __virtual_dependency__ */
class Bar {
  constructor(foo) {
    this.foo = foo;
  };

  print() {
    console.log(this.foo);
  }
}

const baz = new Bar(hello);
```

## Credit
Hats off to Jason Miller for this idea while he was working on his (vue/polymer/sfc)=>preact compiler/loader. 

