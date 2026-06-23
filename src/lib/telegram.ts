export interface TelegramNotifyPayload {
  appName: string;
  appSlug: string;
  author: string;
  rating?: number;
  title?: string;
  body: string;
  reviewId: string;
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_\[\]\(\)*`~#+\-=|{}.!])/g, "\\$1");
}

export async function notifyTelegramReview(payload: TelegramNotifyPayload): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    if (process.env.NODE_ENV === "development") {
      console.log("[Telegram notify skipped] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    }
    return;
  }

  const ratingLine = payload.rating && payload.rating > 0
    ? `⭐ ${payload.rating}/5\n`
    : "";

  const titleLine = payload.title ? `*${escapeMarkdown(payload.title)}*\n` : "";

  const message = [
    "📝 *Novo comentário na Nexo Store*",
    "",
    `*App:* ${escapeMarkdown(payload.appName)}`,
    `*Autor:* ${escapeMarkdown(payload.author)}`,
    ratingLine,
    titleLine,
    escapeMarkdown(payload.body.slice(0, 400)) + (payload.body.length > 400 ? "…" : ""),
    "",
    `\`/responder ${payload.reviewId}\``,
  ].join("\n");

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Telegram notify error]", error);
    }
  } catch (error) {
    console.error("[Telegram notify failed]", error);
  }
}
