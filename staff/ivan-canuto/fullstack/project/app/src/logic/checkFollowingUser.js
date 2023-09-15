import { utils } from "com";
import { context } from ".";

const { extractSubFromToken } = utils

/**
 * Checks if an app user is followed by the current user
 * 
 * @param {string} followerUsers The users that are following the requested user.
 * 
 * @returns {boolean} Returns true if the current user is following anorther app user, false if not
 */

export default (followerUsers) => followerUsers.some(follow => follow.id.toString() === extractSubFromToken(context.token))