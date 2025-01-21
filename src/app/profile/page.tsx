import { supabase } from '@/app/util/supabase'

async function getAccessToken() {
  const { data: session, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error.message)
    return
  }

  if (session) {
    const token = session.access_token
    console.log('Access Token:', token)
    return token // 必要ならトークンを返す
  } else {
    console.log('No active session found!')
  }
}

// アクセストークン取得関数を実行
getAccessToken()
