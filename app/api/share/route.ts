import { NextResponse } from 'next/server';
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename');
    
    if (!file || !filename) {
      throw new Error('No file or filename provided');
    }
    
    const { url } = await put(filename.toString(), file, {
      access: 'public',
      addRandomSuffix: true
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error sharing image:', error);
    return NextResponse.json(
      { error: 'Failed to share image' },
      { status: 500 }
    );
  }
}