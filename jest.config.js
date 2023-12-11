module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testMatch: ["<rootDir>/**/*.test.{js,jsx,ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$":
      "identity-obj-proxy",
  },
};
