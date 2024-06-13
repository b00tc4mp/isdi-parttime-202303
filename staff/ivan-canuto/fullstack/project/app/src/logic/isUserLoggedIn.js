import context from "./context"
import { utils } from "com"

const { isTokenValid, isTokenAlive } = utils

/**
 * Checks if the token is valid and if it has not spired yet.
 */

export default () => isTokenValid(context.token) && isTokenAlive(context.token)