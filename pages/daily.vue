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
            <v-scale-transition group>
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
            </v-scale-transition>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-stepper v-model="turn">
          <v-stepper-items>
            <!-- Speakers shuffle -->
            <v-stepper-content :step="0">
              <v-scroll-y-transition mode="out-in" appear>
                <v-card v-if="!selectionIsOver" key="beforeShuffle" class="py-15 text-center">
                  <div class="headline">
                    Avant tout, décidons d'un ordre.
                  </div>

                  <v-btn
                    class="my-4"
                    color="primary"
                    :loading="randomizing"
                    @click="randomize"
                  >
                    <v-icon left>
                      mdi-shuffle
                    </v-icon>
                    Tirer au sort
                  </v-btn>

                  <div>
                    <v-scale-transition group>
                      <v-chip
                        v-for="name in names"
                        :key="name"
                        label
                        class="ma-1"
                        @click="addSpeaker(name)"
                      >
                        {{ name }}
                      </v-chip>
                    </v-scale-transition>
                  </div>
                </v-card>

                <v-card v-else key="afterShuffle" class="py-15 text-center">
                  <div class="text-h2">
                    Les jeux sont faits !
                  </div>

                  <div class="mt-6 headline">
                    <strong>{{ firstSpeaker.name }}</strong> {{ leadExpression }}
                  </div>

                  <div class="mt-6">
                    <v-btn x-large color="primary" @click="setTurn(1)">
                      <v-icon left>
                        mdi-flag-checkered
                      </v-icon>
                      C'est parti !
                    </v-btn>
                  </div>
                  <div class="mt-6">
                    <v-btn outlined color="primary" @click="resetSpeakers">
                      Refaire le tirage
                    </v-btn>
                  </div>
                </v-card>
              </v-scroll-y-transition>
            </v-stepper-content>

            <!-- Speakers -->
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
                  J'ai fini
                </v-btn>
              </v-card>
            </v-stepper-content>

            <!-- Daily end -->
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
import TimeTrackerWorker from '~/assets/time-tracker.worker.js'

const leadExpressions = [
  'prend le lead',
  'démarre en tête',
  'est en pôle position',
  'prend l\'initiative',
  'mène la danse',
  'prend les devants',
  'ouvre le bal',
  'se lance',
  'lance les hostilités',
  'a l\'avantage',
  'a la parole',
  'fait le premier pas'
]

export default {
  components: {
    Timer,
    TrelloViewer
  },
  asyncData ({ redirect, app }) {
    let settings
    try {
      settings = JSON.parse(localStorage.getItem('settings'))
    } catch (e) {
      settings = {}
    }

    if (!Array.isArray(settings.participants) || !Number.isInteger(settings.secondsPerPerson)) {
      return redirect({ name: 'index' })
    }

    const names = settings?.participants.map(name => name.trim()).filter(name => name)

    if (names.length === 0) {
      return redirect({ name: 'index' })
    }

    const dingFile = settings?.dingFile
    const dingVolume = settings?.dingVolume
    let ding = null

    if (dingFile && Number.isInteger(dingVolume) && dingVolume > 0) {
      const baseUrl = app.router?.options?.base || ''
      ding = new Audio(`${baseUrl}${dingFile}.mp3`)
      ding.volume = Math.min(100, dingVolume / 100)
    }

    return {
      timeTracker: new TimeTrackerWorker(),
      randomizing: false,
      isPlaying: false,
      turn: 0,
      ding,
      names,
      participants: [],
      leadExpression: leadExpressions[0],
      startTime: new Date(),
      secondsPerPerson: settings.secondsPerPerson,
      intervalId: null,
      trelloBoardId: settings?.trelloBoardId,
      trelloApiKey: settings?.trelloApiKey,
      trelloAccessToken: settings?.trelloAccessToken
    }
  },
  head () {
    let title = 'Daily'

    if (!this.selectionIsOver) {
      title = 'Choix de l\'ordre'
    } else if (this.dailyIsOver) {
      title = 'Daily terminé'
    } else if (this.currentSpeaker) {
      const time = this.$timeFunctions.formatSeconds(this.currentSpeaker?.totalSpeakTime || 0)
      const speaker = this.currentSpeaker?.name
      title = `${time} - ${speaker}`
    }

    return { title }
  },
  computed: {
    firstSpeaker () {
      return this.participants[0]
    },
    currentSpeaker () {
      return this.participants[this.turn - 1]
    },
    dailyIsOver () {
      return this.participants.every(p => p.isDone)
    },
    selectionIsOver () {
      return this.names.length === 0
    }
  },
  watch: {
    selectionIsOver (newVal) {
      if (newVal) {
        this.leadExpression = leadExpressions[Math.floor(Math.random() * leadExpressions.length)]
      }
    }
  },
  mounted () {
    this.initTimeTracker()
  },
  beforeMount () {
    window.addEventListener('keydown', this.handleKeypress)
  },
  destroyed () {
    if (this.timeTracker instanceof Worker) {
      this.timeTracker.terminate()
    }

    window.removeEventListener('keydown', this.handleKeypress)
  },
  methods: {
    async randomize () {
      this.randomizing = true

      while (this.names.length > 0) {
        const randomName = this.names[Math.floor(Math.random() * this.names.length)]
        this.addSpeaker(randomName)
        await new Promise((resolve) => { setTimeout(resolve, 300) })
      }

      this.randomizing = false
    },
    addSpeaker (name) {
      this.names = this.names.filter(n => n !== name)
      this.participants.push({
        name,
        previousSpeakTime: 0,
        totalSpeakTime: 0,
        isDone: false,
        timeExceeded: false
      })
    },
    resetSpeakers () {
      this.names = this.participants.map(p => p.name)
      this.participants = []
    },
    start () {
      const speaker = this.currentSpeaker
      if (this.dailyIsOver || !speaker) { return this.pause() }

      speaker.previousSpeakTime = speaker.totalSpeakTime

      this.timeTracker.postMessage('start')
    },
    pause () {
      this.timeTracker.postMessage('pause')
    },
    updateSpeakTime (secondsElapsed) {
      const speaker = this.currentSpeaker
      if (!speaker) { return }

      speaker.totalSpeakTime = secondsElapsed + speaker.previousSpeakTime

      if (!speaker.timeExceeded && speaker.totalSpeakTime >= this.secondsPerPerson) {
        speaker.timeExceeded = true

        if (this.ding) {
          this.ding.play()
        }
      }
    },
    setTurn (n) {
      if (!this.selectionIsOver) { return }
      if (n < 1) { n = 1 }
      if (n > this.participants.length) {
        n = this.participants.length + (this.dailyIsOver ? 1 : 0)
      }
      if (this.turn === n) { return }

      this.turn = n

      if (this.currentSpeaker?.isDone) {
        this.pause()
      } else {
        this.start()
      }
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
    initTimeTracker () {
      this.timeTracker.onmessage = (e) => {
        const event = e?.data?.event

        if (event === 'started') {
          this.isPlaying = true
          return
        }

        if (event === 'paused') {
          this.isPlaying = false
          return
        }

        if (event === 'update') {
          const secondsElapsed = e?.data?.secondsElapsed

          if (Number.isInteger(secondsElapsed)) {
            this.updateSpeakTime(secondsElapsed)
          }
        }
      }
    },
    handleKeypress (event) {
      if (!this.selectionIsOver) { return }
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
