
import { z } from 'zod';

export const rentalSchema = z.object({
body: z.object({
  userId: z.string().optional(), 
  bikeId: z.string(),
  startTime: z.string().transform((str) => new Date(str)), // Transform string to Date
  returnTime: z.string().nullable().optional().transform((str) => str ? new Date(str) : null),// Optional and nullable
  totalCost: z.number().optional().default(0),
  isReturned: z.boolean().optional().default(false),
}),
});
