'use client'

import { ChangeEvent, useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import createClient from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { createUser, updateUser } from "./actions";
import { Modal, Button } from 'react-bootstrap'

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
  const [show, setShow] = useState(false)

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
    } else {
      await updateUser(formData);
    }
    setFormValues(initialState);
    loadUsers();
    handleClose();
  };

  const handleEditUser = (user: User) => {
    //Rellenar el form
    setFormValues(user);
    console.log(user);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h1>Lista de usuarios</h1>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action={handleFormAction}>
            <div className="mb-3">
              <label className="form-label w-100">
                Nombre
                <input type="text" name="firstname" className="form-control" value={formValues.firstname} onChange={handleFormChange} />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label w-100">Apellido
                <input type="text" name="lastname" className="form-control" value={formValues.lastname} onChange={handleFormChange} />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label w-100">Correo electrónico
                <input type="email" name="email" className="form-control" value={formValues.email} onChange={handleFormChange} />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label w-100">Edad
                <input type="number" name="age" className="form-control" value={formValues.age} onChange={handleFormChange} />
              </label>
            </div>
            <input type="hidden" name="id" value={formValues?.id} />

            <div className="mb-3">
              <div className="flex flex-row">
                <button type="button" className="btn btn-dark"
                  onClick={
                    () => {
                      setFormValues(initialState);
                      handleClose();
                    }
                  }
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary ms-3">Enviar</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Button variant="primary" onClick={handleShow}>
        Agregar Usuario
      </Button>

      <div>
        {users?.map(user => (
          <UserItem
            {...user}
            key={`users-list-item-${user.id}`}
            onRefresh={loadUsers}
            onEdit={handleEditUser}
          />
        ))}
      </div>


    </div>
  );
}
