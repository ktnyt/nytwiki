import AWS from 'aws-sdk'
import _ from 'lodash'

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

        this.read().then(() => resolve(this), error => {
          this.create('', {
            title: 'Home',
            template: 'Home',
          }).then(() => resolve(this), reject)
        })
      })
    })
  }

  onReady = f => this.ready.then(f)

  create = this.update

  read = path => {
    const contentsPath = testPath(path) ? 'contents.md' : `${path}/contents.md`
    const metadataPath = testPath(path) ? 'metadata.json' : `${path}/metadata.json`

    return Promise.all([
      this.s3.getObject({ Key: contentsPath }).promise()
      .then(object => object.Body.toString()),
      this.s3.getObject({ Key: metadataPath }).promise()
      .then(object => JSON.parse(object.Body.toString())),
    ])
  }

  update = (path, contents, metadata) => {
    if(!metadata) {
      metadata = contents
      contents = path
      path = '/'
    }

    const contentsPath = testPath(path) ? 'contents.md' : `${path}/contents.md`
    const metadataPath = testPath(path) ? 'metadata.json' : `${path}/metadata.json`
    const titlePath = `@INDEX/${testPath(path) ? '' : path}${metadata.title}`
    const contentsBlob = new Blob([contents], { type: 'text/plain'})
    const metadataBlob = new Blob([JSON.stringify({
      ...metadataDefaults,
      ...metadata,
    })], { type: 'application/json' })
    const titleBlob = new Blob([])

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
      this.s3.putObject({
        Key: titlePath,
        Body: titleBlob,
      }).promise(),
    ])
  }

  delete = path => {
    return this.get(path).then(([contents, metadata]) => {
      const contentsPath = testPath(path) ? 'contents.md' : `${path}/contents.md`
      const metadataPath = testPath(path) ? 'metadata.json' : `${path}/metadata.json`
      const titlePath = `@INDEX/${testPath(path) ? '' : path}${metadata.title}`
  
      return Promise.all([
        this.s3.deleteObject({ Key: contentsPath }).promise(),
        this.s3.deleteObject({ Key: metadataPath }).promise(),
        this.s3.deleteObject({ Key: titlePath }).promise(),
      ])
    })
  }

  list = () => {
    return this.s3.listObjectsV2({ Prefix: '@INDEX/' }).promise()
    .then(response => _.merge({}, ...response.Contents.map(entry => entry.Key).map(key => {
      const part = _.drop(key.split('/'))
      const path = [..._.dropRight(part), '@INDEX']
      const value = _.last(part)
      return createObject(path, value)
    })))
  }
}

const createObject = ([head, ...tail], value) => tail.length ? ({
  [head]: createObject(tail, value),
}) : ({
  [head]: value,
})

export default S3Backend
