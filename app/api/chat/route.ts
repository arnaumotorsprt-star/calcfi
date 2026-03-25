import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system:
        'You are a helpful financial advisor assistant. Provide concise, educational financial advice in the same language the user writes in (English or Spanish). Always clarify that you are an AI and not a licensed financial advisor. Keep responses under 150 words. Be friendly and practical.',
      messages,
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ message: text });
  } catch {
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
