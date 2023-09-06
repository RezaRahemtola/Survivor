# Survivor

## Features 🔥
- Authentication as a company employee
- User profile with your personal information
- Dashboard with widgets (see below)
- Coworkers gallery
  - Search bar (coming soon)
- Widgets
  - Weather 🌥️ (using the current location of the user)
    - Current weather (temperature, wind, humidity...)
    - Next week forecast day by day
  - News 🗞️
    - Latest trending news from various media sources

## Tech & Performance 💻
- Easy usage with Docker Compose to deploy the Expo app, the backend and the database
- Continuous Integration (launching ESLint tests both in the backend and app before allowing merges)
- Continuous Deployment (on a dedicated server via SSH)
- Requests optimized ⚡
  - Coworkers gallery
    - Minimal data fetched for everyone, with additional content fetched when opening the profile modal (coming soon)
    - Pictures lazy-loading (fetched only when they need to be displayed)

## Credits 🙏
- The weather widgets are heavily inspired from [this weather application](https://github.com/stefanylaforest/react-native-weather-app)
- The news widgets is also inspired from [this news application](https://github.com/tarunsinghofficial/News-App-React-Native)

## Authors

| [<img src="https://github.com/Croos3r.png?size=85" width=85><br><sub>Dorian MOY</sub>](https://github.com/Croos3r) | [<img src="https://github.com/RezaRahemtola.png?size=85" width=85><br><sub>Reza RAHEMTOLA</sub>](https://github.com/RezaRahemtola)
| :---: | :---: |
