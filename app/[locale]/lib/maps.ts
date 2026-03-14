/**
 * Build Google Maps embed URL from coordinates.
 * Used when property does not provide a custom embedUrl.
 */
export function buildEmbedUrlFromCoordinates(
  latitude: number,
  longitude: number,
  zoom = 15
): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
}

/**
 * Build Google Maps link URL from coordinates (for "Open in Maps" button).
 */
export function buildMapsLinkFromCoordinates(
  latitude: number,
  longitude: number
): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
