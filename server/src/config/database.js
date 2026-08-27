import neo4j from 'neo4j-driver';
import config from './env.js';
import logger from '../utils/logger.js';

let driver = null;

/**
 * Initializes and returns the Neo4j/CognoDB driver
 */
export const getDriver = () => {
  if (!driver) {
    if (!config.cognodb.uri || !config.cognodb.password) {
      throw new Error('CognoDB connection details missing in environment variables');
    }

    try {
      driver = neo4j.driver(
        config.cognodb.uri,
        neo4j.auth.basic(config.cognodb.user, config.cognodb.password),
        {
          maxConnectionPoolSize: 50,
          connectionAcquisitionTimeout: 10000,
          disableLosslessIntegers: true // Returns standard JS numbers instead of Integer objects
        }
      );
      logger.info('Initialized CognoDB driver');
    } catch (error) {
      logger.error('Failed to create CognoDB driver:', error.message);
      throw error;
    }
  }
  return driver;
};

/**
 * Creates and returns a new database session
 */
export const getSession = (database) => {
  const currentDriver = getDriver();
  return currentDriver.session({ database });
};

/**
 * Executes a parameterized Cypher query
 * @param {string} cypher - The Cypher query string
 * @param {object} params - Parameters object for the query
 * @returns {Promise<Array>} Array of plain JS record objects
 */
export const runQuery = async (cypher, params = {}) => {
  const session = getSession();
  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => {
      const obj = {};
      record.keys.forEach((key) => {
        obj[key] = record.get(key);
      });
      return obj;
    });
  } catch (error) {
    logger.error('Cypher Query Execution Error:', error.message);
    throw error;
  } finally {
    await session.close();
  }
};


export const verifyConnectivity = async () => {
  try {
    const currentDriver = getDriver();
    const serverInfo = await currentDriver.getServerInfo();
    logger.info(`Successfully connected to CognoDB: ${serverInfo.address} (${serverInfo.agent})`);
    return true;
  } catch (error) {
    logger.error('CognoDB connectivity verification failed:', error.message);
    return false;
  }
};


export const closeDriver = async () => {
  if (driver) {
    await driver.close();
    driver = null;
    logger.info('CognoDB driver closed');
  }
};

export default {
  getDriver,
  getSession,
  runQuery,
  verifyConnectivity,
  closeDriver
};
