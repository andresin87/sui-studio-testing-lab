import {i18n /** , DomainBuilder **/} from '@s-ui/studio-utils'
// import literals from '@adv-ui/ma-i18n-literals'
// import Milanuncios from '@adv-ui/milanuncios'

export default () =>
  i18n({dictionary: {}}).then(i18n => {
    return {
      default: {
        // i18n: {
        //   t: i18n.t.bind(i18n),
        //   c: i18n.c.bind(i18n),
        //   n: i18n.n.bind(i18n)
        // },
        // domain: DomainBuilder.extend({domain: new Milanuncios()}).build()
      }
    }
  })
