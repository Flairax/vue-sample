import '@formkit/themes/genesis'
import '@formkit/pro/genesis'

import { plugin, defaultConfig } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
import { createProPlugin, inputs } from '@formkit/pro'

const pro = createProPlugin('fk-6cbe477d32', inputs)

export const FORMKIT_PLUGIN = plugin;
export const FORMKIT_CONFIG = defaultConfig({
  theme: `genesis`,
  icons: {
    ...genesisIcons
  },
  plugins: [pro]
});
