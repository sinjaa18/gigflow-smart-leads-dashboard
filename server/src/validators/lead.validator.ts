import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name required"),

  email: z.email("Invalid email"),

  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),

  source: z.enum(["Website", "Instagram", "Referral"]),
});
