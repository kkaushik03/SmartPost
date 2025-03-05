import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import FileUploadImage from "../../assets/File/Upload _icon.png"
import Logo from "../../assets/Navbar/Logo.png"
import './FileUpload.css'

// Icon import
import {FaTrash} from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

const FileUpload = () => {
  // Dragging the file
  const [isDragging, setIsDragging] = useState(false);
  // Error messages for upload the files
  const [error, setError] = useState("");
  // Add the files to queues that user want to upload (initial)
  const [filesUpload, setFilesUpload] = useState([]);
  // Store files that has been uploaded (after)
  const [filesUploaded, setFilesUploaded] = useState([]);
  // Overall upload progress 
  const [progress, setProgress] = useState(0);
  // Boolean state variable indicates whether an upload is in progress
  const [uploading, setUploading]= useState(false);
  // Store the cycle for upload
  const cycleRef = useRef(null);
  // Check if limit of 5 files reached
  const fileLimit = filesUpload.length >= 5

  // Common coding-file type
  const codingFile = [
    '.pdf', '.md', '.txt', '.py', '.cpp', '.c', '.h', '.hpp', '.java', '.js', '.jsx', '.ts', '.tsx',
    '.go', '.rb', '.php', '.html', '.css', '.scss', '.less', '.sql', '.sh',
    '.bash', '.json', '.xml', '.yaml', '.yml', '.r', '.swift',
    '.kt', '.dart', '.cs', '.fs', '.rs', '.pl', '.lua', '.m', '.matlab',
    '.vb', '.vbs', '.asm', '.s', '.scala', '.groovy', '.erl', '.ex', '.exs'
  ];

  // Validate the files
  // Check for file types support in coding file
  // If it is not in the list of file supported -> Display error message
  // Return null if it is valid file 
  const validateFile = (file) => {
    const fileTypes = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if(!codingFile.includes(fileTypes)) {
      return `File type "${file.name}" is not supported, please upload another file.`
    } 
    return null;
  }

  // Handle dragging events when user drags a file over the upload area
  // setIsDragging is true when a file is dragged into the drop area
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }

  // seIsDragging is false when a file is dragged out of the drop area
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  }

  // Drop the first file into the area and add them to file queue
  // Passes the file to handleFiles for processing
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Take the lastest file if multiple are dropped
    // Check if the 'droppedFiles' array has at least 1 file
    // If there is at least 1 file then assign the lastestFile to new array that take the lastest file upload
    let latestFile = [];
    if (droppedFiles.length > 0) {
      latestFile = [droppedFiles[0]];
    }
    handleFiles(latestFile);
  }

  // Validates the provided file
  const handleFiles = (newFiles) => {
    // Clear any prev error message
    setError(""); 
    const validFiles = [];

    // Loop through each file in the newFiles
    newFiles.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push(file);
    });

    // Only allow one file at a time
    // Replace the current in the queue with the new file
    setFilesUpload(validFiles.slice(0, 1));

  };

  // Handle file input when user chooses the files from their computer using "Browse" button
  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Take the lastest file if multiple are dropped
    // Check if the 'selectedFiles' array has at least 1 file
    // If there is at least 1 file then assign the lastestFile to new array that take the lastest file upload
    let latestFile = [];
    if (selectedFiles.length > 0) {
      latestFile = [selectedFiles[0]];
    }
    handleFiles(latestFile);
  };

  // Remove file from the upload queue
  const removeFileFromQueue = (fileName) => {
    setFilesUpload((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // Cancel the file that currently uploading
  // Clear the current running progress
  // Reset the ref
  // Set back the progress into 0
  const cancelUpload = () => {
    if (cycleRef.current) {
      clearInterval(cycleRef.current)
      cycleRef.current = null;
    }
    setFilesUpload([])
    setProgress(0)
    setUploading(false);
    setError("");
  }

  // Remove the file uploaded
  const removeFileUploaded = (fileName) => {
    setFilesUploaded((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  }

  // Uploading progress 
  // If there is no file upload then display error message for to require the upload
  const uploadingProgress = () => {
    if(filesUpload.length === 0) {
      setError("Please choose or drag a file to upload.");
      return;
    }

    // Check for file uploaded exceed 5 files
    if(filesUploaded.length >= 5) {
      setError("You have reached the limit of 5 uploaded files. Please delete somes file to upload more.");
      return;
    }

    // Start uploading progress from beginning until full circle bar
    setUploading(true);
    setError("");
    setProgress(0);

    // Initial the progress value into 0
    let progressVal = 0;

    // Start the cycle uploading
    // Add the progress value +10 each time and start the progress bar
    // Move file from queue to uploaded when finish
    // If it reach over 100% then reset the cycle upload 
    cycleRef.current = setInterval(() =>  {
      progressVal += 10;
      setProgress(progressVal);
      
      // Check for when cycle progress is done
      // Clear the interval then reset 
      if (progressVal >= 100) {
        clearInterval(cycleRef.current);
        cycleRef.current = null;
        setFilesUploaded((prev) => [...prev, ...filesUpload]);
        setFilesUpload([]);
        setUploading(false);
        setProgress(0);
      }
    }, 700);
  }

  return (
    <div id="fileupload" className="fileupload-container">
      <div className="logo">
        <Link to = "/">
          <img src={Logo} alt="Logo" />
          <p className="title">CodeTech</p>
        </Link>
      </div>

      <div className="fileupload-content">
        {/* Conditional statement if uploading is "true" */}
        {uploading ? (
          // Uploading progress
          <div className="fileupload-uploading-overlay">
            <h2 className="fileupload-header">Uploading</h2>
            <div className="fileupload-uploading-cycle">
              <div 
                className="fileupload-uploading-cycle-bar"
                style={{background: `conic-gradient(#6c63ff ${progress * 3.6}deg, #ddd 0deg)`}}
              >
                <div class="fileupload-uploading-cycle-bar-inner"> </div>
                
              </div>
              
            </div>
            
            <button className="fileupload-cancel-upload-button" onClick={cancelUpload}>Cancel</button>

          </div>
        ) : (
          <>
            <h2 className="fileupload-header">Upload</h2>
            
            <div
            className={`fileupload-background ${isDragging ? 'dragging' : ''} ${fileLimit ? 'disable' : ''}`}
            {...(fileLimit ? {} : {
              onDragOver: handleDragOver,
              onDragLeave: handleDragLeave,
              onDrop: handleDrop,
            })}
            > 

            <div className="fileupload-image">
              <img src={FileUploadImage} alt="" />
            </div>

            <p className="fileupload-instruction"> Drag & Drop or 
              <span className="fileupload-browse"> Browse 
                <input
                  type="file"
                  onChange={handleFileInput}
                  className="fileupload-input"
                  disabled = {fileLimit}
                />
              </span>
            </p>

            <p className="fileupload-formats-text"> Supported any coding format: .py, .cpp, .jsx, .html, etc </p>
            <p className="fileupload-limit-text"> Supported 1 file upload at a time. </p>
            <p className="fileupload-limit-text"> Maximum of 5 uploaded files allowed. </p>

            </div>

            {error && <p className="fileupload-error">{error}</p>}

            {/* Uploading the file  */}
            {filesUpload.length > 0 && (
              <div className="fileupload-queued">
                <h3 className="fileupload-queued-header">
                  Uploading Queue - {filesUpload.length}/{filesUpload.length} file
                </h3>
                {filesUpload.map((file) => (
                  <div key={file.name} className="fileupload-queued-file"> 
                    <span>{file.name}</span>
                    <button className="fileupload-cancel-icon" onClick={() => removeFileFromQueue(file.name)}> <MdOutlineClose/> </button>
                  </div>
                ))}
              </div>
            )}

            {/* File uploaded */}
            {filesUploaded.length > 0 && (
              <div className="fileupload-uploaded">
                <h3 className="fileupload-uploaded-header"> Uploaded - {filesUploaded.length}/5 files</h3>
                {filesUploaded.map((file) => (
                  <div key={file.name} className="fileupload-uploaded-file"> 
                    <span>{file.name}</span>

                    <div className="fileupload-uploaded-info">
                      <button className="fileupload-result-button"> Result </button>
                      <button className="fileupload-remove-icon" onClick={() => removeFileUploaded(file.name)}> <FaTrash/> </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            <button className="fileupload-button" onClick={uploadingProgress} disabled={uploading || fileLimit}> UPLOAD FILES </button>

          </>
          
        )}
      </div>

    </div>

  );
};

export default FileUpload;
