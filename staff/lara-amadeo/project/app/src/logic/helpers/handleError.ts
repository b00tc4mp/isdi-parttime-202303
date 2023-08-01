import { useContext } from 'react'
import errors from './errors'
import Context from '../../Context'

const { DuplicityError, ExistanceError, AuthError, ContentError } = errors

export default (error: object) => {

    const { toast } = useContext(Context)

    if (error instanceof DuplicityError)
        toast(error, 'error')
    else if (error instanceof ExistanceError)
        toast(error, 'error')
    else if (error instanceof AuthError)
        toast(error, 'error')
    else if (error instanceof TypeError)
        toast(error, 'error')
    else if (error instanceof ContentError)
        toast(error, 'error')
    else if (error instanceof RangeError)
        toast(error, 'error')
    else
        console.log(error)
}

