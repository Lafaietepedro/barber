'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { initLogo3D } from '@/lib/threeUtils'

export default function Logo3D () {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      initLogo3D(containerRef.current)
    }
  }, [])

  return <div ref={containerRef} className='w-full h-full'></div>
}