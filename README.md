# Anime Note

## Overview

Anime Note is a beginner-friendly app for anime fans.

## Features
- Add anime quotes, vote, and link sources.
- Filter content by type for better organization.
- Responsive design ensures smooth browsing across different devices.
- Integrated with PostgreSQL via Supabase for robust data management.
- Utilizes ChatGPT API and DALL-E for dynamic title and image generation.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend & Database**: PostgreSQL via Supabase
- **APIs**: ChatGPT API for text generation, DALL-E for image generation

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- A PostgreSQL database and access to Supabase

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/AnimeNote.git
   cd AnimeNote
2. **Install dependencies**:
   ```bash
   npm install
3. **Set up environment variables**:
   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_API_KEY=your_supabase_api_key
   CHATGPT_API_KEY=your_chatgpt_api_key
   DALL_E_API_KEY=your_dalle_api_key
4. **Start the application**:
   ```bash
   npm start
This will start the app on http://localhost:3000.

## Usage
- Navigate to the home page and explore anime quotes.
- Submit your favorite quotes, vote on quotes, and filter content by type.
- Enjoy dynamically generated titles and images using ChatGPT and DALL-E.

## Contributing

Feel free to fork the repository and submit pull requests!

