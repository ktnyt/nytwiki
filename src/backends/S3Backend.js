import AWS from 'aws-sdk'

const metadataDefaults = {
  template: 'Default',
}

const testPath = path => !path || path.length === 0 || path === '/'

class S3Backend {
  constructor(region, bucket, id) {
    AWS.config.update({
      region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: id,
      })
    })

    this.ready = new Promise((resolve, reject) => {
      AWS.config.credentials.get(err => {
        if(err) {
          reject(err)
        }
  
        this.s3 = new AWS.S3({
          params: {
            Bucket: bucket,
          }
        })

        this.get().catch(error => {
          this.put('', {
            template: 'Home',
          }).catch(reject)
        })

        resolve(this)
      })
    })
  }

  get = path => {
    const contentsPath = testPath(path) ? 'contents.md' : `${path}/contents.md`
    const metadataPath = testPath(path) ? 'metadata.json' : `${path}/metadata.json`

    return Promise.all([
      this.s3.getObject({ Key: contentsPath }).promise()
      .then(object => object.Body.toString()),
      this.s3.getObject({ Key: metadataPath }).promise()
      .then(object => object.Body.toString())
      .then(string => JSON.parse(string)),
    ])
  }

  add = this.put

  put = (path, contents, metadata) => {
    if(!metadata) {
      metadata = contents
      contents = path
      path = ''
    }

    const contentsPath = testPath(path) ? 'contents.md' : `${path}/contents.md`
    const metadataPath = testPath(path) ? 'metadata.json' : `${path}/metadata.json`
    const contentsBlob = new Blob([contents], { type: 'text/plain'})
    const metadataBlob = new Blob([JSON.stringify({
      ...metadataDefaults,
      ...metadata,
    })], { type: 'application/json' })

    return Promise.all([
      this.s3.putObject({
        Key: contentsPath,
        Body: contentsBlob,
        ContentType: 'text/plain',
      }).promise(),
      this.s3.putObject({
        Key: metadataPath,
        Body: metadataBlob,
        ContentType: 'application/json',
      }).promise(),
    ])
  }

  pages = () => {
    this.s3.listObjectsV2().promise().then(console.log, console.log)
  }
}

export default S3Backend
