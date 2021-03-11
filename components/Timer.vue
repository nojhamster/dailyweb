<template>
  <v-progress-circular
    :rotate="90"
    :size="150"
    :width="10"
    :value="percent"
    color="primary"
    class="my-8 timer"
  >
    {{ time }}
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    usedTime: {
      type: Number,
      default: () => 0
    },
    availableTime: {
      type: Number,
      default: () => 120
    }
  },
  computed: {
    percent () {
      return Math.min((this.usedTime / this.availableTime) * 100, 100)
    },
    time () {
      return this.$timeFunctions.formatSeconds(this.usedTime)
    }
  }
}
</script>
