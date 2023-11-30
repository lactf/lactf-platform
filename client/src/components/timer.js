import config from '../config'
import withStyles from './jss'
import { useEffect, useState } from 'preact/hooks'
import { formatAbsoluteTimeWithTz } from '../util/time'

const Timer = withStyles({
  card: {
    background: 'var(--bg-dark)',
    backdropFilter: 'blur(10px)',
    margin: 'auto'
  },
  section: {
    display: 'inline'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    margin: '20px 40px',
    textAlign: 'center'
  },
  absolute: {
    gridColumn: 'span 4',
    fontSize: '15px'
  },
  sub: {
    gridColumn: 'span 4',
    marginTop: '10px',
    fontSize: '20px'
  },
  over: {
    margin: '20px 40px',
    fontSize: '20px',
    textAlign: 'center'
  }
}, ({ classes }) => {
  const [time, setTime] = useState(Date.now())
  useEffect(() => {
    const intervalId = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(intervalId)
  }, [])
  if (time > config.endTime) {
    return (
      <div class='row'>
        <div class={`card ${classes.card}`}>
          <div class={classes.over}>
            The CTF is over.
          </div>
        </div>
      </div>
    )
  }
  const targetEnd = time > config.startTime
  const targetTime = targetEnd ? config.endTime : config.startTime
  const totalTime = Math.abs(config.endTime - config.startTime)
  const timeLeft = targetTime - time
  const totalDays = (targetEnd ? totalTime : (config.startTime - config.lactfPostTime)) / (1000 * 60 * 60 * 24)
  const daysLeft = timeLeft / (1000 * 60 * 60 * 24)
  const hoursLeft = (timeLeft / (1000 * 60 * 60)) % 24
  const minutesLeft = (timeLeft / (1000 * 60)) % 60
  const secondsLeft = (timeLeft / 1000) % 60
  return (
    <div class='row'>
      <div class={`card ${classes.card}`}>
        <div class={classes.content}>
          <CountdownRing time={daysLeft} label='days' max={totalDays} />
          <CountdownRing time={hoursLeft} label='hours' max={24} />
          <CountdownRing time={minutesLeft} label='minutes' max={60} />
          <CountdownRing time={secondsLeft} label='seconds' max={60} />
          <span class={classes.sub}>until {config.ctfName} {targetEnd ? 'ends' : 'starts'}</span>
          <span class={classes.absolute}>{formatAbsoluteTimeWithTz(targetTime)}</span>
        </div>
      </div>
    </div>
  )
})

const CountdownRing = withStyles({
  countdownArc: {
    width: '100%',
    maxWidth: '220px',
    overflow: 'visible',
    fill: 'none',
    strokeWidth: '2.5',
    strokeLinecap: 'round',
    '& path': {
      stroke: 'white'
    },
    '& circle': {
      stroke: 'rgba(255, 255, 255, 20%)'
    },
    '& text': {
      dominantBaseline: 'middle',
      textAnchor: 'middle',
      fill: 'white',
      '&:first-of-type': {
        transform: 'translateY(-0.17em)',
        fontSize: 'x-large'
      },
      '&:last-of-type': {
        transform: 'translateY(1.41em)',
        fontSize: 'xx-small',
        fontWeight: '300'
      }
    }
  },
  '@media (max-width: 768px)': {
    countdownArc: {
      strokeWidth: '4'
    }
  }
}, ({ classes, time, label, max }) => {
  const radius = 50 / Math.sqrt(2)
  const offset = 50 - radius
  const angle = (time / max) * 2 * Math.PI
  const large = angle > Math.PI ? 1 : 0
  const sweep = angle > 0 ? 1 : 0
  const startX = offset + radius
  const startY = offset
  const endX = offset + radius * (Math.cos(angle - Math.PI / 2) + 1)
  const endY = offset + radius * (Math.sin(angle - Math.PI / 2) + 1)
  return (
    <svg viewBox='0,0,100,100' className={classes.countdownArc}>
      <circle cx='50' cy='50' r={radius.toString()} />
      <path
        d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${large} ${sweep} ${endX} ${endY}`}
        visibility={angle <= 0 ? 'hidden' : 'visible'}
      />
      <text x='50%' y='50%'>
        {Math.floor(time).toString().padStart(2, '0')}
      </text>
      <text x='50%' y='50%'>
        {label}
      </text>
    </svg>
  )
})

export default Timer
