import { transformIncomingMessage } from '~/utils/messages'
import { defineStore } from 'pinia'
import Mailjs from '~/services/mail'
import { ref } from 'vue'

export default defineStore('imbox', () => {
  const imbox = ref(null)
  const email = ref('')
  const password = ref('')
  const token = ref('')
  const messages = ref([])
  const messagesLoading = ref(false)
  const loginLoading = ref(false)

  function setUserData(newEmail, newPassword, newToken) {
    email.value = newEmail
    password.value = newPassword
    token.value = newToken
  }

  async function login() {
    try {
      loginLoading.value = true
      messagesLoading.value = true
      const mailjsInstance = new Mailjs()
      const { imboxAccount } = await chrome.storage.sync.get('imboxAccount')
      if (!imboxAccount) {
        return
      }
      await mailjsInstance.loginWithToken(imboxAccount.token)
      imbox.value = mailjsInstance
    } catch (error) {
      console.error(error)
    } finally {
      loginLoading.value = false
    }
  }

  async function getMe() {
    try {
      const resp = await imbox.value.me()
      if (resp.status) {
        return resp.data
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchMessages() {
    try {
      const allMessages = await imbox.value.getMessages()
      if (allMessages.status) {
        messages.value = allMessages.data
      }
      imbox.value.on('arrive', (msg) => {
        const transformedMsg = transformIncomingMessage(msg)
        const existingMsg = messages.value.find(
          (m) => m.id === transformedMsg.id
        )
        if (!existingMsg) {
          messages.value.unshift(transformedMsg)
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      messagesLoading.value = false
    }
  }

  async function fetchMessage(messageId) {
    try {
      const message = await imbox.value.getMessage(messageId)
      if (message.status) {
        return message.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    imbox,
    email,
    password,
    token,
    messages,
    messagesLoading,
    login,
    setUserData,
    fetchMessages,
    fetchMessage,
    getMe
  }
})
