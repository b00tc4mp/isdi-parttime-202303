import context from "./context";
import { utils } from "com";

const { extractSubFromToken } = utils

/**
 * Extraxt sub part from a token.
 */

export default () => extractSubFromToken(context.token)