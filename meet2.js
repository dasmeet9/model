// chatbot-widget.js
(function() {
    // Default configuration options
    var defaults = {
      containerId: 'chatbot-container',  // The element ID where the widget will be injected
      cssUrl: 'https://dasmeet9.github.io/model/style.css'  // The URL to the external CSS file
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
  
    // Dynamically load an external CSS file
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
  
      // Get or create the container element
      var container = document.getElementById(config.containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = config.containerId;
        document.body.appendChild(container);
      }
  
      // Inject the widget HTML into the container
      createWidgetHTML(container, config);
  
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
const AUDIO_PREFERENCES_KEY = 'audio_preferences';
const registrationForm = document.getElementById("registration-form");
const chatInterface = document.getElementById("chat-interface");
const BACKEND_URL = 'http://127.0.0.1:5000'
let ENDCHATTHINGS = false;
let MICONLY = true;
let AVATAR_ENABLED = true;
// const endChatBtn = document.querySelector("#end-chat-btn");
let userData = {};
let registrationData = {};
let registrationStep = '';
let isUserRegistered = false;
let isPlaying = false;
let currentAudio = null;
let messageQueue = [];
let hasGreeting = false;
let currentAudioElement = null; // Add this global variable
console.log(window.location.hostname)
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


//solve the issue in the iphone video 

// Add autoplay fix for videos
// document.addEventListener("DOMContentLoaded", function () {
//     let videos = document.querySelectorAll("video");
//     videos.forEach(video => {
//         video.play().catch(error => console.log("Autoplay blocked: ", error));
//     });
// });

// check for the endchatbutton 
// const endchatttbtn = localStorage.getItem("registrationStep");
// if (!endchatttbtn) {
//     open_end_chat();
// }else{
//     block_end_chat();
// }
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
    emailPrompt: "Pleasure to meet you, {name}! Could you share your email address?",
    phonePrompt: "Thank you! Lastly, may I have your Mobile Number?"
};

// Load saved registration data from localStorage
const savedRegistrationData = localStorage.getItem("registrationData");
const savedregistrationStep = localStorage.getItem("registrationStep");
registrationData = savedRegistrationData ? JSON.parse(savedRegistrationData) : {};
registrationStep = savedregistrationStep || '';

const messages = {
    ...defaultMessages,
    ...(apiConfig.messages || {})
};
// Update video paths
// const videoPath = avatarSpeaking;
// const avatarStyle = avatarIdle;
let avatarData = {};
const Settingss = async()=>{
    let Domain = window.location.hostname;
    console.log(Domain);
    const api_url = 'http://192.168.1.14:5000/api/ai/details';
    const response = await fetch(api_url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'Active-Domain': Domain }
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
}
const fetchAvatarData = async () => {
    avatarData = await Settingss();
    if (avatarData.error) {
        console.log("Error fetching avatar data:", avatarData.error);
        chatButton.style.display = "none";
        document.getElementById("chat-button").style.display = "none";
        return;
    }
    console.log("Avatar Data Ready:", avatarData);
};

// Wait for data before using it
(async () => {
    await fetchAvatarData();
    console.log("Avatar Speaking:", avatarData.data.avatar_speaking);
    video.src = avatarData.data.avatar_speaking;
    videoIdle.src = avatarData.data.avatar_idle;
    document.getElementById("avatar-name-text").textContent = avatarData.data.avatar_name;
    document.getElementById("avatar-designation-text").textContent = avatarData.data.avatar_designation;
    document.getElementById("avatar-logo").src = avatarData.data.logo;
    MICONLY = avatarData.data.is_mic_only;
    AVATAR_ENABLED = avatarData.data.avatar_enable;
    if (!MICONLY) {
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
    if (!AVATAR_ENABLED) {
        document.getElementById('avatar-container').style.display = "none";
        document.getElementById('avatar-videoa').style.display = "none";
        document.getElementsByClassName('r')[0].style.width = "auto";
        MICONLY = false;
        if(!MICONLY) {
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
    }

// Update the small video in the chat button
const buttonVideo = document.getElementById('avatar-videoa');
if (buttonVideo) {
    buttonVideo.src = avatarData.data.avatar_idle;
}
})();
// Set video sources
console.log("avatarData" , avatarData);


video.playbackRate = 0.8; // Adjust video speed
videoIdle.play();
const audioURLs = [];

//from here handline the data of the localstirage
// Add constant for user ID storage
const VISITOR_ID_KEY = 'nifty_visitor_id';
const CONVERSATION_ID_KEY = 'nifty_conversation_id';
const STORAGE_TIMESTAMP_KEY = 'ai_agent_storage_timestamp';
const STORAGE_EXPIRY_TIME = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
const KEYS_TO_REMOVE = ["nifty_visitor_id", "chat_history", "audio_preferences", "ai_agent_storage_timestamp" , "nifty_conversation_id"];
// Function to check and clear storage
function checkAndClearStorage() {
    const lastClearTime = parseInt(localStorage.getItem(STORAGE_TIMESTAMP_KEY), 10) || 0;
    const currentTime = Date.now();

    if (!lastClearTime || (currentTime - lastClearTime) > STORAGE_EXPIRY_TIME) {

        ["nifty_user_id", "chat_history", "audio_preferences", "ai_agent_storage_timestamp" , "nifty_conversation_id"].forEach(key => {
            localStorage.removeItem(key);
        });

        localStorage.setItem(STORAGE_TIMESTAMP_KEY, currentTime.toString());
    } else {
    }
}

// Initialize storage cleanup on page load
document.addEventListener('DOMContentLoaded', function () {
    checkAndClearStorage();
    initAudioPreferences();
    loadChatHistory();
    setupEndChatFunctionality();
});
// microphone animation functionality should be shown from here
// ✅ Function to show wave animation
function startWaveAnimation() {
    micControl.classList.add("active");
}

// ✅ Function to hide wave animation
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
        // window.startnewchat = async function () {
        // If chat is already active, just return
        if (chatContainer.classList.contains("active")) {
            return;
        }
        if(ENDCHATTHINGS){
            console.log("end chat things");
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
            // Only show registration greeting for new users without existing greeting
            registrationStep = 'greeting';
            localStorage.setItem("registrationStep", registrationStep);
            appendChatBubble("bot", `${messages.welcome} ${messages.namePrompt}`);
            // appendChatBubble("bot", );
            // Promise.all([
            //     await processAndPlayTTS(`${messages.welcome} ${messages.namePrompt}`)
            //     // processAndPlayTTS(messages.namePrompt)
            // ]).then(() => {});
            startmicrophone();
        } else if (isUserRegistered && !hasGreeting) {
            // Only show welcome back message for registered users without existing greeting
            const welcomeBack = messages.welcomeBack.replace('{name}', userData.name);
            appendChatBubble("bot", welcomeBack);
            await processAndPlayTTS(welcomeBack);
            enableInputControls();
            focusTextArea();
        }
        enableInputControls();
        startmicrophone();
        focusTextArea();
        }
    
chatButton.addEventListener("click", startnewchatwithchatbutton);

// Add these new functions for input control
function disableInputControls() {
    textArea.disabled = true;
    textArea.style.opacity = "0.5";
    textArea.style.cursor = "not-allowed";
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
    if (MICONLY) {
        micControl.style.opacity = "0.5";
        micControl.style.pointerEvents = "none";
        micControl.style.cursor = "not-allowed";
        universalAudioControl.style.opacity = "0.5";
        universalAudioControl.disabled = true;
        universalAudioControl.style.cursor = "not-allowed";
    }
}

function enableInputControls() {
    textArea.disabled = false;
    textArea.style.opacity = "1";
    textArea.style.cursor = "text";
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
    submitButton.style.cursor = "pointer";
    if (MICONLY) {
        micControl.style.opacity = "1";
        micControl.style.pointerEvents = "auto";
        micControl.style.cursor = "pointer"; 
        universalAudioControl.style.opacity = "1";
        universalAudioControl.disabled = false;
        universalAudioControl.style.cursor = "pointer";
    }
   
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
// function stripHtmlTags(html) {
//     const temp = document.createElement('div');
//     console.log("temp1",temp);
//     temp.innerHTML = html;
//     console.log("temp2",temp);
//     let text = temp.textContent || temp.innerText || '';
//     console.log("temp3",text);
//     // Allow only letters, numbers, ".", ",", "!", and currency symbols
//     text = text.replace(/[^\w\d.,!₹$€£¥ ](https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/g, '').replace(/[^\w\d.,!₹$€£¥ ]/g, '');
//     console.log("temp4",text);
//     return text;
// }
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
    }else{
    try {
        appendChatBubble("user", text);
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
            startmicrophone();
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
            startmicrophone();
            focusTextArea();
            }
        }
    } catch (error) {
        console.error("Error in searchtts:", error);
        removeLoadingIndicator();
        const errorMessage = "I apologize, but I encountered an error. Could you please try again?";
        appendChatBubble("bot", errorMessage);
        await processAndPlayTTS(errorMessage);
        enableInputControls();
        focusTextArea();
    }
   }
}

