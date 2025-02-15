def analyze_content(user_data: dict):
    """
    Analyze the content to identify the user's niche.
    This dummy implementation extracts hashtags and selects the most frequent one.
    """
    captions = []
    for post in user_data.get("posts", []):
        captions.append(post.get("caption", ""))
    for reel in user_data.get("reels", []):
        captions.append(reel.get("caption", ""))
    
    # Combine all captions into one string
    text = " ".join(captions).lower()
    keywords = {}
    
    # Extract hashtags and count frequency
    for word in text.split():
        if word.startswith("#"):
            keywords[word] = keywords.get(word, 0) + 1
            
    # Sort keywords by frequency (highest first)
    sorted_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)
    niche = sorted_keywords[0][0] if sorted_keywords else "general"
    
    return {
        "keywords": sorted_keywords,
        "niche": niche
    }

def generate_mind_map(analysis_results: dict):
    """
    Generate a simple mind map structure based on the analysis results.
    """
    niche = analysis_results.get("niche", "general")
    keywords = analysis_results.get("keywords", [])
    
    # Create a basic hierarchical structure for the mind map
    mind_map = {
        "center": niche,
        "branches": [{"keyword": k, "count": count} for k, count in keywords]
    }
    return mind_map
