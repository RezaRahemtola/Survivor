# Survivor


![Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&align=center&titleAlign=center&lineCount=2&line1=react%2CReact+Native%2C5a92ae%3Bnestjs%2CNest%2C921818%3Bpostgresql%2CPostgreSQL%2C16508f%3B&line2=docker%2CDocker%2C306487%3Bgithubactions%2CGitHub+Actions%2Ce0dfdf%3B)

## Features 🔥

- Authentication as a company employee
  - Access persisted when the app is closed for simplified experience 
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
  - All the pictures are cached on their first load
  - Coworkers gallery
    - Minimal data fetched for everyone, with additional content fetched when opening the profile modal
    - Pictures lazy-loading (fetched only when they need to be displayed)
  - User profile fetched only when necessary

## Credits 🙏
- The weather widgets are heavily inspired from [this weather application](https://github.com/stefanylaforest/react-native-weather-app)
- The news widgets is also inspired from [this news application](https://github.com/tarunsinghofficial/News-App-React-Native)

## Authors

| [<img src="https://github.com/Croos3r.png?size=85" width=85><br><sub>Dorian MOY</sub>](https://github.com/Croos3r) | [<img src="https://github.com/RezaRahemtola.png?size=85" width=85><br><sub>Reza RAHEMTOLA</sub>](https://github.com/RezaRahemtola)
| :---: | :---: |
