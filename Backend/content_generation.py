def generate_content(niche: str):
    """
    Generate content suggestions for the given niche.
    This dummy implementation returns preset examples.
    """
    suggestions = {
        "#vacation": "How about a post on 'Top 5 Hidden Beaches to Explore This Summer' with stunning visuals?",
        "#foodie": "Consider a caption like 'Indulge in a culinary journey: From street food to gourmet dining! #foodieadventures'",
        "#urban": "Maybe create a mind map detailing your city's best street art spots. A caption could be 'Urban canvas: Exploring art in the streets.'",
        "#fitness": "Try a workout challenge video with a caption: 'Push your limits: 30-day fitness challenge starts now!'",
        "general": "Share something unique from your daily experiences to engage your audience!"
    }
    
    return suggestions.get(niche, suggestions["general"])
