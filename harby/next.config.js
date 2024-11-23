const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  experimental: {
    serverActions: false,
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "customz.nyc3.digitaloceanspaces.com"],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
