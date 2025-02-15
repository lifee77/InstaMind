def get_trending_topics(niche: str):
    """
    Fetch trending topics for the given niche.
    This dummy implementation returns preset sample trending topics.
    """
    dummy_trends = {
        "#vacation": ["Beach trips", "Summer vibes", "Travel essentials"],
        "#foodie": ["Vegan recipes", "Gourmet food", "Food festivals"],
        "#urban": ["City life", "Street art", "Urban fashion"],
        "#fitness": ["Home workouts", "HIIT training", "Fitness challenges"],
        "general": ["Trending topic 1", "Trending topic 2", "Trending topic 3"]
    }
    
    return dummy_trends.get(niche, dummy_trends["general"])
