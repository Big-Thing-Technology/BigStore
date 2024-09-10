const https = require('https')
const fs = require('fs')

const getPackageLatestVersion = async () => {
  return new Promise((resolve, reject) => {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }))
    https
      .get(`https://package.swifttech.vn/${packageJson.name}`, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
          data += chunk
        })
        resp.on('end', () => {
          try {
            resolve(JSON.parse(data)['dist-tags']['latest'])
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

const updatePackageJson = () => {
  getPackageLatestVersion().then((v) => {
    const env = process.env.ENVIRONMENT
    try {
      const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }))

      // write new ver
      const currentVer = String(v).includes('-beta') ? String(v).replace('-beta', '') : v
      const currentVerNum = Number(currentVer.split('.').join(''))
      const newVerNum = currentVerNum + 1
      const newVer = `${String(newVerNum).split('').join('.')}${env === 'dev' ? '-beta' : ''}`
      //write colop-material.json if needed
      fs.writeFileSync('./package.json', JSON.stringify({ ...packageJson, version: newVer }))
    } catch (err) {
      console.log(err)
    }
  })
}

updatePackageJson()
