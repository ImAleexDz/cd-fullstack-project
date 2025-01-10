'use client'
import createClient from '@/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';
import { FC, useState } from 'react'

type User = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    created_at?: string;
  };

  type UserItemProps = User & {
    onRefresh: () => void
  }

  const supabase = createClient();

const UserItem: FC<UserItemProps> = ({
    firstname,
    lastname,
    age,
    email,
    id,
    onRefresh
}) => {

    const [error, setError] = useState<string | null>();
    const [deleteLabel, setDeleteLabel] = useState('Eliminar');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteUser = async () => {
        setDeleteLabel('Eliminando...');
        setError(null);

        try {
            const { error } = await supabase.from('users').delete().eq('id', id);

            if (error) {
                setError(error);
                console.log(error);
                return;
            }

            onRefresh();

        } catch (error) {
            console.log(error);
            setError('Ha ocurrido un error.Vuelve a intentarlo');
        }
    };

    const handleConfirmDelete = () => {
        setDeleteLabel('Confirmar'),
        setConfirmDelete(true)
    }

    return (
        <div className="mb-4">
            <div className="flex flex-row">
                <p>
                    {firstname} {lastname}
                </p>
                <p>
                    Edad: {age} años
                </p>
                <p>
                    Correo: {email}
                </p>
                {error && <p>{error}</p>}
            </div>

            <button 
            type='button' 
            className="btn btn-danger"
            onClick={confirmDelete ? handleDeleteUser : handleConfirmDelete}
            >
                {deleteLabel}
            </button>
            <button type='button' className="btn btn-primary ms-2">
                Editar
            </button>
        </div>
    );
}

export default UserItem;