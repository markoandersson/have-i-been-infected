const purgecss = require('@fullhuman/postcss-purgecss')
const tailwind = require('tailwindcss')

const devPlugins = [
  tailwind()
]

const prodPlugins = [
  tailwind(),
  purgecss({
    content: ['./src/*.html', './src/*.js']
  })
]

module.exports = { plugins: process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins };