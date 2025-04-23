import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const loadPrompt=async (prompt) => {
    setRecentPrompt(prompt);
   await onSent(prompt);

  }


  const { onSent, prevPrompts, setPrevPrompts, setRecentPrompt,newChat } = useContext(Context);


  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="menu"
          onClick={toggleSidebar}
        />

        <div onClick={()=>newChat()} className="new-chat" data-tooltip="New Chat">
          <img src={assets.plus_icon} alt="new chat" />
          {!isCollapsed && <p>New Chat</p>}
        </div>

        <div className="recent">
          {!isCollapsed && <p className="recent-title">Recent</p>}
          {prevPrompts.map((item, index) => (
            <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index} data-tooltip={item}>
              <img src={assets.message_icon} alt="recent" />
              {!isCollapsed && <p>{item.slice(0,18)}...</p>}
            </div>
          ))}
          
        </div>
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry" data-tooltip="Help">
          <img src={assets.question_icon} alt="help" />
          {!isCollapsed && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry" data-tooltip="Activity">
          <img src={assets.history_icon} alt="activity" />
          {!isCollapsed && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry" data-tooltip="Settings">
          <img src={assets.setting_icon} alt="settings" />
          {!isCollapsed && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
