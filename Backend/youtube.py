import os
import re
import requests
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv
load_dotenv()
import trending


# Get your YouTube API key from environment variables
YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")

def get_youtube_service():
    """
    Creates a YouTube service object using the API key.
    """
    if not YOUTUBE_API_KEY:
        raise Exception("YOUTUBE_API_KEY is not set in environment variables.")
    return build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

def get_channel_content(channel_id: str):
    """
    Fetches the videos from a YouTube channel using its channel_id.
    Returns a list of video items with title, description, etc.
    """
    service = get_youtube_service()
    try:
        # First, retrieve the uploads playlist ID for the channel.
        channel_response = service.channels().list(
            part="contentDetails",
            id=channel_id
        ).execute()

        items = channel_response.get("items", [])
        if not items:
            raise Exception("Channel not found.")
        uploads_playlist_id = items[0]["contentDetails"]["relatedPlaylists"]["uploads"]

        # Retrieve videos from the uploads playlist.
        videos = []
        nextPageToken = None
        while True:
            playlist_response = service.playlistItems().list(
                part="snippet",
                playlistId=uploads_playlist_id,
                maxResults=50,
                pageToken=nextPageToken
            ).execute()
            videos.extend(playlist_response.get("items", []))
            nextPageToken = playlist_response.get("nextPageToken")
            if not nextPageToken:
                break
        return videos
    except HttpError as e:
        raise Exception(f"An HTTP error occurred: {e.resp.status} - {e.content}")

def analyze_channel_content(videos):
    """
    Analyzes video titles and descriptions to identify the channel’s niche.
    This dummy implementation counts keyword frequency and picks the most common one.
    """
    text = ""
    for item in videos:
        snippet = item.get("snippet", {})
        title = snippet.get("title", "")
        description = snippet.get("description", "")
        text += f" {title} {description}"
    text = text.lower()
    # Extract words (simple split by non-word characters)
    words = re.findall(r"\w+", text)
    stop_words = set(["the", "and", "for", "with", "this", "that", "a", "an", "in", "on", "of", "to"])
    keywords = {}
    for word in words:
        if word not in stop_words and len(word) > 3:
            keywords[word] = keywords.get(word, 0) + 1
    sorted_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)
    niche = sorted_keywords[0][0] if sorted_keywords else "general"
    return {"keywords": sorted_keywords, "niche": niche}

def get_trending_videos(niche: str, regionCode="US"):
    """
    Searches for trending videos related to the given niche.
    This uses YouTube’s search endpoint ordered by view count.
    """
    service = get_youtube_service()
    try:
        response = service.search().list(
            part="snippet",
            q=niche,
            type="video",
            order="viewCount",
            regionCode=regionCode,
            maxResults=10
        ).execute()
        return response.get("items", [])
    except HttpError as e:
        raise Exception(f"An HTTP error occurred: {e.resp.status} - {e.content}")

def generate_suggestions(niche: str):
    """
    Generates content suggestions and examples based on the niche.
    This dummy implementation returns preset suggestions.
    """
    suggestions = {
        "gaming": "Consider a video review of a new game or a top tips guide for popular titles.",
        "cooking": "How about a step-by-step tutorial for a trending recipe or a cooking challenge?",
        "tech": "Maybe create a video comparing the latest gadgets or a how-to guide on new software.",
    }
    return suggestions.get(niche, f"Create engaging content about {niche}. For example, 'Top 10 Insights About {niche.capitalize()}'")

def generate_video_script(niche: str):
    """
    Generate a video script for a given niche using Gemini.
    """
    try:
        trending_videos = get_trending_videos(niche)

        if not trending_videos:
            raise HTTPException(status_code=404, detail=f"No trending videos found for the niche: {niche}")

        trending_video_titles = [item['snippet']['title'] for item in trending_videos]
        trending_video_descriptions = [item['snippet']['description'] for item in trending_videos]

        script_prompt = trending.generate_script_prompt(niche, trending_video_titles, trending_video_descriptions)
        script = trending.get_gemini_response(script_prompt)

        if not script:
            raise HTTPException(status_code=500, detail="Failed to generate script.")

        return {"script": script}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def pass_script_to_video_generation_tool(script: str):
    """
    Passes the generated script to a video generation tool.
    This dummy implementation simulates an API call to such a tool.
    """
    # In a real-world scenario, replace this with an actual API request.
    # For example:
    # response = requests.post("https://video-gen.example.com/api/generate", json={"script": script})
    # return response.json()
    return {"status": "success", "message": "Script accepted by video generation tool.", "script": script}
