import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const subMenuRefs = useRef([]);

  useEffect(() => {
    subMenuRefs.current.forEach((menu, index) => {
      if (menu) {
        if (activeButton === index) {
          menu.style.height = `${menu.scrollHeight}px`;
        } else {
          menu.style.height = '0px';
        }
      }
    });
  }, [activeButton]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClick = (index) => {
    setActiveButton(activeButton === index ? null : index);
    setSidebarOpen(false);
  };

  return (
    <>
    <button type="button" className="sidebar-burger" onClick={toggleSidebar}>
    'ClickME'
    </button>
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} style={{display: isSidebarOpen ? 'flex' : 'none' , background: isSidebarOpen ? 'rgb(0 0 0 / 40%)' : 'rgb(0 0 0 / 0%)' }}>
      <header>
       
        
      </header>
      {(isSidebarOpen || activeButton !== null) && (
        <ul>
          <li>
            <button type="button" onClick={() => handleClick(null)}>
              <i className="ai-home-alt1"></i>
              <Link to="../../ViewUserPRofile"><p>EditProfile</p></Link>
              
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClick(null)}>
              <i className="ai-home-alt1"></i>
              <Link to="../../GlobalPage"><p>GlobalPage</p></Link>
              
            </button>
          </li>
          {/* Add other menu items here */}
        </ul>
      )}
      {isSidebarOpen && (
        <div className="ai-home-alt1" >
          <Link to="../../ViewUserPRofile">Click ME</Link>
            </div>
          
      )}
    </aside>
    </>
  );
};

export default Sidebar;
