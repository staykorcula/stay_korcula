/**
 * Main data aggregator
 * Re-exports all data loaders and types
 */

// Properties
export {
  getAllProperties,
  getPropertyBySlug,
  getPropertyById,
  getAllPropertySlugs,
  getAllPropertyIds,
  type Property,
} from './properties';

// Services
export {
  getAllServices,
  getServiceBySlug,
  getServiceById,
  getAllServiceSlugs,
  getAllServiceIds,
  getServicesByCategory,
  type Service,
} from './services';

// Types
export type * from './types';

