import { utils } from "com";
import { context } from ".";

const { extractSubFromToken } = utils

/**
 * Checks if an app user is followed by the current user
 * 
 * @param {string} followerUsers The users that are following the requested user.
 */

export default (followerUsers) => followerUsers.some(follow => follow.id.toString() === extractSubFromToken(context.token))