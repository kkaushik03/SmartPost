from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with Flask backend

load_dotenv()

# Assuming genai is a module you're using, configure it with the API key
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def chat_with_gemini(user_message):
    """Send user input to Gemini AI and return response."""
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(f"You are a helpful coding assistant, please help review this code. {user_message}")
    return response.text if response else "Sorry, I couldn't understand."

@app.route("/")
def home():
    return "<h1>Flask Server is Running!</h1><p>Send a POST request to <b>/chat</b> to interact with AI.</p>"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"error": "Invalid request, 'message' field required"}), 400
    
    user_message = data["message"]
    ai_response = chat_with_gemini(user_message)
    
    return jsonify({"response": ai_response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
