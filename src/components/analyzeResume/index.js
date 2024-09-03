"use client";
import React, { useState } from 'react';
import pdfToText from 'react-pdftotext'
import { GoogleGenerativeAI } from "@google/generative-ai";

export const AnalyzeResume = () => {
    
    const [text, setText] = useState(''); // State to hold extracted text
    const [fileName, setFileName] = useState(''); // State to hold file name

    // Function to handle file selection and text extraction
    const extractText = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Update the file name state
            try {
                const extractedText = await pdfToText(file);
                setText(extractedText); // Update the text state
            } catch (error) {
                console.error("Failed to extract text from PDF:", error);
                setText("Error extracting text from PDF."); // Display error message
            }
        } else {
            setText("No file selected."); // Handle case with no file selected
        }
    };
    return (
        <div>
        <header>
            <input 
                type="file" 
                accept="application/pdf" 
                onChange={extractText} 
            />
            {fileName && <h2>File: {fileName}</h2>}
            <textarea 
                value={text} 
                readOnly 
                rows={20} 
                cols={80} 
                placeholder="Extracted text will appear here..."
            />
        </header>
    </div>
    );
}
