import snarkdown from 'snarkdown'
import Markup from 'preact-markup'
import Timer from './timer'
import Sponsors from './sponsors'
import ActionButton from './action-button'

const snarkdownEvenMoreEnhanced = (md) => {
  const htmls = md
    .split(/(?:\r?\n){2,}/)
    .map(l => {
      if (l.startsWith('<!--[lactf ') && l.endsWith(']-->')) {
        // LACTF: make it possible to add html tags without interrupting markdown parsing
        return `<${l.substring(11, l.length - 4)}>`
      }
      // From https://github.com/developit/snarkdown/issues/75?
      return [' ', '\t', '#', '-', '*'].some(ch => l.startsWith(ch))
        ? snarkdown(l)
        : `<p>${snarkdown(l)}</p>`
    })

  return htmls.join('\n\n')
}

const Markdown = ({ content, components }) => (
  <Markup
    type='html'
    trim={false}
    markup={snarkdownEvenMoreEnhanced(content)}
    components={{ Timer, Sponsors, ActionButton, ...components }}
  />
)

export default Markdown
