import React from 'react'
import RegisterForm from './RegisterForm'
import { Suspense } from 'react';
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner';

const RegisterPage = () => {
  return (
    <div>
      <Suspense fallback={<MyCustomSpinner text='Loading registration form...' />}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}

export default RegisterPage