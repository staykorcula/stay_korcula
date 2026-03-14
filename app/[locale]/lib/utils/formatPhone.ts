/**
 * Phone number formatting utilities
 */

import { contactInfo } from '../../data/contact';

/**
 * Format phone number for display
 */
export function formatPhone(phone?: string): string {
  if (!phone) return contactInfo.phoneFormatted;
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Format Croatian phone numbers
  if (cleaned.startsWith('385')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  if (cleaned.startsWith('+385')) {
    return `+${cleaned.slice(1, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  return phone;
}

/**
 * Get phone number for tel: links (no spaces)
 */
export function getPhoneLink(phone?: string): string {
  if (!phone) return `tel:${contactInfo.phoneRaw}`;
  
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    return `tel:${cleaned}`;
  }
  if (cleaned.startsWith('385')) {
    return `tel:+${cleaned}`;
  }
  return `tel:${cleaned}`;
}

/**
 * Get WhatsApp link
 */
export function getWhatsAppLink(phone?: string): string {
  const whatsappNumber = phone?.replace(/[^\d]/g, '') || contactInfo.whatsapp;
  return `https://wa.me/${whatsappNumber}`;
}

