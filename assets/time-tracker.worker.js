let intervalId
let startTime

self.addEventListener('message', function (e) {
  const data = e && e.data

  if (data === 'start') {
    start()
  } else if (data === 'pause') {
    pause()
  }
})

function start () {
  startTime = Date.now()

  clearInterval(intervalId)
  intervalId = setInterval(updateTime, 1000)
  postMessage({ event: 'started' })
}

function pause () {
  clearInterval(intervalId)
  postMessage({ event: 'paused' })
}

function updateTime () {
  postMessage({
    event: 'update',
    secondsElapsed: Math.floor((Date.now() - startTime) / 1000)
  })
}
