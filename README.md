# Okay Express

A Node.js Express application for international projects.

## Features

- ✅ Express.js server
- ✅ CORS enabled
- ✅ Environment variables support
- ✅ Error handling middleware
- ✅ Health check endpoint
- ✅ RESTful API structure

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mademen889/okay-express.git
cd okay-express
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/info` - Application information

## Project Structure

```
okay-express/
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md           # This file
```

## License

MIT

## Author

mademen889
