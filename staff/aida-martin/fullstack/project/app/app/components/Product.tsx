import AddToListsButtons from './AddToListsButtons'
import ProductImage from './ProductImage'
import Container from '../library/Container'
import Link from 'next/link'

export default function Product({
  image,
  type,
  name,
  id,
  pop,
  onChange,
}: {
  image: string
  type: string
  name: string
  id: string
  pop: {
    id: string
    userCollect: boolean
    userWhislist: boolean
  }
  onChange?: () => void
}) {
  return (
    <Container className="p-2">
      <Link className="flex flex-col items-center" href={`/catalog/pop/${id}`}>
        <ProductImage image={image} name={name} size={130} />
      </Link>
      <h1 className="text-text-product-light mt-1 mx-2 font-light">{type}</h1>
      <h2 className="text-text-product-light mx-2 text-[13px] font-semibold leading-none mb-3">
        {name}
      </h2>
      <AddToListsButtons pop={pop} onChange={onChange} />
    </Container>
  )
}
