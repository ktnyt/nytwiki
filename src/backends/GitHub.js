import GitHub from 'github-api'

import * as firebase from 'firebase'

const provider = new firebase.auth.GithubAuthProvider()

class GitHubBackend {
  constructor(repo) {
    this.repo = repo

    firebase.auth().getRedirectResult().then(result => {
      if(result.credential) {
        console.log(result)
      }
    }, error => {
      console.error(error)
    })
  }

  authenticate = () => {
    firebase.auth().signInWithRedirect(provider)
  }
}

export default GitHubBackend
