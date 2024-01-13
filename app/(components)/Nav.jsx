import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Nav = async () => {
  const session = await getServerSession(options) 
  return (
    <header className="bg-gray-600 text-gray-100">
        <nav className='flex flex-col lg:flex-row lg:justify-between items-center w-full px-10 py-4'>
          <div className="md:pb-3">My site</div>

          <div className="flex flex-col justify-center lg:flex-row lg:gap-10 ">
            <Link href='/' className='hover:bg-gray-700 p-2 rounded-md no-underline'>Home</Link>
            <Link href='/CreateUser' className='hover:bg-gray-700 p-2 rounded-md no-underline'>Create User</Link>
            <Link href='/ClientMember' className='hover:bg-gray-700 p-2 rounded-md no-underline'>Client Member</Link>
            <Link href='/Member' className='hover:bg-gray-700 p-2 rounded-md no-underline'>Member</Link>
            <Link href='/Public' className='hover:bg-gray-700 p-2 rounded-md no-underline'>Public</Link>
            {session ? (
              <Link href="/api/auth/signout?callbackUrl=/" 
              className='hover:bg-gray-700 p-2 rounded-md no-underline'>Logout</Link>
            ) : (
              <Link href="/api/auth/signin" 
              className='hover:bg-gray-700 p-2 rounded-md no-underline'>Login</Link>
            )}
          </div>
        </nav>
    </header>
  )
}

export default Nav