import os
import requests
from fastapi import HTTPException

# Base URLs for Instagram API endpoints
INSTAGRAM_AUTH_URL = "https://api.instagram.com/oauth/authorize"
INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token"
INSTAGRAM_GRAPH_API_URL = "https://graph.instagram.com"

def get_instagram_login_url():
    """
    Constructs the Instagram login URL for user authentication.
    The user should be redirected to this URL to log in and authorize your app.
    """
    client_id = os.environ.get('INSTAGRAM_CLIENT_ID')
    redirect_uri = os.environ.get('INSTAGRAM_REDIRECT_URI')
    scope = 'user_profile,user_media'
    response_type = 'code'
    
    if not client_id or not redirect_uri:
        raise Exception("Instagram client ID and redirect URI must be set in environment variables.")
    
    login_url = (
        f"{INSTAGRAM_AUTH_URL}"
        f"?client_id={client_id}"
        f"&redirect_uri={redirect_uri}"
        f"&scope={scope}"
        f"&response_type={response_type}"
    )
    return login_url

def exchange_code_for_token(code: str):
    """
    Exchanges the authorization code obtained from the login redirect for a short-lived access token.
    """
    client_id = os.environ.get('INSTAGRAM_CLIENT_ID')
    client_secret = os.environ.get('INSTAGRAM_CLIENT_SECRET')
    redirect_uri = os.environ.get('INSTAGRAM_REDIRECT_URI')
    
    if not (client_id and client_secret and redirect_uri):
        raise Exception("Instagram client credentials and redirect URI must be set in environment variables.")
    
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': code
    }
    
    response = requests.post(INSTAGRAM_TOKEN_URL, data=data)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=f"Token exchange failed: {response.text}")
    
    token_info = response.json()
    access_token = token_info.get('access_token')
    if not access_token:
        raise HTTPException(status_code=500, detail="Access token not found in the response.")
    return access_token

def get_user_data(access_token: str):
    """
    Fetches basic user information from the Instagram Graph API.
    Returns data such as the user's ID, username, account type, and media count.
    """
    url = f"{INSTAGRAM_GRAPH_API_URL}/me"
    params = {
        'fields': 'id,username,account_type,media_count',
        'access_token': access_token
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch user data: {response.text}")
    return response.json()

def get_user_media(access_token: str):
    """
    Fetches the user's media (posts, reels, etc.) from the Instagram Graph API.
    Returns a list of media objects with fields like id, caption, media_type, media_url, and timestamp.
    """
    url = f"{INSTAGRAM_GRAPH_API_URL}/me/media"
    params = {
        'fields': 'id,caption,media_type,media_url,timestamp',
        'access_token': access_token
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch user media: {response.text}")
    
    media_data = response.json()
    return media_data.get('data', [])
