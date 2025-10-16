import { defineAction } from "astro:actions"
import { z } from "astro:schema"

export const server = {
  submitForm: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2, "Введите имя"),
      phone: z.string().min(5, "Введите телефон"),
      email: z.string().email("Некорректный email"),
      tariff: z.string().optional(),
    }),

    handler: async ({ name, phone, email, tariff }) => {
      const now = new Date().toLocaleString("ru-RU")

      const payload = {
        name,
        phone,
        email,
        tariff: tariff ?? "",
        date: now,
      }

      console.log("Payload to send:", payload)

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyVogQQxTwGuFqDp-b5y_lESjczS9ySyjs2LGt-i_eZc4PhH8hHN-LeWvjVUSPVqez3-A/exec"

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      })

      if (!res.ok) {
        throw new Error(`Ошибка при отправке формы: ${res.status}`)
      }

      return { success: true }
    },
  }),
}
