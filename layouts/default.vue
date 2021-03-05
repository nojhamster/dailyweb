<template>
  <v-app id="app" :class="appClasses">
    <v-app-bar app flat>
      <v-toolbar-title class="headline">
        Dailyweb
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="toggleDarkMode">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    themeIcon () {
      return this.$vuetify.theme.dark ? 'mdi-lightbulb-on-outline' : 'mdi-lightbulb-off-outline'
    },
    appClasses () {
      return {
        'dark-background': this.$vuetify.theme.dark,
        'light-background': !this.$vuetify.theme.dark
      }
    }
  },
  methods: {
    toggleDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>
#app.dark-background {
  background:
    radial-gradient(circle, transparent 20%, #000000 20%, #000000 80%, transparent 80%, transparent),
    radial-gradient(circle, transparent 20%, #000000 20%, #000000 80%, transparent 80%, transparent) 50px 50px,
    linear-gradient(#161616 4.6px, transparent 4.6px) 0 -2.3px,
    linear-gradient(90deg, #161616 4.6px, #000000 4.6px) -2.3px 0;
  background-size: 100px 100px, 100px 100px, 50px 50px, 50px 50px;
}
#app.light-background {
  background:
    radial-gradient(circle, transparent 20%, #e2e2e2 20%, #e2e2e2 80%, transparent 80%, transparent),
    radial-gradient(circle, transparent 20%, #e2e2e2 20%, #e2e2e2 80%, transparent 80%, transparent) 50px 50px,
    linear-gradient(#d1d1d1 4.6px, transparent 4.6px) 0 -2.3px,
    linear-gradient(90deg, #d1d1d1 4.6px, #e2e2e2 4.6px) -2.3px 0;
  background-size: 100px 100px, 100px 100px, 50px 50px, 50px 50px;
}
</style>
