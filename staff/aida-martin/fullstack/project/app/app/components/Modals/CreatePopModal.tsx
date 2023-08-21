import AccountContainer from '../AccountContainer'
import { IconArrowLeft } from '../Icons'
import CreatePopForm from '../CreatePopForm'

interface CreatePopModalProps {
  onCreated: () => void
  onCancel: () => void
}

export default function CreatePopModal({
  onCreated,
  onCancel,
}: CreatePopModalProps) {
  return (
    <>
      <AccountContainer className="h-auto">
        <button
          className="text-general-blue flex items-center justify-center h-5 w-5 mb-7"
          onClick={onCancel}
        >
          <IconArrowLeft size="24px"></IconArrowLeft>
        </button>

        <CreatePopForm onCreated={onCreated} />
      </AccountContainer>
    </>
  )
}
