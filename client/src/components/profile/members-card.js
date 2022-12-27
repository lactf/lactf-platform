import withStyles from '../jss'
import { getMembers, addMember, removeMember } from '../../api/members'
import { useState, useCallback, useEffect } from 'preact/hooks'
import Form from '../form'
import EnvelopeOpen from '../../icons/envelope-open.svg'
import { useToast } from '../toast'

const MemberRow = withStyles({
  root: {
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  chucklesImInDanger: {
    '& > input': {
      // since this is an input and not a button it gets !important'd colored
      // so we have to fix it with Specificity Rules (tm)
      color: 'var(--cirrus-danger) !important',
      '&:hover': {
        color: 'var(--cirrus-light) !important'
      }
      // it took 6 tries to style this button right
      // css is making me go insane - Arc
    }
  }
}, ({ classes, id, email, setMembers }) => {
  const { toast } = useToast()

  const handleDelete = useCallback(() => {
    removeMember({ id })
      .then(() => {
        setMembers(members => members.filter(a => a.id !== id))

        toast({ body: 'Team member successfully deleted' })
      })
  }, [id, setMembers, toast])

  return (
    <div class={classes.root} key={id}>
      <p class='u-no-margin'>{email}</p>
      <div class={`btn-container u-vertical-center ${classes.chucklesImInDanger}`}>
        <input onClick={handleDelete} type='submit' class='btn-small btn-danger u-no-margin' value='Delete' />
      </div>
    </div>
  )
})

const MembersCard = withStyles({
  form: {
    '& button': {
      display: 'block',
      marginLeft: 'auto',
      marginRight: '0',
      marginTop: '10px'
    }
  }
}, ({ classes }) => {
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const handleEmailChange = useCallback(e => setEmail(e.target.value), [])

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [members, setMembers] = useState([])

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    setButtonDisabled(true)

    addMember({ email })
      .then(({ error, data }) => {
        setButtonDisabled(false)

        if (error) {
          toast({ body: error, type: 'error' })
        } else {
          toast({ body: 'Team member successfully added' })
          setMembers(members => [...members, data])
          setEmail('')
        }
      })
  }, [email, toast])

  useEffect(() => {
    getMembers()
      .then(data => setMembers(data))
  }, [])

  return (
    <div class='card'>
      <div class='content'>
        <p>Team Information</p>
        <p class='font-thin u-no-margin'>UCLA Teams only: please enter in the @g.ucla.edu emails for all members of your team. Open division teams: please ignore.</p>
        <div class='row u-center'>
          <Form class={`col-12 ${classes.form}`} onSubmit={handleSubmit} disabled={buttonDisabled} buttonText='Add Member'>
            <input
              required
              autocomplete='email'
              autocorrect='off'
              icon={<EnvelopeOpen />}
              name='email'
              placeholder='Email'
              type='email'
              value={email}
              onChange={handleEmailChange}
            />
          </Form>
          {
            members.length !== 0 &&
              <div class='row'>
                {
                  members.map(data => <MemberRow setMembers={setMembers} {...data} />)
                }
              </div>
          }
        </div>
      </div>
    </div>
  )
})

export default MembersCard
