import * as migration_20260726_034601_initial_schema from './20260726_034601_initial_schema';
import * as migration_20260726_041930_add_industries_image from './20260726_041930_add_industries_image';
import * as migration_20260726_044500_switch_industries_services_to_phosphor_icons from './20260726_044500_switch_industries_services_to_phosphor_icons';

export const migrations = [
  {
    up: migration_20260726_034601_initial_schema.up,
    down: migration_20260726_034601_initial_schema.down,
    name: '20260726_034601_initial_schema',
  },
  {
    up: migration_20260726_041930_add_industries_image.up,
    down: migration_20260726_041930_add_industries_image.down,
    name: '20260726_041930_add_industries_image'
  },
  {
    up: migration_20260726_044500_switch_industries_services_to_phosphor_icons.up,
    down: migration_20260726_044500_switch_industries_services_to_phosphor_icons.down,
    name: '20260726_044500_switch_industries_services_to_phosphor_icons'
  },
];
