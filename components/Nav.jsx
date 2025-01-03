'use client';
import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useEffect, useState } from "react";

const Nav = () => {
  const {data: session} = useSession()
  const [providers, setProviders] = useState(null)
  const [toogleDropdown, setToggleDropdovwn] = useState(false)

  useEffect(() => {
    const setAvaliableProviders = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    setAvaliableProviders()

  }, [])
  
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link  href="/" className="flex gap-2 flex-center">
      <Image src='/assets/images/logo.svg'
        width={30} 
        height={30} 
        alt="promptopia"
        className="object-contain"/>
      <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
    {session?.user ? (<div className="flex gap-3 md:gap-5">
        <Link href="/create-prompt" className="black_btn">Create post</Link>
        <button 
          type='button' 
          role="button" 
          aria-label="Sign out a user"
          onClick={signOut}
          className="outline_btn">Sign out</button>
          <Link href="/profile">
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              alt="user image"
            />
          </Link>
      </div>) : 
      
      <div>
      {providers && Object.values(providers).map(provider => (
        <button
          type="button"
          role="button"
          aria-label="Sign in the user"
          onClick={() => signIn(provider.id)}
          className="black_btn"
          key={provider.name}
        >Sign in</button>
      ))}
      </div>}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? 
          <div className="flex"> 
          <Image src={session?.user.image}
            width={30} 
            height={30} 
            alt="promptopia"
            className="rounded-fill"
            onClick={() => {setToggleDropdovwn(prev => !prev)}}/>
            {toogleDropdown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropdovwn(false)}
                >
                  My profile
                </Link>
                <Link
                  href='/create-prompt'
                  className="dropdown_link"
                  onClick={() => setToggleDropdovwn(false)}
                >
                  Create prompt
                </Link>
                <button
                  type="button"
                  role="button"
                  aria-label="Sign out the user"
                  onClick={() => {
                    setToggleDropdovwn(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>)}
          </div> : 
          <div>
          {providers && Object.values(providers).map(provider => (
            <button
              type="button"
              role="button"
              aria-label="Sign in the user"
              onClick={() => signIn(provider.id)}
              className="black_btn"
              key={provider.name}
            >Sign in</button>
          ))}</div>}
      </div>
    </nav>
  )
}

export default Nav
