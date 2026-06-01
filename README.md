This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Live AI Chatbot Setup

To activate the live intelligence stream inside Sahil's AI assistant (and transition from the offline mock fallback to live responses), configure your API keys:

### 1. Local Development
Open the [.env.local](file:///d:/Portfolio/.env.local) file located in the root of the project:
* Replace `your_anthropic_api_key_here` with your live **Anthropic Claude API Key** (highly recommended for premium copywriting).
* Alternatively, replace `your_gemini_api_key_here` with your **Google Gemini API Key**.

Next.js automatically loads these variables when you run `npm run dev`.

### 2. Production Deployment (e.g. Vercel)
Navigate to your project dashboard (e.g., Vercel, Netlify):
1. Go to **Settings** > **Environment Variables**.
2. Add a new variable named `ANTHROPIC_API_KEY` (or `GEMINI_API_KEY`).
3. Set its value to your live API key and save.
4. Trigger a redeployment. The API route will automatically connect to the live LLM streams!
