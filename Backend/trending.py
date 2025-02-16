import google.generativeai as genai
import os

# Configure Gemini API
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")  # Ensure your API key is set as an environment variable
genai.configure(api_key=GOOGLE_API_KEY)
MODEL = genai.GenerativeModel('gemini-pro')

def generate_script_prompt(niche: str, trending_video_titles: list[str], trending_video_descriptions: list[str]):
    """
    Generates a prompt for creating a YouTube script.
    Includes the niche, trending video titles, and descriptions for context.
    """
    prompt = f"""
    You are an expert YouTube script writer.  Your goal is to create a script that will attract viewers in the "{niche}" niche.

    Here are the titles and descriptions of the current top 10 trending YouTube videos related to "{niche}":
    Titles: {trending_video_titles}
    Descriptions: {trending_video_descriptions}

    Based on this trending data, suggest a video script.

    The script should be:
    * Engaging and informative.
    * Designed to capture the viewer's attention in the first 15 seconds.
    * Suitable for a {niche} audience.

    Provide the script as a detailed outline with the followin format:
    - Title: [Suggested Title]
    - Introduction: [Brief Hook/Opening]
    - Main Points:
        - Point 1: [Description]
        - Point 2: [Description]
        - ...
    - Conclusion: [Call to action, summary]
    """
    return prompt



def generate_thumbnail_prompt(niche: str, trending_video_titles: list[str], trending_video_descriptions: list[str]):
    """
    Generates a prompt for creating a YouTube thumbnail.
    Includes the niche and trending video data for context.
    """
    prompt = f"""
    You are a YouTube thumbnail design expert. Your goal is to create thumbnail ideas that will maximize click-through rate in the "{niche}" niche.

    Here are the titles and descriptions of the current top 10 trending YouTube videos related to "{niche}":
    Titles: {trending_video_titles}
    Descriptions: {trending_video_descriptions}

    Based on this trending data, suggest 3 distinct thumbnail concepts.

    Each thumbnail concept should include:
    *   A description of the visual elements (colors, images, text).
    *   An explanation of why this thumbnail is likely to attract clicks (e.g., uses contrasting colors, highlights a key benefit, creates curiosity).

    Provide the thumbnail concepts in the following format:

    Thumbnail Concept 1:
    - Visual Description: [Detailed description of the thumbnail's appearance]
    - Rationale: [Why this thumbnail would be effective]

    Thumbnail Concept 2:
    - Visual Description: [Detailed description of the thumbnail's appearance]
    - Rationale: [Why this thumbnail would be effective]

   Thumbnail Concept 3:
    - Visual Description: [Detailed description of the thumbnail's appearance]
    - Rationale: [Why this thumbnail would be effective]
    """
    return prompt


def get_gemini_response(prompt: str):
    """
    Sends a prompt to the Gemini API and returns the response.
    """
    try:
        response = MODEL.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error from Gemini API: {e}")
        return None
