const process = require('process')
const fs = require('fs')
const Color = require('color')
const packageJSON = require(process.env.npm_package_json)
const { createCanvas, loadImage } = require('canvas')

const logo = packageJSON.generateConfig.promo.logoUrl
const background = packageJSON.generateConfig.promo.backgroundColor
const backgroundType = packageJSON.generateConfig.promo.type
const destinationFile = packageJSON.generateConfig.promo.destinationFile
console.log(logo, background, backgroundType,destinationFile)

const canvas = createCanvas(1024, 500)
const context = canvas.getContext('2d')

// Canvas Background
if (backgroundType === 'solid')
{
    context.fillStyle = background
    context.fillRect(0, 0, 1024, 500)
}
else {
    const backgroundGradient = context.createLinearGradient(0, 0, 0, 500)
    backgroundGradient.addColorStop(0, Color(background).lighten(0.2).hex())
    backgroundGradient.addColorStop(1, Color(background).darken(0.2).hex())
    context.fillStyle = backgroundGradient
    context.fillRect(0, 0, 1024, 500)
}

// Add logo to Promo
loadImage(logo).then((image) => {
    const aspectRatio = image.width / image.height
    const maxWidth = canvas.width / 2
    const maxHeight = canvas.height / 1.5

    let width = maxWidth
    let height = width / aspectRatio

    if (height > maxHeight) {
        height = maxHeight
        width = height * aspectRatio
    }

    const x = (canvas.width - width) / 2
    const y = (canvas.height - height) / 2

    context.drawImage(image, x, y, width, height)

    // Save Promo File
    fs.writeFileSync(
        destinationFile,
        canvas.toBuffer('image/png'),
    );
})

