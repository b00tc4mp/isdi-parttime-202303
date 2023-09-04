import {
  validateId,
  validatePhoneNumber,
  ExistenceError,
  DuplicityError,
  UnknownError,
  ContentError,
} from '../../../helpers'

import { User } from '../../data/models'

interface UpdateUserPhoneNumberProps {
  userId: string
  phoneNumber: string
}

export default function updateUserPhoneNumber({
  userId,
  phoneNumber,
}: UpdateUserPhoneNumberProps) {
  validateId(userId, 'User ID')
  validatePhoneNumber(phoneNumber)

  return (async () => {
    try {
      const user = await User.findById(userId)

      if (!user) throw new ExistenceError('User not found! 😥')

      if (phoneNumber === user.phoneNumber)
        throw new ContentError(
          'Your new phone number matches the current one 😥'
        )

      user.phoneNumber = phoneNumber.replaceAll(' ', '')

      await user.save()
    } catch (error: any) {
      if (error.message.includes('E11000'))
        throw new DuplicityError('You cannot use an existing phone number')

      throw new UnknownError(error.message)
    }
  })()
}