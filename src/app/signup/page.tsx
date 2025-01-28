'use client'
import { supabase } from '../util/supabase'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { UserRequest } from '../_types/UserRequest'
import { FormData } from '../_types/FormData'
import Label from '../_components/Label'
import Input from '../_components/Input'
import Button from '../_components/Button'

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `http://localhost:3000/login`,
        },
      })


      if (error) {
        throw new Error(
          error.message
        )
      }
      if (!signUpData.user?.id) {
        throw new Error(
          "supabaseのユーザーIDがありません。"
        )
      }
      const body: UserRequest = {
        supabaseUserId: signUpData.user.id
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

      reset()
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[300px]">
          <div>
            <Label htmlFor="email">
              メールアドレス
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "メールアドレスは必須です。",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "有効なメールアドレスを入力してください。",
                },
              })}
              error={errors.email?.message}
            />
          </div>
          <div>
            <Label htmlFor="password">
              パスワード
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "パスワードは必須です。",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上で入力してください。"
                },
              })
              }
              error={errors.password?.message}
            />
          </div>

          <div className='text-center'>
            <Button type="submit">
              登録
            </Button>
          </div>
          <div className='text-xs'>
            <p>※登録済みの方は <Link href="/login" className="text-blue-600 underline" >こちら</Link> からログインしてください。</p>
          </div>
        </form>
      </div>
    </div>

  )
}


