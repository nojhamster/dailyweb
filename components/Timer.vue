<template>
  <v-progress-circular
    :rotate="90"
    :size="150"
    :width="10"
    :value="percent"
    :color="timeExceeded ? 'red' : 'primary'"
    class="time"
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
    timeExceeded () {
      return this.usedTime >= this.availableTime
    },
    time () {
      return this.$timeFunctions.formatSeconds(this.usedTime)
    }
  }
}
</script>

<style scoped>
  .time {
    font-size: 2em;
  }
</style>
