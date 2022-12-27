import { Component } from 'preact'
import config from '../config'
import 'linkstate/polyfill'
import Markdown from '../components/markdown'
import withStyles from '../components/jss'

export default withStyles({
  content: {
    '& a': {
      display: 'inline',
      padding: '0'
    },
    '& h1, & h2, & h3': {
      margin: '32px 0 16px 0'
    }
  },
  '@global .lactf-hero': {
    marginTop: '-1rem'
  },
  '@global .lactf-hero img': {
    display: 'block',
    maxWidth: 'min(100%, calc(990/550*45vh))',
    height: 'auto',
    margin: 'auto'
  },
  '@global .lactf-sponsors, .lactf-rules': {
    background: 'var(--bg-dark)',
    padding: '0% 5%',
    borderRadius: '10px'
  }
}, class Home extends Component {
  componentDidMount () {
    document.title = config.ctfName
  }

  render ({ classes }) {
    return (
      <div class='row u-center'>
        <div class={`col-8 ${classes.content}`}>
          <Markdown content={config.homeContent} />
        </div>
      </div>
    )
  }
})
