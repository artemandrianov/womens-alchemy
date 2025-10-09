import { defineAction } from "astro:actions"

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLScUsRnLLQfr1Sl7wZDMgT3ZrOI3v-1TsXdmMvBQiRtK7QrNSA/formResponse"

export const submitForm = defineAction({
  accept: "form",
  handler: async (formData) => {
    const now = new Date()
    const dateString = now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    const payload = new URLSearchParams({
      "entry.1332314686": String(formData.get("name") ?? ""),
      "entry.1506805712": String(formData.get("phone") ?? ""),
      "entry.1790986620": String(formData.get("email") ?? ""),
      "entry.1358437002": String(formData.get("tariff") ?? ""),
      "entry.1251963195": dateString,
    })

    const res = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })

    if (!res.ok && res.status !== 0) {
      throw new Error(`Google Form returned ${res.status}`)
    }

    return { success: true }
  },
})
