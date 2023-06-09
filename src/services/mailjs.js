var Mailjs = (function (i, a) {
  'use strict'
  return class {
    constructor() {
      ;(this.callback_ = (e) => {
        e = JSON.parse(e.data)
        e.isDeleted
          ? this.events.delete(e)
          : e.seen
          ? this.events.seen(e)
          : this.events.arrive(e)
      }),
        (this.baseUrl = 'https://api.mail.tm'),
        (this.baseMercure = 'https://mercure.mail.tm/.well-known/mercure'),
        (this.listener = null),
        (this.events = {}),
        (this.token = ''),
        (this.id = ''),
        (this.address = '')
    }
    register(e, t) {
      return this.send_('/accounts', 'POST', { address: e, password: t })
    }
    async login(e, t) {
      t = await this.send_('/token', 'POST', { address: e, password: t })
      return (
        t.status &&
          ((this.token = t.data.token),
          (this.id = t.data.id),
          (this.address = e)),
        t
      )
    }
    async loginWithToken(e) {
      this.token = e
      e = await this.me()
      if (e.status)
        return (this.id = e.data.id), (this.address = e.data.address), e
      throw new Error(e.message)
    }
    me() {
      return this.send_('/me')
    }
    getAccount(e) {
      return this.send_('/accounts/' + e)
    }
    deleteAccount(e) {
      return this.send_('/accounts/' + e, 'DELETE')
    }
    deleteMe() {
      return this.deleteAccount(this.id)
    }
    getDomains() {
      return this.send_('/domains?page=1')
    }
    getDomain(e) {
      return this.send_('/domains/' + e)
    }
    on(e, t) {
      var s = ['seen', 'delete', 'arrive', 'error', 'ready']
      if (s.includes(e)) {
        if (!this.listener) {
          this.listener = new a(
            this.baseMercure + '?topic=/accounts/' + this.id,
            { headers: { Authorization: 'Bearer ' + this.token } }
          )
          for (let e = 0; e < 3; e++) this.events[s[e]] = (e) => {}
          this.listener.on('message', this.callback_)
        }
        'error' === e || 'ready' === e
          ? this.listener.on((e = 'ready' === e ? 'open' : e), t)
          : (this.events[e] = t)
      }
    }
    close() {
      ;(this.events = {}), this.listener.close(), (this.listener = null)
    }
    getMessages(e = 1) {
      return this.send_('/messages?page=' + e)
    }
    getMessage(e) {
      return this.send_('/messages/' + e)
    }
    deleteMessage(e) {
      return this.send_('/messages/' + e, 'DELETE')
    }
    setMessageSeen(e, t = !0) {
      return this.send_('/messages/' + e, 'PATCH', { seen: t })
    }
    getSource(e) {
      return this.send_('/sources/' + e)
    }
    async createOneAccount() {
      let e = await this.getDomains()
      if (!e.status) return e
      e = e.data[0].domain
      var t,
        s,
        a = this.makeHash_(5) + '@' + e,
        r = this.makeHash_(8)
      return (t = await this.register(a, r)).status
        ? ((t = t.data),
          (s = await this.login(a, r)).status
            ? ((s = s.data), { status: !0, data: { username: a, password: r } })
            : s)
        : t
    }
    makeHash_(e) {
      return Array.from({ length: e }, () => {
        return (e = 'abcdefghijklmnopqrstuvwxyz0123456789').charAt(
          Math.floor(Math.random() * e.length)
        )
        var e
      }).join('')
    }
    async send_(e, t = 'GET', s) {
      var a = {
        method: t,
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + this.token
        }
      }
      if ('POST' === t || 'PATCH' === t) {
        const n = 'PATCH' === t ? 'merge-patch+json' : 'json'
        ;(a.headers['content-type'] = 'application/' + n),
          (a.body = JSON.stringify(s))
      }
      t = await i(this.baseUrl + e, a)
      let r
      const n = t.headers.get('content-type')
      return (
        (r =
          null !== n && void 0 !== n && n.startsWith('application/json')
            ? await t.json()
            : await t.text()),
        { status: t.ok, message: t.ok ? 'ok' : r.message || r.detail, data: r }
      )
    }
  }
})(fetch, EventSourcePolyfill)
