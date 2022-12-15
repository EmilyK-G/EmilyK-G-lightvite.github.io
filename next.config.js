/** @type {import('next').NextConfig} */

const nodeExternals = require('webpack-node-externals');

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  env: {
    autocompleteKey: 'fb7d0854a46444f49fa7e9093c311ce2',
  },
  externals: ()=>{if(isServer) { config.externals = [nodeExternals()] }},
}
