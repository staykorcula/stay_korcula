import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  checkIn: z.string().min(1, 'Please select check-in date'),
  checkOut: z.string().min(1, 'Please select check-out date'),
  guests: z.number().min(1, 'Please select number of guests').max(10, 'Maximum 10 guests'),
  message: z.string().optional(),
  propertyName: z.string().optional(),
  sourceType: z.literal('accommodation').optional(),
});

export const availabilityFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  checkIn: z.string().min(1, 'Please select check-in date'),
  checkOut: z.string().min(1, 'Please select check-out date'),
  guests: z.number().min(1, 'Please select number of guests').max(10, 'Maximum 10 guests'),
  roomType: z.string().optional(),
  message: z.string().optional(),
  propertyName: z.string().optional(),
  sourceType: z.literal('accommodation').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AvailabilityFormData = z.infer<typeof availabilityFormSchema>;

