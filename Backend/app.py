
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from analysis_keyword import extract_channel_keyword
from thumbnail_generation import generate_thumbnail
from youtube import (
    get_channel_content,
    analyze_channel_content,
    get_trending_videos,
    generate_suggestions,
    generate_video_script,
    pass_script_to_video_generation_tool,
)
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="YouTube Content Analysis API", version="0.1.0")

# Allow CORS for the frontend (adjust origins as needed)
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChannelRequest(BaseModel):
    channel_id: str


@app.get("/")
def root():
    return {"message": "Welcome to the YouTube Content Analysis API"}
 
@app.get("/channel-content")
def channel_content(channel_id: str):
    """
    Retrieve videos from a YouTube channel by its channel_id.
    """
    try:
        videos = get_channel_content(channel_id)
        return {"videos": videos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
@app.get("/analyze-channel")
def analyze_channel(channel_id: str):
    """
    Analyze a channel's content to determine the user's niche.
    """
    try:
        videos = get_channel_content(channel_id)
        analysis = analyze_channel_content(videos)
        return {"analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analyze-channel-keyword")
def analyze_channel_keyword_endpoint(channel_id: str = Query(..., description="The YouTube channel ID")):
    """
    Endpoint that fetches channel content and uses Gemini (via Agno) to extract
    a single underscore_separated keyword representing the channel's niche.
    """
    try:
        keyword = extract_channel_keyword(channel_id)
        return {"channel_id": channel_id, "keyword": keyword}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
@app.get("/trending")
def trending(niche: str):
    """
    Retrieve trending videos for a given niche.
    """
    try:
        trending_items = get_trending_videos(niche)
        return {"trending": trending_items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
@app.get("/suggestions")
def suggestions(niche: str):
    """
    Generate content suggestions based on the niche.
    """
    try:
        sugg = generate_suggestions(niche)
        return {"suggestions": sugg}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
@app.get("/generate-script")
def generate_script(niche: str):
    """
    Generate a video script for a given niche.
    """
    try:
        script = generate_video_script(niche)
        return {"script": script}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
@app.post("/create-thumbnail")
def create_script(niche: str):
    """
    Generate a video script and pass it to a video generation tool.
    """
    try:
        script = generate_video_script(niche)
        response = generate_thumbnail(script)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-thumbnail-script")
def generate_thumbnail_script(request: ChannelRequest):
    """
    Generates a script and a base64 thumbnail.
    """
    try:
        channel_id = request.channel_id
        videos = get_channel_content(channel_id)
        if not videos:
            raise HTTPException(status_code=404, detail="No videos found for this channel")
        
        analysis = analyze_channel_content(videos)
        niche = analysis.get("niche", "general")
        
        script_response = generate_video_script(niche)
        script = script_response.get("script")

        if not script:
            raise HTTPException(status_code=500, detail="Failed to generate script.")
        
        thumbnail_base64 = generate_thumbnail(script)

        return {
            "channel_id": channel_id,
            "niche": niche,
            "script": script,
            "thumbnail": thumbnail_base64,  # Base64 image
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
