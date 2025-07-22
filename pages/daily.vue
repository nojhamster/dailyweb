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
                  <div>
                    Sélectionnez les participants par ordre de passage.
                  </div>

                  <div class="my-6">
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

                  <v-btn
                    color="primary"
                    :loading="randomizing"
                    @click="randomize"
                  >
                    <v-icon left>
                      mdi-shuffle
                    </v-icon>
                    Tirer au sort
                  </v-btn>
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
                  class="my-8"
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

                <v-btn v-if="!speaker.isDone" outlined color="primary" class="mt-4" @click="setSpeakerAsDone">
                  J'ai fini de parler
                </v-btn>

                <v-chip v-else color="green" text-color="white" class="mt-4">
                  <v-icon left>
                    mdi-check
                  </v-icon>
                  Terminé
                </v-chip>
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
        <v-list dense shaped two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">
                mdi-timer
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-large-bold">Respectons le temps imparti à chacun pour assurer un daily fluide et efficace</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">
                mdi-timer
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-large-bold">Chaque membre décrit : la veille, aujourd'hui, blocages, avec qui discuter APRÈS le daily</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="warning">
                mdi-block-helper
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-large-bold">Évitons les débats techniques et les prises de décisions</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="success">
                mdi-target
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-large-bold">Restons centrés sur les objectifs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
  'fait le premier pas',
  'a triché, mais on lui pardonne',
  ', comme par hasard !',
  ', étrange coïncidence ...',
  'commence, sois efficace',
  'contrôle le début de daily',
  'a perdu ! Demain, croissants pour tout le monde',
  'est la star !',
  'démarre la partie',
  'mène ce début de daily',
  'perd ses cheveux',
  'lâche ce que tu fais, et commence',
  'ne veut pas commencer, mais tant pis',
  'regrette de ne pas avoir préparé son daily',
  'regrette de ne pas être dernier',
  'est à l\'honneur',
  ', et pourquoi pas',
  'enfin, ce n\'est pas trop tôt',
  ', ça fait beaucoup là non ?',
  ', pas de chance',
  ', encore ?',
  ', oh non pas toi ...',
  ', on est mal barré',
  ', c\'est la fin des haricots'
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
      notifiate: false,
      participants: [],
      leadExpression: leadExpressions[0],
      startTime: new Date(),
      secondsPerPerson: settings.secondsPerPerson,
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
        const hasLeo = this.participants.some(item => item.name === 'Léo')
        if (hasLeo && this.firstSpeaker.name !== 'Léo' && Math.random() < 0.1) {
          this.leadExpression = `${this.leadExpression} (ça aurait dû être Léo)`
        }
      }
    }
  },
  mounted () {
    this.askForNotifications()
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

        if (this.notifiate) {
          const notification = new Notification('Ding dong !', {
            body: `Le temps de ${speaker.name} est écoulé`,
            icon: '/alarm-light-outline.png',
            silent: true
          })

          setTimeout(() => { notification.close() }, 5000)
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
    async askForNotifications () {
      if ('Notification' in window) {
        let permission = Notification.permission

        if (permission !== 'granted' && permission !== 'denied') {
          permission = await Notification.requestPermission()
        }

        this.notifiate = permission === 'granted'
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
.compact-list-group .v-list-item {
  min-height: 32px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

.compact-list-group .v-list-item-title {
  font-size: 32px;
  line-height: 22px;
  font-weight: 500;
}

.text-large-bold {
  font-size: 18px !important;
  font-weight: 500 !important;
}
</style>
