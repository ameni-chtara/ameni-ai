export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are AMENI AI's assistant. Be concise and friendly.\n\nServices & Prices:\n\n- Starter Website: 199 TND\n  (1-page website, mobile friendly, contact form, WhatsApp button)\n\n- Business Website: 399 TND\n  (multi-page website, services section, contact system, basic SEO)\n\n- Restaurant / Boutique Website: 599 TND\n  (menu or product display, modern design, booking or order system)\n\n- AI Chatbot Add-on: 199 TND\n  (answers customer questions, helps generate leads, available 24/7)\n\nNotes:\n- All prices are starting prices\n- Final price depends on client needs and features\n- Delivery time: 3 to 7 days depending on package",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    return Response.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Groq error:", error);
    return Response.json({ reply: "Sorry, something went wrong." }, { status: 500 });
  }
}