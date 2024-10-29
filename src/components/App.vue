<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const isNavOpen = ref(false)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const { locale, t } = useI18n();

const switchLanguage = (lang) => {
  locale.value = lang;
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a style="color: blue;" class="navbar-brand" href="#">
        <span class="animate-pulse">{{t('TACHE TO DO')}}🙌</span>
      </a>
      <button @click="toggleNav" class="navbar-toggler" type="button" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="['collapse navbar-collapse', { 'show': isNavOpen }]" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" active-class="font-bold">{{t('All TO DO')}}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/completedtodo" class="nav-link active" active-class="font-bold">{{t('COMPLETED TO DO')}}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/chart" class="nav-link active" active-class="font-bold">{{t('CHART')}}
            </RouterLink>
          </li>
        </ul>
        <span>| </span> 
            <span class="lang" @click="switchLanguage('en')">🇬🇧</span>
            <span>-</span>
            <span class="lang" @click="switchLanguage('fr')">🇫🇷</span>
      </div>

    </div>

  </nav>

  <transition name="fade" mode="out-in">
    <RouterView />
  </transition>
</template>

<style scoped>
.navbar-brand span {
  display: inline-block;
  transition: transform 0.3s ease;
}

.navbar-brand:hover span {
  transform: scale(1.1);
}

.nav-link {
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: blue;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>