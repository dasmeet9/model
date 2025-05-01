(function() {
  // Chatbot Widget - Simplified version for easy embedding
  
  // Create and inject CSS
  function injectCSS() {
    const css = `
      #yaraa-chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
      }
      
      #yaraa-chat-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #4a86e8;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      
      #yaraa-chat-button img {
        width: 35px;
        height: 35px;
      }
      
      #yaraa-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 40px rgba(0,0,0,0.2);
        display: none;
        flex-direction: column;
        overflow: hidden;
      }
      
      #yaraa-chat-header {
        background: #4a86e8;
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      #yaraa-chat-close {
        cursor: pointer;
        font-size: 20px;
      }
      
      #yaraa-chat-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
      }
      
      .yaraa-message {
        margin-bottom: 10px;
        max-width: 80%;
        padding: 10px;
        border-radius: 10px;
      }
      
      .yaraa-bot-message {
        background: #f1f0f0;
        align-self: flex-start;
      }
      
      .yaraa-user-message {
        background: #e3f2fd;
        align-self: flex-end;
        margin-left: auto;
      }
      
      #yaraa-chat-input-area {
        padding: 15px;
        border-top: 1px solid #eee;
        display: flex;
      }
      
      #yaraa-chat-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
      }
      
      #yaraa-chat-send {
        background: #4a86e8;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
        cursor: pointer;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  // Create chatbot HTML structure
  function createChatbotHTML() {
    const container = document.createElement('div');
    container.id = 'yaraa-chatbot-container';
    
    container.innerHTML = `
      <div id="yaraa-chat-button">
        <img src="https://dasmeet9.github.io/model/NiftyHMS%20(1).png" alt="Chat">
      </div>
      
      <div id="yaraa-chat-window">
        <div id="yaraa-chat-header">
          <div>
            <strong>AI Assistant</strong>
            <div style="font-size: 12px;">Powered by Yaraa.ai</div>
          </div>
          <div id="yaraa-chat-close">×</div>
        </div>
        
        <div id="yaraa-chat-messages"></div>
        
        <div id="yaraa-chat-input-area">
          <input type="text" id="yaraa-chat-input" placeholder="Type your message...">
          <button id="yaraa-chat-send">→</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
  }
  
  // Initialize chatbot functionality
  function initChatbot() {
    // Get DOM elements
    const chatButton = document.getElementById('yaraa-chat-button');
    const chatWindow = document.getElementById('yaraa-chat-window');
    const closeButton = document.getElementById('yaraa-chat-close');
    const messagesContainer = document.getElementById('yaraa-chat-messages');
    const chatInput = document.getElementById('yaraa-chat-input');
    const sendButton = document.getElementById('yaraa-chat-send');
    
    // API endpoint
    const API_URL = 'https://aiservice.yaraamanager.com/api';
    
    // Visitor ID for conversation tracking
    let visitorId = localStorage.getItem('yaraa_visitor_id') || generateVisitorId();
    localStorage.setItem('yaraa_visitor_id', visitorId);
    
    // Toggle chat window
    chatButton.addEventListener('click', () => {
      chatWindow.style.display = 'flex';
      chatButton.style.display = 'none';
      
      // Show welcome message if it's the first time
      if (messagesContainer.children.length === 0) {
        addBotMessage("Hello! I'm your AI assistant. How can I help you today?");
      }
    });
    
    // Close chat window
    closeButton.addEventListener('click', () => {
      chatWindow.style.display = 'none';
      chatButton.style.display = 'flex';
    });
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Function to send message
    function sendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;
      
      // Add user message to chat
      addUserMessage(message);
      chatInput.value = '';
      
      // Show typing indicator
      const typingIndicator = addBotMessage('...');
      
      // Send to API
      fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: message,
          visitor_id: visitorId,
          mode: 'text'
        })
      })
      .then(response => response.json())
      .then(data => {
        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);
        
        // Add bot response
        addBotMessage(data.response || "I'm sorry, I couldn't process your request.");
      })
      .catch(error => {
        console.error('Error:', error);
        messagesContainer.removeChild(typingIndicator);
        addBotMessage("I'm sorry, there was an error processing your request.");
      });
    }
    
    // Add bot message to chat
    function addBotMessage(text) {
      const messageElement = document.createElement('div');
      messageElement.className = 'yaraa-message yaraa-bot-message';
      messageElement.textContent = text;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return messageElement;
    }
    
    // Add user message to chat
    function addUserMessage(text) {
      const messageElement = document.createElement('div');
      messageElement.className = 'yaraa-message yaraa-user-message';
      messageElement.textContent = text;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return messageElement;
    }
    
    // Generate random visitor ID
    function generateVisitorId() {
      return 'visitor_' + Math.random().toString(36).substring(2, 15);
    }
  }
  
  // Initialize everything when DOM is loaded
  function initialize() {
    injectCSS();
    createChatbotHTML();
    initChatbot();
  }
  
  // Check if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();