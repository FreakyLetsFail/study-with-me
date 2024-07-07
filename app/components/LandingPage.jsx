"use client"
import Head from 'next/head';
import { useState } from 'react';
import { Upload, FileText, CheckSquare, Edit, Activity } from 'react-feather';
import * as pdfjsLib from 'pdfjs-dist/webpack';

export default function Home() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pageRange, setPageRange] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setNumPages(pdf.numPages);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleOptionClick = (optionId) => {
    if (!options.find(option => option.id === optionId).disabled) {
      setSelectedOption(optionId === selectedOption ? null : optionId);
    }
  };

  const handleStartGeneration = () => {
    if (!file) {
      alert('Please select a PDF file first.');
      return;
    }
    if (!selectedOption) {
      alert('Please select an option first.');
      return;
    }
    alert(`Selected Option: ${selectedOption}\nPDF Title: ${file.name}\nPage Range: ${pageRange}`);
  };

  const options = [
    { id: 'multiple-choice', name: 'Multiple Choice', icon: FileText, color: 'text-blue-500' },
    { id: 'text-tasks', name: 'Sachtext Aufgaben', icon: CheckSquare, color: 'text-green-500' },
    { id: 'summarize', name: 'Zusammenfassen', icon: Edit, color: 'text-yellow-500' },
    { id: 'interactive-tasks', name: 'Interaktive Aufgaben', icon: Activity, color: 'text-gray-400', disabled: true },
  ];

  return (
    <>
      <Head>
        <title>Study with me</title>
        <meta name="description" content="Landing page for Study with me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-start h-full p-4 space-y-4">
        <h1 className="text-4xl font-bold mt-8">Study with me</h1>
        <div className="w-full md:w-3/5 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center text-gray-500 p-4 mt-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl mb-2">Outputs will be shown here</p>
          </div>
        </div>
        <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
            <Upload className="w-12 h-12 mb-4" />
            <p className="text-xl mb-2">PDF hochladen</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="cursor-pointer bg-gray-100 rounded-md px-4 py-2 w-full"
            />
            {file && <p className="mt-4 text-sm text-gray-600">{file.name}</p>}
            {numPages && <p className="mt-4 text-sm text-gray-600">Pages: {numPages}</p>}
          </div>
          {options.map(option => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer transition-transform ${
                option.disabled ? 'bg-gray-200 text-gray-400' : 'hover:bg-gray-100'
              } ${selectedOption === option.id ? `transform scale-90 ${option.color}` : ''}`}
            >
              <option.icon className={`w-8 h-8 mb-2 ${selectedOption === option.id ? option.color : ''}`} />
              <p className={`text-center ${selectedOption === option.id ? option.color : 'text-gray-700'}`}>{option.name}</p>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100">
            <label htmlFor="pageRange" className="text-sm mb-2 text-center">Select Page Range</label>
            <input
              type="text"
              id="pageRange"
              placeholder="e.g. 2-3, 3"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-4/5 bg-gray-100 rounded-md px-4 py-2"
            />
          </div>
          <button
            onClick={handleStartGeneration}
            className="bg-blue-500 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center hover:bg-blue-600 cursor-pointer transition"
          >
            Start Generation
          </button>
        </div>
      </div>
    </>
  );
}