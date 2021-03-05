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
      const sec = this.usedTime
      let hours = Math.floor(sec / 3600)
      let minutes = Math.floor((sec - (hours * 3600)) / 60)
      let seconds = sec - (hours * 3600) - (minutes * 60)

      if (hours < 10) { hours = '0' + hours }
      if (minutes < 10) { minutes = '0' + minutes }
      if (seconds < 10) { seconds = '0' + seconds }

      if (hours === '00') {
        return `${minutes}:${seconds}`
      } else {
        return `${hours}:${minutes}:${seconds}`
      }
    }
  }
}
</script>
