import context from "./context"
import { utils } from "./utils"

const { extractSubFromToken } = utils

export default (userId) => userId === extractSubFromToken(context.token)