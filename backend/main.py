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
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend communication

# Allowed file extensions
ALLOWED_EXTENSIONS = {"py", "js", "java", "c", "cpp", "rb", "php", "html"}

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handles file upload from the frontend and sends it to Gemini AI for grading."""
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({
            "error": f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        }), 400

    try:
        # Read file contents
        file_content = file.read().decode("utf-8")
        extension = file.filename.rsplit(".", 1)[1].lower()

        # Grade the uploaded code (for any allowed extension)
        grading_result = grade_code(file_content, file.filename, extension)
        return jsonify({"grading_result": grading_result})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

def grade_code(file_content, file_name, extension):
    """
    Send the code (of any allowed extension) to Gemini AI for evaluation.
    Returns the grading result as an HTML string.
    """
    # A universal prompt referencing the file extension
    prompt = f"""
AI-Powered Python Code Grading Assistant

### Task Description:
You are an AI-powered code grading assistant specializing in evaluating Python submissions. Your task is to analyze a given Python code snippet and return a formal, structured evaluation report in HTML format only.

### Instructions:
- Do not use emojis, symbols, or decorative characters.
- Return only valid, clean HTML5 (no JSON, Markdown, or raw text).
- Do not include <style> tags; use inline CSS only when necessary.
- Center all headings (h1, h2, etc.) and format them properly.
- Ensure the HTML is free of broken elements, extraneous spaces, and extra new lines.
- Remove any Markdown artifacts (e.g., ```html).
- Maintain proper indentation, spacing, and structure throughout.

### Styling Requirements (Modern Gradient Theme):
- **Overall Background:** #0e0f0d.
- **Body should be center and 60% of width of screen.
- **Content Area:** very Dark grey.
- **Text:** Primary text should be white; headings should be in beige.
- **Tables:** White text with clear borders.
- **Buttons:** Dark grey backgrounds.
- **Borders:** Rounded corners (5–10px) with a soft drop shadow.
- **Accent Colors:** Incorporate #7468FC, #A7A0F8, and #847EC8.
- **Font:** Use a modern sans-serif font (e.g., Roboto or Open Sans).

### Evaluation Criteria & Scoring:
Scores are from 0 to 10 (increments of 0.5) based on:
- **Correctness:** Code functionality and absence of syntax/logical errors.
- **Efficiency:** Optimal time/space complexity and avoidance of unnecessary loops.
- **Readability:** Clarity of code and meaningful variable names.
- **Style:** Adherence to best practices (PEP8, Google style guide).
- **Security:** Absence of vulnerabilities.
- **Fragility:** Code resilience to minor changes or edge cases.

### Expected HTML Output Format:
- Return valid, professional HTML5 only.
- Include a centered main heading (h1) for the report title.
- Structure the document into the following sections:
  1. Overall Results: A clean table displaying scores.
  2. Flagged Code Sections: Problematic code snippets with comments.
  3. Recommendations for Improvement: Actionable insights.
  4. Corrected Code Snippets: Optimized code with a functional copy-to-clipboard button with color #483EA8.
- Layout must include:
  - A background with the Modern Gradient theme.
  - Centered headings with bottom borders.
  - Tables with clear borders and white text.
  - Code blocks in a monospaced font with a light gray background and proper padding.
  - Copy-to-Clipboard buttons placed directly below the respective code blocks.
- Do not label any heading as "Original Code."

### Final Notes:
- No emojis or decorative symbols.
- Remove all Markdown artifacts.
- Maintain a consistent and professional HTML structure.

File: {file_name}

Code:
{file_content}
"""




    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content([{"text": prompt}])
        grading_result = response.text if response else "No response received."

        # Remove any stray Markdown artifacts
        cleaned_content = re.sub(r"```html", "", grading_result)
        cleaned_content = re.sub(r"```", "", cleaned_content)
        return cleaned_content

    except Exception as e:
        return f"Error in API call: {e}"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Allow setting port dynamically
    app.run(host="0.0.0.0", port=port, debug=True)