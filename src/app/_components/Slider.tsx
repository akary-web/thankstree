'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/images/watering.png',
  '/images/nurture.png',
  '/images/tree.png',
  '/images/bird.png',
]

export default function FadeInImages() {
  const [visibleImages, setVisibleImages] = useState<number[]>([])

  useEffect(() => {
    // 画像が順番に出現するように、タイムアウトを使って遅延を設定
    const timeouts = images.map((_, index) => {
      return setTimeout(() => {
        setVisibleImages((prev) => [...prev, index])
      }, index * 5000) // 各画像が1秒ずつ遅れて表示される
    })

    // クリーンアップ関数でタイマーをクリア
    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="flex justify-center items-center space-x-4">
      {images.map((src, index) => (
        <div
          key={index}
          className={`transition-opacity duration-1000 ${
            visibleImages.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            width={300}  // 幅を指定
            height={300}  // 高さを指定
          />
        </div>
      ))}
    </div>
  )
}

