# MediaMind

**MediaMind** is a multimodal AI-powered media assistant designed to analyze YouTube content. It fetches channel videos, determines their niche, generates a detailed script, and creates an engaging thumbnail—all in one go. Whether you're a content creator looking for inspiration or a strategist optimizing video content, MediaMind provides the tools you need.

## Features

- **YouTube Channel Analysis:**
  - Fetches videos from a given YouTube channel.
  - Uses NLP techniques to analyze video metadata and determine the channel's niche.
  - Utilizes **Agno** for keyword extraction and niche identification.

- **Script Generation:**
  - AI-powered script creation tailored to the channel's niche.
  - Uses **Gemini AI** to generate prompts and create structured scripts.
  - Provides a breakdown with introduction, main points, and conclusion.

- **Thumbnail Generation:**
  - AI-generated thumbnails based on video script analysis.
  - Uses **Gemini AI** to create visually appealing, high-engagement designs.

- **User-Friendly Dashboard:**
  - Built with React for an intuitive and interactive experience.
  - Minimalist design with clear results presentation.

## Tech Stack

### Frontend:
- **React.js** for a dynamic and responsive UI.
- **Marked.js** for rendering script content in markdown format.
- **CSS** for a clean, modern design.

### Backend:
- **FastAPI** for building a robust API.
- **YouTube Data API** for fetching channel content.
- **NLP & AI Models** for niche identification and script generation.
- **Together.AI API** for generating thumbnails.
- **Agno & Gemini AI** for keyword generation and script/thumbnail creation.

## Project Structure

```
mediamind/
├── backend/
│   ├── app.py               # FastAPI server
│   ├── youtube.py           # Fetch YouTube channel videos
│   ├── analysis.py          # Content analysis and niche identification
│   ├── script_gen.py        # AI-generated video scripts
│   ├── thumbnail_gen.py     # AI-powered thumbnail creation
│   ├── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js           # Main React app
│   │   ├── index.js         # Application entry point
│   │   ├── styles.css       # Styling
│   ├── package.json         # Frontend dependencies
└── README.md                # Documentation
```

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (for frontend development)
- Python 3.8+ (for backend development)

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/lifee77/MediaMind.git
   cd MediaMind
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:5000](http://localhost:5000)

## Usage

1. **Enter YouTube Channel ID:**
   - Provide a valid YouTube channel ID in the UI.
   - Click "Generate Thumbnail & Script."

2. **View Results:**
   - The app will display:
     - **Detected Niche** based on video metadata.
     - **AI-Generated Script** formatted using markdown.
     - **Generated Thumbnail** from AI-based image generation.

## Contributing

We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, feedback, or suggestions, please contact:
- **Daria Khmara** - khmara@uni.minerva.edu
- **Jeevan Bhatta** - jeevan@uni.minerva.edu

