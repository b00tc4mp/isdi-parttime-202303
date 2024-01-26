# Create Expo project and go to directory
npx create-expo-app demo-react-native
cd demo-react-native

# Install dependencies
npx expo install react-dom react-native-web @expo/webpack-config

# Install yarn
npm install --global yarn

# Configure nativewind
yarn add nativewind                                                                                                        
yarn add --dev tailwindcss

# Configure nativewind
npx tailwindcss init

# In tailwind.config.js add this
content: ["./app/**/*.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],

# In babel.config.js add this below presets
    plugins: ["nativewind/babel"],

# Start expo
    npx expo start

# If returns an error, reinstall nativewind and tailwind (nativewind App.js: Use process(css).then(cb) to work with async plugins)
yarn add nativewind
yarn add --dev tailwindcss@3.3.2