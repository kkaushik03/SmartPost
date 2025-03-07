import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileUploadImage from "../../assets/File/Upload _icon.png";
import Logo from "../../assets/Navbar/Logo.png";
import './FileUpload.css';

// Icon imports
import { FaTrash } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

const FileUpload = () => {
  const [filesUpload, setFilesUpload] = useState([]); // Files in queue
  const [error, setError] = useState("");
  const [gradingResult, setGradingResult] = useState(""); // Store grading response
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // Track upload progress

  // Allowed file types
  const allowedTypes = [".py"];

  const validateFile = (file) => {
    const fileType = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileType)) {
      return `File type "${file.name}" is not supported, please upload a Python (.py) file.`;
    }
    return null;
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (filesUpload.length >= 5) {
      setError("You can only upload up to 5 files.");
      return;
    }

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFilesUpload((prevFiles) => [selectedFile, ...prevFiles].slice(0, 5)); // Add the newest file at the top, keep max 5
    setError("");
    setGradingResult(""); // Clear previous results
  };

  const removeFileFromQueue = (fileName) => {
    setFilesUpload((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const uploadingProgress = async () => {
    if (filesUpload.length === 0) {
      setError("Please choose at least one file to upload.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");

    const formData = new FormData();
    formData.append("file", filesUpload[0]); // ✅ Process the most recent file first

    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setProgress(progressVal);
      if (progressVal >= 100) {
        clearInterval(interval);
      }
    }, 500); // Update progress every 500ms

    try {
      const response = await fetch("http://127.0.0.1:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setGradingResult(data.grading_result);
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (error) {
      setError("Error connecting to the server.");
    } finally {
      clearInterval(interval);
      setUploading(false);
      setProgress(100);
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
        <h2 className="fileupload-header">Upload Python Code</h2>

        <div className="fileupload-background">
          <div className="fileupload-image">
            <img src={FileUploadImage} alt="" />
          </div>

          <p className="fileupload-instruction">
            Drag & Drop or{" "}
            <span className="fileupload-browse">
              Browse
              <input type="file" onChange={handleFileInput} className="fileupload-input" />
            </span>
          </p>

          <p className="fileupload-formats-text">Supported format: .py (Python)</p>
        </div>

        {error && <p className="fileupload-error">{error}</p>}

        {filesUpload.length > 0 && (
          <div className="fileupload-queued">
            <h3>Files Selected ({filesUpload.length}/5):</h3>
            {filesUpload.map((file, index) => (
              <div key={file.name} className={`fileupload-queued-file ${index === 0 ? "latest-file" : ""}`}>
                <span>{file.name}</span>
                <button className="fileupload-cancel-icon" onClick={() => removeFileFromQueue(file.name)}>
                  <MdOutlineClose />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Progress Circle */}
        {uploading && (
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
        )}

        <button className="fileupload-button" onClick={uploadingProgress} disabled={uploading}>
          {uploading ? `Uploading... ${progress}%` : "Upload & Grade"}
        </button>

        {gradingResult && (
          <div className="fileupload-result">
            <h3>Grading Report:</h3>
            <div dangerouslySetInnerHTML={{ __html: gradingResult }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;