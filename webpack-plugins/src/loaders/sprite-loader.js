const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith')

module.exports = function (source) {
  const callback = this.async()
  const imgs = source.match(/url\((\S*)\?__sprite/g);
  const matchedImgs = []
  console.log(imgs)

  for (let i = 0, len = imgs.length; i < len; i++) {
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1]
    matchedImgs.push(path.join(__dirname, img))
  }

  Spritesmith.run({
    src: matchedImgs,
  }, (err, result) => {
    fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image)
    
    source = source.replace(/url\((\S*)\?__sprite/g, match => `url("dist/sprite.jpg"`)

    fs.writeFileSync(path.join(process.cwd(), 'dist/demo.css'), source)

    callback(null, source)
  })


}