import { data } from '../../../../lib/data'
//GET api users id

const getUserById = (id) => {
    return data.users.find((user) => {
        return user.id == id
    })
}

export async function GET(request, context) {
    const id = await context.params.id;

    const user = getUserById(id);

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
