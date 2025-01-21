'use client'

import { supabase } from '../util/supabase' // 前の工程で作成したファイル
import { useState } from 'react'
import Link from 'next/link'
import { UserRequest } from '../_types/UserRequest'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `http://localhost:3000/login`,
        },
      })


      if (error) {
        throw new Error(
          error.message
        )
      }
      if (!data.user?.id) {
        throw new Error(
          "supabaseのユーザーIDがありません。"
        )
      }
      const body:UserRequest ={
        supabaseUserId:data.user.id
      }
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }


      setEmail('')
      setPassword('')
      alert('確認メールを送信しました。')

    }
    catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <h1 className='font-bold text-softblack-900 text-xl  text-center pt-[122px] pb-[44px]'>新規登録</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[300px]">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-xs font-medium text-text-900"
            >
              メールアドレス
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
              className="bg-gray-50 border-[0.5px] border-text-900 text-text-900 text-xs rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className='text-center'>
            <button
              type="submit"
              className=" border-[0.5px] border-text-900 text-white bg-sub-400 hover:bg-sub-500 font-bold rounded-lg text-xs px-5 py-2.5 mt-4 mb-12 text-center"
            >
              登録
            </button>
          </div>
          <div className='text-xs'>
            <p>※登録済みの方は <Link href="/login" className="text-blue-600 underline" >こちら</Link> からログインしてください。</p>
          </div>
        </form>
      </div>
    </div>

  )
}



