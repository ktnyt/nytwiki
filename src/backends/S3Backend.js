import AWS from 'aws-sdk'

const responseOk = (body=new Blob([]), headers={}) => new Response(body, {
  status: 200,
  statusText: 'Ok',
  headers: new Headers(headers),
})

const responseBadRequest = (body=new Blob([]), headers={}) => new Response(body, {
  status: 400,
  statusText: 'Bad Request',
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

  list = () => new Promise((resolve, reject) => {
    const blobify = body => new Blob([JSON.stringify(body)], { type: 'application/json' })
    const success = ({ Contents }) => resolve(responseOk(blobify(Contents)))
    const failure = error => resolve(responseNotFound())

    this.s3.listObjectsV2().promise().then(success, failure)
  })

  upload = (path, filename, file) => new Promise(({ resolve, reject }) => {
    const Key = `${path}/${filename}`
    const ContentType = file.type
    const Body = file

    const success = () => resolve(responseOk(Body))
    const failure = error => resolve(responseBadRequest())

    this.s3.putObject({ Key, Body, ContentType }).promised().then(success, failure)
  })
}

export default S3Backend
