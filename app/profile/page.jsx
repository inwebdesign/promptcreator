'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const page = () => {

  const {data: session} = useSession()
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await fetch(`/api/users/${session?.user.id}/posts`)
        if(!result) {
          throw new Error("No results found!")
        }

        const data = await result.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    if(session?.user.id) fetchData()

  }, [])

 const handleEdit = (post) => {
  router.push(`/update-prompt?id=${post._id}`)
 }
 const handleDelete = async (post) => {
  const hasConfirmed = confirm("Are you sure that you want to delete the prompt?")
  if(hasConfirmed) {
    console.log({hasConfirmed})
    try{
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE'
      })

      const filteredPosts = posts.filter(p => p._id !== post._id)
      setPosts(filteredPosts)
    }catch(error) {
      console.error(error)
    }
  }
 }

  
  return (
    <div>
      <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default page
