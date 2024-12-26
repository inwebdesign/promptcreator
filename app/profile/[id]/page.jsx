'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {

  const {data: session} = useSession()
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const {id} = useParams()
  const name = searchParams.get('name')

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await fetch(`/api/users/${id}/posts`)
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
   await fetch(`/api/prompt/${post._id}`, {
    method: 'DELETE',
   })
 }

  
  return (
    <Suspense fallback={<div>Loadin....</div>}>
      <Profile 
        name={name}
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  )
}

export default MyProfile
