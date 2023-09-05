import { context } from "./context";

import { extractSubFromToken } from '../logic/helpers/utils'

const getUserId = () => extractSubFromToken(context.token)

export default getUserId