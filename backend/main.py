from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
from waitress import serve

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with Flask backend

load_dotenv()

# Assuming genai is a module you're using, configure it with the API key
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def chat_with_gemini(user_message):
    """Send user input to Gemini AI and return response."""
    model = genai.GenerativeModel("gemini-pro")
    # response = model.generate_content(f"You are a helpful coding assistant, please help review this code based on readability, maintainability, efficientcy, testability, sustainability, and adaptability. {user_message}")
    response = model.generate_content(f"You are a helpful coding assistant, please help review this code based on Google Coding Style Guide. {user_message}")
    return response.text if response else "Sorry, I couldn't understand."

@app.route("/")
def home():
    return "<h1>Flask Server is Running!</h1><p>Send a POST request to <b>/chat</b> to interact with AI.</p>"

UPLOAD_FOLDER = "uploads"  # Folder where files are stored
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "file_name" not in data:
        return jsonify({"error": "Invalid request, 'file_name' field required"}), 400

    file_name = data["file_name"]
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_name)

    # Check if the file exists
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    try:
        # Read file content
        with open(file_path, "r", encoding="utf-8") as file:
            file_content = file.read()

        # Process with AI
        ai_response = chat_with_gemini(file_content)

        return jsonify({"response": ai_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)
