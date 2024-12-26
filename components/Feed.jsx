'use client'
import React, { useEffect, useRef, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [filteredPrompts, setFilteredPrompts] = useState([])
  const inputValue = useRef(null)
  const debounceTimer = useRef(null)
   
  const [prompts, setPropmts] = useState([])

  const fetchData = async () => {
    try {
      const result = await fetch('/api/prompt')
      if(!result) {
        throw new Error("No results found!")
      }

      const data = await result.json()
      setPropmts(data)
      setFilteredPrompts(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {

    fetchData()

  }, [])

  useEffect(() => {
    setFilteredPrompts(prompts);
  }, [prompts]);


  const filterBySearch = () => {
    const value = inputValue.current.value
    if(!value) {
      setFilteredPrompts(prompts)
      return
    }
    const searchedPrompts = filteredPrompts.filter(post => {
      if(post.creator.username.includes(value)) {
        return post.creator.username
      }
      if(post.tag.includes(value)) {
        return post.tag
      }
      return post.prompt.toLowerCase().includes(value.toLowerCase())
    })
    if(!searchedPrompts.length) {
      setFilteredPrompts(prompts)
      inputValue.current.value = null;
      inputValue.current.focus()
      return
    }
    setFilteredPrompts(searchedPrompts)
}

const handleSearchChange = e => {
  inputValue.current.value = e.target.value

  if (debounceTimer.current) {
    clearTimeout(debounceTimer.current);
  }

  // Set a new timer
  debounceTimer.current = setTimeout(() => {
    filterBySearch();
  }, 1000);
}

const handleTagClick = (tag) => {
  inputValue.current.value = tag
  setFilteredPrompts(filteredPrompts.filter(post => post.tag === tag))
}

  const PromptCardList = ({data, handleTagClick}) => {
    return (
      <div className='mt-16 prompt_layout'>
      {(data.map((post) => 
          <PromptCard
            key={post._id} 
            post={post}
            handleTagClick={handleTagClick}      
        />))}
      </div>
    )
  }


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          role='input'
          aria-label='Search for the prompts'
          ref={inputValue}
          onChange={handleSearchChange}
          className='search_input peer'
          placeholder='Search for a tag or a username'
        />
      </form>

      
      <PromptCardList data={filteredPrompts} handleTagClick={handleTagClick}/>
      
    </section>
  )
}

export default Feed
