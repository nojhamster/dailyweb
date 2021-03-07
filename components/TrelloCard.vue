<template>
  <v-card>
    <v-card-title>
      {{ card.name }}
    </v-card-title>
    <v-card-subtitle v-if="list">
      Dans la liste {{ list.name }}
    </v-card-subtitle>

    <v-card-text v-if="cardLabels.length > 0">
      <v-chip
        v-for="label in cardLabels"
        :key="label.id"
        :color="label.color"
        small
        label
        class="mr-1 my-1"
      >
        {{ label.name }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn text :href="card.url" target="_blank">
        <v-icon left>
          mdi-trello
        </v-icon>
        Voir sur Trello
      </v-btn>
      <v-btn text @click="$emit('showDetails', card)">
        <v-icon left>
          mdi-eye-outline
        </v-icon>
        Détails
      </v-btn>

      <v-spacer />

      <TrelloAvatar
        v-for="member in cardMembers"
        :key="member.id"
        :member="member"
        :size="32"
        color="primary"
        class="mr-1 my-1"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import TrelloAvatar from '~/components/TrelloAvatar'

export default {
  components: {
    TrelloAvatar
  },
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    members: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Array,
      default: () => []
    },
    card: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    list () {
      if (Array.isArray(this.lists) && this.card) {
        return this.lists.find(l => l.id === this.card.idList)
      }
      return null
    },
    cardMembers () {
      if (Array.isArray(this.members) && Array.isArray(this.card?.idMembers)) {
        return this.members.filter(member => this.card.idMembers.find(id => id === member.id))
      }
      return null
    },
    cardLabels () {
      if (Array.isArray(this.labels) && Array.isArray(this.card?.idLabels)) {
        return this.labels.filter(label => this.card.idLabels.find(id => id === label.id))
      }
      return null
    }
  },
  methods: {
  }
}
</script>
