import firebaseClient from './firebaseClient'
import config from './firebase.config'

const admin = require("firebase-admin")
//console.log('config.databaseURL:' + config.databaseURL)
admin.initializeApp({
  credential: admin.credential.cert("./firebase-admin.json"),
  databaseURL: config.databaseURL
})

export const authWithUid = (uid) => {
  if (firebaseClient.auth().currentUser) {
    // already inited and authenticated
    console.log('==>Already inited an user')
    return Promise.resolve(firebaseClient)
  }
  return admin.auth().createCustomToken(uid)
    .then((id_token) => {
      const auth = firebaseClient.auth()
      //console.log('==>uid :' + uid)
      //console.log('==>id_token :' + id_token)
      return new Promise((resolve, reject) => {
        auth.signInWithCustomToken(id_token)
          .then(() => {
            resolve(firebaseClient)
          })
          .catch((err) => {
            console.log('==>signInWithCustomToken err:' + err)
            reject(err)
          })
      }, (err) => {
        console.log('==>Promise err:' + err)
        reject(err)
      })
    })
}
