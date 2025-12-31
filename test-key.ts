import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
    console.log('Testing API Key...');
    console.log('Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);

    try {
        const result = await generateText({
            model: google('gemini-flash-latest'),
            prompt: 'Hello, are you working?',
        });
        console.log('Success:', result.text);
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
