// src/lib/api.js

// If using proxy in package.json, you can use relative paths like "/channel-content".
// Otherwise, replace with full URL: "http://localhost:5000/channel-content"

export async function getChannelContent(channelId) {
    const res = await fetch(`/channel-content?channel_id=${channelId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch channel content: ${res.statusText}`);
    }
    return res.json();
  }
  
  export async function analyzeChannel(channelId) {
    const res = await fetch(`/analyze-channel?channel_id=${channelId}`);
    if (!res.ok) {
      throw new Error(`Failed to analyze channel: ${res.statusText}`);
    }
    return res.json();
  }
  
  export async function analyzeChannelKeyword(channelId) {
    const res = await fetch(`/analyze-channel-keyword?channel_id=${channelId}`);
    if (!res.ok) {
      throw new Error(`Failed to analyze channel keyword: ${res.statusText}`);
    }
    return res.json();
  }
  
  export async function getTrending(niche) {
    const res = await fetch(`/trending?niche=${niche}`);
    if (!res.ok) {
      throw new Error(`Failed to get trending videos: ${res.statusText}`);
    }
    return res.json();
  }
  
  export async function getSuggestions(niche) {
    const res = await fetch(`/suggestions?niche=${niche}`);
    if (!res.ok) {
      throw new Error(`Failed to get suggestions: ${res.statusText}`);
    }
    return res.json();
  }
  
  export async function generateScript(niche) {
    const res = await fetch(`/generate-script?niche=${niche}`);
    if (!res.ok) {
      throw new Error(`Failed to generate script: ${res.statusText}`);
    }
    return res.json();
  }
  
  // create-thumbnail is a POST route
  export async function createThumbnail(niche) {
    const res = await fetch('/create-thumbnail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // We pass the niche in the request body. The route param is "niche: str"
      body: JSON.stringify({ niche }),
    });
    if (!res.ok) {
      throw new Error(`Failed to create thumbnail: ${res.statusText}`);
    }
    return res.json();
  }
  