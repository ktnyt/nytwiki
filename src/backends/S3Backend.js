import AWS from 'aws-sdk'

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

        resolve(this)
      })
    })
  }

  get = path => {
    const contentsPath = !path || path.length === 0 ? 'contents.md' : `${path}/contents.md`
    const metadataPath = !path || path.length === 0 ? 'metadata.json' : `${path}/metadata.json`

    return Promise.all([
      this.s3.getObject({ Key: contentsPath }).promise(),
      this.s3.getObject({ Key: metadataPath }).promise(),
    ])
  }

  put = (path, contents, metadata) => {
    if(!metadata) {
      metadata = contents
      contents = path
      path = ''
    }

    const contentsPath = path.length === 0 ? 'contents.md' : `${path}/contents.md`
    const metadataPath = path.length === 0 ? 'metadata.json' : `${path}/metadata.json`
    const contentsBlob = new Blob([contents], { type: 'text/plain'})
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })

    return Promise.all([
      this.s3.putObject({ Key: contentsPath, Body: contentsBlob }).promise(),
      this.s3.putObject({ Key: metadataPath, Body: metadataBlob }).promise(),
    ])
  }
}

export default S3Backend
