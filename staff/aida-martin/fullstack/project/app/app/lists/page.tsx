'use client'

import Tittle from '../library/Tittle'
import ListPreview from '../components/ListPreview'
import ContainerLink from '../components/ContainerLink'
import { IconBookmarkFill, IconHeartFill } from '../components/Icons'
import { redirect } from 'next/navigation'
import isUserLoggedIn from '../logic/isUserLoggedIn'

export default function Lists() {
  // Es necesario ponerlo de cliente para comprobar si el usuario está logueado
  if (!isUserLoggedIn()) redirect('/account/login')

  const lists = [
    {
      route: 'lists/collection',
      tittle: 'My collection',
      _icon: IconBookmarkFill,
      section: 'collection',
      color: 'text-[#007cec]',
    },
    {
      route: 'lists/whislist',
      tittle: 'My whislist',
      _icon: IconHeartFill,
      section: 'whislist',
      color: 'text-[#EC0063]',
    },
  ]

  return (
    <section className="p-4 bg-white">
      <Tittle name="Your lists" />
      <div className="flex flex-col gap-3">
        {lists.map(({ route, tittle, _icon, section, color }) => (
          <ContainerLink route={route} key={section}>
            <ListPreview
              tittle={tittle}
              icon={<_icon size="60px" />}
              section={section}
              subtittle="Last added"
              color={color}
            />
          </ContainerLink>
        ))}
      </div>
    </section>
  )
}
