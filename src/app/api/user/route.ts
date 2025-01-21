
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { UserRequest } from '@/app/_types/UserRequest'

const prisma = new PrismaClient()


// POSTという命名にすることで、POSTリクエストの時にこの関数が呼ばれる
export const POST = async (request: NextRequest) => {
  try {
    // リクエストのbodyを取得
    const body: UserRequest = await request.json()

    // bodyの中からsupabaseUserIdを取り出す
    const { supabaseUserId } = body

    // 投稿をDBに生成
    const data = await prisma.user.create({
      data: {
        supabaseUserId
      },
    })


    // レスポンスを返す
    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 })
    }
  }
}