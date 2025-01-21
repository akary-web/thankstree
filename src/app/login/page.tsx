'use client'

import { supabase } from '../util/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('ログインに失敗しました')
    } else {
      router.replace('/')
    }
  }

  return (
    <div>
      <h1 className="font-bold text-softblack-900 text-xl text-center pt-[122px] pb-[44px]">
        ログイン
      </h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[300px]">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-medium text-text-900"
            >
              ID（メールアドレス）
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border-[0.5px] border-text-900 text-text-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-xs font-medium text-text-900"
            >
              パスワード
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border-[0.5px] border-text-900 text-text-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="border-[0.5px] border-text-900 text-white bg-sub-400 hover:bg-sub-500 font-bold rounded-lg text-xs px-5 py-2.5 mt-4 mb-12 text-center"
            >
              ログイン
            </button>
          </div>
          <div className="text-xs">
            <p>※アカウントをお持ちでない方は <Link href="/signup" className="text-blue-600 underline">新規登録</Link> してください。
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}
