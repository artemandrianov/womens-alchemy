import { defineAction } from "astro:actions";
import { z } from "astro:schema";

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
      const now = new Date().toLocaleString("ru-RU");

      const payload = {
        name,
        phone,
        email,
        tariff: tariff ?? "",
        date: now,
      };

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbywEJr20BdbqUrfJhIfgDoBqPhkoapl31lj79Whj-LoSAl5_cppzr6h_ODWisUpWVwo/exec";

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Ошибка при отправке формы: ${res.status}`);
      }

      return { success: true };
    },
  }),
};
