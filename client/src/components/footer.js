import withStyles from './jss'

const Footer = ({ classes }) => (
  <div class={classes.root}>
    <span>
      <a href='https://github.com/uclaacm/lactf-platform' target='_blank' rel='noopener noreferrer'>LA CTF Platform</a> - Powered by <a href='https://rctf.redpwn.net/' target='_blank' rel='noopener noreferrer'>rCTF</a>
      &nbsp;- Made with 🤍 by <a href='https://acmcyber.com/' target='_blank' rel='noopener noreferrer'>ACM Cyber</a>
      &nbsp;&amp; <a href='https://pbr.uclaacm.com/' target='_blank' rel='noopener noreferrer'>Psi Beta Rho</a>
    </span>
  </div>
)

export default withStyles({
  root: {
    position: 'relative',
    display: 'flex',
    bottom: '0px',
    justifyContent: 'center',
    padding: '1rem',
    '& a': {
      display: 'inline',
      color: 'white',
      textDecoration: 'underline',
      padding: 0
    },
    fontSize: '0.85rem',
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    },
    transition: 'opacity 300ms ease'
  }
}, Footer)
