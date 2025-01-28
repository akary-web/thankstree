'use client'

import { supabase } from '../util/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FormData } from '../_types/FormData'
import Label from '../_components/Label'
import Input from '../_components/Input'
import Button from '../_components/Button'

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[300px]">
          <div>
            <Label htmlFor="email">
              ID（メールアドレス）
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "ID(メールアドレス)は必須です。",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "有効なメールアドレスを入力してください。"
                }
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
                }
              })}
              error={errors.password?.message}
            />
          </div>

          <div className="text-center">
            <Button type="submit">
              ログイン
            </Button>
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
