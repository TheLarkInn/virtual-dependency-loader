import esmModule from './static-esm-module';
import file from './override.thisfile';

const getLazyModule = () => System.import('./lazy-module');

setTimeout(() => {
  getLazyModule.then((modDefault) => {
    console.log(modDefault); //eslint-disable-line
  });
}, 300);

console.log(esmModule, file); //eslint-disable-line
