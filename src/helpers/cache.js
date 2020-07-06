// @ts-check

import redis from "redis";

import log from "./log";

const { REDIS_URL } = process.env;

const redisClient = redis.createClient({
  url: REDIS_URL,
});
redisClient.on("error", function (error) {
  log.error("helpers/cache.js", error);
});

export default {
  /**
   * @returns {Promise<void>}
   */
  close: async () => {
    return new Promise((resolve, reject) => {
      redisClient.quit(err => {
        if (err !== null) {
          reject(err);

          return;
        }

        resolve();
      });
    });
  },

  /**
   * @param {string} key
   *
   * @returns {Promise<?object>}
   */
  get: async key => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, stringifiedValue) => {
        if (err !== null) {
          reject(err);

          return;
        }

        const value = stringifiedValue !== null ? JSON.parse(stringifiedValue) : null;

        resolve(value);
      });
    });
  },

  /**
   * @param {string} key
   * @param {Object} value
   *
   * @returns {Promise<void>}
   */
  set: async (key, value) => {
    const stringifiedValue = JSON.stringify(value);

    return new Promise((resolve, reject) => {
      redisClient.set(key, stringifiedValue, err => {
        if (err !== null) {
          reject(err);

          return;
        }

        resolve();
      });
    });
  },

  /**
   * @param {string} key
   *
   * @returns {Promise<void>}
   */
  unset: async key => {
    return new Promise((resolve, reject) => {
      redisClient.del(key, err => {
        if (err !== null) {
          reject(err);

          return;
        }

        resolve();
      });
    });
  },

  /**
   * @param {string[]} keys
   *
   * @returns {Promise<void>}
   */
  unsetAll: async keys => {
    return new Promise((resolve, reject) => {
      redisClient.del(keys, err => {
        if (err !== null) {
          reject(err);

          return;
        }

        resolve();
      });
    });
  },
};
