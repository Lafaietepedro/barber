'use client'

import { useEffect, useRef } from 'react'
import { initLogo3D } from '@/lib/threeUtils'

export default function Logo3D () {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      return initLogo3D(containerRef.current)
    }

    return undefined
  }, [])

  return <div ref={containerRef} className='w-full h-full'></div>
}
