/** @type {import('tailwindcss').Config} */

import helloworldPlugin from './tailwind.helloworld.plugin'
import helloworldPlugin1 from './tailwind.helloworld.plugin.1'

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {}
  },
  plugins: [helloworldPlugin, helloworldPlugin1]
}

