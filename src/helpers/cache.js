// @ts-check

import NodeCache from "node-cache";

const cache = new NodeCache();

export default {
  /**
   * @param {string} key
   *
   * @returns {object=}
   */
  get: key => cache.get(key),

  /**
   * @param {string} key
   * @param {*} value
   * @param {number=} ttl
   *
   * @returns {boolean}
   */
  set: (key, value, ttl = 0) => cache.set(key, value, ttl),
};
