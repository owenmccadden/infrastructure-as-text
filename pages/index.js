import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';

const Home = () => {

  // const [language, setLanguage] = useState('');
  const [language, setlanguage] = useState("");
  const [userInput, setUsereInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('calling openai')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, language }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAi replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUsereInput(event.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>Infrastructure as Text</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Infrastructure as Text</h1>
          </div>
          <div className="header-subtitle">
            <h2>Generate AWS CDK code from text</h2>
          </div>
        </div>
        <div className="prompt-container">
          <div className="dropdown">
            <button className="dropdown-btn">Select Programming Language</button>
            <div className="dropdown-content">
              <button
                className={`dropdown-option ${language === "TypeScript" ? "selected" : ""}`}
                onClick={() => setlanguage("TypeScript")}
              >
                TypeScript
              </button>
              <button
                className={`dropdown-option ${language === "Python" ? "selected" : ""}`}
                onClick={() => setlanguage("Python")}
              >
                Python
              </button>
              <button
                className={`dropdown-option ${language === "Java" ? "selected" : ""}`}
                onClick={() => setlanguage("Java")}
              >
                Java
              </button>
              <button
                className={`dropdown-option ${language === "C#" ? "selected" : ""}`}
                onClick={() => setlanguage("C#")}
              >
                C#
              </button>
              <button
                className={`dropdown-option ${language === "Go" ? "selected" : ""}`}
                onClick={() => setlanguage("Go")}
              >
                Go
              </button>
              <button
                className={`dropdown-option ${language === "JavaScript" ? "selected" : ""}`}
                onClick={() => setlanguage("JavaScript")}
              >
                JavaScript
              </button>
            </div>
          </div>
          <textarea
            placeholder='Start typing here'
            className='prompt-box'
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className='prompt-buttons'>
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className='generate'>
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className='output'>
              <div className="output-header-container">
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <pre className={`language-${language}`}>
                  <code>
                    {apiOutput}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default Home;
