import os

import re

from flask import Flask, request, jsonify

from flask_cors import CORS

import google.generativeai as genai

from dotenv import load_dotenv



# Load environment variables

load_dotenv()



# Set up Gemini API key

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:

    raise ValueError("Error: GEMINI_API_KEY environment variable is not set.")



# Configure Google Gemini AI

genai.configure(api_key=GEMINI_API_KEY)



# Initialize Flask app

app = Flask(__name__)

CORS(app)  # Enable CORS to allow frontend communication



# Allowed file extensions

ALLOWED_EXTENSIONS = {"py"}



def allowed_file(filename):

    """Check if the uploaded file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route("/upload", methods=["POST"])
def upload_file():

    """Handles file upload from the frontend and grades it using Gemini AI."""

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400



    file = request.files["file"]

    

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400



    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type. Please upload a Python (.py) file."}), 400



    try:
        # Read file contents
        file_content = file.read().decode("utf-8")



        # Grade the uploaded code

        grading_result = grade_code(file_content, file.filename)



        return jsonify({"grading_result": grading_result})

    
    except Exception as e:

        return jsonify({"error": f"An error occurred: {str(e)}"}), 500



def grade_code(file_content, file_name):

    """Send the Python code to Gemini AI for evaluation."""

    prompt = f"""
correct and and grade code  write the file name first. MAKE SURE THE REPORT IS SAVED IN HTML format 
{file_name}
and content in 
{file_content}

   """



    try:

        model = genai.GenerativeModel("gemini-2.0-flash")

        response = model.generate_content([{"text": prompt}])



        grading_result = response.text if response else "No response received."



        # Clean up the response (Remove unwanted Markdown artifacts)

        cleaned_content = re.sub(r"", "", grading_result)

        cleaned_content = re.sub(r"", "", cleaned_content)



        return cleaned_content



    except Exception as e:

        return f"Error in API call: {e}"



if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))  # Allow setting port dynamically

    app.run(host="0.0.0.0", port=port, debug=True)
