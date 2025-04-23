import React, { useContext, useEffect, useRef } from 'react';
import './MainPage.css';
import { assets } from '../../assets/assets'; // ✅ make sure this is correct
import { Context } from '../../context/context';

const MainPage = () => {
  const {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    showResult,
    loading,
    resultData,
    resultRef, // add this from context
    haandleCardClick,
  } = useContext(Context);

  const scrollRef = useRef(null); // 👈 scroll anchor
  const handleCardClick = (text) => {
    setInput(""); // clear input field
    setRecentPrompt(text); // show user message in UI
    setPrevPrompts(prev => [...prev, text]); // store in prevPrompts
    onSent(text); // send to AI
  };
  
  

  // Automatically scroll to the bottom when resultData or loading changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultData, loading]); // triggers scroll every time result updates

  return (
    <div className="main">
      <div className="nav">
        <p>Bambotica</p>
        <img src={assets.user_icon || ""} alt="User" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Naman.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div onClick={()=>handleCardClick("Suggest beautiful places to see on an upcoming road trip")} className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={()=>handleCardClick("Briefly summarize this concept: urban planning")} className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={()=>handleCardClick("Brainstorm team bonding activities for our work retreat")} className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={()=>handleCardClick("Improve the readability of the following code")} className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result" ref={resultRef}>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p className="user-question">{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.fraud_gpt_icon} alt="" />
              <div className="ai-response">
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>

            {/* Scroll anchor */}
            <div ref={scrollRef}></div>
          </div>
        )}

        <div className="main-bottom">
          <div className="input-container">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="icons">
              <img src={assets.gallery_w_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="send" />
            </div>
          </div>
          <p className="bottom-info">
          "I’m Bambotica — a cybernetic panda with attitude and bamboo dreams. I crunch data like sugarcane, but hey, even smart AIs slip up sometimes… so double-check before you bamboo-blast off! 🐼⚙️🌿"


          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
