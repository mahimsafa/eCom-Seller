import { Button } from 'antd';
import { Link } from 'react-router-dom'

export default function Header({signOut,user}) {
  const email = user?.signInUserSession?.idToken.payload.email

  return (
    <div className='flex bg-white space-x-2 min-h-[60px] py-3 shadow-sm top-0 z-50 w-screen justify-between items-center px-5 fixed'>
      {/* <div className='w-8/12 flex justify-between mx-auto items-center'> */}
      <Link to='/'>
        <img src="https://www.seekpng.com/png/full/428-4289671_logo-e-commerce-good-e-commerce-logo.png" alt=""
          className='h-10'
        />
      </Link>
      <nav
        className='flex space-x-3'
      >{
        user &&
        <h1>Seller Dashboard <span className='text-red-400'> &#40;{email}&#41;</span></h1>
      }
      </nav>
      <div className='cursor-pointer '>
        {
          user &&
        <Button danger onClick={signOut}>SignOut</Button>
        }
      </div>
      {/* </div> */}
    </div>
  )
}
