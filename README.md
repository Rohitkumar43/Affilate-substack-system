# Affiliate Postback System (S2S Tracking)

A server-to-server (S2S) tracking system for affiliate marketing that allows advertisers to notify affiliates when conversions occur.

## Features

- **Click Tracking**: Store affiliate clicks in PostgreSQL
- **Postback Endpoint**: Receive and log conversions
- **Affiliate Dashboard**: Display clicks and conversions
- **Unique Postback URL Generation**: Affiliates can see their own postback URL format

## Project Structure

- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: Next.js

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

## Setup Instructions

### Database Setup

1. Create a PostgreSQL database named `affiliate_system`
2. Update the database connection details in `backend/.env` if needed

### Backend Setup

```bash
cd backend
npm install
npm run init-db  # Initialize database schema and sample data
npm start        # Start the backend server
```

The backend server will run on http://localhost:3001

### Frontend Setup

```bash
cd frontend
npm install
npm run dev      # Start the frontend development server
```

The frontend will run on http://localhost:3000

## API Endpoints

### Click Tracking

```
GET /click?affiliate_id=1&campaign_id=10&click_id=abc123
```

### Postback (Conversion Tracking)

```
GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD
```

## Testing the System

1. Open the frontend application in your browser
2. Select an affiliate from the list
3. View the postback URL format
4. Simulate a click by making a request to the click endpoint
5. Simulate a conversion by making a request to the postback endpoint
6. Refresh the dashboard to see the recorded click and conversion

## Database Schema

- **affiliates**: id, name
- **campaigns**: id, name
- **clicks**: id, affiliate_id, campaign_id, click_id, timestamp
- **conversions**: id, click_id, amount, currency, timestamp