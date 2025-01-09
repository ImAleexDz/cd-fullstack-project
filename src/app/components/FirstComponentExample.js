'use client'
import React, { useEffect } from 'react';
import createClient from '@/utils/supabase/client'

const FirstComponentExample = () => {

    useEffect(() => {

        const loadUsers = async () => {
            try {
                const supabase = await createClient();
                const { data: users } = await supabase.from('users').select()
                console.log(supabase)
                console.log(users)
            } catch (error) {
                
            }
        }
        
        console.log('hola')

        loadUsers().catch(console.error)
    }, [])

    return (
        <div>
            configuracion que tienen en su cdn
            cname apunta directamente a azion y no al general donde están todos los clientes
        </div>
    );
};

export default FirstComponentExample;