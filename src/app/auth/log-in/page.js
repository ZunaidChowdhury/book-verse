import React from 'react'
import LogInForm from './LogInForm'

import { Suspense } from 'react';
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner';

import { getUser } from "@/lib/core/session";
import { redirect } from "next/navigation";

const LogInPage = async () => {
  const user = await getUser()
  // redirect user with role to dashboard after social sign in
  if (user) {
    redirect(`/dashboard/${user.role}`)
    return null;
  }
  return (
    <div>
      <Suspense fallback={<MyCustomSpinner text='Loading login form...' />}>
        <LogInForm />
      </Suspense>
    </div>
  )
}

export default LogInPage