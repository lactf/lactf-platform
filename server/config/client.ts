import server, { ServerConfig } from './server'

export type ClientConfig = Pick<ServerConfig,
  'meta' |
  'homeContent' |
  'sponsors' |
  'globalSiteTag' |
  'ctfName' |
  'divisions' |
  'defaultDivision' |
  'origin' |
  'lactfPostTime' |
  'startTime' |
  'endTime' |
  'userMembers' |
  'faviconUrl' |
  'instancerUrl'
> & {
  emailEnabled: boolean;
  ctftime?: Pick<NonNullable<ServerConfig['ctftime']>, 'clientId'>;
  recaptcha?: Pick<NonNullable<ServerConfig['recaptcha']>, 'siteKey' | 'protectedActions'>;
}

const config: ClientConfig = {
  meta: server.meta,
  homeContent: server.homeContent,
  sponsors: server.sponsors,
  globalSiteTag: server.globalSiteTag,
  ctfName: server.ctfName,
  divisions: server.divisions,
  defaultDivision: server.defaultDivision,
  origin: server.origin,
  lactfPostTime: server.lactfPostTime,
  startTime: server.startTime,
  endTime: server.endTime,
  emailEnabled: server.email != null,
  userMembers: server.userMembers,
  faviconUrl: server.faviconUrl,
  ctftime: server.ctftime == null
    ? undefined
    : {
        clientId: server.ctftime.clientId
      },
  recaptcha: server.recaptcha == null
    ? undefined
    : {
        siteKey: server.recaptcha.siteKey,
        protectedActions: server.recaptcha.protectedActions
      },
  instancerUrl: server.instancerUrl
}

export default config
