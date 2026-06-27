'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MyCustomSpinner from '@/components/spinner/MyCustomSpinner'

const loading = () => {

  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <MyCustomSpinner />
    </div>
  )
}

export default loading