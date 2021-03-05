<template>
  <v-card v-if="boardId">
    <v-toolbar flat>
      <v-toolbar-title>
        {{ boardName }}
      </v-toolbar-title>

      <v-spacer />

      <v-text-field
        v-model="search"
        name="search"
        label="Recherche"
        solo
        dense
        hide-details
        class="mr-3"
        style="max-width: 200px"
      />

      <v-btn
        color="primary"
        :loading="loading"
        @click="fetchCards"
      >
        Actualiser
      </v-btn>
    </v-toolbar>

    <v-card-title>
      Activité
    </v-card-title>

    <v-card-text>
      <v-alert
        type="error"
        outlined
        :value="hasError"
      >
        Le chargement de l'activité Trello a échoué.
        <pre>{{ errorMessage }}</pre>
      </v-alert>

      <v-timeline v-if="cards.length > 0" dense>
        <v-timeline-item
          v-for="card in cards"
          :key="card.id"
          small
        >
          <a :href="card.url" target="_blank">{{ card.name }}</a>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    boardId: {
      type: String,
      default: () => ''
    },
    apiKey: {
      type: String,
      default: () => ''
    },
    accessToken: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      search: '',
      board: null,
      loading: false,
      error: null
    }
  },
  computed: {
    boardName () { return this.board?.name },
    hasError () { return !!this.error },
    errorMessage () { return this.error?.message },
    cards () {
      const cards = Array.isArray(this.board?.cards) ? this.board.cards : []
      const search = this.search.toLowerCase()

      return cards
        .sort((a, b) => a.dateLastActivity < b.dateLastActivity ? 1 : -1)
        .filter(card => search ? card.name.toLowerCase().includes(search) : true)
        .slice(0, 25)
    }
  },
  mounted () {
    if (this.boardId) {
      this.fetchCards()
    }
  },
  methods: {
    async fetchCards () {
      this.loading = true
      this.error = null

      const headers = {}

      if (this.apiKey && this.accessToken) {
        headers.Authorization = `OAuth oauth_consumer_key="${this.apiKey}", oauth_token="${this.accessToken}"`
      }

      try {
        const response = await this.$axios.get(`https://api.trello.com/1/boards/${this.boardId}`, {
          headers,
          params: {
            cards: 'visible',
            card_fields: 'name,desc,url,dateLastActivity'
          }
        })
        this.board = response.data
      } catch (e) {
        this.error = e
      }

      this.loading = false
    }
  }
}
</script>
