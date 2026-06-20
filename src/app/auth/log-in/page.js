import React from 'react'
import LogInForm from './LogInForm'

import { Suspense } from 'react';

const LogInPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading form...</div>}>
        <LogInForm />
      </Suspense>
    </div>
  )
}

export default LogInPage