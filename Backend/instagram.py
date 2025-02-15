import os

def get_instagram_data(user_id: str):
    """
    Fetch Instagram posts, reels, and captions for the given user.
    For now, returns dummy data.
    """
    # TODO: Integrate with the Instagram Graph API using OAuth credentials.
    dummy_data = {
        "user_id": user_id,
        "posts": [
            {"id": "1", "caption": "Love this sunny day at the beach! #vacation #sunshine"},
            {"id": "2", "caption": "Delicious brunch with friends. #foodie #brunch"},
            {"id": "3", "caption": "Exploring the city vibes. #urban #adventure"}
        ],
        "reels": [
            {"id": "r1", "caption": "Quick workout routine! #fitness #motivation"}
        ]
    }
    return dummy_data
