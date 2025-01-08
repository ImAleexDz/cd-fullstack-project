import { data } from '../../../../lib/data'
//GET api users id

const getUserById = (id) => {
    return data.users.find((user) => {
        return user ?user.id == id : null
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

//Delete user 

const deleteUserById = (id) => {
    const index = data.users.findIndex(usuario => usuario.id == id);

    if (index !== -1) {
        return delete data.users[index]
    }
}

export async function DELETE(request, context) {
    const id = await context.params.id;

    const user = deleteUserById(id);

    if(!user) {
        return new Response(null, {
            status: 404
        })
    }

    return new Response(JSON.stringify({meesage: 'Usuario borrado con éxito'}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}