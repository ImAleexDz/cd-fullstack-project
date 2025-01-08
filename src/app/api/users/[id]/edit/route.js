import { data } from '../../../../../lib/data'

// Edit user 

const editUserById = (id, body) => {
    const index = data.users.findIndex(usuario => usuario.id == id);

    if (index !== 1) {
       return  data.users[index] = {...body};
    }

    return data.users.find(usuario => usuario.id == id)
}

export async function PUT(req, context) {

    
        const body = await req.json()
        const id = await context.params.id
        console.log(id, body)
        
        const user = editUserById(id, body);

        if(!user) {
            return new Response(null, {
                status: 404
            })
        }
    
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }

        })
        
    
    
}