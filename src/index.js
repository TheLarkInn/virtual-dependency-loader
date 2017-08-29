import loaderUtils from 'loader-utils';

/**
 *
 * @param {string} source
 * @param {object} map
 * @param {any} data
 */
export default function virtualDependencyLoader(source, map, data) {
  let { code, filename, cacheable } = loaderUtils.getOptions(this);

  if (cacheable === false) this.cacheable(false);

  this.resourcePath = filename;

  return code;
};
