module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["./"],
      alias: {
        "@screens": "./src/screens",
        "@components": "./src/components",
        "@services": "./src/services",
      }
    }]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};