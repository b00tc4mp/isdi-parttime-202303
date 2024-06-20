import context from './context'
import { utils } from 'com'

const { extractSubFromToken } = utils

export default (usersId) => usersId.includes(extractSubFromToken(context.token))