// Function to process text and play corresponding audio with video
async function processAndPlayTTS(textResponse) {
    const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
    if (isMuted) return;
    if (!MICONLY) return;
    disableInputControls();

    try {
        const sentences = splitIntoSentences(textResponse);
        const audioURLs = await fetchAudioURLs(sentences);

        if (audioURLs.length) {
            await playAudioWithVideo(audioURLs);
        }
    } catch (error) {
        console.error("TTS processing error:", error);
    }
}

// // Function to split text into sentences
// function splitIntoSentences(text) {
//     return text.split(".")
//         .map(sentence => sentence.trim())
//         .filter(Boolean);
// }
function splitIntoSentences(text) {
    return text.split(".")
        .map(sentence => sentence.trim())
        .filter(Boolean)
        .map(sentence => sentence + ".");
}

// Function to fetch audio URLs from the API
async function fetchAudioURLs(sentences) {
    const audioURLs = [];

    for (const sentence of sentences) {
        try {
            // const response = await fetch(apiConfig.apiUrls.ttsEndpoint, {
            const response = await fetch(BACKEND_URL + '/tts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: sentence,
                // language: apiConfig.selected_language || 'english',
                language: '',
                gender: apiConfig.voice_gender || 'male'
            }),
        });
            const data = await response.json();
            audioURLs.push(data.access_audio || apiConfig.ttsErrorAudio || null);
        } catch (error) {
            console.error("Error fetching audio:", error);
            audioURLs.push(apiConfig.ttsErrorAudio || null);
        }
    }
    return audioURLs; // Remove null/undefined URLs
}

