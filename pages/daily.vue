<template>
  <v-container style="max-width: 1000px">
    <v-btn text class="mb-2" :to="{ path: '/' }">
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour
    </v-btn>

    <v-row justify="center" align="stretch">
      <v-col class="shrink">
        <v-card min-height="100%">
          <v-card-title>
            Participants
          </v-card-title>

          <v-list min-width="200">
            <v-list-item
              v-for="(speaker, index) in participants"
              :key="speaker.name"
              @click="setTurn(index + 1)"
            >
              <v-list-item-avatar>
                <v-avatar v-if="speaker.isDone" size="32" color="primary">
                  <v-icon dark>
                    mdi-check
                  </v-icon>
                </v-avatar>
                <v-avatar v-else-if="turn === index + 1" size="32" color="primary">
                  <v-icon small dark>
                    mdi-account-voice
                  </v-icon>
                </v-avatar>
                <v-avatar v-else size="32" color="grey white--text">
                  {{ index + 1 }}
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>{{ speaker.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-stepper v-model="turn">
          <v-stepper-items>
            <v-stepper-content
              v-for="(speaker, index) in participants"
              :key="speaker.name"
              :step="index + 1"
            >
              <v-card class="pa-12 text-center">
                <div class="text-h2">
                  {{ speaker.name }}
                </div>

                <Timer
                  :used-time="speaker.totalSpeakTime"
                  :available-time="secondsPerPerson"
                />

                <v-row align="center" justify="center">
                  <v-col class="shrink">
                    <v-btn x-large icon color="primary" :disabled="turn <= 1" @click="setTurn(turn - 1)">
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="shrink">
                    <v-btn
                      v-if="isPlaying"
                      large
                      fab
                      color="primary"
                      @click="pause"
                    >
                      <v-icon>mdi-pause</v-icon>
                    </v-btn>

                    <v-btn
                      v-else
                      large
                      fab
                      color="primary"
                      :disabled="dailyIsOver"
                      @click="start"
                    >
                      <v-icon>mdi-play</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="shrink">
                    <v-btn x-large icon color="primary" :disabled="!dailyIsOver && turn >= participants.length" @click="setTurn(turn + 1)">
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-btn outlined color="primary" class="mt-4" @click="setSpeakerAsDone">
                  Fin du tour
                </v-btn>
              </v-card>
            </v-stepper-content>

            <v-stepper-content :step="participants.length + 1">
              <v-card class="py-15 text-center">
                <div class="text-h2">
                  Daily
                </div>

                <v-icon size="64" class="my-6">
                  mdi-check-circle-outline
                </v-icon>

                <div class="text-h2">
                  terminé
                </div>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <TrelloViewer
          v-if="trelloBoardId"
          :board-id="trelloBoardId"
          :api-key="trelloApiKey"
          :access-token="trelloAccessToken"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Timer from '~/components/Timer'
import TrelloViewer from '~/components/TrelloViewer'

export default {
  components: {
    Timer,
    TrelloViewer
  },
  asyncData ({ redirect }) {
    let settings
    try {
      settings = JSON.parse(localStorage.getItem('settings'))
    } catch (e) {
      settings = {}
    }

    if (!Array.isArray(settings.participants) || !Number.isInteger(settings.secondsPerPerson)) {
      return redirect({ name: 'index' })
    }

    const participants = settings?.participants
      .map(p => ({
        name: p && p.trim(),
        previousSpeakTime: 0,
        totalSpeakTime: 0,
        isDone: false,
        timeExceeded: false
      }))
      .filter(p => p.name)
      .sort(() => (Math.random() - 0.5))

    if (participants.length === 0) {
      return redirect({ name: 'index' })
    }

    const dingFile = settings?.dingFile
    const dingVolume = settings?.dingVolume
    let ding = null

    if (dingFile && Number.isInteger(dingVolume) && dingVolume > 0) {
      ding = new Audio(`${dingFile}.mp3`)
      ding.volume = Math.min(100, dingVolume / 100)
    }

    return {
      turn: 1,
      ding,
      participants,
      startTime: new Date(),
      secondsPerPerson: settings.secondsPerPerson,
      intervalId: null,
      trelloBoardId: settings?.trelloBoardId,
      trelloApiKey: settings?.trelloApiKey,
      trelloAccessToken: settings?.trelloAccessToken
    }
  },
  computed: {
    currentSpeaker () {
      return this.participants[this.turn - 1]
    },
    isPlaying () {
      return !!this.intervalId
    },
    dailyIsOver () {
      return this.participants.every(p => p.isDone)
    }
  },
  beforeMount () {
    window.addEventListener('keydown', this.handleKeypress)
  },
  destroyed () {
    window.removeEventListener('keydown', this.handleKeypress)
  },
  methods: {
    start () {
      if (this.dailyIsOver) { return }
      const speaker = this.currentSpeaker
      if (!speaker) { return }

      speaker.previousSpeakTime = speaker.totalSpeakTime
      speaker.speakStart = new Date()
      this.intervalId = setInterval(() => { this.updateSpeakTime() }, 1000)
    },
    pause () {
      clearInterval(this.intervalId)
      this.intervalId = null
      this.speakStart = null
      this.isSpeaking = false
    },
    updateSpeakTime () {
      const speaker = this.currentSpeaker
      if (!speaker) { return }

      const msElapsed = Date.now() - speaker.speakStart.getTime()
      speaker.totalSpeakTime = Math.floor(msElapsed / 1000) + speaker.previousSpeakTime

      if (!speaker.timeExceeded && speaker.totalSpeakTime >= this.secondsPerPerson) {
        speaker.timeExceeded = true

        if (this.ding) {
          this.ding.play()
        }
      }
    },
    setTurn (n) {
      if (n < 1) { n = 1 }
      if (n > this.participants.length) {
        n = this.participants.length + (this.dailyIsOver ? 1 : 0)
      }
      if (this.turn === n) { return }

      this.pause()
      this.turn = n
      this.start()
    },
    nextTurn () { this.setTurn(this.turn + 1) },
    prevTurn () { this.setTurn(this.turn - 1) },
    nextSpeaker () {
      const nextSpeakerIndex = this.participants.findIndex(p => !p.isDone)
      if (nextSpeakerIndex >= 0) {
        this.setTurn(nextSpeakerIndex + 1)
      } else {
        this.pause()
        this.turn = this.participants.length + 1
      }
    },
    setSpeakerAsDone () {
      const speaker = this.currentSpeaker
      if (!speaker) { return }

      speaker.isDone = true
      this.nextSpeaker()
    },
    handleKeypress (event) {
      if (event.key === 'ArrowLeft') { this.prevTurn() }
      if (event.key === 'ArrowRight') { this.nextTurn() }
      if (event.key === 't') { this.setSpeakerAsDone() }
      if (event.key === 'p') {
        if (this.isPlaying) {
          this.pause()
        } else {
          this.start()
        }
      }
    }
  }
}
</script>

<style scoped>
  .timer {
    font-size: 2em;
  }
</style>
