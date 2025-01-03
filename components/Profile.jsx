import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name,
  desc,
  data,
  handleEdit,
  handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='flex w-full'>
      {data.length ? data?.map((post) => (
        <PromptCard
        key={post._id} 
        post={post}
        handleEdit={() => handleEdit && handleEdit(post)}      
        handleDelete={() => handleDelete && handleDelete(post)}      
    />)) : <div>Loading...</div>}
      </div>

    </section>
  )
}

export default Profile