async function playAudioWithVideo(audioURLs) {
    if (MICONLY) {
        isPlaying = true;
    universalAudioControl.style.opacity = "1";
    universalAudioControl.disabled = false;
    video.playbackRate = 1; // Slow down video
    stopButton.style.display = "block";
    universalAudioControl.classList.add('playing');
    videoIdle.style.display = "none";
    video.style.display = "block";
    video.currentTime = 0; // Start video from the beginning

    const validAudioURLs = audioURLs.filter(Boolean);
    // if (!validAudioURLs.length) return alert('No audio could be generated.');
    if (!validAudioURLs.length){
        console.error('No audio could be generated.');
        isPlaying = false;
        stopButton.style.display = "none";
        universalAudioControl.classList.remove('playing');
        video.style.display = "none";
        videoIdle.style.display = "block";
        videoIdle.play();
        return;
    };

    try {
        for (let i = 0; i < validAudioURLs.length; i++) {
            if (!isPlaying) break;
            const currentAudioURL = validAudioURLs[i];
            audio.src = currentAudioURL;
            if (i === 0) {
                await Promise.all([
                    audio.playbackRate=1,
                    audio.play(), 
                    setTimeout(() => {
                        video.play() 
                    }, 1200),
                    // new Promise(resolve => setTimeout(() => resolve(video.play()), 1200))
                ]);
            }

            // Wait for audio to load
            await new Promise((resolve) => {
                audio.addEventListener('canplaythrough', resolve, { once: true });
                audio.load(); // Ensure the new source starts loading
            });

            // Play video and audio
            // await Promise.all([video.play(), audio.play()]);
            await Promise.all([
                audio.playbackRate=1,
                audio.play(), 
                video.play()
                // new Promise(resolve => setTimeout(() => resolve(video.play()), 1200))
            ]);

            // Wait for audio to finish
            await new Promise((resolve) => {
                audio.addEventListener('ended', resolve, { once: true });
            });

            // Pause video briefly between segments (except after last one)
            if (i < validAudioURLs.length - 1) {
                video.pause();
                await new Promise(resolve => setTimeout(resolve, 300));
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
    
    // if (!apiConfig.apiUrls?.chatEndpoint) {
    //     appendChatBubble('bot', 'Chat service not configured. Please contact administrator.');
    //     return null;
    // }

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
        let Domain = window.location.hostname;
        // console.log("MODEOFCONVERSATION", MODEOFCONVERSATION);
        // const response = await fetch(apiConfig.apiUrls.chatEndpoint, {
        const response = await fetch(BACKEND_URL + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Active-Domain': Domain },
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
// this code for the micriphone enable and the disable
// // Initialize SpeechRecognition API
// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// // Set language to English
// recognition.lang = "en-US";
// recognition.continuous = false; // Stop recognition after a single phrase
// recognition.interimResults = false; // Wait for the complete result
// // recognition.continuous = true; // can't stop until stop by their salves
// // recognition.interimResults = true; // that comes in the chunks of time live transcript

// const startmicrophone = () => {
//     const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
//     if (preferences.microphoneEnabled === true) {
//         recognition.start();
//     }
// };

// const startmicrophoneonclick = () => {
//     const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
//     // Toggle microphoneEnabled between true and false
//     preferences.microphoneEnabled = !preferences.microphoneEnabled;
//     localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
//     updateMicIcon(); // Update the icon based on the new state
//     // If microphoneEnabled is true, start the microphone
//     if (preferences.microphoneEnabled) {
//         startmicrophone();
//     }
// };

// const updateMicIcon = () => {
//     const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
//     const muteLine = document.getElementById("mute-line");

//     if (muteLine) {
//         // Show the slash if the mic is disabled, otherwise hide it
//         muteLine.style.display = preferences.microphoneEnabled ? "none" : "block";
//     }
// };

// // Set up event listener for button click
// micControl.addEventListener("click", startmicrophoneonclick);
// // Initialize the icon state when the page loads
// document.addEventListener("DOMContentLoaded", updateMicIcon);

// // On speech recognition result
// recognition.onresult = async (event) => {
//     const transcript = event.results[0][0].transcript; // Get the recognized text
//     // const transcript = event.results[event.results.length - 1][0].transcript; // Get the recognized text
//     localStorage.setItem("nifty_modeofconversation", "voice");
//     await searchtts(transcript);
// };

// // recognition.onresult = async (event) => {
// //     let registrationstep = localStorage.getItem("registrationstep") || "";
// //     if (registrationstep === "email" || registrationstep === "phone") {
// //         let transcript = event.results[0][0].transcript.trim(); // Trim leading/trailing spaces
// //         transcript = transcript.replace(/\s+/g, ''); // Remove all spaces
// //         await searchtts(transcript);
// //     }else{
// //         let transcript = event.results[0][0].transcript.trim(); // Trim leading/trailing spac
// //         await searchtts(transcript);
// //     }
// // };

// // Handle speech recognition errors
// recognition.onerror = async (event) => {
//   console.error("Speech recognition error:", event.error);
// //   const errorMessage = "Please check your microphone and try again.";
// //   await processAndPlayTTS(errorMessage);
//   enableInputControls();
// };

/////////////////////from ere start the code of the microphone handling/////////////////////////

// Constants for configuration
const VOICE_MIN_DECIBELS = -45;
const SILENCE_THRESHOLD = 5;
const SILENCE_DURATION = 2000;
const MAX_RECORDING_DURATION = 20000;

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let audioContext, analyser, sourceNode;
let stream;
let lastSoundTime;

const startmicrophone = async () => {
    if (MICONLY) {
        const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
        if (preferences.microphoneEnabled === true) {
            startRecording();
        }
    }
};

const startmicrophoneonclick = async () => {
    if (MICONLY) {
        const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
    preferences.microphoneEnabled = !preferences.microphoneEnabled;
    localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
    updateMicIcon();
    if (preferences.microphoneEnabled) {
        startmicrophone();
    }else if(!preferences.microphoneEnabled) {
        stopRecording();
    }
    }
};

const updateMicIcon = () => {
    const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
    const muteLine = document.getElementById("mute-line");
    if (muteLine) {
        muteLine.style.display = preferences.microphoneEnabled ? "none" : "block";
        stopWaveAnimation();
    }
};

async function startRecording() {
    try {
        
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.minDecibels = VOICE_MIN_DECIBELS;
        sourceNode = audioContext.createMediaStreamSource(stream);
        sourceNode.connect(analyser);
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        startWaveAnimation();
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = async () => {
            processRecordedAudio();
        };
        mediaRecorder.start();
        isRecording = true;
        lastSoundTime = Date.now();
        detectSilence();
        setTimeout(() => {
            stopRecording();
        }, MAX_RECORDING_DURATION);
    } catch (err) {
        console.error("Error accessing microphone:", err);
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
                lastSoundTime = Date.now();
                break;
            }
        }
        if (!soundDetected && Date.now() - lastSoundTime > SILENCE_DURATION) {
            stopRecording();
            return;
        }
        requestAnimationFrame(checkAudio);
    }
    checkAudio();
}

function stopRecording() {
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

async function processRecordedAudio() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    stopWaveAnimation();
    if (audioBlob.size > 0) {
        const formData = new FormData();
        formData.append("audio", audioBlob, "voice_input.webm");
        try {
            // let response = await fetch(""+'/process-audio', {
            let Domain = window.location.hostname;
            // let response = await fetch( apiConfig.backend_url + '/process-audio', {
            let response = await fetch(BACKEND_URL + '/process-audio', {
                method: 'POST',
                headers: {'Active-Domain': Domain },
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

micControl.addEventListener("click", startmicrophoneonclick);
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
        // startmicrophone();
        Promise.all([
            processAndPlayTTS(`${welcomeMessage} ${namemessage}`)
        ]).then(() => {
            enableInputControls();
            startmicrophone();
        });
    } else {
    //    startNewChat ();
    startnewchatwithchatbutton();
    }
}

// End Chat functionality
function setupEndChatFunctionality() {
    // Show confirmation popup when End Chat button is clicked
    
    if (endChatIcon) {
        endChatIcon.addEventListener('click', function() {
            // Scroll chat history to top first
            chatHistory.scrollTop = 0;
            chatHistory.style.overflowY = "hidden";
            // Then show the confirmation modal
            showEndChatConfirmation();
          
        });
    }
    // Use event delegation for the confirmation buttons
   document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'confirm-end-chat') {
        handleEndChatConfirmation();
        
    } else if (event.target && event.target.id === 'cancel-end-chat') {
        handleEndChatCancel();
    }
    });
}
   
// Show confirmation popup
function showEndChatConfirmation() {
    // Create confirmation popup directly in the chat history
    const confirmationHtml = `
        <div class="confirmation-popup-chat">
            <div class="confirmation-content">
                <p>Are You Sure Want to end chat?</p>
                <div class="confirmation-buttons">
                    <button class="confirm-btn" id="confirm-end-chat">Yes</button>
                    <button class="cancel-btn" id="cancel-end-chat">No</button>
                </div>
            </div>
        </div>
    `;
        
    // Append to chat history
    chatHistory.insertAdjacentHTML('beforeend', confirmationHtml);
    document.querySelector('#confirm-end-chat').focus();
    
}

// Handle cancel button click
function handleEndChatCancel() {
    
    // Find and remove the confirmation popup
    const confirmationPopup = document.querySelector('.confirmation-popup-chat');
    if (confirmationPopup) {
        confirmationPopup.remove();
    }
    chatHistory.style.overflowY = "auto";
}

// Handle confirmation button click
async function handleEndChatConfirmation() {
    // Find and remove the confirmation popup
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
        let Domain = window.location.hostname;

        // Create animated thank you message
        showThankYouMessage();
        await fetch(BACKEND_URL + '/chat-end' || 'https://aiservice.yaraamanager.com/chat-end', {
            // await fetch(apiConfig.backend_url + '/chat-end' || 'https://aiservice.yaraamanager.com/chat-end', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Active-Domain': Domain
            },
            body: JSON.stringify({
                visitor_id: visitorId,
                conversation_id: conversationID
            })
        }).catch(error => console.error('Error logging end chat:', error));
        
    } catch (error) {
        console.error('Error in API call:', error);
    }
    
    // // Wait for 5 seconds before clearing chat
    // setTimeout(() => {
    //     // Fade out thank you message
    //     const thankYouContainer = document.querySelector('.thank-you-container');
    //     if (thankYouContainer) {
    //         thankYouContainer.classList.add('fade-out');
            
    //         // After fade out animation completes, clear chat and start new chat
    //         setTimeout(() => {
    //             // Remove thank you message
    //             thankYouContainer.remove();
                
    //             // Clear chat history
    //             localStorage.removeItem('chat_history');
    //             localStorage.removeItem(USER_ID_KEY);
    //             block_end_chat();
    //             // Call the startNewChat function to reset everything
    //             startNewChat();
    //             chatHistory.style.overflowY = "auto";
    //         }, 1000);
    //     } else {
    //         // If thank you container doesn't exist for some reason, just proceed
    //         localStorage.removeItem('chat_history');
    //         localStorage.removeItem(USER_ID_KEY);
            
    //         startNewChat();
    //     }
    // }, 5000); // 5 second delay before clearing
    
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
    // document.addEventListener('click', function(event) {
    //   if (event.target &&event.target.id === 'new-chat') {
    //         startNewChat();
    //     }
    // });
    document.getElementById('new-chat').addEventListener('click', startNewChat);
    document.getElementById('new-chat').focus();
        
    // Play thank you audio if available
    const thankYouMessage = "Thank you for chatting with us. We appreciate your time and hope to assist you again soon!";
    processAndPlayTTS(thankYouMessage).catch(error => console.error('Error playing thank you audio:', error));
}
// const thankYouHtml = `
    //     <div class="thank-you-container">
    //         <div class="particles">
    //             ${createParticles()}
    //         </div>
    //         <div class="thank-you-content">
    //             <div class="thank-you-icon-container">
    //                 <svg class="thank-you-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
    //                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.707-6.293a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1-1.414 1.414L15 11.414l-4.707 4.293z"/>
    //                 </svg>
    //             </div>
    //             <h5 class="thank-you-title">Thank You!</h5>
    //             <p class="thank-you-message">Thank you for chatting with us. We appreciate your time and hope to assist you again soon!</p>
    //             <div class="thank-you-decoration">
    //                 <div class="decoration-line"></div>
    //                 <div class="decoration-dot"></div>
    //                 <div class="decoration-line"></div>
    //             </div>
    //         </div>
    //     </div>
    // `;

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

// Use these functions when sending messages:
// async function processMessage() {
//     // API call implementation
//     try {
//         const response = await fetch(apiConfig.apiUrls.chatEndpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 message: textArea.value,
//                 language: apiConfig.selected_language || 'english',
//             })
//         });
//         return await response.json();
//     } catch (error) {
//         const errorMessage = "Error processing message.";
//         await processAndPlayTTS(errorMessage);
//         throw error;
//     }
// }

// async function sendMessage() {
//     showLoadingIndicator();
//     try {
//         const result = await processMessage();
//         appendChatBubble('bot', result.message);
//     } catch (error) {
//         console.error('Error processing message:', error);
//         const errorMessage = 'Sorry, there was an error processing your request.';
//         appendChatBubble('bot', errorMessage);
//         await processAndPlayTTS(errorMessage);
//     } finally {
//         removeLoadingIndicator();
//     }
// }

// Initialize audio preferences
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
    const preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
    preferences.isMuted = !preferences.isMuted;

    localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
    updateAudioControlUI(preferences.isMuted);

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

// document.getElementById('user-registration').addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     const phoneInput = document.getElementById('user-phone');
//     userData.phone = phoneInput.value;
    
//     try {
//         const response = await fetch(apiConfig.apiUrls.registerEndpoint, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 ...userData,
//                 service: apiConfig.service || "niftyhms"
//             })
//         });
        
//         if (response.ok) {
//             localStorage.setItem('registered_user', JSON.stringify(userData));
//             showChatInterface();
//             startChat();
//         } else {
//             alert('Registration failed. Please try again.');
//         }
//     } catch (error) {
//         console.error('Registration error:', error);
//         alert('Registration failed. Please try again.');
//     }
// });

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
    startmicrophone();
    focusTextArea();
}

async function handleRegistrationStep(text) {
    open_end_chat();
    
    switch (registrationStep) {
        case 'greeting':
            registrationData.username = text;
            localStorage.setItem("registrationData", JSON.stringify(registrationData)); // Save progress
            appendChatBubble("user", text);
            disableInputControls();
            const emailPrompt = messages.emailPrompt.replace('{name}', text);
            appendChatBubble("bot", emailPrompt);
            registrationStep = 'email';
            localStorage.setItem("registrationStep", registrationStep);
            await processAndPlayTTS(emailPrompt);
            enableInputControls();
            focusTextArea();
            startmicrophone();
            break;

        case 'email':
            const cleanemail = text.trim().replace(/\s+/g, '');
            if (!isValidEmail(cleanemail)) {
                appendChatBubble("user", cleanemail);
                disableInputControls();
                const invalidEmailMsg = "That doesn't look like a valid email address. Could you please check and try again?";
                appendChatBubble("bot", invalidEmailMsg);
                await processAndPlayTTS(invalidEmailMsg);
                enableInputControls();
                focusTextArea();
                startmicrophone();
                return;
            }
            registrationData.email = cleanemail;
            localStorage.setItem("registrationData", JSON.stringify(registrationData)); // Save progress
            appendChatBubble("user", cleanemail);
            appendChatBubble("bot", messages.phonePrompt);
            registrationStep = 'phone';
            localStorage.setItem("registrationStep", registrationStep);
            await processAndPlayTTS(messages.phonePrompt);
            enableInputControls();
            focusTextArea();
            startmicrophone();
            break;

        case 'phone':
            const cleannumber = text.trim().replace(/\s+/g, '');
            if (!isValidPhone(cleannumber)) {
                appendChatBubble("user", cleannumber);
                disableInputControls();
                const invalidPhoneMsg = "That doesn't look like a valid phone number. Could you please check and try again?";
                appendChatBubble("bot", invalidPhoneMsg);
                await processAndPlayTTS(invalidPhoneMsg);
                enableInputControls();
                focusTextArea();
                startmicrophone();
                return;
            }
            registrationData.phone = cleannumber;
            localStorage.setItem("registrationData", JSON.stringify(registrationData)); // Save progress
            appendChatBubble("user", cleannumber);
            await handleRegistration(registrationData);
            focusTextArea();
            startmicrophone();
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

// // Add this at the start of your file to ensure aiAgentConfig is available
// if (typeof aiAgentConfig === 'undefined') {
//     console.error('aiAgentConfig is not defined!');
// }

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
            processAndPlayTTS(`${messages.welcome} . ${messages.namePrompt}`),
            // processAndPlayTTS(messages.namePrompt)
        ]);
        startmicrophone();
    } else if (isUserRegistered && !hasGreeting) {
        const welcomeBack = messages.welcomeBack.replace('{name}', userData.name || '');
        appendChatBubble("bot", welcomeBack);
        focusTextArea();
        disableInputControls();
        await processAndPlayTTS(welcomeBack);
        enableInputControls();
        startmicrophone();
    }
    hasGreeting = true;
}

async function handleRegistration(registrationData) {
    try {
        const Domain = window.location.hostname;
        console.log('Domain', Domain);
        // const response = await fetch(apiConfig.apiUrls.registerEndpoint, {
        const response = await fetch(BACKEND_URL + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Active-Domain': Domain },
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
  
    // Expose the init method so that it can be called externally
    window.ChatbotWidget = {
      init: initWidget
    };
  })();
  
