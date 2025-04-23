import { createContext, useState, useRef } from 'react';
import { main } from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const resultRef = useRef(null); // 🔁 Auto-scroll reference

    // Typing effect with auto-scroll
    const typeText = (text, delay = 8) => {
        let index = 0;
        setResultData(""); // Clear previous result text
        
        const interval = setInterval(() => {
            const char = text.charAt(index);
            console.log("Current char:", char); // Log every character
            setResultData(prev => prev + char);
    
            index++;
            if (index >= text.length) {
                clearInterval(interval);
            }
        }, delay);
    };
    

    
    
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
           response = await main(prompt);
           setRecentPrompt(prompt);
           
           
        }
        else{
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await main(input);

        }
       
        setLoading(false);
        setInput("");

        typeText(response);
    };

    const contextValue = {
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
        resultRef, // 👈 Pass ref for use in component
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
