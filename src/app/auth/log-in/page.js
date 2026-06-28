import React from 'react'
import LogInForm from './LogInForm'

import { Suspense } from 'react';
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner';

const LogInPage = () => {
  return (
    <div>
      <Suspense fallback={<MyCustomSpinner text='Loading login form...' />}>
        <LogInForm />
      </Suspense>
    </div>
  )
}

export default LogInPage