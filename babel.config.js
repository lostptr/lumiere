module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["./"],
      alias: {
        "@screens": "./src/screens",
        "@components": "./src/components",
        "@services": "./src/services",
        "@store": "./src/store",
      }
    }]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};