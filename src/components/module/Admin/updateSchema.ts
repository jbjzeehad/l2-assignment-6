import z from "zod";

export const updateAdminParcelSchema = z.object({
  status: z.string().optional(),
  statusLog: z
    .object({
      notes: z.string(),
      location: z.string(),
    })
    .optional(),
  deliveryDate: z.union([z.string(), z.date()]).optional(),
  trackingId: z.string(),
});
