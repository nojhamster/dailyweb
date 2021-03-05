<template>
  <v-row justify="center">
    <v-card class="ma-4" style="max-width: 1000px">
      <v-card-title class="headline">
        Participants
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onNewParticipant">
          <v-row align="center">
            <v-col>
              <v-text-field
                v-model="name"
                name="participant"
                label="Nom"
                dense
                outlined
                hide-details
                autofocus
              />
            </v-col>

            <v-col class="shrink">
              <v-btn color="primary" type="submit">
                Ajouter
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-text>
        <v-scale-transition group origin="center center">
          <v-chip
            v-for="participant in participants"
            :key="participant"
            close
            label
            class="mr-2 mb-2"
            @click:close="removeParticipant(participant)"
          >
            {{ participant }}
          </v-chip>
        </v-scale-transition>
      </v-card-text>

      <v-divider />

      <v-card-title>
        Chronométrage
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="secondsPerPerson"
              type="number"
              outlined
              name="speakduration"
              label="Temps par personne (en secondes)"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="dingFile"
              :items="dingFiles"
              outlined
              label="Alerte fin de tour"
              @change="playDing"
            />

            <v-slider
              v-model="dingVolume"
              label="Volume"
              step="5"
              min="0"
              max="100"
              @change="playDing"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-title>
        Tableau Trello (optionel)
      </v-card-title>

      <v-card-text>
        <p>
          Permet d'afficher l'activité récente d'un tableau Trello.
          Pour accéder à un tableau privé, une <strong>clé d'API</strong> et un <strong>token d'accès</strong> sont nécessaires.
          Plus de détails <a href="https://trello.com/app-key">à cette adresse</a>.
        </p>

        <v-text-field
          v-model="trelloBoardId"
          outlined
          name="trelloBoardId"
          label="Identifiant du tableau"
        />
        <v-text-field
          v-model="trelloApiKey"
          type="password"
          outlined
          name="trelloApiKey"
          label="Clé d'API"
        />
        <v-text-field
          v-model="trelloAccessToken"
          type="password"
          outlined
          name="trelloAccessToken"
          label="Token d'accès"
        />
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          large
          color="primary"
          @click="start"
        >
          <v-icon left>
            mdi-rocket-launch-outline
          </v-icon>
          Démarrer !
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data () {
    let settings
    try {
      settings = JSON.parse(localStorage.getItem('settings'))
    } catch (e) {
      settings = {}
    }

    let dingVolume = settings?.dingVolume
    if (!Number.isInteger(dingVolume)) { dingVolume = 75 }
    if (dingVolume > 100) { dingVolume = 100 }
    if (dingVolume < 0) { dingVolume = 0 }

    return {
      name: '',
      dingFiles: [
        'ding_01',
        'ding_02',
        'ding_03',
        'ding_04'
      ],
      participants: Array.isArray(settings?.participants) ? settings.participants : [],
      secondsPerPerson: Number.isInteger(settings?.secondsPerPerson) ? settings.secondsPerPerson : 120,
      dingFile: settings?.dingFile || 'ding_01',
      dingVolume,
      trelloBoardId: settings?.trelloBoardId || '',
      trelloApiKey: settings?.trelloApiKey || '',
      trelloAccessToken: settings?.trelloAccessToken || ''
    }
  },
  methods: {
    onNewParticipant () {
      const name = this.name.trim()
      if (!name) { return }

      let uniqueName = name
      let counter = 2
      while (this.participants.includes(uniqueName)) {
        uniqueName = `${name} (${counter})`
        counter += 1
      }
      this.participants.push(name)
      this.name = ''
    },
    removeParticipant (name) {
      this.participants = this.participants.filter(p => p !== name)
    },
    playDing () {
      if (this.dingFile && this.dingVolume > 0) {
        const ding = new Audio(`/${this.dingFile}.mp3`)
        ding.volume = this.dingVolume / 100
        ding.play()
      }
    },
    start () {
      localStorage.setItem('settings', JSON.stringify({
        participants: this.participants,
        secondsPerPerson: Number.parseInt(this.secondsPerPerson),
        dingFile: this.dingFile,
        dingVolume: this.dingVolume,
        trelloBoardId: this.trelloBoardId,
        trelloApiKey: this.trelloApiKey,
        trelloAccessToken: this.trelloAccessToken
      }))

      this.$router.push({
        name: 'daily'
      })
    }
  }
}
</script>
