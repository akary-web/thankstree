import { NextResponse } from 'next/server';
import { supabase } from '@/app/util/supabase'; // プロジェクト固有のSupabaseクライアントのインポート

export async function GET() {
  try {
    // ここでSupabaseを使ってデータを取得
    const { data, error } = await supabase
      .from('diaries') // テーブル名はプロジェクトに合わせて変更
      .select('*');

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
