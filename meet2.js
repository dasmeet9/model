// chatbot-widget.js
(function() {
    // Default configuration options
    var defaults = {
      containerId: 'chatbot-container',  // The element ID where the widget will be injected
      cssUrl: 'https://dasmeet9.github.io/model/style.css',  // The URL to the external CSS file
      jsUrl:'https://dasmeet9.github.io/model/app.js'
    };
  
    // Merge user options with defaults
    function extend(target, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
  
    // Dynamically load an external CSS file and Js file
    function loadCSS(url) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
    function loadJS(url) {
      var script = document.createElement('script');
      script.src = url;
      document.head.appendChild(script);
    }
  
    // Create the widget HTML and inject it into the container
    function createWidgetHTML(container, config) {
      container.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <!-- <div class='main' > -->
    <noscript>
    <style> .js-enabled { display: none; } </style>
    <p>JavaScript is disabled!</p>
    </noscript>
    <div class="chat-button js-enabled" id="chat-button" >
        <video id="avatar-videoa" autoplay loop muted playsinline src=""
        style="width: 100%; height: 100%; border-radius: 50%;" controlslist="nodownload noplaybackrate noremoteplayback " disablepictureinpicture></video>
            <img  style="width: 100%; height: 100%; border-radius: 50%;" src="https://dasabhi8.github.io/3d_Avatar/bot.png" alt="">
    </div>

    <button class="yarra-ai-close-btn" id="close-btn23">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>

    <div class="chat-container">
        <div class="top" >

        </div>
        <div class="bootm" style="display: flex; width:100%; height:100%; ">
            <div class="l">
            
                <div class="avatar-wrapper">
                <div class="top-title">
                <img id="avatar-logo" src="https://niftyhms.com/wp-content/uploads/2023/05/NiftyHMS.png" alt="">
                <!-- <div  class="sltp">powered by &nbsp;<a href="http://aiagent.yaraai.com/" target="_blank">  yaraai</a></div> -->
                <div class="stlpp"><span>Powered by &nbsp;</span><a href="http://aiagent.yaraai.com/" target="_blank">Yaraa.ai</a></div>
                <!-- <hr style="margin:0; padding:0; width:60%; border:3px solid #e2e2e2; "> -->
                </div>

                 <div id="avatar-avtar_name-container">
                 <div class="avatar-container" id="avatar-container">
                    
                    <video id="avatar-video" autoplay loop muted playsinline src=""
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;"  disablepictureinpicture></video>
                    <video id="avatar-idle" autoplay loop muted playsinline preload="auto" src=""
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"  disablepictureinpicture></video>

                </div>
                <div id="avatar-name">
                    <h6 id="avatar-name-text"></h6><p id="avatar-designation-text">AI Assistant</p>
                </div> 
                 </div>
                    <div class="stlp"><span>Powered by &nbsp;</span><a href="http://aiagent.yaraai.com/" target="_blank">Yaraa.ai</a></div>
                </div>
            </div>
            <div class="r" >
                <div class="chat_history"> </div>
            
                <div class="dropdown">
                    <form id="text-form">
                        <textarea id="text" rows="2" placeholder="Type your message here..."></textarea>
                        <div class="form-belowline">
                           
                            <button type="button" id="end-chat" class="control-btn end-chat-btn" title="End Chat" >
                            <svg class="btn-icon" viewBox="0 0 24 24">
                                <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                            <span>End Chat</span>
                            </button>
                            <div class="form-belowline2">
                                <!-- Audio control button - state determined by localStorage -->
                                <div id="audio-control-container">
                                <button type="button" id="universal-audio-control" class="control-btn audio-control-btn" title="Toggle Audio">
                                    <svg class="btn-icon" viewBox="0 0 24 24">
                                        <path class="sound-wave" d="M11 5L6 9H2v6h4l5 4V5z"/>
                                        <path class="sound-wave" d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                        <line class="mute-line" x1="3" y1="3" x2="21" y2="21"/>
                                    </svg>
                                </button>
                                </div>
                              
                                <button type="button" id="mic-control" class="control-btn mic-control-btn" title="Voice Input">
                                    <svg class="btn-icon" viewBox="0 0 24 24">
                                        <path class="mic-body" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                                        <path class="mic-stand" d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                        <line class="mic-base" x1="12" y1="19" x2="12" y2="23"/>
                                        <line class="mic-base" x1="8" y1="23" x2="16" y2="23"/>
                                        <!-- Slash Line for Muted Mic -->
                                        <line id="mute-line" class="mute-line" x1="3" y1="3" x2="21" y2="21"/>
                                    </svg>
                                </button>
                                <!-- Add stop button -->
                                <button type="button" id="stop-audio" class="control-btn stop-btn" title="Stop Audio" style="display: none;">
                                    <svg class="btn-icon" viewBox="0 0 24 24">
                                        <rect x="6" y="6" width="12" height="12"/>
                                    </svg>
                                </button>
                                <button type="submit" class="control-btn send-btn" title="Send Message">
                                <svg class="btn-icon" viewBox="0 0 24 24">
                                    <path d="M22 2L11 13"></path>
                                    <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
                                </svg>
                               </button>
                            </div>
                        </div>
                    </form>
                </div>

                <audio id="audio" crossorigin="anonymous" preload="auto" playsinline webkit-playsinline>
                </audio>
            </div>
        </div>
    </div>
      `;
    }
  
    // Initialize widget functionality and event listeners
    function initWidget(options) {
      // Merge user-supplied options with defaults
      var config = extend(defaults, options || {});
  
      // Load the CSS file dynamically using the local path
      loadCSS(config.cssUrl);
      loadJS(config.jsUrl);
  
      // Get or create the container element
      var container = document.getElementById(config.containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = config.containerId;
        document.body.appendChild(container);
      }
  
      // Inject the widget HTML into the container
      createWidgetHTML(container, config);

    }
  
    // Expose the init method so that it can be called externally
    window.ChatbotWidget = {
      init: initWidget
    };
  })();
  
