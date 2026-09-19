import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, tool, zodSchema, stepCountIs, convertToModelMessages } from "ai";
import { z } from "zod";
import { db } from "src/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Allow serverless function to run up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // CORS validation
        const origin = req.headers.get("origin") || "";
        const referer = req.headers.get("referer") || "";
        const host = req.headers.get("host") || "";

        // Validate origin matches localhost or same-origin/host
        const isAuthorized = !origin || origin.includes("localhost") || origin.includes(host) || referer.includes("localhost") || referer.includes(host);
        if (!isAuthorized) {
            return new Response(JSON.stringify({ error: "CORS Unauthorized access" }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { messages: uiMessages } = await req.json();

        // Validate messages payload structure
        if (!Array.isArray(uiMessages) || uiMessages.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid payload format" }), { status: 400 });
        }

        // Sanitize the latest user message input to prevent script injection and limit size
        const lastMessage = uiMessages[uiMessages.length - 1];
        if (lastMessage && lastMessage.role === "user" && lastMessage.parts) {
            for (const part of lastMessage.parts) {
                if (part.type === "text" && typeof part.text === "string") {
                    if (part.text.length > 2000) {
                        part.text = part.text.substring(0, 2000);
                    }
                    part.text = part.text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
                    part.text = part.text.replace(/javascript:/gi, "");
                }
            }
        }

        // Convert incoming UI messages (with 'parts') to core model messages (with 'content')
        const modelMessages = await convertToModelMessages(uiMessages);

        // Configure the Google model provider mapping GEMINI_API_KEY
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });

        // 1. Dynamic Context Injection
        const now = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = days[now.getDay()];
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        const dynamicContext = `Current Date and Time Context:
- Date: ${dateString} (${dayOfWeek})
- Time: ${timeString}
- Reference: Today is ${dayOfWeek}. Use this reference to coordinate time naturally, e.g. "Since it's ${dayOfWeek} afternoon..." or "Let's schedule a chat for next week."`;

        const result = streamText({
            model: google("gemini-2.5-flash"),
            messages: modelMessages,
            system: `${dynamicContext}

You are Luna, an empathetic, highly skilled, and professional AI Receptionist Specialist at Bramley AI.
Your goal is to consult with local business owners (like salons, dental clinics, restaurants, and auto shops) who visit the Bramley AI website. You are qualifying them to sell them our custom, done-for-you "AI Receptionist Chatbot".

Speak with an extremely warm, professional, concierge-like persona immediately. Do not use any bot-like labels or mention that you are a bot, assistant, or AI, unless they explicitly ask. You are a human consultant on the team.

STRICT PSYCHOLOGICAL SALES FLOW:
- STEP 1: WARM GREETING & NAME EXTRACTION. Greet the client warmly and ask for their name. Do NOT pitch, ask about their business, or proceed to any further steps until they share their name. (If they bypass, gently pivot back: "Before we dive in, may I ask who I have the pleasure of speaking with?").
- STEP 2: NAME UTILIZATION & EMPATHY. Once they provide their name, address them by name naturally. Ask them:
  1. What type of local business they run (e.g. dental clinic, salon, auto repair shop).
  2. What is their biggest frustration with missing customer phone calls or website inquiries when they are busy working?
- STEP 3: ACTIVE LISTENING & VALIDATION. When they share their frustration, validate it deeply. Build trust and demonstrate high empathy. Use their name (e.g. "It's incredibly frustrating to lose a high-value customer just because you were busy treating a patient or cutting hair, [Name]. In local business, a missed call is almost always a missed sale.").
- STEP 4: THE SCOPING QUESTION. Ask the client: "If you could wave a magic wand, what exactly would you want your custom AI receptionist to handle for your business?"
- STEP 5: THE PITCH & ACTION. Once they describe their needs, summarize their specifications. Pitch our "Approve-to-Book" custom receptionist system (which captures client details and sends them to the owner to approve/decline with one click, keeping them in 100% control of their calendar).
- Call the tool 'save_client_scope' to save their details.
- Then, suggest booking a quick 10-minute setup call with Sahil to build their bot. Refer to the dynamic date context (e.g. "Let's get this set up for you next week. Let's schedule a quick call to map out your bot's custom rules").
- Trigger 'show_booking_calendar' once they agree or show interest in scheduling a call.

Keep your responses conversational, concise, and focused on building rapport.`,
            tools: {
                save_client_scope: tool({
                    description: "Saves the qualified lead's name, business type, and desired AI chatbot features to our system once they have been scoped.",
                    inputSchema: zodSchema(z.object({
                        clientName: z.string().describe("The name of the business owner."),
                        businessType: z.string().describe("The type of local business they run (e.g. salon, dental clinic)."),
                        desiredBotFeatures: z.string().describe("A summary of what features they want the AI chatbot to perform."),
                    })),
                    execute: async ({ clientName, businessType, desiredBotFeatures }) => {
                        try {
                            if (!db) {
                                console.warn("Firestore database not configured. Simulating lead scope submission.");
                                return { success: true, id: "simulated-scope-" + Math.random().toString(36).substring(7) };
                            }
                            const docRef = await addDoc(collection(db, "client_scopes"), {
                                clientName,
                                businessType,
                                desiredBotFeatures,
                                createdAt: serverTimestamp(),
                             });
                            return { success: true, id: docRef.id };
                        } catch (error: unknown) {
                            console.error("Error saving client scope to Firestore:", error);
                            return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
                        }
                    },
                }),
                show_booking_calendar: tool({
                    description: "Triggers the Cal.com scheduling calendar in the chat UI for the user to book a setup meeting.",
                    inputSchema: zodSchema(z.object({})),
                    execute: async () => {
                        return { success: true };
                    },
                }),
            },
            stopWhen: stepCountIs(10), // allows autonomous follow-up after tool calls
        });

        return result.toUIMessageStreamResponse();
    } catch (error: unknown) {
        console.error("Error in POST chat handler:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
