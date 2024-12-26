import Prompt from "@models/prompt"
import { connectToDb } from "@utils/db"

export const GET = async (request, response) => {
  try {
    await connectToDb()

    const promptsList = await Prompt.find({}).populate('creator')

    if(!promptsList.length) {
      return new Response('Prompts list is empty!', {
        status: 400
      })
    }

    return new Response(JSON.stringify(promptsList), {status: 200})
  } catch (error) {
    return new Response('Something bad happened!', {
      status: 500
    })
  }
}