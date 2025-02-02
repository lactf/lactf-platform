import { useState, useCallback, useEffect } from 'preact/hooks'
import Router, { route } from 'preact-router'

import 'cirrus-ui'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'
import withStyles from './components/jss'
import Header from './components/header'
import Footer from './components/footer'

import ErrorRoute from './routes/error'
import Home from './routes/home'
import Register from './routes/register'
import Login from './routes/login'
import Profile from './routes/profile'
import Challenges from './routes/challs'
import Scoreboard from './routes/scoreboard'
import Recover from './routes/recover'
import Verify from './routes/verify'
import CtftimeCallback from './routes/ctftime-callback'

import AdminChallenges from './routes/admin/challs'

import { ToastProvider } from './components/toast'

function useTriggerRerender () {
  const setToggle = useState(false)[1]
  return useCallback(() => setToggle(t => !t), [setToggle])
}

const makeRedir = to => () => {
  useEffect(() => route(to, true), [])
  return null
}
const LoggedOutRedir = makeRedir('/')
const LoggedInRedir = makeRedir('/profile')

function App ({ classes }) {
  const triggerRerender = useTriggerRerender()

  const loggedOut = !localStorage.token

  const loggedOutPaths = [
    <Register key='register' path='/register' name='Register' />,
    <Login key='login' path='/login' name='Login' />,
    <Recover key='recover' path='/recover' />
  ]

  const loggedInPaths = [
    <Profile key='profile' path='/profile' name='Profile' />,
    <Challenges key='challs' path='/challs' name='Challenges' />,
    <AdminChallenges key='adminChalls' path='/admin/challs' />
  ]

  const allPaths = [
    <ErrorRoute key='error' default error='404' />,
    <Home key='home' path='/' name='Home' />,
    <Scoreboard key='scoreboard' path='/scores' name='Scoreboard' />,
    <Profile key='multiProfile' path='/profile/:uuid' />,
    <Verify key='verify' path='/verify' />,
    <CtftimeCallback key='ctftimeCallback' path='/integrations/ctftime/callback' />
  ]

  loggedInPaths.forEach(route => loggedOutPaths.push(
    <LoggedOutRedir
      key={`loggedOutRedir-${route.props.path}`}
      path={route.props.path}
    />
  ))
  loggedOutPaths.forEach(route => loggedInPaths.push(
    <LoggedInRedir
      key={`loggedInRedir-${route.props.path}`}
      path={route.props.path}
    />
  ))
  const currentPaths = [...allPaths, ...(loggedOut ? loggedOutPaths : loggedInPaths)]
  const headerPaths = currentPaths.filter(route => route.props.name !== undefined)

  return (
    <div class={classes.root}>
      <ToastProvider>
        <Header paths={headerPaths} />
        <div class={classes.contentWrapper}>
          <Router onChange={triggerRerender}>
            {currentPaths}
          </Router>
        </div>
        <Footer />
      </ToastProvider>
    </div>
  )
}

export default withStyles({
  '@global body': {
    height: 'calc(100% - 5.5rem)', // adjusted for footer
    overflowX: 'hidden',
    background: `bottom/var(--mountain-mode) no-repeat
      url("https://static.lac.tf/images/mountains.svg"),
      top/cover no-repeat url("https://static.lac.tf/images/clouds.svg"),
      top/100% 90% no-repeat var(--sky-gradient), #ffd99f`,
    backgroundAttachment: 'fixed'
  },
  // we show the google legal notice on each protected form
  '@global .grecaptcha-badge': {
    visibility: 'hidden'
  },
  // cirrus makes recaptcha position the modal incorrectly, so we reset it here
  '@global body > div[style*="position: absolute"]': {
    top: '10px !important'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0',
    margin: '5.5rem 0 0 0',
    color: 'white',
    scrollBehavior: 'smooth',
    scrollPaddingTop: '7rem',
    '& *:not(code):not(pre)': {
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Oxygen", "Ubuntu", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important'
    },
    '& pre.code': {
      padding: '10px',
      background: 'var(--cirrus-code-bg)',
      borderRadius: '5px',
      margin: '10px 0',
      color: '#ccc',
      border: '1px solid #ffffff1a'
    },
    '& code': {
      padding: '.2em .4em',
      background: 'var(--cirrus-code-bg)',
      borderRadius: '3px',
      color: '#ccc',
      border: '1px solid #ffffff1a'
    }
  },
  '@media (max-width: 768px)': {
    root: {
      margin: '48px 0 0 0'
    }
  },
  '@global select': {
    background: 'url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20viewBox=\'0%200%204%205\'%3E%3Cpath%20fill=\'%23667189\'%20d=\'M2%200L0%202h4zm0%205L0%203h4z\'/%3E%3C/svg%3E") right .85rem center/.5rem .6rem no-repeat no-repeat var(--bg-darker) !important'
  },
  '@global :root': {
    '--cirrus-info': 'var(--cirrus-primary)',
    '--cirrus-info-hover': 'white',
    '--cirrus-link': 'var(--cirrus-info)',
    '--cirrus-link-dark': 'var(--cirrus-info)',
    '--cirrus-select-bg': '#f8747066',
    '--cirrus-code-bg': '#333',
    '--cirrus-primary': '#f44d8a',
    '--bg-dark': 'rgba(0, 0, 0, 70%)',
    '--bg-darker': '#0f0f0fa0',
    '--toast-primary-bg': '#f87470e6',
    // lactf gradients
    '--mountain-mode': 'contain',
    '--sky-gradient': `linear-gradient(
      #39251f 16.1458%,
      #624422 37.5%,
      #7e5a24 48.4375%,
      #f4b42c 82.8125%,
      #ffd99f 100%
    )`,
    '--blood-gold': 'linear-gradient(120deg, #daa42e 0%, #d77774 100%)',
    '--blood-silver': 'linear-gradient(120deg, #6facc3 0%, #80728f 100%)',
    '--blood-bronze': 'linear-gradient(120deg, #ac593a 0%, #5d4e4f 100%)',
    '--blood-gold-shadow': '#daa42e'
  },
  '@media (min-aspect-ratio: 1440/514)': {
    '@global :root': {
      '--mountain-mode': 'cover'
    }
  },
  contentWrapper: {
    flex: '1 0 auto'
  },
  // lactf cirrus adjustments
  '@global a': {
    fontWeight: '400'
  },
  '@global [class*=" btn-"], [class^="btn-"]': {
    borderRadius: '0.75rem',
    borderWidth: '2px',
    fontSize: 'medium',
    fontWeight: '500',
    textTransform: 'none'
  },
  '@global [class*=" btn-"]:hover, [class^="btn-"]:hover': {
    borderColor: 'var(--cirrus-info-hover)',
    color: 'var(--cirrus-info)'
  },
  '@global [class*=" btn-danger"]:hover, [class^="btn-danger"]:hover': {
    borderColor: 'var(--cirrus-danger)',
    color: '#eee'
  },
  '@global input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):focus, select:focus, textarea:focus, textarea[type="text"]:focus': {
    borderColor: 'var(--cirrus-primary)',
    boxShadow: '0 0 0 .2rem var(--cirrus-select-bg), inset 0 1px 8px rgba(0,0,0,.07)'
  },
  '@global .font-thin': {
    'font-weight': '400'
  },
  '@global .modal-header': {
    paddingTop: '2rem !important'
  }
}, App)
