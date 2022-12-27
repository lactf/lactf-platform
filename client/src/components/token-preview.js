import withStyles from './jss'

export default withStyles({
  quote: {
    fontSize: 'small',
    overflowWrap: 'break-word',
    userSelect: 'all',
    fontFamily: 'monospace !important',
    cursor: 'pointer',
    background: 'var(--bg-darker)',
    borderColor: 'var(--cirrus-primary)'
  }
}, ({ classes, token, ...props }) => {
  return (
    <blockquote class={classes.quote} {...props}>
      {token}
    </blockquote>
  )
})
