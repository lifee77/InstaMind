from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from instagram import (
    get_instagram_data,
    get_instagram_login_url,
    exchange_code_for_token,
    get_user_data,
    get_user_media
)
from analysis import analyze_content, generate_mind_map
from trending import get_trending_topics
from content_gen import generate_content

app = FastAPI(title="InstaMind Backend API", version="0.1.0")

# Allow CORS for the frontend (adjust origins as needed)
origins = [
    "http://localhost:3000",
    # Add additional origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to InstaMind Backend API"}

@app.get("/login")
def login():
    """
    Redirect the user to Instagram for authentication.
    Returns a URL the frontend can use to redirect the user.
    """
    return {"login_url": get_instagram_login_url()}

@app.get("/callback")
def callback(code: str):
    """
    Instagram OAuth callback endpoint.
    Exchanges the code for an access token and retrieves user info and media.
    """
    try:
        access_token = exchange_code_for_token(code)
        user_info = get_user_data(access_token)
        media = get_user_media(access_token)
        return {"user_info": user_info, "media": media}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analyze")
async def analyze_instagram_content(user_id: str):
    """
    Analyze Instagram content for a given user.
    """
    try:
        # Fetch user data from Instagram API (dummy data for now)
        user_data = get_instagram_data(user_id)
        
        # Analyze content to identify the niche and extract keywords
        analysis_results = analyze_content(user_data)
        
        # Generate a simple mind map structure based on the analysis
        mind_map = generate_mind_map(analysis_results)
        
        return {
            "analysis": analysis_results,
            "mind_map": mind_map
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/trending")
async def trending_topics(niche: str):
    """
    Retrieve trending topics for a given niche.
    """
    try:
        trends = get_trending_topics(niche)
        return {"trends": trends}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/generate-content")
async def content_suggestion(niche: str):
    """
    Generate content suggestions based on the user's niche.
    """
    try:
        suggestion = generate_content(niche)
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
