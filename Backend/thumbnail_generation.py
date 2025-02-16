import os
import base64
from together import Together
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
from trending import generate_thumbnail_prompt

# Load environment variables from .env
load_dotenv()

# Initialize Together AI client
client = Together()

def generate_thumbnail(prompt: str, output_filename="generated_image.png"):
    """
    Generates an image based on the given prompt using Together AI's Flux model.
    
    Args:
        prompt (str): The text prompt for image generation.
        output_filename (str): The name of the output image file (default: "generated_image.png").
        
    Returns:
        str: The file path of the saved image.
    """
    # Generate image
    response = client.images.generate(
        prompt=prompt,
        model="black-forest-labs/FLUX.1-schnell-Free",
        width=1024,
        height=768,
        steps=4,
        n=1,
        response_format="b64_json"
    )

    # Use attribute access instead of dictionary indexing
    image_data = response.data[0].b64_json
    image_bytes = base64.b64decode(image_data)

    # Convert to a PIL Image
    image = Image.open(BytesIO(image_bytes))

    # Save the image
    image.save(output_filename)

    print(f"Image saved as {output_filename}")
    return output_filename

# Example usage (this line will call the function)
if __name__ == "__main__":
    generate_thumbnail("A futuristic AI-powered city skyline with neon lights")
