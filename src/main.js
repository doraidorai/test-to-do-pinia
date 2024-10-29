

import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json';
import fr from './locales/fr.json';

const app = createApp(App)

const pinia = createPinia()
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        fr
    }
   
})

app.use(pinia)
app.use(i18n)

app.use(router)

app.mount('#app')
