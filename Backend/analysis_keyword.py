import requests
from fastapi import HTTPException
from agno.agent import Agent
from agno.models.google import Gemini

# Set up the Gemini agent for keyword extraction.
agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),  # Replace with your actual Gemini model ID.
    description="Extract a single concise underscore_separated keyword that represents a YouTube channel's niche based on its video metadata.",
    markdown=True,
)

def extract_channel_keyword(channel_id: str, channel_content_url: str = "http://0.0.0.0:5000/channel-content") -> str:
    """
    Fetches channel content from the specified channel_content endpoint,
    combines video metadata (titles and descriptions), and uses Gemini to
    extract a single underscore_separated keyword representing the channel's niche.
    """
    params = {"channel_id": channel_id}
    response = requests.get(channel_content_url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch channel content: {response.text}")
    
    data = response.json()
    videos = data.get("videos", [])
    if not videos:
        raise HTTPException(status_code=404, detail="No videos found for this channel")
    
    # Combine the metadata into one text block.
    combined_text = ""
    for video in videos:
        snippet = video.get("snippet", {})
        title = snippet.get("title", "")
        description = snippet.get("description", "")
        combined_text += f"Title: {title}\nDescription: {description}\n\n"
    
    # Construct the prompt for Gemini.
    prompt = (
        "Based on the following YouTube channel video metadata, extract a single concise "
        "underscore_separated keyword that best represents the channel's niche.\n\n"
        f"{combined_text}\nKeyword:"
    )
    
    try:
        keyword = agent.get_response(prompt)
        # Clean the result: trim whitespace, convert to lowercase, replace spaces with underscores.
        keyword = keyword.strip().lower().replace(" ", "_")
        return keyword
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Keyword extraction failed: {str(e)}")
