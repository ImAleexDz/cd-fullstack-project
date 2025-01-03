//Import data
import { z } from 'zod'
import { data } from '../../../lib/data'
import path from 'path'

//Users schema

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    age: z.number(),
    genre: z.string().optional()
})

// GET
export async function GET() {
    //return new Response(JSON.stringify(data.users), {})
    return Response.json(data.users)
}

//POST
export async function POST(req) {

    try {
        const body = await req.json()

        //validate body against schema

        await userSchema.parseAsync(body)
    
        data.users.push(body)
    
        return new Response(null, {
            status: 201
        })
        
    } catch (error) {
        console.log(error)

        let err = error

        if (err instanceof z.ZodError) {
            err = error.issues.map((issue) => (
                {
                    path: issue.path[0],
                    message: issue.message
                }
            ))

            return new Response(JSON.stringify({errors: err}), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        return new Response(JSON.stringify({error: 'Algo ha fallado. Vuelve a intentarlo.'}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
}