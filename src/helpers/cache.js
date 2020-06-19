// @ts-check

import NodeCache from "node-cache";

const DEFAULT_TTL = 7 * 24 * 60 * 60; // => 7d

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
   * @param {number} ttl
   *
   * @returns {boolean}
   */
  set: (key, value, ttl = DEFAULT_TTL) => cache.set(key, value, ttl),
};
