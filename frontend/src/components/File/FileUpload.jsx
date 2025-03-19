// src/components/FileUpload/FileUpload.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileUploadImage from "../../assets/File/Upload _icon.png";
import Logo from "../../assets/Navbar/Logo.png";
import './FileUpload.css';

// Icon imports
import { MdOutlineClose } from "react-icons/md";
import { FaTrash } from "react-icons/fa"

// Helper to remove extra "Copy Code" buttons from the HTML
function removeExtraCopyButtons(htmlContent) {
  let found = false;
  return htmlContent.replace(/<button[^>]*>\s*Copy Code\s*<\/button>/gi, (match) => {
    if (!found) {
      found = true;
      return match; // Keep the first one
    }
    // Remove any subsequent "Copy Code" buttons
    return '';
  });
}

const FileUpload = () => {
  const [filesUpload, setFilesUpload] = useState([]);  // Files in queue
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [fileResults, setFileResults] = useState({});  // Store grading results per file
  const [reportUrls, setReportUrls] = useState({});    // Store generated report URLs
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);         // Track upload progress
  const [isDragging, setIsDragging] = useState(false); 

  // Allowed file types
  const allowedTypes = [".py", ".js", ".java", ".c", ".cpp", ".rb", ".php", ".html"];

  const validateFile = (file) => {
    const fileType = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileType)) {
      return `File type "${file.name}" is not supported. Allowed types are: ${allowedTypes.join(', ')}.`;
    }
    return null;
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileInput({ target: { files: droppedFiles } });
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    if (filesUpload.length >= 1 || filesUploaded.length >= 5) {
      setError("You can only upload up to 1 file at a time or 5 files total.");
      return;
    }

    const validationError = validateFile(selectedFiles[0]);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFilesUpload((prevFiles) => [selectedFiles[0], ...prevFiles].slice(0, 1));
    setError("");
  };

  const removeFileFromQueue = (fileName) => {
    setFilesUpload((prevFiles) => prevFiles.filter((file) => file.name !== fileName));

    // Also remove its result and report URL (if any)
    setFileResults((prevResults) => {
      const updatedResults = { ...prevResults };
      delete updatedResults[fileName];
      return updatedResults;
    });
    setReportUrls((prevUrls) => {
      const updatedUrls = { ...prevUrls };
      if (updatedUrls[fileName]) {
        URL.revokeObjectURL(updatedUrls[fileName]);
        delete updatedUrls[fileName];
      }
      return updatedUrls;
    });
  };

  // Remove file from uploaded list
  const removeFileUploaded = (fileName) => {
    setFilesUploaded((prev) => prev.filter((file) => file.name !== fileName));
    setFileResults((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
    setReportUrls((prev) => {
      const updated = { ...prev };
      if (updated[fileName]) {
        URL.revokeObjectURL(updated[fileName]);
        delete updated[fileName];
      }
      return updated;
    });
  };

  const uploadingProgress = async () => {
    if (filesUpload.length === 0) {
      setError("Please choose at least one file to upload.");
      return;
    }

    if (filesUploaded.length >= 5) {
      setError("You have reached the limit of 5 uploaded files.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");

    const formData = new FormData();
    // Process only the most recent file (index 0 in our array)
    const currentFile = filesUpload[0];
    formData.append("file", currentFile);

    // Simulate progress (for demo purposes)
    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setProgress(progressVal);
      if (progressVal >= 100) {
        clearInterval(interval);
      }
    }, 500);

    try {
      const response = await fetch("https://codetech-k96i.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Store the raw HTML if needed
        setFileResults((prevResults) => ({
          ...prevResults,
          [currentFile.name]: data.grading_result,
        }));

        // Remove extra "Copy Code" buttons
        const cleanedHTML = removeExtraCopyButtons(data.grading_result);

        // Create a Blob from the cleaned HTML and generate an object URL
        const blob = new Blob([cleanedHTML], { type: "text/html" });
        const objectUrl = URL.createObjectURL(blob);

        setFileResults((prev) => ({ ...prev, [currentFile.name]: data.grading_result}))

        // Save that URL so we can open it in a new tab
        setReportUrls((prevUrls) => ({
          ...prevUrls,
          [currentFile.name]: objectUrl,
        }));

        setFilesUploaded((prev) => [...prev, currentFile]); // Move to uploaded 
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (error) {
      setError("Error connecting to the server.");
    } finally {
      clearInterval(interval);
      setUploading(false);
      setProgress(100);
      setFilesUpload((prev) => prev.slice(1));
    }
  };

  return (
    <div id="fileupload" className="fileupload-container">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
          <p className="title">CodeTech</p>
        </Link>
      </div>

      <div className="fileupload-content">
        <h2 className="fileupload-header">Upload Your Code</h2>

        <div className={`fileupload-background ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="fileupload-image">
            <img src={FileUploadImage} alt="Upload Icon" />
          </div>

          <p className="fileupload-instruction">
            Drag & Drop or{" "}
            <span className="fileupload-browse">
              Browse
              <input
                type="file"
                onChange={handleFileInput}
                className="fileupload-input"
              />
            </span>
          </p>

          {/* Update this text to reflect all allowed file types */}
          <p className="fileupload-formats-text">
            Supported formats: {allowedTypes.join(', ')}
          </p>
        </div>

        {error && <p className="fileupload-error">{error}</p>}

        {filesUpload.length > 0 && (
          <div className="fileupload-queued">
            <h3>Files Selected ({filesUpload.length}/5):</h3>
            {filesUpload.map((file, index) => (
              <div
                key={file.name}
                className={`fileupload-queued-file ${index === 0 ? "latest-file" : ""}`}
              >
                <span>{file.name}</span>

                <button
                  className="fileupload-cancel-icon"
                  onClick={() => removeFileFromQueue(file.name)}
                >
                  <MdOutlineClose />
                </button>
              </div>
            ))}
          </div>
        )}

        {filesUploaded.length > 0 && (
          <div className="fileupload-uploaded">
            <h3>Uploaded - {filesUploaded.length}/5 files</h3>
            {filesUploaded.map((file) => (
              <div key={file.name} className="fileupload-uploaded-file">
                <span>{file.name}</span>
                <div className="fileupload-uploaded-info">
                  {reportUrls[file.name] && (
                    <a
                      href={reportUrls[file.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fileupload-result-link"
                    >
                      Result
                    </a>
                  )}
                  <button
                    className="fileupload-remove-icon"
                    onClick={() => removeFileUploaded(file.name)}
                  >
                    <FaTrash />
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}  

        {/* Progress Circle */}
        {/* {uploading && (
          <div className="progress-circle-container">
            <svg className="progress-circle" viewBox="0 0 100 100">
              <circle className="progress-background" cx="50" cy="50" r="45" />
              <circle
                className="progress-bar"
                cx="50"
                cy="50"
                r="45"
                strokeDasharray="282.74"
                strokeDashoffset={282.74 - (progress / 100) * 282.74}
              />
              <text x="50" y="55" textAnchor="middle" className="progress-text">
                {progress}%
              </text>
            </svg>
          </div>
        )} */}

        <button
          className="fileupload-button"
          onClick={uploadingProgress}
          disabled={uploading || filesUpload.length === 0 || filesUploaded.length >= 5}
        >
          {uploading ? `Generating report...` : "Upload File"}
        </button> 
      </div>
    </div>
  );
};

export default FileUpload;