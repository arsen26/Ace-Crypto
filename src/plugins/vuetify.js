import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md } from 'vuetify/iconsets/md' 

const vuetify = createVuetify({
  icons: {
    defaultSet: 'md', 
    aliases,
    sets: {
      md, 
      mdi, 
    },
  },
})

export default vuetify
