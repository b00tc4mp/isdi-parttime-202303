import context from "./context"
import { utils } from "com"

const { extractSubFromToken } = utils

/**
 * Checks if the user id belongs to the current user.
 */

export default (userId) => userId === extractSubFromToken(context.token)