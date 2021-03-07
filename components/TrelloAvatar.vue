<template>
  <v-avatar
    :size="size"
    :color="color"
    :title="combinedName"
  >
    <img v-if="avatarUrl" :src="avatarUrl" :alt="fullName">
    <span v-else v-text="initials" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: () => 32
    },
    color: {
      type: String,
      default: () => 'primary'
    },
    member: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    avatarUrl () { return this.member?.avatarUrl && `${this.member?.avatarUrl}/50.png` },
    fullName () { return this.member?.fullName },
    username () { return this.member?.username },
    initials () { return this.member?.initials },
    combinedName () { return `${this.fullName} (${this.username})` }
  }
}
</script>
