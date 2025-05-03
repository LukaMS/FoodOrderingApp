# FoodOrderingApp

A simple Expo React Native mobile application for browsing products and placing food orders.

## Prerequisites

* Node.js (v14+)
* Yarn or npm
* Expo CLI (`npm install -g expo-cli`)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd FoodOrderingApp
   ```
2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

## Configuration

1. Create a `.env` file in the project root if needed for environment variables.
2. (Optional) Configure Supabase or other backends by setting your API keys and URLs in environment variables.

## Running the App

Start the Expo development server:

```bash
expo start
```

* Scan the QR code with the Expo Go app (iOS/Android) or
* Press `i` to run on iOS Simulator, `a` to run on Android Emulator

## Project Structure

```
FoodOrderingApp/
├── app.json            # Expo configuration
├── assets/
│   ├── data/           # Sample data (products, orders)
│   └── images/         # App icons and splash images
├── src/                # Application source code
│   ├── components/     # Reusable React components
│   ├── screens/        # Screen components
│   ├── types/          # TypeScript type definitions
│   └── api/            # API interaction logic
├── .gitignore          # Git ignore rules
└── package.json        # Project metadata and scripts
```

## Features

* Browse product list with images and prices
* View order history with status and details
* Place new orders (mock data)
* Expo Router for navigation
* AsyncStorage for local persistence
* Secure storage for sensitive data


## License

MIT License
