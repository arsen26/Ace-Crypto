import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md } from 'vuetify/iconsets/md' // Import Google Material Icons

const vuetify = createVuetify({
  icons: {
    defaultSet: 'md', // Përdor ikonat e Google Material Icons
    aliases,
    sets: {
      md, // Google Material Icons
      mdi, // Material Design Icons (opsionale)
    },
  },
})

export default vuetify
