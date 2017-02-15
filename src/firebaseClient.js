import firebaseClient from 'firebase'
import config from './firebase.config'

firebaseClient.initializeApp(config)

export default firebaseClient

export const getFirebase =
  (customConfig = config, customName = '[default]') => {
    const cFirebase = firebaseClient.initializeApp(customConfig, customName)
    return Promise.resolve(cFirebase)
  }
