import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/util/supabase'  // Supabaseクライアントをインポート


// import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  try {
    // サーバーが期待するフォーマットを定義
    const expectedFormat = {
      name: 'string (例: John Doe)',
      email: 'string (例: john.doe@example.com)',
    }

    // フォーマットをレスポンスとして返す
    return NextResponse.json(
      {
        status: 'OK',
        message: 'Expected request body format',
        format: expectedFormat,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 500 })
    }
  }
}

// // ユーザープロフィール取得
// export const GET = async (request: NextRequest) => {
//   try {
//     // 現在ログイン中のユーザー情報を取得
//     const { data, error } = await supabase.auth.getUser()
//      // リクエストのボディを取得して利用
//     const { name, email } = await request.json()
//     console.log(`Updating profile for: ${name}, ${email}`)

//     if (error) {
//       throw new Error(error.message)
//     }

//     // ユーザー情報が取得できたら、レスポンスを返す
//     return NextResponse.json({ status: 'OK', user: data }, { status: 200 })
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 500 })  // サーバーエラーの場合は500を返す
//     }
//   }
// }

// ユーザープロフィール更新
export const PUT = async (request: NextRequest) => {
  try {
    const { name, email } = await request.json()

    // 現在ログイン中のユーザー情報を取得
    const { data: user, error: userError } = await supabase.auth.getUser()

    if (userError) {
      throw new Error(userError.message)
    }

    if (!user) {
      throw new Error('User not found')
    }

    // メールアドレスの更新
    const { error: emailError } = await supabase.auth.updateUser({
      email, // トップレベルプロパティとしてメールアドレスを更新
    })

    if (emailError) {
      throw new Error(emailError.message)
    }

    // 名前（user_metadata）の更新
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { name },
    })

    if (metadataError) {
      throw new Error(metadataError.message)
    }

    return NextResponse.json({ status: 'OK' }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 500 })
    }
  }
}
