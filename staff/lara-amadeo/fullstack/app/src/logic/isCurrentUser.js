import { context } from "./context";

import { extractSubFromToken } from '../logic/helpers/utils'

const isUserLoggedIn = (userId) => userId === extractSubFromToken(context.token)

export default isUserLoggedIn