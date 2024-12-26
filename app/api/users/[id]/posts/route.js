import Prompt from "@models/prompt"
import { connectToDb } from "@utils/db"

export const GET = async (req, {params}) => {
  try {
    await connectToDb()
    const {id} = await params;
    const posts = await Prompt.find({creator: id }).populate('creator')

    if(!posts) {
      return new Response(`No posts found for this user: ${id}`, {
        status: 400
      })
    }

    return new Response(JSON.stringify(posts), {
      status: 200
    })

  } catch (error) {
    return new Response('No posts found', {
      status: 500
    })
  }
}