import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    // First, analyze the image
    const analysis = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Analyze this drawing and describe what it appears to be. Focus on the main subject, style, and key features. Be concise." 
            },
            {
              type: "image_url",
              image_url: {
                url: image
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const description = analysis.choices[0].message.content;

    // Generate an enhanced prompt
    const promptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at creating image generation prompts. Convert simple descriptions into detailed, artistic prompts that maintain the essence of the original while adding magical and professional artistic elements."
        },
        {
          role: "user",
          content: `Create a DALL-E prompt based on this description of a child's drawing: "${description}". Maintain the core elements and composition but enhance it into a professional, magical version that still looks like a funny drawing. Keep the prompt under 200 characters.`
        }
      ],
    });

    const enhancedPrompt = promptResponse.choices[0].message.content;

    // Generate the new image
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt || '', // Add fallback empty string to satisfy type check
      size: "1024x1024",
      quality: "standard", 
      n: 1,
    });

    return NextResponse.json({
      originalDescription: description,
      enhancedPrompt,
      generatedImage: imageResponse.data[0].url,
    });
  } catch (error) {
    console.error('Error in magic route:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
} 