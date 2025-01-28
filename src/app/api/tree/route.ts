import { NextResponse } from 'next/server';

export async function GET() {
  const treeStatus = {
    stage: '若木',
    leaves: 20,
    branches: 5,
    fruits: 2,
  };

  return NextResponse.json(treeStatus, { status: 200 });
}
