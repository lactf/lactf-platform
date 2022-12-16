import Match from 'preact-router/match'
import withStyles from './jss'
import LogoutButton from './logout-button'

function Header ({ classes, paths }) {
  const loggedIn = localStorage.getItem('token') !== null

  return (
    <nav class={classes.navbar}>
      <input
        className={classes.menutoggle}
        id='menu-toggle'
        type='checkbox'
      />
      <label className={classes.menucontainer} htmlFor='menu-toggle'>
        <div className={classes.menubutton} />
      </label>
      <ul class={classes.list}>
        {
          paths.map(({ props: { path, name } }) =>
            <Match key={name} path={path}>
              {({ matches }) => (
                <li class={matches ? 'selected' : ''}>
                  <a href={path} class={classes.link}>{name}</a>
                </li>
              )}
            </Match>
          )
        }
        {loggedIn &&
          <li>
            <LogoutButton class={classes.link} />
          </li>}
      </ul>
    </nav>
  )
}

export default withStyles({
  link: {
    '&:focus': {
      boxShadow: 'none',
      // color copied from Cirrus styles - there is no variable for it
      borderBottomColor: 'rgba(240,61,77,.6)'
    },
    background: '#0000 !important',
    color: '#fff !important',
    padding: '.5rem .7rem !important'
  },

  navbar: {
    position: 'sticky',
    display: 'flex',
    width: '100%',
    top: '0',
    margin: '0',
    zIndex: '100',
    justifyContent: 'center',
    backgroundColor: '#39251fdd',
    color: 'white'
  },

  list: {
    listStyle: 'none',
    display: 'inline',
    margin: '0px',
    padding: '0px',

    '& li': {
      display: 'inline',
      float: 'left',
      padding: '1rem',
      fontSize: 'large'
    },

    '& li a': {
      display: 'block',
      padding: '1rem'
    },

    '& li a:hover': {
      color: 'white',
      'text-decoration': 'underline'
    },

    '& li.selected a': {
      color: '#f44d8a !important'
    }
  },

  menubutton: {
    '&, &::before, &::after': {
      display: 'block',
      backgroundColor: '#f44d8a',
      position: 'absolute',
      height: '4px',
      width: '30px',
      transition: 'transform 400ms cubic-bezier(0.23, 1, 0.32, 1)'
    },

    '&::before': {
      content: '\'\'',
      marginTop: '-8px'
    },

    '&::after': {
      content: '\'\'',
      marginTop: '8px'
    }
  },

  menutoggle: {
    display: 'none',

    '&:checked + $menucontainer $menubutton': {
      '&::before': {
        marginTop: '0px',
        transform: 'rotate(405deg)'
      },

      background: 'rgba(255, 255, 255, 0)',

      '&::after': {
        marginTop: '0px',
        transform: 'rotate(-405deg)'
      }
    }
  },

  menucontainer: {
    display: 'none'
  },

  '@media (max-width: 840px)': {
    navbar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      height: '48px',

      '& > ul': {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#39251fdd',
        margin: '0',
        alignItems: 'center',
        top: '48px'
      },

      '& > ul > li': {
        display: 'flex',
        justifyContent: 'center',
        color: 'white'
      },

      '& > ul > li > a': {
        display: 'flex',
        justifyContent: 'center'
      }
    },

    menucontainer: {
      display: 'flex',
      height: '100%',
      width: '30px',
      margin: '1rem',
      cursor: 'pointer',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center'
    },

    menutoggle: {
      '& ~ ul > li': {
        height: '0',
        margin: '0',
        padding: '0',
        border: '0',
        transition: 'height 400ms cubic-bezier(0.23, 1, 0.32, 1)',

        '& > a': {
          display: 'none'
        }
      },

      '&:checked ~ ul > li': {
        height: '5em',
        padding: '1em',
        transition: 'height 400ms cubic-bezier(0.23, 1, 0.32, 1)',

        '& > a': {
          display: 'block'
        }
      }
    }
  }
}, Header)
