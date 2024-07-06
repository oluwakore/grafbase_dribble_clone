import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/sessions'
import ProfileMenu from './ProfileMenu'

type Props = {}

const Navbar = async() => {

  const session = await getCurrentUser()

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href="/">
        <Image 
          src="/logo.svg"
          alt='Logo'
          width={115}
          height={43}
        />
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((item) => (
            <Link key={item.key} href={item.href}>
              {item.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session?.user ? (
          <>

          <ProfileMenu session={session} />
           
            <Link href="/create-project">
            Share Work
            </Link>

          </>
        ) : (
          <AuthProviders /> 
        )}
      </div>
    </nav>
  )
}

export default Navbar