# Survivor


![Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&align=center&titleAlign=center&lineCount=2&line1=react%2CReact+Native%2C5a92ae%3Bnestjs%2CNest%2C921818%3Bpostgresql%2CPostgreSQL%2C16508f%3B&line2=docker%2CDocker%2C306487%3Bgithubactions%2CGitHub+Actions%2Ce0dfdf%3B)

## Features 🔥

- Authentication as a company employee
  - Access persisted when the app is closed for simplified experience
  - Possibility to log out
- User profile with your personal information
  - Settings customization
    - Language (🇺🇸, 🇫🇷, 🇪🇸, 🇨🇳, 🇮🇳, 🇵🇹, 🇯🇵 or 🇩🇪)
    - Theme (device-based 📱, dark ⚫ or light ⚪)
    - Option to reset to default settings
- Home dashboard
  - Set your status (at the office 🏢, working remotely 💻, vacationing 🌴...)
    - Status updates can be sent in a Discord channel via webhook
  - Quick access to communication tools (Discord, Slack and Element, each one can be separately activated)
- Widgets dashboard (see below)
  - Widget selection with preferences persisted in a database
  - Friendly UI to add, remove and reorder widgets (inspired from iPhones design)
- Coworkers gallery
  - Search bar to filter by name
- Widgets
  - Weather 🌥️ (using the current location of the user)
    - Current weather (temperature, wind, humidity...)
    - Next week forecast day by day
  - News 🗞️
    - Latest trending news from various media sources
  - Next carpooling rides in Iceland 🚗
  - Random NBA games scores 🏀

## Tech & Performance 💻

- Easy usage with Docker Compose to deploy the Expo app, the backend and the database
- Complete backend OpenAPI v3 documentation
- Continuous Integration (launching ESLint tests both in the backend and app before allowing merges)
- Continuous Deployment (on a dedicated server via SSH)
- Partial "offline" mode (while using only cached data the application can still be used even if the access token expires)
- Requests optimized ⚡
  - All the pictures are cached on their first load
  - Coworkers gallery
    - Minimal data fetched for everyone, with additional content fetched when opening the profile modal
    - Pictures lazy-loading (fetched only when they need to be displayed)
  - User profile fetched only when necessary

## Credits 🙏
- The weather widgets are heavily inspired from [this weather application](https://github.com/stefanylaforest/react-native-weather-app)
- The news widgets is also inspired from [this news application](https://github.com/tarunsinghofficial/News-App-React-Native)
- The user profile card was recreated [from this template](https://github.com/nattatorn-dev/react-native-user-profile)

## Authors

| [<img src="https://github.com/Croos3r.png?size=85" width=85><br><sub>Dorian MOY</sub>](https://github.com/Croos3r) | [<img src="https://github.com/RezaRahemtola.png?size=85" width=85><br><sub>Reza RAHEMTOLA</sub>](https://github.com/RezaRahemtola)| [<img src="https://github.com/Dwozy.png?size=85" width=85><br><sub>Léo SOIDIKI</sub>](https://github.com/Dwozy) | [<img src="https://github.com/MathieuMarques.png?size=85" width=85><br><sub>Mathieu MARQUES</sub>](https://github.com/MathieuMarques)
| :---: | :---: | :---: | :---: |
