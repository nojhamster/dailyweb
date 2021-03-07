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

    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedLists"
            :items="lists"
            item-text="name"
            item-value="id"
            label="Listes"
            hide-details
            outlined
            multiple
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="selectedMembers"
            :items="members"
            item-text="fullName"
            item-value="id"
            label="Membres"
            hide-details
            outlined
            multiple
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="selectedLabels"
            :items="labels"
            item-text="name"
            item-value="id"
            label="Étiquettes"
            hide-details
            outlined
            multiple
          />
        </v-col>
      </v-row>
    </v-card-text>

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
          <TrelloCard
            :card="card"
            :lists="lists"
            :members="members"
            :labels="labels"
            @showDetails="showCard(card)"
          />
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <TrelloCardDialog
      ref="cardViewer"
      :lists="lists"
      :members="members"
      :labels="labels"
    />
  </v-card>
</template>

<script>
import TrelloCardDialog from '~/components/TrelloCardDialog'
import TrelloCard from '~/components/TrelloCard'

export default {
  components: {
    TrelloCardDialog,
    TrelloCard
  },
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
      error: null,
      selectedMembers: [],
      selectedLists: [],
      selectedLabels: []
    }
  },
  computed: {
    boardName () { return this.board?.name },
    hasError () { return !!this.error },
    errorMessage () { return this.error?.message },
    lists () { return Array.isArray(this.board?.lists) ? this.board.lists : [] },
    labels () { return Array.isArray(this.board?.labels) ? this.board.labels : [] },
    members () { return Array.isArray(this.board?.members) ? this.board.members : [] },
    cards () {
      const cards = Array.isArray(this.board?.cards) ? this.board.cards : []
      const search = this.search.toLowerCase()

      return cards
        .sort((a, b) => a.dateLastActivity < b.dateLastActivity ? 1 : -1)
        .filter((card) => {
          if (search && !card.name.toLowerCase().includes(search)) {
            return false
          }

          if (this.selectedLists.length > 0 && !this.selectedLists.includes(card.idList)) {
            return false
          }
          if (this.selectedMembers.length > 0) {
            if (!Array.isArray(card.idMembers)) {
              return false
            }
            if (!this.selectedMembers.some(idMember => card.idMembers.includes(idMember))) {
              return false
            }
          }
          if (this.selectedLabels.length > 0) {
            if (!Array.isArray(card.idLabels)) {
              return false
            }
            if (!this.selectedLabels.some(idLabel => card.idLabels.includes(idLabel))) {
              return false
            }
          }

          return true
        })
        .slice(0, 25)
    }
  },
  mounted () {
    if (this.boardId) {
      this.fetchCards()
    }
  },
  methods: {
    showCard (item) {
      this.$refs.cardViewer.showCard(item)
    },
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
            lists: 'open',
            members: 'all',
            labels: 'all',
            label_fields: 'name,color',
            member_fields: 'username,avatarUrl,fullName,initials',
            card_fields: 'name,desc,url,dateLastActivity,idList,idMembers,idLabels',
            list_fields: 'name'
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
