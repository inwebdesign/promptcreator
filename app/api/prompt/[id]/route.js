import Prompt from "@models/prompt"
import { connectToDb } from "@utils/db"

export const GET = async (request, {params}) => {
  try {
    await connectToDb()
    const {id} = await params;

    const prompt = await Prompt.findById(id).populate('creator')

    if(!prompt) {
      return new Response('Prompts list is empty!', {
        status: 400
      })
    }

    return new Response(JSON.stringify(prompt), {status: 200})
  } catch (error) {
    return new Response('Something bad happened!', {
      status: 500
    })
  }
}

export const PATCH = async (request, {params}) => {

  const {prompt, tag} = await request.json()
  try {
    await connectToDb()
    const {id} = await params;

    const post = await Prompt.findById(id).populate('creator')

    if(!post) {
      return new Response('Post not found!', {
        status: 404
      })
    }
    post.prompt = prompt
    post.tag = tag

    await post.save()

    return new Response(JSON.stringify(post), {
      status: 200
    })

  } catch (error) {
    return new Response('Something bad happened!', {
      status: 500
    })
  }
}

export const DELETE = async (request, {params}) => {
  console.log("Delete!")
  try {
    await connectToDb()
    const {id} = await params;
    console.log({id})
    await Prompt.findByIdAndDelete(id)

    return new Response("Prompt successfully deleted from the db", {status: 200})

  } catch (error) {
    console.error('Error deleting prompt:', error)
    return new Response('Something bad happened!', {
      status: 500
    })
  }
}