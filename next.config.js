/** @type {import('next').NextConfig} */

const nodeExternals = require('webpack-node-externals');

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  env: {
    autocompleteKey: 'fb7d0854a46444f49fa7e9093c311ce2',
    ABLY_SERVER_API_KEY: 'Inb_Eg.IA_y1Q:KnTV-rjaOvOyP_uXouGjEZJAyS_uGiY-UmM_8s-eGjY',     
    ABLY_CLIENT_API_KEY: 'Inb_Eg.tmn-Og:aSZth91sRqT6gG0gLaZX9ONBnXacpAdtGk4dQTP1_HI',
  },
  // externals: ()=>{if(isServer) { config.externals = [nodeExternals()] }},
}
