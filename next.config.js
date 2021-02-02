module.exports = {
  async rewrites() {
    return [
      {
        source: '/count.js',
        destination: 'https://gc.zgo.at/count.js',
      },
      {
        source: '/goat',
        destination: 'https://vimcolors.goatcounter.com/count',
      },
    ]
  },
}
