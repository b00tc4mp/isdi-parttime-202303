import Image from 'next/image'
import { IconSearch } from './Icons'

export default function Header() {
  return (
    <header className="grid grid-cols-3 h-auto bg-general-blue">
      <Image
        className="justify-self-center col-start-2"
        src="/funko-logo.svg"
        alt="logo"
        width="110"
        height="80"
        quality="100"
      />

      <button className="bg-general-blue justify-self-end mr-3 p-[6px_10px_6px_10px] flex items-center">
        <IconSearch size="20px" />
      </button>
    </header>
  )
}
