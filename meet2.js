// chatbot-widget.js
(function() {
    // Default configuration options
    var defaults = {
      containerId: 'chatbot-container',  // The element ID where the widget will be injected
      cssUrl: 'https://dasmeet9.github.io/model/style.css'  // The URL to the external CSS fil
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

    // Create the widget HTML and inject it into the container
    function createWidgetHTML(container, config) {
      container.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
       <noscript>
    <style> .js-enabled { display: none; } </style>
    <p>JavaScript is disabled!</p>
    </noscript>
    <!-- <div class="chat-button js-enabled" id="chat-button" >
        <video id="avatar-videoa" autoplay loop muted playsinline src=""
            style="width: 100%; height: 100%; border-radius: 50%;" controlslist="nodownload noplaybackrate noremoteplayback " disablepictureinpicture></video>
            img
    </div> -->
    <div class="chat-button js-enabled" id="chat-button" >
        <video id="avatar-videoa" autoplay loop muted playsinline src=""
        style="width: 100%; height: 100%; border-radius: 50%;" controlslist="nodownload noplaybackrate noremoteplayback " disablepictureinpicture></video>
        <!-- <img  style="width: 80%; height: 80%; border-radius: 50%;margin: 7px;" src="https://dasabhi8.github.io/3d_Avatar/bot.png" alt=""> -->
        <img  style="width: 80%; height: 80%; border-radius: 50%;margin: 10px;" src="https://dasmeet9.github.io/model/NiftyHMS%20(1).png" alt="">
    </div>

    <button class="yarra-ai-close-btn" id="close-btn23">
        <!-- <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> -->
        <svg width="15" height="15" style="background-color: #4f4e4e69;border-radius: 8px 8px 8px 8px;padding: 0;width: 21px;height: 15px; " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    
    <div class="chat-container">
        <div class="top" >

        </div>
        <div class="bootm" style="display: flex; width:100%; height:100%; ">
            <div class="l">
            
                <div class="avatar-wrapper">
                <div class="top-title">
                <img id="avatar-logo" src="https://dasmeet9.github.io/model/NiftyHMS%20(1).png" alt="">
                <!-- <img id="avatar-logo" src="https://niftyhms.com/wp-content/uploads/2023/05/NiftyHMS.png" alt=""> -->
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
                                    <!-- Add Siri-like wave container -->
                                    <div class="mic-waves-container">
                                        <div class="mic-wave"></div>
                                        <div class="mic-wave"></div>
                                        <div class="mic-wave"></div>
                                        <div class="mic-wave"></div>
                                    </div>
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
        const apiConfig = typeof aiAgentConfig !== 'undefined' ? aiAgentConfig : {};
        const form = document.getElementById("text-form");
        const textArea = document.getElementById("text");
        const chatHistory = document.querySelector(".chat_history");
        const audio = document.getElementById("audio");
        const video = document.getElementById("avatar-video");
        const videoIdle = document.getElementById("avatar-idle");
        const micControl = document.getElementById('mic-control');
        // const newchatIcon = document.getElementById("new-chat");
        // const newchatIcon = document.querySelector("#new-chat");
        const endChatIcon = document.querySelector("#end-chat");
        // const clearChatIcon = document.querySelector("#clear-chat");
        const chatButton = document.getElementById("chat-button");
        const chatContainer = document.querySelector(".chat-container");
        const closeButton = document.getElementById("close-btn23");
        const submitButton = document.querySelector('.send-btn');
        const stopButton = document.getElementById("stop-audio");
        const universalAudioControl = document.getElementById("universal-audio-control");
        const audioControlContainer = document.getElementById("audio-control-container");
        const AUDIO_PREFERENCES_KEY = 'audio_preferences';
        const registrationForm = document.getElementById("registration-form");
        const chatInterface = document.getElementById("chat-interface");
        let BACKEND_URL = false;
        // BACKEND_URL = 'https://aiservice.yaraamanager.com/api';
        // BACKEND_URL = 'https://1cf5-122-170-116-48.ngrok-free.app/api';
        BACKEND_URL  = "http://127.0.0.1:5000/api";
        let speechDetectionFrameId = null;
        // console.log("Backend_url",BACKEND_URL);
        let ENDCHATTHINGS = false;
        let MICONLY = true;
        // const endChatBtn = document.querySelector("#end-chat-btn");
        let userData = {};
        let registrationData = {};
        let registrationStep = '';
        let isUserRegistered = false;
        let isPlaying = false;
        let currentAudio = null;
        let messageQueue = [];
        let hasGreeting = false;
        let AUDIOSPEED = 1.20;
        let currentAudioElement = null; // Add this global variable
        let preferences = {}
        // console.log(window.location.hostname)
        //mapping the speed 
        const speedMap = {
            slow: 0.8,
            medium: 1.2,
            fast: 1.8
        };
        const VOICE_MIN_DECIBELS = -45;
        const SILENCE_TIMEOUT = 2500; // 2.5s silence after speech ✅
        const INITIAL_SPEECH_TIMEOUT = 30000; // 10s to start speaking ✅
        let initialSpeechTimeoutId; // Tracks 10s initial timeout ✅
        let silenceCheckInterval;// Checks for 2.5s silence ✅
        
        const RMS_THRESHOLD = 0.02;  // Adjust based on mic sensitivity
        // const SILENCE_TIMEOUT = 2500; // 2.5s pause before stop
        const INITIAL_TIMEOUT = 30000; // 10s to start speaking
        const MIN_SPEECH_DURATION = 800; // Ignore noises <0.8s
        
        let isRealSpeech = false; // Flag to distinguish noise from speech ✅
        let isSpeaking = false;
        let lastSoundTime = 0;
        let speechStartTime = 0;
        
        //this for the end chat button which is used to end the chat
        function open_end_chat() {
            // endChatIcon.disabled = false;
            endChatIcon.style.opacity = "1";
            endChatIcon.style.cursor = "pointer";
            chatHistory.style.overflowY = "auto";
        }
        function block_end_chat(){
            // endChatIcon.disabled = true;
            endChatIcon.style.opacity = "1";
            endChatIcon.style.cursor = "not-allowed";
        }
        
        if (!BACKEND_URL || BACKEND_URL === undefined ) {
            alert("You Should Purchase Our Service Not to direct Use Services Ok. Need To Purchase Service From `https://aiagent.yaraai.com/`")
        }
        
        //solve the issue in the iphone video
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                const endchatttbtn = localStorage.getItem("registrationStep");
                if (!endchatttbtn) {
                    open_end_chat();  // Function to enable the button
                } else {
                    block_end_chat(); // Function to disable the button
                }
            }, 3000); // Wait for 3 seconds
        });
        
        // Initialize configuration with default messages
        const defaultMessages = {
            welcome: "Hello! I'm Dr. Nifty, your AI assistant from NiftyHMS.",
            namePrompt: "Could you please share your name with me?",
            welcomeBack: "Hello {name}! How may I assist you today?",
            phonePrompt: "Thank you {name}! May I have your Mobile Number?",
            emailPrompt: "Please enter your email to receive a transcript of this chat."
        };
        
        // Load saved registration data from localStorage
        const savedRegistrationData = localStorage.getItem("registrationData");
        const savedregistrationStep = localStorage.getItem("registrationStep");
        registrationData = savedRegistrationData ? JSON.parse(savedRegistrationData) : {};
        registrationStep = savedregistrationStep || '';
        
        let messages = {
            ...defaultMessages,
            ...(apiConfig.messages || {})
        };
        
        
        
        let avatarData = {};
        const Settingss = async () => {
            try {
                const response = await fetch(BACKEND_URL + "/ai/details", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
        
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
        
                const responseData = await response.json();
                return { success: true, data: responseData };
            } catch (error) {
                return { success: false, error: error.message || "Unknown error" };
            }
        };
        
        // const Settingss = async()=>{
        //     try {
        //         //     const api_url = 'https://710d9551-6685-4b18-8b41-2a31de2d1cd1.mock.pstmn.io/xy';
        //         //     const response = await fetch(api_url, {
        //         const response = await fetch(BACKEND_URL + "/ai/details", {
        //             method: 'GET',
        //             headers: { 'Content-Type': 'application/json' }
        //         });
        //         const responseData = await response.json();
        //         return responseData;
        //     } catch (error) {
        //         let err = error;
        //         return err;
        //     }
        // }
        
        const fetchAvatarData = async () => {
            const result = await Settingss();
        
            if (!result.success) {
                console.error("Error fetching avatar data:", result.error);
                chatButton.style.display = "none";
                document.getElementById("chat-button").style.display = "none";
                return;
            }
        
            avatarData = result.data;
        
            // Parse messages safely
            let rawMessages = avatarData.data?.messages;
            let parsedMessages = {};
        
            try {
                parsedMessages = typeof rawMessages === 'string' ? JSON.parse(rawMessages) : rawMessages;
            } catch (e) {
                console.warn("Failed to parse messages, using empty fallback.");
                parsedMessages = {};
            }
        
            messages = { ...parsedMessages };
        
            if (!avatarData.data) {
                console.error("avatarData.data is undefined");
                chatButton.style.display = "none";
                document.getElementById("chat-button").style.display = "none";
            }
        };
        
        // const fetchAvatarData = async () => {
        //     avatarData = await Settingss();
        //     // messages = {...avatarData.messages};
        //     // Safely parse and spread messages
        //     let rawMessages = avatarData.data.messages;
        //     let parsedMessages = {};
        
        //     try {
        //         parsedMessages = typeof rawMessages === 'string' ? JSON.parse(rawMessages) : rawMessages;
        //     } catch (e) {
        //         parsedMessages = {};
        //     }
        
        //     // messages = { ...defaultMessages, ...parsedMessages };
        //     messages = {  ...parsedMessages};
        //  //  console.log("messages",messages);
        // //  console.log("messages-welcome",messages.welcome);
        //     // messages = {...avatarData.data.messages};
        //     // console.log("skdjfsdfhdskfh",messages)
        //     if (avatarData.error) {
        //         console.log("Error fetching avatar data:", avatarData.error);
        //         chatButton.style.display = "none";
        //         document.getElementById("chat-button").style.display = "none";
        //         return;
        //     }
        //     if (!avatarData.data || avatarData.data == undefined) {
        //         console.log("Error fetching avatar data:", avatarData.error);
        //         chatButton.style.display = "none";
        //         document.getElementById("chat-button").style.display = "none";
        //         return;
        //     }
        // };
        
        // Wait for data before using it
        (async () => {
            await fetchAvatarData();
            video.src = avatarData.data.avatar_speaking;
            videoIdle.src = avatarData.data.avatar_idle;
            document.getElementById("avatar-name-text").textContent = avatarData.data.avatar_name;
            document.getElementById("avatar-designation-text").textContent = avatarData.data.avatar_designation;
            document.getElementById("avatar-logo").src = avatarData.data.logo;
            if (avatarData.data.logo && avatarData.data.logo.length > 0) {
                document.getElementById("avatar-logo").src = avatarData.data.logo;
            } else {
                // document.getElementById("avatar-logo").src = "https://dasmeet9.github.io/model/NiftyHMS%20(1).png"; // Default Image
                document.getElementById("avatar-logo").src = "https://dasmeet9.github.io/model/unnamed.png"; // Default Image
                if (window.innerWidth > 800) {
                    // document.getElementById("avatar-logo").style.height = "100px";
                    // document.getElementById("avatar-logo").style.width = "100px";
                }
            }
            MICONLY = avatarData.data.is_mic_only;
            AVATAR_ENABLED = avatarData.data.avatar_enable;
        
            if (!MICONLY) {
                micControl.style.display = "none";
                audioControlContainer.style.display = "none";
                micControl.style.opacity = "0";
                universalAudioControl.style.opacity = "0";
                universalAudioControl.onmouseover = null;
                universalAudioControl.onmouseout = null;
                micControl.onmouseover = null;
                micControl.onmouseout = null;
                universalAudioControl.style.pointerEvents = "none";
                micControl.style.pointerEvents = "none";
                document.getElementById("audio-control-container").style.pointerEvents = "none";
                if (window.innerWidth < 800) {
                    endChatIcon.style.width = "75%";
                }
                speedMap[avatarData?.data?.audio_speed] || 1.2;
                // if(avatarData.data.audio_speed == "slow"){
                //     AUDIOSPEED = 1;
                // }else if(avatarData.data.audio_speed == "medium"){
                //     AUDIOSPEED = 1.2;
                // }else if (avatarData.data.audio_speed == "fast"){
                //     AUDIOSPEED = 1.5;
                // }
            }
            if (!AVATAR_ENABLED) {
                MICONLY = false;
                document.getElementById('avatar-container').style.display = "none";
                document.getElementById('avatar-videoa').style.display = "none";
                document.getElementsByClassName('r')[0].style.width = "auto";
                document.getElementById('avatar-avtar_name-container').style.display = "none";
                // document.getElementsByClassName('avatar-wrapper')[0].style.justifyContent = "center";
                // document.getElementsByClassName('stlp')[0].style.position = "fixed";
                // document.getElementsByClassName('stlp')[0].style.bottom = "3%";
                chatButton.style.backgroundColor = "#5181d4";
                if (window.innerWidth < 800) {
                    document.getElementsByClassName('top-title')[0].style.flexDirection = "row";
                    document.getElementsByClassName('avatar-wrapper')[0].style.flexDirection = "column";
                    document.getElementsByClassName('avatar-wrapper')[0].style.height = "100%";
                }
                // MICONLY = false;
                if(!MICONLY) {
                    micControl.style.display = "none";
                    audioControlContainer.style.display = "none";
                    micControl.style.opacity = "0";
                    universalAudioControl.style.opacity = "0";
                    universalAudioControl.onmouseover = null;
                    universalAudioControl.onmouseout = null;
                    micControl.onmouseover = null;
                    micControl.onmouseout = null;
                    universalAudioControl.style.pointerEvents = "none";
                    micControl.style.pointerEvents = "none";
                    document.getElementById("audio-control-container").style.pointerEvents = "none";
                    if (window.innerWidth < 800) {
                        endChatIcon.style.width = "75%";
                    }
                    speedMap[avatarData?.data?.audio_speed] || 1.2;
                    // if(avatarData.data.audio_speed == "slow"){
                    //     AUDIOSPEED = 1;
                    // }else if(avatarData.data.audio_speed == "medium"){
                    //     AUDIOSPEED = 1.2;
                    // }else if (avatarData.data.audio_speed == "fast"){
                    //     AUDIOSPEED = 1.5;
                    // }
                }
            }
        
        // Update the small video in the chat button
        const buttonVideo = document.getElementById('avatar-videoa');
        if (buttonVideo) {
            buttonVideo.src = avatarData.data.avatar_idle;
        }
        })();
        
        video.playbackRate = 0.8; // Adjust video speed
        videoIdle.play();
        const audioURLs = [];
        //from here handline the data of the localstirage
        // Add constant for user ID storage
        const VISITOR_ID_KEY = 'nifty_visitor_id';
        const CONVERSATION_ID_KEY = 'nifty_conversation_id';
        const STORAGE_TIMESTAMP_KEY = 'ai_agent_storage_timestamp';
        const STORAGE_EXPIRY_TIME = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
        // const STORAGE_EXPIRY_TIME =  2 * 60 * 1000; // 2 min in milliseconds
        const KEYS_TO_REMOVE = ["nifty_visitor_id", "chat_history", "audio_preferences", "ai_agent_storage_timestamp" , "nifty_conversation_id" , "nifty_modeofconversation"];
        // Function to check and clear storage
        function checkAndClearStorage() {
            const lastClearTime = parseInt(localStorage.getItem(STORAGE_TIMESTAMP_KEY), 10) || 0;
            const currentTime = Date.now();
        
            if (!lastClearTime || (currentTime - lastClearTime) > STORAGE_EXPIRY_TIME) {
        
                ["nifty_visitor_id","registrationStep", "chat_history", "audio_preferences", "ai_agent_storage_timestamp" , "nifty_conversation_id"].forEach(key => {
                    localStorage.removeItem(key);
                });
        
                localStorage.setItem(STORAGE_TIMESTAMP_KEY, currentTime.toString());
                localStorage.setItem("registrationStep","greeting");
            } 
        }
        
        // Initialize storage cleanup on page load
        document.addEventListener('DOMContentLoaded', function () {
            checkAndClearStorage();
            initAudioPreferences();
            loadChatHistory();
            // startnewchatwithchatbutton();
            // startNewChat();
            setupEndChatFunctionality();
        });
        // microphone animation functionality should be shown from here
        //  Function to show wave animation
        function startWaveAnimation() {
            micControl.classList.add("active");
        }
        
        //  Function to hide wave animation
        function stopWaveAnimation() {
            micControl.classList.remove("active");
        }
        //end of handln the data of the localstirage
        
        
        // Function to check if user is already registered from chat history
        function checkExistingRegistration() {
            try {
                const chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
                const hasUserId = hasValidUserId();
                return chatHistory.some(entry => entry.type === 'registration') && hasUserId;
            } catch (error) {
                console.error('Error checking registration:', error);
                return false;
            }
        }
        
        // Add helper function to focus textarea
        function focusTextArea() {
            textArea.focus();
        }
        
        // Add helper function to check for existing greeting
        function hasExistingGreeting() {
            try {
                const chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
                return chatHistory.some(entry =>
                    entry.type === 'chat' &&
                    entry.user === 'bot' &&
                    (entry.message.includes(messages.namePrompt) ||
                     entry.message.includes(messages.welcomeBack.replace('{name}', '')))
                );
            } catch (error) {
                console.error('Error checking greeting:', error);
                return false;
            }
        }
        
        // Update startnewchat function
            async function startnewchatwithchatbutton() {
                // If chat is already active, just return
                if (chatContainer.classList.contains("active")) {
                    return;
                }
                if(!MICONLY) {
                    micControl.style.display = "none";
                    audioControlContainer.style.display = "none";
                    micControl.style.opacity = "0";
                    universalAudioControl.style.opacity = "0";
                    universalAudioControl.onmouseover = null;
                    universalAudioControl.onmouseout = null;
                    micControl.onmouseover = null;
                    micControl.onmouseout = null;
                    universalAudioControl.style.pointerEvents = "none";
                    micControl.style.pointerEvents = "none";
                    document.getElementById("audio-control-container").style.pointerEvents = "none";
                    if (window.innerWidth < 800) {
                        endChatIcon.style.width = "75%";
                    }
                }
                if(ENDCHATTHINGS){
                    chatContainer.classList.add("active");
                    chatButton.style.transform = "scale(0)";
                    closeButton.style.display = "block";
                    return;
                }
                disableInputControls();
        
                chatHistory.style.overflowY = "auto";
        
                chatContainer.classList.add("active");
                chatButton.style.transform = "scale(0)";
                closeButton.style.display = "block";
        
                isUserRegistered = checkExistingRegistration();
                const hasGreeting = hasExistingGreeting();
        
                if (!isUserRegistered && !hasGreeting) {
                    console.log("both not")
                    // Only show registration greeting for new users without existing greeting
                    registrationStep = 'greeting';
        
                    // Add the chat bubble immediately
                    appendChatBubble("bot", `${messages.welcome} ${messages.namePrompt}`);
        
                    // Use preloaded audio if available to reduce initial delay
                    if (preloadedWelcomeAudio && preloadedWelcomeAudio.length > 0) {
                        console.log("Using preloaded welcome audio");
                        // Create a combined text from welcome and name prompt
                        const welcomeText = `${messages.welcome} , ${messages.namePrompt}`;
                        // Play the audio using the preloaded URLs
                        await playPreloadedWelcomeAudio(welcomeText, preloadedWelcomeAudio);
                        await startMicrophone();
                    } else {
                        // Fallback to regular TTS if preloaded audio is not available
                        console.log("Preloaded welcome audio not available, using regular TTS");
                        await processAndPlayTTS(`${messages.welcome} , ${messages.namePrompt}`);
                        await startMicrophone();
                    }
        
                    localStorage.setItem("registrationStep", registrationStep);
                    // startMicrophone();
        
                }else if(!isUserRegistered && hasGreeting){
                    let steg = localStorage.getItem("registrationStep");
                    if (steg == "greeting") {
                        // Use preloaded audio if available
                        if (preloadedWelcomeAudio && preloadedWelcomeAudio.length > 0) {
                            const welcomeText = `${messages.welcome} , ${messages.namePrompt}`;
                            await playPreloadedWelcomeAudio(welcomeText, preloadedWelcomeAudio);
                            await startMicrophone();
                        } else {
                            await processAndPlayTTS(`${messages.welcome} ${messages.namePrompt}`);
                            await startMicrophone();
                        }
                    }
                    // startMicrophone();
                } else if (isUserRegistered && !hasGreeting) {
                    console.log("only registered");
                    // Only show welcome back message for registered users without existing greeting
                    const welcomeBack = messages.welcomeBack.replace('{name}', userData.name);
                    appendChatBubble("bot", welcomeBack);
                    await processAndPlayTTS(welcomeBack);
                    enableInputControls();
                    focusTextArea();
                    await startMicrophone();
                }
                enableInputControls();
                await startMicrophone();
                focusTextArea();
            }
        
            // Function to play preloaded welcome audio
            async function playPreloadedWelcomeAudio(textResponse, preloadedAudioURLs) {
                const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
                if (isMuted || !MICONLY) {
                    await startMicrophone();
                    return;
                }
        
                disableInputControls();
                const sentences = splitIntoSentences(textResponse);
                if (sentences.length === 0 || preloadedAudioURLs.length === 0) return;
        
                isPlaying = true;
                universalAudioControl.style.opacity = "1";
                universalAudioControl.disabled = false;
                video.playbackRate = 1;
                stopButton.style.display = "block";
                universalAudioControl.classList.add('playing');
                videoIdle.style.display = "none";
                video.style.display = "block";
                video.currentTime = 0;
        
                try {
                    // Play each preloaded audio URL
                    for (let i = 0; i < preloadedAudioURLs.length; i++) {
                        if (!isPlaying) break;
        
                        const audioURL = preloadedAudioURLs[i];
                        if (!audioURL) continue;
        
                        audio.src = audioURL;
        
                        // Preload the audio
                        await new Promise(resolve => {
                            audio.addEventListener('canplaythrough', resolve, { once: true });
                            audio.load();
                        });
        
                        if (i === 0) {
                            // For the first segment, start audio and video EXACTLY together
                            audio.playbackRate = AUDIOSPEED || 1.2;
        
                            // Prepare both audio and video
                            video.currentTime = 0;
        
                            // Add a small delay to ensure everything is ready
                            await new Promise(resolve => setTimeout(resolve, 10));
        
                            // Create a synchronization point
                            const startTime = performance.now() + 10; // 10ms from now (reduced from 20ms)
        
                            // Set up both to start at exactly the same time
                            const audioPlayPromise = new Promise(resolve => {
                                const timeUntilStart = startTime - performance.now();
                                setTimeout(() => {
                                    const playPromise = audio.play();
                                    playPromise.then(resolve).catch(resolve);
                                }, Math.max(0, timeUntilStart));
                            });
        
                            const videoPlayPromise = new Promise(resolve => {
                                const timeUntilStart = startTime - performance.now();
                                setTimeout(() => {
                                    video.play().then(resolve).catch(resolve);
                                }, Math.max(0, timeUntilStart));
                            });
        
                            // Wait for both to start
                            await Promise.all([audioPlayPromise, videoPlayPromise]);
                        } else {
                            // For subsequent segments
                            audio.playbackRate = AUDIOSPEED || 1.2;
        
                            // Play audio and video together with exact synchronization
                            const startTime = performance.now() + 10; // 10ms from now (reduced from 20ms)
        
                            const audioPlayPromise = new Promise(resolve => {
                                const timeUntilStart = startTime - performance.now();
                                setTimeout(() => {
                                    const playPromise = audio.play();
                                    playPromise.then(resolve).catch(resolve);
                                }, Math.max(0, timeUntilStart));
                            });
        
                            const videoPlayPromise = new Promise(resolve => {
                                const timeUntilStart = startTime - performance.now();
                                setTimeout(() => {
                                    video.play().then(resolve).catch(resolve);
                                }, Math.max(0, timeUntilStart));
                            });
        
                            await Promise.all([audioPlayPromise, videoPlayPromise]);
                        }
        
                        // Wait for audio to finish
                        await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
        
                        // Small pause between sentences (reduced from 200ms)
                        if (i < preloadedAudioURLs.length - 1) {
                            video.pause();
                            await new Promise(resolve => setTimeout(resolve, 30));
                        }
                    }
                } catch (err) {
                    console.error("Preloaded audio playback error:", err);
                }
        
                isPlaying = false;
                stopButton.style.display = "none";
                universalAudioControl.classList.remove('playing');
                video.style.display = "none";
                videoIdle.style.display = "block";
                videoIdle.play();
            }
        
        chatButton.addEventListener("click", startnewchatwithchatbutton);
        
        // Add these new functions for input control
        function disableInputControls() {
            textArea.disabled = true;
            textArea.style.opacity = "0.5";
            textArea.style.cursor = "not-allowed";
            micControl.style.opacity = "0.5";
            micControl.style.pointerEvents = "none";
            micControl.style.cursor = "not-allowed";
            submitButton.disabled = true;
            submitButton.style.opacity = "0.5";
            submitButton.style.cursor = "not-allowed";
            universalAudioControl.style.opacity = "0.5";
            universalAudioControl.disabled = true;
            universalAudioControl.style.cursor = "not-allowed";
        }
        
        function enableInputControls() {
            textArea.disabled = false;
            textArea.style.opacity = "1";
            textArea.style.cursor = "text";
            micControl.style.opacity = "1";
            micControl.style.pointerEvents = "auto";
            micControl.style.cursor = "pointer";
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
            submitButton.style.cursor = "pointer";
            universalAudioControl.style.opacity = "1";
            universalAudioControl.disabled = false;
            universalAudioControl.style.cursor = "pointer";
        }
        
        // Update form submission handler to use disable controls
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const text = textArea.value.trim();
            if (!text) {
                textArea.style.border = "1px solid red";
                textArea.placeholder = "Please enter your message here !!";
                textArea.focus();
                setTimeout(() => {
                    textArea.style.border = "1px solid #dbdbdb";
                    textArea.placeholder = "Type your message here...";
                }, 3000);
                return;
            }
            disableInputControls();
            localStorage.setItem("nifty_modeofconversation", "text");
            await searchtts(text);
        });
        
        // // Helper function to strip HTML tags
        function stripHtmlTags(html) {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            let text = temp.textContent || temp.innerText || '';
        
            // Remove URLs
            text = text.replace(/https?:\/\/\S+/g, '');
        
            // Remove extra spaces and trim
            text = text.replace(/\s+/g, ' ').trim();
        
            // Ensure each country appears on a new line
            text = text.replace(/([a-zA-Z]) (?=[A-Z])/g, '$1\n');
             // Remove everything except letters, numbers, spaces, and the allowed symbols
             text = text.replace(/[^a-zA-Z0-9 .,!₹$€\n]/g, '');
             text = text.replace(/\n/g, ' ');
        
            return text;
        }
        
        // Update searchtts function
        async function searchtts(text) {
            const registrationstepsss = localStorage.getItem("registrationStep");
            if (registrationstepsss) {
                await handleRegistrationStep(text);
                return;
            } else {
                try {
                    // // Check if this exact text is already in the UI as the last message
                    // const chatBubbles = document.querySelectorAll('.chat-bubble.user');
                    // const lastUserBubble = chatBubbles.length > 0 ? chatBubbles[chatBubbles.length - 1] : null;
        
                    // // Only append if this isn't a duplicate of the last message
                    // if (!lastUserBubble || lastUserBubble.textContent.trim() !== text.trim()) {
                    //     appendChatBubble("user", text);
                    // }
        
                    appendChatBubble("user", text);
                    showLoadingIndicator();
                    disableInputControls();
        
                    // Start fetching the answer
                    const answerPromise = fetchAnswer(text);
        
                    // Add a loading message for TTS preparation
                    // const loadingTTSMessage = document.createElement('div');
                    // loadingTTSMessage.className = 'tts-loading-indicator';
                    // loadingTTSMessage.innerHTML = `
                    //     <div class="loading-spinner"></div>
                    //     <div class="loading-text">Preparing voice response...</div>
                    // `;
                    // document.body.appendChild(loadingTTSMessage);
        
                    // Wait for the answer
                    const answerResponse = await answerPromise;
                    removeLoadingIndicator();
        
                    if (answerResponse) {
                        const botResponse = answerResponse;
        
                        // Strip HTML before sending to TTS
                        const plainTextResponse = stripHtmlTags(botResponse);
        
                        // Split into sentences
                        const sentences = splitIntoSentences(plainTextResponse);
        
                        // Start preloading the first TTS segment immediately
                        // This happens before showing the answer to ensure faster response
                        let firstTTSPromise = null;
                        if (sentences.length > 0) {
                            firstTTSPromise = fetchSingleTTS(sentences[0]);
                        }
        
                        // Show the answer in the UI while the first TTS segment is loading
                        appendChatBubble("bot", botResponse);
        
                        // Wait for the first TTS segment to be ready
                        let firstTTSAudio = null;
                        if (firstTTSPromise) {
                            firstTTSAudio = await firstTTSPromise;
                        }
        
                        // Remove the TTS loading indicator
                        // if (loadingTTSMessage.parentNode) {
                        //     loadingTTSMessage.parentNode.removeChild(loadingTTSMessage);
                        // }
        
                        // Start processing TTS with the preloaded first segment
                        if (firstTTSAudio) {
                            const ttsPromise = processAndPlayTTS(plainTextResponse, firstTTSAudio);
                            await ttsPromise;
                        } else {
                            // Fallback if first segment failed to load
                            await processAndPlayTTS(plainTextResponse);
                        }
        
                        enableInputControls();
                        await startMicrophone();
                        focusTextArea();
                    } else {
                        // Remove the TTS loading indicator
                        // if (loadingTTSMessage.parentNode) {
                        //     loadingTTSMessage.parentNode.removeChild(loadingTTSMessage);
                        // }
        
                        if (localStorage.getItem("registrationStep")) {
                            console.log("your in register steps for now");
                        }
                        else {
                            const errorMessage = "I apologize, but I couldn't process your request. Could you please try again?";
                            appendChatBubble("bot", `${errorMessage}`);
                            await processAndPlayTTS(errorMessage);
                            enableInputControls();
                            await startMicrophone();
                            focusTextArea();
                        }
                    }
                } catch (error) {
                    console.error("Error in searchtts:", error);
                    removeLoadingIndicator();
        
                    // Remove any TTS loading indicator if it exists
                    // const loadingTTSMessage = document.querySelector('.tts-loading-indicator');
                    // if (loadingTTSMessage && loadingTTSMessage.parentNode) {
                    //     loadingTTSMessage.parentNode.removeChild(loadingTTSMessage);
                    // }
        
                    const errorMessage = "I apologize, but I encountered an error. Could you please try again?";
                    appendChatBubble("bot", errorMessage);
                    await processAndPlayTTS(errorMessage);
                    enableInputControls();
                    focusTextArea();
                }
            }
        }
        ////////////////////////////////////////////////////////////////////chatgpt
        //new code to play teh audio
        async function fetchSingleTTS(sentence) {
            try {
                const {isMuted} = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                if(isMuted) return;
                // const response = await fetch(BACKEND_URL + '/tts' || 'https://aiservice.yaraamanager.com/api/tts', {
                    const response = await fetch('https://aiservice.yaraamanager.com/api/tts', {
                        method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: sentence,
                        language: '',
                        gender: avatarData.data.avatar_gender || 'female'
                    }),
                });
                const data = await response.json();
                return data.access_audio || apiConfig.ttsErrorAudio || null;
            } catch (err) {
                console.error("TTS fetch error:", err);
                return apiConfig.ttsErrorAudio || null;
            }
        }
        // Preload TTS audio in parallel
        async function preloadTTSAudio(sentences) {
            // Create an array to store the audio URLs
            const audioURLs = [];
        
            // Start loading the first sentence immediately
            const firstSentencePromise = fetchSingleTTS(sentences[0]);
        
            // Start loading the rest of the sentences in parallel
            const otherSentencesPromises = sentences.slice(1).map(sentence => fetchSingleTTS(sentence));
        
            // Wait for the first sentence to load (this is needed immediately)
            const firstAudioURL = await firstSentencePromise;
            audioURLs.push(firstAudioURL);
        
            // Continue loading the rest in the background
            const loadRestInBackground = async () => {
                try {
                    const results = await Promise.all(otherSentencesPromises);
                    audioURLs.push(...results);
                } catch (error) {
                    console.error('Error preloading TTS audio:', error);
                }
            };
        
            // Start the background loading without waiting for it
            loadRestInBackground();
        
            return {
                firstAudioURL,
                getAudioURL: async (index) => {
                    // If the audio is already loaded, return it immediately
                    if (audioURLs[index]) return audioURLs[index];
        
                    // Otherwise, wait for it to load
                    while (!audioURLs[index] && isPlaying) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
        
                    return audioURLs[index];
                }
            };
        }
        
        async function processAndPlayTTS(textResponse, preloadedFirstAudio = null) {
            const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
            // if (isMuted || !MICONLY) return;
            if (isMuted || !MICONLY) {
                await startMicrophone();
                return;
            };
        
            disableInputControls();
            const sentences = splitIntoSentences(textResponse);
            if (sentences.length === 0) return;
        
            isPlaying = true;
            universalAudioControl.style.opacity = "1";
            universalAudioControl.disabled = false;
            video.playbackRate = 1;
            stopButton.style.display = "block";
            universalAudioControl.classList.add('playing');
            videoIdle.style.display = "none";
            video.style.display = "block";
            video.currentTime = 0;
        
            // Start listening for voice commands before audio starts playing
            if(MICONLY)
            {
                const {microphoneEnabled} = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                if(microphoneEnabled){
                // await startListeningForCommands()
                // await startListeningForNextQuestion();
            }
            }
        
            // // Add a message to let the user know they can stop the audio
                // const stopCommandMessage = document.createElement('div');
                // stopCommandMessage.className = 'stop-command-hint';
                // stopCommandMessage.textContent = 'Say "stop" to pause audio';
                // document.getElementsByClassName("chat_history")[0].appendChild(stopCommandMessage);
            // document.body.appendChild(stopCommandMessage);
        
            // Auto-remove the hint after 5 seconds
            // setTimeout(() => {
            //     if (stopCommandMessage.parentNode) {
            //         stopCommandMessage.style.opacity = '0';
            //         setTimeout(() => {
            //             if (stopCommandMessage.parentNode) {
            //                 stopCommandMessage.parentNode.removeChild(stopCommandMessage);
            //             }
            //         }, 500);
            //     }
            // }, 5000);
        
            try {
                // If we have a preloaded first audio, use it directly
                let firstAudioURL = preloadedFirstAudio;
                let audioLoader;
        
                // If no preloaded audio was provided, load all audio in parallel
                if (!firstAudioURL) {
                    // Start preloading all TTS audio in parallel
                    audioLoader = await preloadTTSAudio(sentences);
        
                    // Get the first audio URL immediately (it's already loaded)
                    firstAudioURL = audioLoader.firstAudioURL;
                    if (!firstAudioURL) {
                        console.error("Failed to load first audio segment");
                        return;
                    }
                } else {
                    // If we have the first audio, start loading the rest in the background
                    const otherSentencesPromises = sentences.slice(1).map(sentence => fetchSingleTTS(sentence));
        
                    // Create a simple loader for the remaining sentences
                    const audioURLs = [firstAudioURL];
        
                    // Load the rest in the background
                    Promise.all(otherSentencesPromises).then(results => {
                        audioURLs.push(...results);
                    }).catch(error => {
                        console.error('Error preloading remaining TTS audio:', error);
                    });
        
                    // Create a compatible audioLoader interface
                    audioLoader = {
                        firstAudioURL,
                        getAudioURL: async (index) => {
                            // If the audio is already loaded, return it immediately
                            if (audioURLs[index]) return audioURLs[index];
        
                            // Otherwise, wait for it to load
                            while (!audioURLs[index] && isPlaying) {
                                await new Promise(resolve => setTimeout(resolve, 100));
                            }
        
                            return audioURLs[index];
                        }
                    };
                }
        
                // Play each sentence
                for (let i = 0; i < sentences.length; i++) {
                    if (!isPlaying) break;
        
                    // Get the audio URL for this sentence (either from cache or wait for it to load)
                    const audioURL = i === 0 ? firstAudioURL : await audioLoader.getAudioURL(i);
                    if (!audioURL) continue;
        
                    audio.src = audioURL;
        
                    // Preload the audio
                    await new Promise(resolve => {
                        audio.addEventListener('canplaythrough', resolve, { once: true });
                        audio.load();
                    });
        
                    if (i === 0) {
                        // For the first segment, start audio and video EXACTLY together
                        audio.playbackRate = AUDIOSPEED || 1.2;
        
                        // Prepare both audio and video
                        video.currentTime = 0;
        
                        // Create a synchronization point
                        const startTime = performance.now() + 50; // 50ms from now
        
                        // Set up both to start at exactly the same time
                        const audioPlayPromise = new Promise(resolve => {
                            const timeUntilStart = startTime - performance.now();
                            setTimeout(() => {
                                const playPromise = audio.play();
                                playPromise.then(resolve).catch(resolve);
                            }, Math.max(0, timeUntilStart));
                        });
        
                        const videoPlayPromise = new Promise(resolve => {
                            const timeUntilStart = startTime - performance.now();
                            setTimeout(() => {
                                video.play().then(resolve).catch(resolve);
                            }, Math.max(0, timeUntilStart));
                        });
        
                        // Wait for both to start
                        await Promise.all([audioPlayPromise, videoPlayPromise]);
                    } else {
                        // For subsequent segments
                        audio.playbackRate = AUDIOSPEED || 1.2;
        
                        // Play audio and video together with exact synchronization
                        const startTime = performance.now() + 20; // 20ms from now
        
                        const audioPlayPromise = new Promise(resolve => {
                            const timeUntilStart = startTime - performance.now();
                            setTimeout(() => {
                                const playPromise = audio.play();
                                playPromise.then(resolve).catch(resolve);
                            }, Math.max(0, timeUntilStart));
                        });
        
                        const videoPlayPromise = new Promise(resolve => {
                            const timeUntilStart = startTime - performance.now();
                            setTimeout(() => {
                                video.play().then(resolve).catch(resolve);
                            }, Math.max(0, timeUntilStart));
                        });
        
                        await Promise.all([audioPlayPromise, videoPlayPromise]);
                    }
        
                    // Wait for audio to finish
                    await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
        
                    // Small pause between sentences
                    if (i < sentences.length - 1) {
                        video.pause();
                        await new Promise(resolve => setTimeout(resolve, 30));
                    }
                }
            } catch (err) {
                console.error("Live stream error:", err);
            }
        
            isPlaying = false;
            stopButton.style.display = "none";
            universalAudioControl.classList.remove('playing');
            video.style.display = "none";
            videoIdle.style.display = "block";
            videoIdle.play();
        
            // Remove the hint if it's still there
            // if (stopCommandMessage.parentNode) {
            //     stopCommandMessage.parentNode.removeChild(stopCommandMessage);
            // }
        
            // Stop listening for voice commands
            // stopListeningForCommands();
        }
        
        function splitIntoSentences(text) {
            return text.split(".")
                .map(sentence => sentence.trim())
                .filter(Boolean)
                .map(sentence => sentence + ".");
        }
        
        // Voice command recognition functions
        
        // Start listening for voice commands during audio playback
        async function startListeningForCommands() {
            if (isListeningForCommands) return;
            isListeningForCommands = true;
        
            try {
                // Start recording using the existing recording setup
                await startRecording();
        
                // The processRecordedAudio function will be called automatically when recording stops
                // via the mediaRecorder.onstop event handler
        
            } catch (error) {
                console.error("Error starting command listening:", error);
                isListeningForCommands = false;
            }
        }
        
        function stopListeningForCommands() {
            if (!isListeningForCommands) return;
            isListeningForCommands = false;
            stopRecording();
        }
        
        // Modify processRecordedAudio to handle both regular input and commands
        // async function processRecordedAudio() {
        //     const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        //     stopWaveAnimation();
        
        //     if (audioBlob.size > 0) {
        //         const formData = new FormData();
        //         formData.append("audio", audioBlob, "voice_input.webm");
        
        //         try {
        //             let response = await fetch(BACKEND_URL + '/process-audio' || 'https://aiservice.yaraamanager.com/api/process-audio', {
        //                 method: 'POST',
        //                 body: formData
        //             });
        
        //             let data = await response.json();
        
        //             if (data.success && data.text) {
        //                 const transcribedText = data.text.toLowerCase();
        
        //                 if (isListeningForCommands) {
        //                     // Handle as command
        //                     handleCommand(transcribedText);
        //                 } else {
        //                     // Handle as regular input
        //                     localStorage.setItem("nifty_modeofconversation", "voice");
        //                     await searchtts(data.text);
        //                 }
        //             } else {
        //                 console.error("Error:", data.error);
        //             }
        //         } catch (error) {
        //             console.error("Fetch error:", error);
        //         }
        //     }
        // }
        
        // Add a function to handle commands
        // function handleCommand(text) {
        //     // Convert text to lowercase for easier matching
        //     text = text.toLowerCase().trim();
        
        //     // Define command patterns
        //     const stopPattern = /stop|pause|end/;
        //     const yesPattern = /yes|yeah|correct|right|okay|sure/;
        //     const noPattern = /no|nope|negative|wrong|incorrect/;
        
        //     // Check for matches
        //     if (stopPattern.test(text)) {
        //         stopPlayback();
        //     } else if (yesPattern.test(text)) {
        //         handlePositiveResponse();
        //     } else if (noPattern.test(text)) {
        //         handleNegativeResponse();
        //     }
        
        //     // After handling command, start listening again if needed
        //     if (isListeningForCommands) {
        //         startListeningForCommands();
        //     }
        // }
        
        // function handlePositiveResponse() {
        //     // Handle "yes" responses
        //     if (pendingAction) {
        //         pendingAction.confirm();
        //     }
        // }
        
        // function handleNegativeResponse() {
        //     // Handle "no" responses
        //     if (pendingAction) {
        //         pendingAction.cancel();
        //     }
        // }
        
        // Setup backup audio analysis for command detection
        // This provides a fallback method if the speech recognition fails
        let backupAudioContext = null;
        let backupAnalyser = null;
        let backupStream = null;
        
        // async function setupBackupCommandDetection() {
        //     try {
        //         // Only set up if not already running
        //         if (backupAudioContext) return;
        
        //         // Get microphone access
        //         backupStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        //         // Create audio context
        //         try {
        //             backupAudioContext = new (window.AudioContext || window['webkitAudioContext'])();
        //         } catch (e) {
        //             console.error('Web Audio API is not supported in this browser');
        //         }
        
        //         // Create analyser
        //         backupAnalyser = backupAudioContext.createAnalyser();
        //         backupAnalyser.fftSize = 2048;
        //         backupAnalyser.minDecibels = -65; // More sensitive than regular recording
        
        //         // Connect microphone to analyser
        //         const source = backupAudioContext.createMediaStreamSource(backupStream);
        //         source.connect(backupAnalyser);
        
        //         // Start monitoring audio levels
        //         monitorAudioLevels();
        //     } catch (error) {
        //         console.error('Error setting up backup command detection:', error);
        //     }
        // }
        
        // Monitor audio levels to detect potential commands
        // function monitorAudioLevels() {
        //     if (!backupAnalyser || !isListeningForCommands || !isPlaying) return;
        
        //     const bufferLength = backupAnalyser.frequencyBinCount;
        //     const dataArray = new Uint8Array(bufferLength);
        
        //     // Get current audio levels
        //     backupAnalyser.getByteFrequencyData(dataArray);
        
        //     // Calculate average volume
        //     let sum = 0;
        //     for (let i = 0; i < bufferLength; i++) {
        //         sum += dataArray[i];
        //     }
        //     const average = sum / bufferLength;
        
        //     // If volume spike detected during playback, it might be a command
        //     if (average > 35 && isPlaying) { // Lower threshold for detecting speech
        //         console.log('Volume spike detected, might be a command:', average);
        
        //         // If we detect a significant volume spike, we'll consider it a potential stop command
        //         // This helps catch commands that the speech recognition might miss
        //         if (average > 50) {
        //             console.log('Strong volume spike detected, treating as stop command');
        //             stopPlayback();
        //             return;
        //         }
        //     }
        
        //     // Continue monitoring if still listening
        //     if (isListeningForCommands && isPlaying) {
        //         requestAnimationFrame(monitorAudioLevels);
        //     }
        // }
        
        // Stop listening for voice commands
        function stopListeningForCommands() {
            if (!isListeningForCommands) return;
        
            try {
                // Stop speech recognition
                if (commandRecognizer) {
                    commandRecognizer.stop();
                    commandRecognizer = null;
                }
        
                // Clean up backup audio detection
                if (backupStream) {
                    backupStream.getTracks().forEach(track => track.stop());
                    backupStream = null;
                }
        
                if (backupAudioContext) {
                    backupAudioContext.close().catch(err => console.error("Error closing backup audio context:", err));
                    backupAudioContext = null;
                    backupAnalyser = null;
                }
            } catch (error) {
                console.error('Error stopping command recognition:', error);
            } finally {
                isListeningForCommands = false;
                hideCommandListeningIndicator();
                console.log('Stopped listening for voice commands');
            }
        }
        
        // // Visual indicators for voice command listening
        // function showCommandListeningIndicator() {
        //     // Check if indicator already exists
        //     // if (document.getElementById('command-listening-indicator')) return;
        
        //     // Create indicator element
        //     // const indicator = document.createElement('div');
        //     // indicator.id = 'command-listening-indicator';
        //     // indicator.className = 'command-listening-indicator';
        //     // indicator.innerHTML = `
        //     //     <div class="command-listening-pulse"></div>
        //     //     <div class="command-listening-text">Listening for commands...</div>
        //     // `;
        
        //     // Add to document
        //     document.body.appendChild(indicator);
        
        //     // Add styles if not already added
        //     if (!document.getElementById('command-indicator-styles')) {
        //         const styles = document.createElement('style');
        //         styles.id = 'command-indicator-styles';
        //         styles.textContent = `
        //             .command-listening-indicator {
        //                 position: fixed;
        //                 bottom: 100px;
        //                 right: 30px;
        //                 background: rgba(42, 54, 99, 0.9);
        //                 color: white;
        //                 padding: 12px 18px;
        //                 border-radius: 20px;
        //                 display: flex;
        //                 align-items: center;
        //                 gap: 10px;
        //                 z-index: 2000;
        //                 font-family: 'Poppins', sans-serif;
        //                 font-size: 15px;
        //                 font-weight: 500;
        //                 box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        //                 animation: fadeInUp 0.3s ease forwards;
        //                 border: 2px solid rgba(255, 255, 255, 0.3);
        //             }
        
        //             .command-listening-pulse {
        //                 width: 14px;
        //                 height: 14px;
        //                 background-color: #ff4444;
        //                 border-radius: 50%;
        //                 animation: pulse 1.5s infinite;
        //                 box-shadow: 0 0 10px rgba(255, 68, 68, 0.7);
        //             }
        
        //             .command-recognized {
        //                 background: rgba(76, 175, 80, 0.8);
        //                 animation: fadeInOut 2s ease forwards;
        //             }
        
        //             .ready-for-question {
        //                 background: rgba(42, 54, 99, 0.9);
        //                 border: 2px solid rgba(255, 255, 255, 0.5);
        //             }
        
        //             .ready-for-question .command-listening-pulse {
        //                 background-color: #4CAF50;
        //                 box-shadow: 0 0 10px rgba(76, 175, 80, 0.7);
        //             }
        
        //             @keyframes pulse {
        //                 0% {
        //                     transform: scale(0.8);
        //                     opacity: 0.8;
        //                 }
        //                 50% {
        //                     transform: scale(1.2);
        //                     opacity: 1;
        //                 }
        //                 100% {
        //                     transform: scale(0.8);
        //                     opacity: 0.8;
        //                 }
        //             }
        
        //             @keyframes fadeInUp {
        //                 from {
        //                     opacity: 0;
        //                     transform: translateY(20px);
        //                 }
        //                 to {
        //                     opacity: 1;
        //                     transform: translateY(0);
        //                 }
        //             }
        
        //             @keyframes fadeInOut {
        //                 0% {
        //                     opacity: 0;
        //                     transform: translateY(20px);
        //                 }
        //                 20% {
        //                     opacity: 1;
        //                     transform: translateY(0);
        //                 }
        //                 80% {
        //                     opacity: 1;
        //                     transform: translateY(0);
        //                 }
        //                 100% {
        //                     opacity: 0;
        //                     transform: translateY(-20px);
        //                 }
        //             }
        
        //             @keyframes fadeOut {
        //                 from {
        //                     opacity: 1;
        //                 }
        //                 to {
        //                     opacity: 0;
        //                 }
        //             }
        
        //             .stop-command-hint {
        //                 position: fixed;
        //                 bottom: 150px;
        //                 right: 30px;
        //                 background: rgba(255, 255, 255, 0.9);
        //                 color: #333;
        //                 padding: 8px 15px;
        //                 border-radius: 20px;
        //                 font-family: 'Poppins', sans-serif;
        //                 font-size: 14px;
        //                 box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        //                 z-index: 1999;
        //                 transition: opacity 0.5s ease;
        //                 border: 1px solid rgba(0, 0, 0, 0.1);
        //             }
        
        //             .tts-loading-indicator {
        //                 display:none;
        //                 position: fixed;
        //                 bottom: 200px;
        //                 right: 30px;
        //                 background: rgba(255, 255, 255, 0.95);
        //                 color: #333;
        //                 padding: 10px 15px;
        //                 border-radius: 20px;
        //                 display: flex;
        //                 align-items: center;
        //                 gap: 10px;
        //                 z-index: 1998;
        //                 font-family: 'Poppins', sans-serif;
        //                 font-size: 14px;
        //                 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        //                 animation: fadeInUp 0.3s ease forwards;
        //                 border: 1px solid rgba(0, 0, 0, 0.1);
        //             }
        
        //             .loading-spinner {
        //                 width: 16px;
        //                 height: 16px;
        //                 border: 2px solid rgba(0, 0, 0, 0.1);
        //                 border-top: 2px solid #3498db;
        //                 border-radius: 50%;
        //                 animation: spin 1s linear infinite;
        //             }
        
        //             @keyframes spin {
        //                 0% { transform: rotate(0deg); }
        //                 100% { transform: rotate(360deg); }
        //             }
        //         `;
        //         document.head.appendChild(styles);
        //     }
        // }
        
        function hideCommandListeningIndicator() {
            const indicator = document.getElementById('command-listening-indicator');
            if (indicator) {
                indicator.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.parentNode.removeChild(indicator);
                    }
                }, 300);
            }
        }
        
        // function showCommandRecognizedIndicator(command) {
        //     // Remove existing indicator
        //     hideCommandListeningIndicator();
        
        //     // // Create recognized indicator
        //     // const indicator = document.createElement('div');
        //     // indicator.id = 'command-listening-indicator';
        //     // indicator.className = 'command-listening-indicator command-recognized';
        //     // indicator.innerHTML = `
        //     //     <div class="command-listening-pulse"></div>
        //     //     <div class="command-listening-text">Command recognized: ${command}</div>
        //     // `;
        
        //     // Add to document
        //     document.body.appendChild(indicator);
        
        //     // Auto-remove after animation completes
        //     setTimeout(() => {
        //         if (indicator.parentNode) {
        //             indicator.parentNode.removeChild(indicator);
        //         }
        //     }, 2000);
        // }
        
        // Show indicator that we're ready for the next question
        // function showReadyForQuestionIndicator() {
        //     // Remove existing indicators
        //     hideCommandListeningIndicator();
        
        //     // Create ready indicator
        //     // const indicator = document.createElement('div');
        //     // indicator.id = 'command-listening-indicator';
        //     // indicator.className = 'command-listening-indicator ready-for-question';
        //     // indicator.innerHTML = `
        //     //     <div class="command-listening-pulse"></div>
        //     //     <div class="command-listening-text">Ready for your next question...</div>
        //     // `;
        
        //     // Add to document
        //     document.body.appendChild(indicator);
        
        //     // Auto-remove after 5 seconds
        //     setTimeout(() => {
        //         if (indicator && indicator.parentNode) {
        //             indicator.style.animation = 'fadeOut 0.5s ease forwards';
        //             setTimeout(() => {
        //                 if (indicator.parentNode) {
        //                     indicator.parentNode.removeChild(indicator);
        //                 }
        //             }, 500);
        //         }
        //     }, 5000);
        // }
        
        // Variables for continuous conversation
        let isListeningForNextQuestion = false;
        let nextQuestionRecognizer = null;
        
        // Start listening for the next question after stopping audio
        async function startListeningForNextQuestion() {
            if (isListeningForNextQuestion) return;
        
            try {
                isListeningForNextQuestion = true;
        
                // Initialize speech recognition if supported
                if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    nextQuestionRecognizer = new SpeechRecognition();
                    nextQuestionRecognizer.continuous = true;
                    nextQuestionRecognizer.interimResults = false;
        
                    // Configure recognition
                    nextQuestionRecognizer.lang = 'en-US';
                    nextQuestionRecognizer.maxAlternatives = 1;
        
                    // Handle results - process the next question
                    nextQuestionRecognizer.onresult = async (event) => {
                        const lastResult = event.results.length - 1;
                        const transcript = event.results[lastResult][0].transcript.trim();
        
                        if (transcript.length > 0) {
                            console.log('Next question detected:', transcript);
        
                            // Stop listening for the next question
                            stopListeningForNextQuestion();
        
                            // Process the question
                            await processNextQuestion(transcript);
                        }
                    };
        
                    // Handle end event - restart recognition to keep it active
                    nextQuestionRecognizer.onend = () => {
                        if (isListeningForNextQuestion) {
                            // Only restart if we're still supposed to be listening
                            setTimeout(() => {
                                try {
                                    nextQuestionRecognizer.start();
                                } catch (e) {
                                    console.error('Error restarting next question recognition:', e);
                                }
                            }, 100);
                        }
                    };
        
                    // Start recognition
                    nextQuestionRecognizer.start();
                    console.log('Listening for next question...');
        
                    // Auto-stop after 30 seconds if no question is asked
                    setTimeout(() => {
                        if (isListeningForNextQuestion) {
                            stopListeningForNextQuestion();
                        }
                    }, 30000);
                }
            } catch (error) {
                console.error('Error starting next question recognition:', error);
                isListeningForNextQuestion = false;
            }
        }
        
        // Stop listening for the next question
        function stopListeningForNextQuestion() {
            if (!isListeningForNextQuestion) return;
        
            try {
                if (nextQuestionRecognizer) {
                    nextQuestionRecognizer.stop();
                    nextQuestionRecognizer = null;
                }
            } catch (error) {
                console.error('Error stopping next question recognition:', error);
            } finally {
                isListeningForNextQuestion = false;
            }
        }
        
        // Process the next question from voice input
        async function processNextQuestion(text) {
            // Show the question in the UI - but only once
            // First check if this exact text is already in the UI as the last message
            const chatBubbles = document.querySelectorAll('.chat-bubble.user');
            const lastUserBubble = chatBubbles.length > 0 ? chatBubbles[chatBubbles.length - 1] : null;
        
            // Only append if this isn't a duplicate of the last message
            if (!lastUserBubble || lastUserBubble.textContent.trim() !== text.trim()) {
                appendChatBubble("user", text);
            }
        
            // Set the mode to voice
            localStorage.setItem("nifty_modeofconversation", "voice");
        
            // Process the question like a normal voice input, but don't append the user bubble again
            await processVoiceInput(text);
        }
        
        // Process voice input without adding another bubble
        async function processVoiceInput(text) {
            try {
                showLoadingIndicator();
                disableInputControls();
        
                const answerResponse = await fetchAnswer(text);
                removeLoadingIndicator();
        
                if (answerResponse) {
                    const botResponse = answerResponse;
                    appendChatBubble("bot", botResponse);
                    // Strip HTML before sending to TTS
                    await processAndPlayTTS(stripHtmlTags(botResponse));
                    enableInputControls();
                    await startMicrophone();
                    focusTextArea();
                } else {
                    if (localStorage.getItem("registrationStep")) {
                        console.log("your in register steps for now");
                    }
                    else {
                        const errorMessage = "I apologize, but I couldn't process your request. Could you please try again?";
                        appendChatBubble("bot", `${errorMessage}`);
                        await processAndPlayTTS(errorMessage);
                        enableInputControls();
                        await startMicrophone();
                        focusTextArea();
                    }
                }
            } catch (error) {
                console.error("Error in processVoiceInput:", error);
                removeLoadingIndicator();
                const errorMessage = "I apologize, but I encountered an error. Could you please try again?";
                appendChatBubble("bot", errorMessage);
                await processAndPlayTTS(errorMessage);
                enableInputControls();
                focusTextArea();
            }
        }
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // // Function to process text and play corresponding audio with video
        // async function processAndPlayTTS(textResponse) {
        //     const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
        //     if (isMuted) return;
        //     if (!MICONLY) return;
        //     disableInputControls();
        
        //     try {
        //         const sentences = splitIntoSentences(textResponse);
        //         // console.log("sentences",sentences)
        //         const audioURLs = await fetchAudioURLs(sentences);
        
        //         if (audioURLs.length) {
        //             await playAudioWithVideo(audioURLs);
        //         }
        //     } catch (error) {
        //         console.error("TTS processing error:", error);
        //     }
        // }
        //////////////////////////////////////////////////////////////////////////////////////deeepseek
        
        // Function to fetch a single audio URL from the API
        async function fetchSingleAudioURL(sentence) {
            try {
                const {isMuted} = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                if(isMuted) return;
                // const response = await fetch(BACKEND_URL + '/tts' || 'https://aiservice.yaraamanager.com/api/tts', {
                const response = await fetch('https://aiservice.yaraamanager.com/api/tts', {
        
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: sentence,
                        language: '',
                        gender: avatarData.data.avatar_gender || 'female'
                    }),
                });
                const data = await response.json();
                return data.access_audio || apiConfig.ttsErrorAudio || null;
            } catch (error) {
                console.error("Error fetching audio:", error);
                return apiConfig.ttsErrorAudio || null;
            }
        }
        
        // Modified playback function with streaming logic
        // async function playAudioWithVideo(sentences) {
        //     if (!MICONLY) return;
        //     isPlaying = true;
        
        //     // Initialize playback controls
        //     universalAudioControl.style.opacity = "1";
        //     universalAudioControl.disabled = false;
        //     video.playbackRate = 1;
        //     stopButton.style.display = "block";
        //     universalAudioControl.classList.add('playing');
        //     videoIdle.style.display = "none";
        //     video.style.display = "block";
        //     video.currentTime = 0;
        
        //     try {
        //         let isFirstSegment = true;
        
        //         for (const sentence of sentences) {
        //             if (!isPlaying) break;
        
        //             // Fetch audio URL for current sentence
        //             const audioURL = await fetchSingleAudioURL(sentence);
        //             if (!audioURL) continue;
        
        //             // Load and play audio
        //             audio.src = audioURL;
        //             await new Promise(resolve => audio.addEventListener('canplaythrough', resolve, { once: true }));
        //             audio.load();
        
        //             audio.playbackRate = 1.17;
        //             await audio.play(); // Wait for audio to start playing
        
        //             // Now start video playback
        //             setTimeout(() => {
        //                 video.play();
        //             }, 20000);
        
        //             if (isFirstSegment) {
        //                 await new Promise(resolve => setTimeout(resolve, 200)); // Optional: short sync delay
        //                 isFirstSegment = false;
        //             }
        
        //             // audio.playbackRate = 1.17;
        //             // await audio.play();
        //             // if (isFirstSegment) {
        //             //     video.play();
        //             //     await new Promise(resolve => setTimeout(resolve, 200)); // Shorter initial sync delay
        //             //     isFirstSegment = false;
        //             // } else {
        //             //     video.play(); // Resume video immediately
        //             // }
        //             // Synchronize audio and video playback
        
        
        //             // Wait for audio completion
        //             await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
        
        //             // Minimal pause between sentences (reduced from 300ms to 50ms)
        //             if (sentences.indexOf(sentence) < sentences.length - 1) {
        //                 await new Promise(resolve => setTimeout(resolve, 50));
        //             }
        //         }
        //     } catch (error) {
        //         console.error("Playback error:", error);
        //     }
        
        //     // Cleanup
        //     isPlaying = false;
        //     stopButton.style.display = "none";
        //     universalAudioControl.classList.remove('playing');
        //     video.style.display = "none";
        //     videoIdle.style.display = "block";
        //     videoIdle.play();
        // }
        async function playAudioWithVideo(sentences) {
            if (!MICONLY) return;
            isPlaying = true;
        
            // Initialize playback controls
            universalAudioControl.style.opacity = "1";
            universalAudioControl.disabled = false;
            video.playbackRate = 1;
            stopButton.style.display = "block";
            universalAudioControl.classList.add('playing');
            videoIdle.style.display = "none";
            video.style.display = "block";
            video.currentTime = 0;
        
            try {
                let isFirstSegment = true;
                let nextAudioURL = null;
        
                for (let i = 0; i < sentences.length; i++) {
                    if (!isPlaying) break;
        
                    const currentSentence = sentences[i];
        
                    // Preload the next audio in parallel
                    if (i < sentences.length - 1) {
                        fetchSingleAudioURL(sentences[i + 1]).then(url => nextAudioURL = url);
                    }
        
                    // Fetch current audio URL (use preloaded if available)
                    let audioURL = nextAudioURL || await fetchSingleAudioURL(currentSentence);
                    if (!audioURL) continue;
        
                    audio.src = audioURL;
                    audio.load();
                    await new Promise(resolve => audio.addEventListener('canplaythrough', resolve, { once: true }));
                    audio.playbackRate = AUDIOSPEED || 1.20;
                    await audio.play();
        
                    // Start video slightly after audio (adjust delay as needed)
                    // setTimeout(() => video.play(), isFirstSegment ? 200 : 0);
                    audio.addEventListener('play', () => {
                        setTimeout(() => {
                            video.play();
                        }, 2000);
                    }, { once: true });
        
        
                    if (isFirstSegment) {
                        isFirstSegment = false;
                    }
        
                    await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
        
                    // Minimal pause between sentences
                    if (i < sentences.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 30));
                    }
                }
            } catch (error) {
                console.error("Playback error:", error);
            }
        
            // Cleanup
            isPlaying = false;
            stopButton.style.display = "none";
            universalAudioControl.classList.remove('playing');
            video.style.display = "none";
            videoIdle.style.display = "block";
            videoIdle.play();
        }
        
        function appendChatBubble(sender, message) {
          const bubble = document.createElement("div");
          bubble.className = `chat-bubble ${sender}`;
          bubble.innerHTML = message;
          chatHistory.appendChild(bubble);
          chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the latest message
          resetUI();
          storeChatMessage(sender, message);
        }
        
        // Fetch the answer from the server
        async function fetchAnswer(text) {
            try {
                const visitorId = localStorage.getItem(VISITOR_ID_KEY);
                if (!visitorId) {
                    console.warn('User ID not found in localStorage');
                    await handleRegistrationStep(text);
                    return;
                }
                const registrationStep  = JSON.parse(localStorage.getItem("registrationStep"));
                if (registrationStep) {
                    return;
                }
                // get mode of conversation
                open_end_chat();
        
                const MODEOFCONVERSATION = localStorage.getItem("nifty_modeofconversation");
                // console.log("MODEOFCONVERSATION", MODEOFCONVERSATION);
                // const response = await fetch(apiConfig.apiUrls.chatEndpoint, {
                const response = await fetch(BACKEND_URL + '/chat' || 'https://aiservice.yaraamanager.com/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        // service: apiConfig.service || "niftyhms",
                        question: text,
                        visitor_id: visitorId,
                        mode:MODEOFCONVERSATION
                    })
                });
                const responseData = await response.json();
                // endChatBtn.style.display = 'flex';
        
                if (!response.ok) {
                    // Store user_id in localStorage
                    if (responseData.conversation_id) {
                        localStorage.setItem(CONVERSATION_ID_KEY, responseData.conversation_id);
                    }
                    throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(responseData)}`);
                }
        
                // Check if response has the expected format
                if (!responseData.response && responseData.answer) {
                    // If backend sends 'answer' instead of 'response'
                    return responseData.answer;
                } else if (!responseData.response) {
                    console.error('Unexpected response format:', responseData);
                    return 'Sorry, I received an unexpected response format. Please try again.';
                }
        
                return responseData.response;
            } catch (error) {
                console.error('Error in fetchAnswer:', error);
                appendChatBubble('bot', 'Sorry, I encountered an error. Please try again.');
                return null;
            }
        }
        
        // Reset the UI to the idle state
        function resetUI() {
          textArea.value = "";
          video.style.display = "none";
          videoIdle.style.display = "block";
          videoIdle.play();
        }
        
        /////////////////////from here code for the microphone handling/////////////////////////
        
        // Constants for configuration
        // const VOICE_MIN_DECIBELS = -45;
        const SILENCE_THRESHOLD = 5;
        const SILENCE_DURATION = 2000;
        const MAX_RECORDING_DURATION = 20000;
        
        // Voice command constants
        const VOICE_COMMANDS = {
            STOP: ['stop', 'pause', 'halt', 'stop it', 'please stop', 'top', 'hop', 'pot', 'op']
        };
        // Much lower threshold to make command recognition extremely sensitive
        const COMMAND_CONFIDENCE_THRESHOLD = 0.3;
        
        let mediaRecorder;
        let audioChunks = [];
        let isRecording = false;
        let isListeningForCommands = false;
        let audioContext, analyser, sourceNode;
        let stream;
        lastSoundTime;
        let commandRecognizer = null;
        
        const startMicrophone = async () => {
            if (!MICONLY) return;
            preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
            if (preferences.microphoneEnabled === true) {
                // If we're already listening for the next question, don't start recording
                // if (isListeningForNextQuestion) {
                //     console.log('Already listening for next question, not starting recording');
                //     return;
                // }
                await startRecording();
            }
        };
        // const startMicrophone = async () => {
        //     if (!MICONLY) return;
        
        //     try {
        //         preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
        //     } catch (e) {
        //         console.error("Failed to parse audio preferences:", e);
        //         preferences = {}; // Reset if corrupted
        //     }
        
        //     if (preferences.microphoneEnabled === true) {
        //         if (isListeningForNextQuestion) {
        //             console.log('Already listening for next question, not starting recording');
        //             return;
        //         }
        
        //         try {
        //             await startRecording();
        //         } catch (err) {
        //             console.error("Error while starting recording:", err);
        //         }
        //     }
        // };
        
        const startMicrophoneOnClick = async () => {
            if (!MICONLY) return;
        
            try {
                preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
            } catch (e) {
                console.error("Failed to parse audio preferences:", e);
                preferences = {};
            }
        
            // Toggle microphone state
            preferences.microphoneEnabled = !preferences.microphoneEnabled;
        
            // Save preferences
            localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
        
            // Update UI
            updateMicIcon();
        
            // Start or stop microphone accordingly
            if (preferences.microphoneEnabled) {
                await startMicrophone();
            } else {
                try {
                    stopRecording();
                } catch (err) {
                    console.error("Error stopping recording:", err);
                }
            }
        };
        
        // const startMicrophoneonclick = async () => {
        //     if (!MICONLY) return;
        //     preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
        //     preferences.microphoneEnabled = !preferences.microphoneEnabled;
        //     localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
        //     updateMicIcon();
        //     if (preferences.microphoneEnabled) {
        //         startMicrophone();
        //     }else if(!preferences.microphoneEnabled) {
        //         stopRecording();
        //     }
        // };
        
        const updateMicIcon = () => {
            preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
            const muteLine = document.getElementById("mute-line");
            if (muteLine) {
                muteLine.style.display = preferences.microphoneEnabled ? "none" : "block";
                stopWaveAnimation();
            }
        };
        
        // Function to show wave animation
        function startWaveAnimation() {
            micControl.classList.add("active");
            
            // Reset animation to ensure it starts fresh each time
            micControl.style.animation = 'none';
            micControl.offsetHeight; // Trigger reflow
            micControl.style.animation = null;
        }
        
        // Function to hide wave animation
        function stopWaveAnimation() {
            micControl.classList.remove("active");
        }
        
        function detectFirstSpeech() {
            const bufferLength = analyser.fftSize;
            const dataArray = new Uint8Array(bufferLength);
        
            function checkSpeechStart() {
                analyser.getByteTimeDomainData(dataArray);
        
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const val = (dataArray[i] - 128) / 128;
                    sum += val * val;
                }
                const rms = Math.sqrt(sum / bufferLength);
        
                const THRESHOLD = 0.007; // Lower this if needed (e.g., 0.005 for very quiet voices)
        
                if (rms > THRESHOLD) {
                    console.log("🎤 Soft voice detected...");
                    startedSpeaking = true;
                    lastSoundTime = Date.now();
        
                    beginRecording();   // Start actual audio recording
                    detectSilence();    // Start silence detection
        
                    if (speechDetectionFrameId) {
                        cancelAnimationFrame(speechDetectionFrameId);
                        speechDetectionFrameId = null;
                    }
        
                    return;
                }
        
                // Keep checking
                if (!startedSpeaking) {
                    speechDetectionFrameId = requestAnimationFrame(checkSpeechStart);
                }
            }
        
            // Cancel leftover loop
            if (speechDetectionFrameId) {
                cancelAnimationFrame(speechDetectionFrameId);
                speechDetectionFrameId = null;
            }
        
            checkSpeechStart(); // 🔁 Begin loop
        }
        
        
        // function detectFirstSpeech() {
        //     const bufferLength = analyser.frequencyBinCount;
        //     const dataArray = new Uint8Array(bufferLength);
        
        //     function checkSpeechStart() {
        //         analyser.getByteFrequencyData(dataArray);
        
        //         for (let i = 0; i < bufferLength; i++) {
        //             if (dataArray[i] > SILENCE_THRESHOLD) {
        //                 console.log("User started speaking...");
        //                 startedSpeaking = true;
        //                 lastSoundTime = Date.now();
        //                 beginRecording();  // 👈 Actually start MediaRecorder
        //                 detectSilence();   // 👈 Start silence detection now
        //                 return;
        //             }
        //         }
        
        //         if (!startedSpeaking) {
        //             requestAnimationFrame(checkSpeechStart);
        //         }
        //     }
        
        //     checkSpeechStart();
        // }
        // function stopRecording() {
        //     clearTimeout(initialSpeechTimeoutId);
        //     clearInterval(silenceCheckInterval);
            
        //     if (mediaRecorder?.state !== 'inactive') {
        //         mediaRecorder.stop(); // Triggers onstop → processRecordedAudio()
        //     }
            
        //     stream?.getTracks().forEach(track => track.stop());
        //     stopWaveAnimation();
        // }
        function stopRecording() {
            clearTimeout(initialSpeechTimeoutId);
            clearInterval(silenceCheckInterval);
        
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
            isRecording = false;
            if (sourceNode) {
                sourceNode.disconnect();
            }
            if (audioContext) {
                audioContext.close().catch(err => console.error("Error closing audio context:", err));
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            stopWaveAnimation();
        }
        
        function calculateRMS(dataArray) {
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const val = (dataArray[i] - 128) / 128;
                sum += val * val;
            }
            return Math.sqrt(sum / dataArray.length);
        }
        function startSilenceDetection() {
            silenceCheckInterval = setInterval(() => {
                if (!isRealSpeech) return; // Ignore noise-only intervals ✅
        
                const timeSinceLastSound = Date.now() - lastSoundTime;
                if (timeSinceLastSound > SILENCE_TIMEOUT) {
                    stopRecording();
                }
            }, 100);
        }
        function detectSpeech() {
            const dataArray = new Uint8Array(analyser.fftSize);
            
            const check = () => {
                analyser.getByteTimeDomainData(dataArray);
                const rms = calculateRMS(dataArray);
                const currentTime = Date.now();
        
                // 🎙️ Speech detected
                if (rms > RMS_THRESHOLD) {
                    lastSoundTime = currentTime; // Always update last sound time
                    
                    // First sound after silence
                    if (!isSpeaking) {
                        speechStartTime = currentTime;
                        isSpeaking = true;
                    }
                    
                    // Confirm speech after minimum duration
                    if (!isRecording && (currentTime - speechStartTime) > MIN_SPEECH_DURATION) {
                        beginRecording();
                    }
                }
        
                // 🔇 Check for silence timeout ONLY if recording
                if (isRecording && (currentTime - lastSoundTime) > SILENCE_TIMEOUT) {
                    stopRecording();
                }
        
                if (!isRecording || isSpeaking) {
                    requestAnimationFrame(check);
                }
            };
            
            check();
        }
        
        
        function beginRecording() {
            mediaRecorder = new MediaRecorder(stream);
        
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
        
            mediaRecorder.onstop = () => {
                processRecordedAudio();
            };
        
            mediaRecorder.start();
            isRecording = true;
        }
        function resetState() {
            startedSpeaking = false;
            isRecording = false;
            lastSoundTime = 0;
            audioChunks = [];
        }
        async function startRecording() {
            try {
                startWaveAnimation();
                resetState();
                
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048;
                analyser.minDecibels = VOICE_MIN_DECIBELS;
                
                sourceNode = audioContext.createMediaStreamSource(stream);
                sourceNode.connect(analyser);
        
                // ✅ Start 10s timeout (cancel if speech detected)
                initialSpeechTimeoutId = setTimeout(() => {
                    if (!startedSpeaking) {
                        console.log("No speech in 10s - stopping mic");
                        stopRecording();
                    }
                }, INITIAL_SPEECH_TIMEOUT);
        
                detectSpeech(); // Start listening for voice ✅
        
            } catch (err) {
                console.error("Microphone error:", err);
                stopWaveAnimation();
            }
        }
        function detectSilence() {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
        
            function checkAudio() {
                if (!isRecording) return;
        
                analyser.getByteFrequencyData(dataArray);
        
                let soundDetected = false;
        
                for (let i = 0; i < bufferLength; i++) {
                    if (dataArray[i] > SILENCE_THRESHOLD) {
                        soundDetected = true;
                        lastSoundTime = Date.now(); // Reset on sound
                        break;
                    }
                }
        
                // ⛔ Stop if silent too long
                if (!soundDetected && Date.now() - lastSoundTime > SILENCE_DURATION) {
                    stopRecording();
                    return;
                }
        
                requestAnimationFrame(checkAudio); // Keep checking
            }
        
            checkAudio(); // Start loop
        }
        
        // function stopRecording() {
        //     if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        //         mediaRecorder.stop();
        //     }
        //     isRecording = false;
        //     if (sourceNode) {
        //         sourceNode.disconnect();
        //     }
        //     if (audioContext) {
        //         audioContext.close().catch(err => console.error("Error closing audio context:", err));
        //     }
        //     if (stream) {
        //         stream.getTracks().forEach(track => track.stop());
        //     }
        //     stopWaveAnimation();
        // }
        
        async function processRecordedAudio() {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            stopWaveAnimation();
            if (audioBlob.size > 0) {
                const formData = new FormData();
                formData.append("audio", audioBlob, "voice_input.webm");
                try {
                    // let response = await fetch(""+'/process-audio', {
                    // let response = await fetch( apiConfig.backend_url + '/process-audio', {
                    let response = await fetch(BACKEND_URL + '/process-audio' || 'https://aiservice.yaraamanager.com/api/process-audio', {
                        method: 'POST',
                        body: formData
                    });
                    let data = await response.json();
                    if (data.success && data.text) {
                        localStorage.setItem("nifty_modeofconversation", "voice");
                        await searchtts(data.text);
                    } else {
                        console.error("Error:", data.error);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            }
        }
        
        
        // function detectSilence() {
        //     const bufferLength = analyser.frequencyBinCount;
        //     const dataArray = new Uint8Array(bufferLength);
        //     function checkAudio() {
        //         if (!isRecording) return;
        //         analyser.getByteFrequencyData(dataArray);
        //         let soundDetected = false;
        //         for (let i = 0; i < bufferLength; i++) {
        //             if (dataArray[i] > SILENCE_THRESHOLD) {
        //                 soundDetected = true;
        //                 lastSoundTime = Date.now();
        //                 break;
        //             }
        //         }
        //         if (!soundDetected && Date.now() - lastSoundTime > SILENCE_DURATION) {
        //             stopRecording();
        //             return;
        //         }
        //         requestAnimationFrame(checkAudio);
        //     }
        //     checkAudio();
        // }
        
        
        
        // function encodeWAV(samples, sampleRate) {
        //     const buffer = new ArrayBuffer(44 + samples.length * 2);
        //     const view = new DataView(buffer);
        
        //     function writeString(view, offset, str) {
        //         for (let i = 0; i < str.length; i++) {
        //             view.setUint8(offset + i, str.charCodeAt(i));
        //         }
        //     }
        
        //     writeString(view, 0, 'RIFF');
        //     view.setUint32(4, 36 + samples.length * 2, true);
        //     writeString(view, 8, 'WAVE');
        //     writeString(view, 12, 'fmt ');
        //     view.setUint32(16, 16, true);
        //     view.setUint16(20, 1, true);
        //     view.setUint16(22, 1, true);
        //     view.setUint32(24, sampleRate, true);
        //     view.setUint32(28, sampleRate * 2, true);
        //     view.setUint16(32, 2, true);
        //     view.setUint16(34, 16, true);
        //     writeString(view, 36, 'data');
        //     view.setUint32(40, samples.length * 2, true);
        
        //     let offset = 44;
        //     for (let i = 0; i < samples.length; i++) {
        //         view.setInt16(offset, samples[i] * 0x7FFF, true);
        //         offset += 2;
        //     }
        
        //     return new Blob([view], { type: 'audio/wav' });
        // }
        
        // async function processRecordedAudio() {
        //     stopWaveAnimation();
        
        //     if (!rawAudioBuffer || rawAudioBuffer.length === 0) {
        //         console.warn("No audio buffer to process.");
        //         return;
        //     }
        
        //     const mergedSamples = mergeBuffers(rawAudioBuffer); // Combine chunks into one
        //     const wavBlob = encodeWAV(mergedSamples, audioContext.sampleRate); // Encode to WAV
        
        //     const formData = new FormData();
        //     formData.append("audio", wavBlob, "voice_input.wav");
        
        //     try {
        //         let response = await fetch(BACKEND_URL + '/process-audio' || 'https://aiservice.yaraamanager.com/api/process-audio', {
        //             method: 'POST',
        //             body: formData
        //         });
        //         let data = await response.json();
        //         if (data.success && data.text) {
        //             localStorage.setItem("nifty_modeofconversation", "voice");
        //             await searchtts(data.text);
        //         } else {
        //             console.error("Error:", data.error);
        //         }
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //     }
        // }
        
        
        micControl.addEventListener("click", startMicrophoneOnClick);
        document.addEventListener("DOMContentLoaded", updateMicIcon);
        
        //////////////end of the code of the microphone handling ////////////////
        
        // Close chat container when close button is clicked
        closeButton.addEventListener("click", () => {
          chatContainer.classList.remove("active");
          closeButton.style.display = "none";
          chatButton.style.transform = "scale(1)"; // Show button again
        });
        
        // Add stop button event listener
        stopButton.addEventListener("click", stopPlayback);
        
        // Function to stop playback stop speaker
        function stopPlayback() {
            isPlaying = false;
        
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio.src = ""; // Forces audio to stop
                audio.load(); // Reloads with no source
            }
        
            if (video) {
                video.pause();
                video.currentTime = 0; // Reset video to the beginning
            }
        
            video.style.display = "none";
            videoIdle.style.display = "block";
            videoIdle.play();
        
            currentAudio = null;
            stopButton.style.display = "none";
            enableInputControls();
        
            // Stop listening for voice commands but immediately start listening for new questions
            // stopListeningForCommands();
        
            // Show a message that the system is ready for the next question
            // showReadyForQuestionIndicator();
        
            // Start microphone for the next question
            // startListeningForNextQuestion();
            startMicrophone();
        }
        
        //updated localstorage setting
        function storeChatMessage(user, message, type = 'chat') {
            let storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
        
            if (type === 'registration') {
                // Store registration data directly without normalization
                storedHistory.push({
                    type: 'registration',
                    data: message // message here is the registration data object
                });
                isUserRegistered = true;
            } else {
                // Regular chat message handling
                const normalizedMessage = typeof message === 'string' ? message.trim().toLowerCase() : message;
        
                if (storedHistory.length > 0) {
                    let lastEntry = storedHistory[storedHistory.length - 1];
                    if (lastEntry.type === 'chat' &&
                        lastEntry.user === user &&
                        lastEntry.message.trim().toLowerCase() === normalizedMessage) {
                        lastEntry.count = (lastEntry.count || 1) + 1;
                        storedHistory[storedHistory.length - 1] = lastEntry;
                        localStorage.setItem("chat_history", JSON.stringify(storedHistory));
                        return;
                    }
                }
                storedHistory.push({
                    type: 'chat',
                    user,
                    message: typeof message === 'string' ? message : JSON.stringify(message),
                    count: 1
                });
            }
        
            localStorage.setItem("chat_history", JSON.stringify(storedHistory));
        }
        // newchatIcon.addEventListener('click', startNewChat);
        
        // Function to handle starting a new chat
        function startNewChat() {
            localStorage.removeItem('chat_history');
            localStorage.removeItem(VISITOR_ID_KEY); // Clear user_id as well
            chatHistory.innerHTML = '';
            registrationData = {};
            isUserRegistered = false;
            endChatIcon.disabled = false;
            registrationStep = 'greeting';
            localStorage.setItem("registrationStep", registrationStep);
            disableInputControls();
        
        
            // Only show greeting if chat container is active
            if (chatContainer.classList.contains("active")) {
                const registrationstepss = localStorage.getItem("registrationStep");
                if(registrationstepss){
                    // console.log("you are in registration steps not able to start new chat");
                }
                const welcomeMessage = messages.welcome;
                const namemessage = messages.namePrompt;
                appendChatBubble("bot", `${welcomeMessage} ${namemessage}`);
                disableInputControls();
        
                // Use preloaded audio if available
                if (preloadedWelcomeAudio && preloadedWelcomeAudio.length > 0) {
                    const welcomeText = `${welcomeMessage} , ${namemessage}`;
                    playPreloadedWelcomeAudio(welcomeText, preloadedWelcomeAudio).then(() => {
                        enableInputControls();
                        startMicrophone();
                    });
                } else {
                    // // Fallback to regular TTS
                    processAndPlayTTS(`${welcomeMessage}, ${namemessage}`).then(() => {
                        enableInputControls();
                        startMicrophone();
                    });
                    
                }
            } else {
            //    startNewChat ();
            startnewchatwithchatbutton();
            }
        }
        
        // End Chat functionality
        function setupEndChatFunctionality() {
            if (endChatIcon) {
                endChatIcon.addEventListener('click', function() {
                    if(document.getElementsByClassName("confirmation-popup-chat").length > 0){
                        return;
                    }
                    chatHistory.scrollTop = 0;
                    chatHistory.style.overflowY = "hidden";
                    showEmailCapture();
                });
            }
            // Use event delegation for the confirmation buttons
            document.addEventListener('click', function(event) {
                if (event.target && event.target.id === 'confirm-end-chat') {
                    const email = event.target.getAttribute('data-email');
                    handleEndChatConfirmation(email);
                } else if (event.target && event.target.id === 'cancel-end-chat') {
                    handleEndChatCancel();
                }
            });
        }
        
        // Show email collection popup
        function showEmailCapture() {
            const emailCaptureHtml = `
                <div class="confirmation-popup-chat">
                    <div class="confirmation-content">
                        <p>${messages.emailPrompt}</p>
                        <input type="email" id="user-email-input" placeholder="Enter your email" required>
                        <p class="error-message">Invalid email format</p>
                        <div class="confirmation-buttons">
                            <button class="" id="submit-email-btn"><b>Submit</b></button>
                            <button class="cancel-btn" id="cancel-email-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            `;
            chatHistory.insertAdjacentHTML('beforeend', emailCaptureHtml);
            const emailInput = document.querySelector('#user-email-input');
            emailInput.focus();
        
             // Add email validation on input change
             emailInput.addEventListener('input', function() {
                const email = this.value.trim();
                const isValid = isValidEmail(email);
        
                // Update submit button state
                submitButton.disabled = !isValid;
        
                // Show/hide error message
                errorMessage.style.display = email === '' ? 'none' : (isValid ? 'none' : 'block');
        
                // Update input styling
                this.classList.toggle('invalid', !isValid && email !== '');
            });
        
            // Handle submit button click
            document.querySelector('#submit-email-btn').addEventListener('click', () => {
                const email = emailInput.value.trim();
                if (isValidEmail(email)) {
                    const popup = document.querySelector('.confirmation-popup-chat');
                    popup.remove();
                    handleEndChatConfirmation(email);
                    // showEndChatConfirmation(email);
                } else {
                    emailInput.style.border = '1px solid red';
                }
            });
        
            // Handle cancel button click
            document.querySelector('#cancel-email-btn').addEventListener('click', () => {
                const popup = document.querySelector('.confirmation-popup-chat');
                popup.remove();
                endChatIcon.disabled = false;
                chatHistory.style.overflowY = "auto";
            });
        }
        
        // // Show confirmation popup
        // function showEndChatConfirmation(email) {
        //     const confirmationHtml = `
        //         <div class="confirmation-popup-chat">
        //             <div class="confirmation-content">
        //                 <p>Are You Sure Want to end chat?</p>
        //                 <div class="confirmation-buttons">
        //                     <button class="" id="confirm-end-chat" data-email="${email}">Yes</button>
        //                     <button class="" id="cancel-end-chat">No</button>
        //                 </div>
        //             </div>
        //         </div>
        //     `;
        //     endChatIcon.disabled = true;
        //     chatHistory.insertAdjacentHTML('beforeend', confirmationHtml);
        //     document.querySelector('#confirm-end-chat').focus();
        // }
        
        // Handle cancel button click
        function handleEndChatCancel() {
            endChatIcon.disabled = false;
            // Find and remove the confirmation popup
            const confirmationPopup = document.querySelector('.confirmation-popup-chat');
        
            if (confirmationPopup) {
                confirmationPopup.remove();
            }
            chatHistory.style.overflowY = "auto";
        }
        
        // Handle confirmation button click
        async function handleEndChatConfirmation(email) {
            endChatIcon.disabled = true;
            const confirmationPopup = document.querySelector('.confirmation-popup-chat');
            if (confirmationPopup) {
                confirmationPopup.remove();
            }
        
            try {
                // Call API to log end of chat (if needed)
                const visitorId = localStorage.getItem(VISITOR_ID_KEY);
                const conversationID = localStorage.getItem(CONVERSATION_ID_KEY);
                disableInputControls();
                block_end_chat();
        
                // Create animated thank you message
                showThankYouMessage();
                await fetch(BACKEND_URL + '/chat-end' || 'https://aiservice.yaraamanager.com/api/chat-end', {
                    // await fetch(apiConfig.backend_url + '/chat-end' || 'https://aiservice.yaraamanager.com/api/chat-end', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        visitor_id: visitorId,
                        conversation_id: conversationID,
                        email: email
                    })
                }).catch(error => console.error('Error logging end chat:', error));
        
            } catch (error) {
                console.error('Error in API call:', error);
            }
        }
        
        // Function to show animated thank you message
        function showThankYouMessage() {
            // Create thank you message HTML
            localStorage.removeItem('chat_history');
            localStorage.removeItem(CONVERSATION_ID_KEY);
        
        
            const thankYouHtml = `
                <div class="thank-you-container">
                    <div class="particles">
                        ${createParticles()}
                    </div>
                    <div class="thank-you-content">
                        <h5 class="thank-you-title">Thank You!</h5>
                        <p class="thank-you-message">Thank you for chatting with us. We appreciate your time and hope to assist you again soon!</p>
                         <button type="button" id="new-chat" class="control-btn new-chat-btn" title="new Chat">
                            <svg class="btn-icon" viewBox="0 0 24 24">
                                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>New Chat</span>
                        </button>
                        <div class="thank-you-decoration">
                            <div class="decoration-line"></div>
                            <div class="decoration-dot"></div>
                            <div class="decoration-line"></div>
                        </div>
                    </div>
                </div>
            `;
            // Append to chat history
            chatHistory.insertAdjacentHTML('beforeend', thankYouHtml);
            ENDCHATTHINGS = true;
            document.getElementById('new-chat').addEventListener('click', startNewChat);
            document.getElementById('new-chat').focus();
        
            // Play thank you audio if available
            const thankYouMessage = "Thank you for chatting with us ,We appreciate your time and hope to assist you again soon!";
            // processAndPlayTTS(thankYouMessage).catch(error => console.error('Error playing thank you audio:', error));
            processAndPlayTTS(thankYouMessage).catch(error => {
                console.error('Error playing thank you audio:', error);
            });
        }
        
        // Function to create particle elements
        function createParticles() {
            let particlesHtml = '';
            const particleCount = 150;
        
            for (let i = 0; i < particleCount; i++) {
                const size = Math.floor(Math.random() * 10) + 5; // Random size between 5-15px
                const left = Math.floor(Math.random() * 100); // Random positionc
                const top = Math.floor(Math.random() * 100);
                const delay = Math.random() * 2; // Random animation delay
        
                particlesHtml += `
                    <div class="particle" style="
                        width: ${size}px;
                        height: ${size}px;
                        left: ${left}%;
                        top: ${top}%;
                        animation-delay: ${delay}s;
                        opacity: ${Math.random() * 0.5 + 0.3};
                    "></div>
                `;
            }
        
            return particlesHtml;
        }
        
        // Add Enter key handler for textarea
        textArea.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
            resetUI();
          }
        });
        
        ///script for do onelime text area when there is less width
        function adjustTextareaRows() {
            endChatIcon.disabled = false;
          const textarea = document.getElementById("text");
          if (window.innerWidth < 800) {
            textarea.rows = 1;
          } else {
            textarea.rows = 2;
          }
        }
        
        // Run on page load and window resize
        window.addEventListener("load", adjustTextareaRows);
        window.addEventListener("resize", adjustTextareaRows);
        
        function showLoadingIndicator() {
            const loadingBubble = document.createElement('div');
            loadingBubble.className = 'chat-bubble bot loading';
            loadingBubble.innerHTML = `
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            document.querySelector('.chat_history').appendChild(loadingBubble);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
        
        function removeLoadingIndicator() {
            const loadingBubble = document.querySelector('.chat-bubble.bot.loading');
            if (loadingBubble) {
                loadingBubble.remove();
            }
        }
        
        // Initialize audio preferences and preload welcome message audio
        function initAudioPreferences() {
            if (MICONLY) {
                const savedPreferences = localStorage.getItem(AUDIO_PREFERENCES_KEY);
                if (savedPreferences) {
                    const { isMuted } = JSON.parse(savedPreferences);
                    updateAudioControlUI(isMuted);
                } else {
                    // Default to audio enabled
                    localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify({
                        isMuted: false,
                        microphoneEnabled: true
                    }));
                    updateAudioControlUI(false);
                }
        
                // Preload welcome message audio to reduce initial delay
                preloadWelcomeMessageAudio();
            }
        }
        
        // Global variable to store preloaded welcome audio
        let preloadedWelcomeAudio = [];
        
        // Preload welcome message audio
        async function preloadWelcomeMessageAudio() {
            try {
                // Only preload if audio is not muted
                const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
                if (isMuted) return;
        
                // Wait for avatar data to be loaded
                if (!avatarData || !avatarData.data) {
                    setTimeout(preloadWelcomeMessageAudio, 500); // Try again in 500ms
                    return;
                }
        
                // Combine welcome and name prompt messages
                const welcomeText = `${messages.welcome} , ${messages.namePrompt}`;
        
                // Split into sentences for more efficient loading
                const sentences = splitIntoSentences(welcomeText);
        
                // Start preloading all sentences in parallel
                const audioPromises = sentences.map(sentence =>
                    fetchSingleTTS(sentence)
                );
        
                // Store the preloaded audio URLs in the global variable
                preloadedWelcomeAudio = await Promise.all(audioPromises);
                console.log("Welcome message audio preloaded successfully");
            } catch (err) {
                console.error("Error preloading welcome audio:", err);
            }
        }
        
        // Update UI based on audio preferences
        function updateAudioControlUI(isMuted) {
            if(MICONLY){
                if (isMuted) {
                    universalAudioControl.classList.add('muted');
                } else {
                    universalAudioControl.classList.remove('muted');
                }
            }
        }
        
        universalAudioControl.addEventListener('click', () => {
            if (MICONLY) {
                preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                preferences.isMuted = !preferences.isMuted;
        
                localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
                updateAudioControlUI(preferences.isMuted);
                startMicrophone();
        
                if (preferences.isMuted) {
                    stopPlayback(); // Stop both audio and video
                    enableInputControls();
                }
            }
        });
        
        // Add registration handling
        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const currentStep = this.closest('.form-step');
                const nextStep = currentStep.nextElementSibling;
        
                const input = currentStep.querySelector('input');
                if (input.checkValidity()) {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    userData[input.id.replace('user-', '')] = input.value;
                }
            });
        });
        
        function showChatInterface() {
            registrationForm.style.display = 'none';
            chatInterface.style.display = 'block';
        }
        
        async function startChat() {
            const welcomeBack = messages.welcomeBack.replace('{name}', userData.name);
            appendChatBubble("bot", welcomeBack);
            disableInputControls();
        
            await processAndPlayTTS(welcomeBack);
            enableInputControls();
            await startMicrophone();
            focusTextArea();
        }
        
        async function handleRegistrationStep(text) {
            open_end_chat();
        
            switch (registrationStep) {
                case 'greeting':
                    registrationData.username = text;
                    localStorage.setItem("registrationData", JSON.stringify(registrationData));
                    appendChatBubble("user", text);
                    disableInputControls();
                    const phonePrompt = messages.phonePrompt.replace('{name}', text);
                    appendChatBubble("bot", phonePrompt);
                    registrationStep = 'phone';
                    localStorage.setItem("registrationStep", registrationStep);
                    await processAndPlayTTS(phonePrompt);
                    enableInputControls();
                    focusTextArea();
                    await startMicrophone();
                    break;
        
                case 'phone':
                    // const cleannumber = text.trim().replace(/\s+/g, '');
                    const cleannumber = text.trim().replace(/[\s-]+/g, '');
                    if (!isValidPhone(cleannumber)) {
                        appendChatBubble("user", cleannumber);
                        disableInputControls();
                        const invalidPhoneMsg = "That doesn't look like a valid phone number. Could you please check and try again?";
                        appendChatBubble("bot", invalidPhoneMsg);
                        await processAndPlayTTS(invalidPhoneMsg);
                        enableInputControls();
                        focusTextArea();
                        await startMicrophone();
                        return;
                    }
                    registrationData.phone = cleannumber;
                    localStorage.setItem("registrationData", JSON.stringify(registrationData));
                    appendChatBubble("user", cleannumber);
                    await handleRegistration(registrationData);
                    focusTextArea();
                    await startMicrophone();
                    break;
            }
        }
        
        // Add validation helper functions
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function isValidPhone(phone) {
            const phoneRegex = /^\+?\d{6,15}$/; // Allows optional + sign and 6-15 digits
            return phoneRegex.test(phone.replace(/\s+/g, ''));
        }
        
        // Add function to check if user_id exists
        function hasValidUserId() {
            return !!localStorage.getItem(VISITOR_ID_KEY);
        }
        
        async function showInitialGreeting() {
            if (!isUserRegistered && !hasGreeting) {
                registrationStep = 'greeting';
                localStorage.setItem("registrationStep", registrationStep);
                appendChatBubble("bot",`${ messages.welcome} ${messages.namePrompt}`);
                disableInputControls();
                // appendChatBubble("bot", messages.namePrompt);
                await Promise.all([
                    processAndPlayTTS(`${messages.welcome} , ${messages.namePrompt}`),
                    // processAndPlayTTS(messages.namePrompt)
                ]);
                await startMicrophone();
            } else if (isUserRegistered && !hasGreeting) {
                const welcomeBack = messages.welcomeBack.replace('{name}', userData.name || '');
                appendChatBubble("bot", welcomeBack);
                focusTextArea();
                disableInputControls();
                await processAndPlayTTS(welcomeBack);
                enableInputControls();
                await startMicrophone();
            }
            hasGreeting = true;
        }
        
        async function handleRegistration(registrationData) {
            try {
                // const response = await fetch(apiConfig.apiUrls.registerEndpoint, {
                const response = await fetch(BACKEND_URL + '/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registrationData)
                });
        
                if (response.ok) {
                    const responseData = await response.json();
        
                    // Store user_id in localStorage
                    if (responseData.visitor_id) {
                        localStorage.setItem(VISITOR_ID_KEY, responseData.visitor_id);
                        localStorage.setItem(CONVERSATION_ID_KEY, responseData.conversation_id);
                    }
        
                    // Remove saved registration data after successful registration
                    localStorage.removeItem("registrationData");
                    localStorage.removeItem("registrationStep");
        
                    const successMsg = `Thank you, ${registrationData.username}! Your information is securely saved. How may I assist you today?`;
                    appendChatBubble("bot", successMsg);
                    focusTextArea();
                    registrationStep = '';
                    registrationData = {};
                    await processAndPlayTTS(successMsg);
                    enableInputControls();
                    focusTextArea();
                    open_end_chat();
        
                } else {
                    const errorText = await response.text();
                    console.error('Registration failed:', errorText);
                    const errorMsg = "I apologize, but I encountered an issue saving your information.";
                    appendChatBubble("bot", errorMsg);
                    registrationStep = 'greeting';
                    localStorage.setItem("registrationStep", registrationStep);
                    registrationData = {}; // Clear the data if registration failed
                    await processAndPlayTTS(errorMsg);
                    enableInputControls();
                    focusTextArea();
                    open_end_chat()
                }
            } catch (error) {
                console.error('Registration error:', error);
                const errorMsg = "I apologize, but I encountered an issue saving your information. Could we start over with your name?";
                appendChatBubble("bot", errorMsg);
                await processAndPlayTTS(errorMsg);
                registrationStep = 'greeting';
                localStorage.setItem("registrationStep", registrationStep);
                registrationData = {}; // Clear the data if registration failed
                enableInputControls();
                focusTextArea();
                open_end_chat()
            }
        }
        
        function appendChatBubbleFromHistory(user, message, count) {
          const bubble = document.createElement('div');
          bubble.className = `chat-bubble ${user}`;
          let displayMessage = message;
          if (count > 1) {
              displayMessage += ` (x${count})`;
          }
          bubble.innerHTML = displayMessage;
          bubble.setAttribute("data-message", message);
          bubble.setAttribute("data-count", count);
          chatHistory.appendChild(bubble);
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }
        
        function loadChatHistory() {
          let storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
        
          // Clear current UI before loading (optional)
          chatHistory.innerHTML = "";
          storedHistory.forEach(entry => {
              appendChatBubbleFromHistory(entry.user, entry.message, entry.count);
          });
        }
    }
   const chatbotContainer = document.createElement("div");
   chatbotContainer.id = "chatbot-container";
   document.body.appendChild(chatbotContainer);
  
    // Expose the init method so that it can be called externally
    window.ChatbotWidget = {
      init: initWidget
    };
  })();
  
  // Wait for DOM to be fully loaded before initializing
  document.addEventListener('DOMContentLoaded', function() {
    // Create container if it doesn't exist
    if (!document.getElementById('chatbot-container')) {
      const chatbotContainer = document.createElement("div");
      chatbotContainer.id = "chatbot-container";
      document.body.appendChild(chatbotContainer);
    }
    
    // Initialize with a slight delay to ensure everything is loaded
    setTimeout(function() {
      ChatbotWidget.init({
        containerId: 'chatbot-container', 
        cssUrl: 'https://dasmeet9.github.io/model/style.css'
      });
    }, 500);
  });

  // Use a production URL for backend, not localhost
  const BACKENDURL = 'http://127.0.0.1:5000/api';
