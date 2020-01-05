import { logger } from "./logger";

/**
 * Iterates over an Error object to show it at console.
 *
 * @param {*} error any sort of error.
 * @returns {void} void
 */
export function printErrors (error: Error): void {
    Object.keys(error).forEach((key) => logger.error(`${key}: ${error[key]}`));
}
