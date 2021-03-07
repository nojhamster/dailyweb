<template>
  <v-dialog v-model="show" width="900">
    <v-card v-if="card">
      <v-card-title>
        {{ card.name }}
      </v-card-title>
      <v-card-subtitle v-if="list">
        Dans la liste {{ list.name }}
      </v-card-subtitle>

      <v-card-text>
        <v-row>
          <v-col>
            <div class="subtitle-1">
              Membres
            </div>
            <TrelloAvatar
              v-for="member in cardMembers"
              :key="member.id"
              :member="member"
              :size="32"
              color="primary"
              class="mr-1 my-1"
            />
          </v-col>

          <v-col>
            <div class="subtitle-1">
              Étiquettes
            </div>

            <v-chip
              v-for="label in cardLabels"
              :key="label.id"
              :color="label.color"
              label
              dark
              class="mr-1 my-1"
            >
              {{ label.name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-title>
        Description
      </v-card-title>

      <v-card-text v-if="htmlDesc" v-html="htmlDesc" />
      <v-card-text v-else>
        <p>Pas de description</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import marked from 'marked'
import dompurify from 'dompurify'

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
    }
  },
  data () {
    return {
      show: false,
      card: null
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
    },
    htmlDesc () {
      return dompurify.sanitize(marked(this.card.desc))
    }
  },
  methods: {
    showCard (card = {}) {
      this.card = card
      this.show = true
    }
  }
}
</script>
