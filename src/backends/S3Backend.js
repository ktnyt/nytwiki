import AWS from 'aws-sdk'

const responseOk = (body=new Blob([]), headers={}) => new Response(body, {
  status: 200,
  statusText: 'Ok',
  headers: new Headers(headers),
})

const responseNotFound = (body=new Blob([]), headers={}) => new Response(body, {
  status: 404,
  statusText: 'Not Found',
  headers: new Headers(headers),
})

const makeKey = path => [path, 'index.json'].join(path.length ? '/' : '')

class S3Backend {
  constructor(region, bucket, id) {
    AWS.config.update({
      region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: id,
      })
    })

    this.s3 = new AWS.S3({
      params: {
        Bucket: bucket,
      }
    })

    AWS.config.credentials.get(err => {
      if(err) {
        throw err
      }
    })
  }

  create = (path, data) => this.update(path, data)

  read = path => new Promise((resolve, reject) => {
    const Key = makeKey(path)

    const success = ({ Body }) => resolve(responseOk(Body))
    const failure = error => resolve(responseNotFound())

    this.s3.getObject({ Key }).promise().then(success, failure)
  })

  update = (path, data) => new Promise((resolve, reject) => {
    const Key = makeKey(path)
    const ContentType = 'application/json'
    const Body = new Blob([JSON.stringify(data)], { type: ContentType })

    const success = () => resolve(responseOk(Body))
    const failure = error => resolve(responseNotFound())

    this.s3.putObject({ Key, Body, ContentType }).promise().then(success, failure)
  })

  delete = path => new Promise((resolve, reject) => {
    const Key = makeKey(path)

    const success = () => resolve(responseOk())
    const failure = error => resolve(responseNotFound())

    this.s3.deleteObject({ Key }).promise().then(success, failure)
  })
}

export default S3Backend
