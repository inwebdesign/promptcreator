'use client'
import React from 'react'
import {useSession} from 'next-auth/react'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const PromptCard =  ({post, handleTagClick, handleEdit, handleDelete}) => {

 const [copied, setCopied] = useState(null)
 const pathName = usePathname()
 const {data: session} = useSession()

 const handleCopy = () => {
  setCopied(post.prompt)
  navigator.clipboard.writeText(post.prompt)
  setTimeout(() => setCopied(''), 3000)
 }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
       <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
        <Image 
          src={post.creator.image}
          alt='user image'
          className='rounded-full object-contain'
          width={40}
          height={40}
        />
        <div className='flex flex-col'>
        <Link href={`/profile/${post.creator._id}?name=${post.creator.username}`}>
          <h3 className='font-santoshi font-semibold text-gray-900'>{post.creator.username}</h3>
          <p className='font-inter text-sm ext-gray-500'>{post.creator.email}</p>
        </Link>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
            <Image 
              src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} 
              width={12} 
              height={12}
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            />
        </div>
        </div>
        </div>
        <p className='my-4 font-santoshi text-sm text-gray-700'>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag) }>#{post.tag}</p>

        {session?.user.id === post.creator._id && pathName === '/profile' && 
        (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p className='font-inter text-sm green_gradient cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard
