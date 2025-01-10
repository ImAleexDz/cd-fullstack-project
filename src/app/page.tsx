'use client'

import { ChangeEvent, useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import createClient from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { createUser, updateUser } from "./actions";

type User = {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  age: number,
  created_at?: string;
};

const initialState = {
  id: -1,
  firstname: '',
  lastname: '',
  email: '',
  age: 0
}

const supabase = createClient();

export default function Home() {

  const [formValues, setFormValues] = useState<User>(initialState);
  const [users, setUsers] = useState<User[] | null>();
  const [error, setError] = useState<PostgrestError>();

  const loadUsers = async () => {
    try {
      
      const { data: users, error: usersError } = await supabase.from('users').select();

      if (usersError) {
        setError(usersError)
      }

      setUsers(users)
    } catch (error) {

    }
  }

  useEffect(() => {
    loadUsers().catch(console.error)
  }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    return setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }))
  };

  const handleFormAction = async (formData: FormData) => {
    if (formValues.id === -1) {
      await createUser(formData);
      console.log("hola")
    } else {
      console.log("hola 2");
    }
    //setFormValues(initialState);
    loadUsers();
  };

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <form action={handleFormAction}>
        <div className="mb-3">
          <label className="form-label">
            Nombre
            <input type="text" name="firstname" className="form-control" value={formValues.firstname} onChange={handleFormChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido
            <input type="text" name="lastname" className="form-control" value={formValues.lastname} onChange={handleFormChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico
            <input type="email" name="email" className="form-control" value={formValues.email} onChange={handleFormChange} />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Edad
            <input type="number" name="age" className="form-control" value={formValues.age} onChange={handleFormChange} />
          </label>
        </div>
        <input type="hidden" name="id" value={formValues?.id} />

        <div className="mb-3">
          <div className="flex flex-row">
            <button type="submit" className="btn btn-primary">Enviar</button>
            <button type="button" className="btn btn-dark ms-2" onClick={() => setFormValues(initialState)}>Cancelar</button>
          </div>
        </div>
      </form>

      <div>
        {users?.map(user => (
          <UserItem 
          {...user} 
          key={`users-list-item-${user.id}`}
          onRefresh={loadUsers}
          />
        ))}
      </div>
    </div>
  );
}
