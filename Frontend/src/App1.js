import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // --------------------------------------------------
  // START INTERVIEW
  // --------------------------------------------------
  const startInterview = async () => {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("job_description", jobDescription);
      formData.append("resume", resume);

      const response = await fetch(
        `${API_URL}/api/interview/start`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to start interview");
      }

      setInterviewStarted(true);

      setMessages([
        {
          role: "assistant",
          text:
            data.first_question ||
            data.question ||
            "Tell me about yourself.",
        },
      ]);
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Something went wrong while starting the interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // SEND ANSWER
  // --------------------------------------------------
  const sendAnswer = async () => {
    const userAnswer = answer.trim();

    if (!userAnswer) {
      return;
    }

    // Add user message immediately
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: userAnswer,
      },
    ]);

    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/interview/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userAnswer,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send answer");
      }

      const aiResponse =
        data.response ||
        data.answer ||
        data.message ||
        data.next_question;

      if (aiResponse) {
        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            text: aiResponse,
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Sorry, I could not process your answer. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // ENTER KEY
  // --------------------------------------------------
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendAnswer();
    }
  };

  // --------------------------------------------------
  // VOICE INPUT
  // --------------------------------------------------
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setAnswer((previous) =>
        previous ? `${previous} ${transcript}` : transcript
      );
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  // --------------------------------------------------
  // STOP VOICE
  // --------------------------------------------------
  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
  };

  // --------------------------------------------------
  // TEXT TO SPEECH
  // --------------------------------------------------
  const speakMessage = (text) => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  // --------------------------------------------------
  // RESET INTERVIEW
  // --------------------------------------------------
  const resetInterview = () => {
    setInterviewStarted(false);
    setMessages([]);
    setAnswer("");
    setResume(null);
    setJobDescription("");
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f5f7fb",
      }}
    >
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">
            🤖 AI Interview Assistant
          </span>

          {interviewStarted && (
            <span className="badge bg-success">
              Interview in Progress
            </span>
          )}
        </div>
      </nav>

      <div className="container py-4">
        {!interviewStarted ? (
          // ==================================================
          // SETUP SCREEN
          // ==================================================
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-2">
                    Prepare for Your Interview
                  </h2>

                  <p className="text-muted mb-4">
                    Upload your resume and provide the job
                    description. The AI interviewer will ask
                    questions based on both.
                  </p>

                  {/* RESUME */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Resume
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) =>
                        setResume(event.target.files[0])
                      }
                    />

                    {resume && (
                      <small className="text-success">
                        Selected: {resume.name}
                      </small>
                    )}
                  </div>

                  {/* JOB DESCRIPTION */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Job Description
                    </label>

                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-lg w-100"
                    onClick={startInterview}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Starting Interview...
                      </>
                    ) : (
                      <>
                        🎤 Start AI Interview
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // ==================================================
          // INTERVIEW SCREEN
          // ==================================================
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div
                className="card border-0 shadow-sm"
                style={{ height: "80vh" }}
              >
                {/* HEADER */}
                <div className="card-header bg-white py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0 fw-bold">
                        🎯 AI Technical Interview
                      </h5>

                      <small className="text-muted">
                        Answer naturally. The AI will ask
                        follow-up questions.
                      </small>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={resetInterview}
                    >
                      End Interview
                    </button>
                  </div>
                </div>

                {/* CHAT */}
                <div
                  className="card-body overflow-auto"
                  style={{
                    background: "#f8f9fa",
                  }}
                >
                  {messages.length === 0 && (
                    <div className="text-center text-muted mt-5">
                      Waiting for the interviewer...
                    </div>
                  )}

                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`d-flex mb-3 ${
                        message.role === "user"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-3 ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-white border"
                        }`}
                        style={{
                          maxWidth: "75%",
                        }}
                      >
                        <div className="small fw-bold mb-1">
                          {message.role === "user"
                            ? "You"
                            : "AI Interviewer"}
                        </div>

                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {message.text}
                        </div>

                        {message.role === "assistant" && (
                          <button
                            className="btn btn-sm btn-outline-secondary mt-2"
                            onClick={() =>
                              speakMessage(message.text)
                            }
                          >
                            🔊 Listen
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="d-flex justify-content-start mb-3">
                      <div className="bg-white border rounded-3 p-3">
                        <span className="spinner-grow spinner-grow-sm me-1"></span>
                        <span className="spinner-grow spinner-grow-sm me-1"></span>
                        <span className="spinner-grow spinner-grow-sm"></span>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef}></div>
                </div>

                {/* INPUT */}
                <div className="card-footer bg-white p-3">
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Type your answer..."
                      value={answer}
                      onChange={(event) =>
                        setAnswer(event.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      disabled={loading}
                    />

                    {/* VOICE BUTTON */}
                    {!listening ? (
                      <button
                        className="btn btn-outline-primary"
                        onClick={startVoiceInput}
                        disabled={loading}
                        title="Speak your answer"
                      >
                        🎤
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={stopVoiceInput}
                        title="Stop recording"
                      >
                        ⏹
                      </button>
                    )}

                    {/* SEND */}
                    <button
                      className="btn btn-primary"
                      onClick={sendAnswer}
                      disabled={
                        loading || !answer.trim()
                      }
                    >
                      Send ➤
                    </button>
                  </div>

                  <div className="text-muted small mt-2">
                    Press <b>Enter</b> to send •{" "}
                    <b>Shift + Enter</b> for a new line •
                    🎤 Use voice input
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;