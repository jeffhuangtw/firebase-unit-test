import should from 'should'
import { authWithUid } from './firebase.admin'

describe('Authenticated firebase', function () {
  //this.timeout(4000);
  //describe('Authenticated firebase', () => {
  let authedFirebase
  const UID = 'IJUWu0BwD2VVypLMe7eb3ODL6Qf1'

  before(function () {
    authedFirebase = authWithUid(UID)
  })

  //it('allow authenticated user to fetch', (done) => {
  it('allow authenticated user to fetch', function(done) {
    authedFirebase
      .then((firebaseClient) => {
        const database = firebaseClient.database()
        database.ref(`user`).once('value')
          .then((sn) => {
            should.strictEqual(sn.val(), 'joshua')
            done()
          })
          .catch((error) => {
            done(error)
          })
      })
  })
})

