(function() {
    // Default configuration options
    var defaults = {
        containerId: 'chatbot-container', // The element ID where the widget will be injected
        cssUrl: 'https://dasmeet9.github.io/model/abhi/style.css', // The URL to the external CSS file
        backendUrl: 'https://aiservice.yaraamanager.com/api' // Backend API URL
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
    function loadCSS(url, shadow) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        shadow.appendChild(link);
    }

    // Create the widget HTML and inject it into the container
    function createWidgetHTML(container, config) {
        const shadow = container.attachShadow({ mode: 'open' });

        // Create a wrapper div for the chatbot content
        const wrapper = document.createElement('div');
        wrapper.id = 'chatbot-container';
        wrapper.innerHTML = `
            <link rel="stylesheet" href="https://dasmeet9.github.io/model/abhi/style.css">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
            <body>
                <noscript>
                    <style> .js-enabled { display: none; } </style>
                    <p>JavaScript is disabled!</p>
                </noscript>
                <div class="chat-button js-enabled" id="chat-button">
                    <video id="avatar-videoa" autoplay loop muted playsinline src=""
                        style="width: 100%; height: 100%; border-radius: 50%;" controlslist="nodownload noplaybackrate noremoteplayback" disablepictureinpicture></video>
                    <img style="width: 80%; height: 80%; border-radius: 50%; margin: 10px;" src="https://dasmeet9.github.io/model/NiftyHMS%20(1).png" alt="">
                </div>

                <button class="yarra-ai-close-btn" id="close-btn23">
                    <svg width="15" height="15" style="background-color: #4f4e4e69; border-radius: 8px 8px 8px 8px; padding: 0; width: 21px; height: 15px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div class="chat-container">
                    <div class="top"></div>
                    <div class="bootm" style="display: flex; width:100%; height:100%;">
                        <div class="l">
                            <div class="avatar-wrapper">
                                <div class="top-title">
                                    <img id="avatar-logo" src="https://dasmeet9.github.io/model/NiftyHMS%20(1).png" alt="">
                                    <div class="stlpp"><span>Powered by </span><a href="http://aiagent.yaraai.com/" target="_blank">Yaraa.ai</a></div>
                                </div>
                                <div id="avatar-avtar_name-container">
                                    <div class="avatar-container" id="avatar-container">
                                        <video id="avatar-video" autoplay loop muted playsinline src=""
                                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;" disablepictureinpicture></video>
                                        <video id="avatar-idle" autoplay loop muted playsinline preload="auto" src=""
                                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" disablepictureinpicture></video>
                                    </div>
                                    <div id="avatar-name">
                                        <h6 id="avatar-name-text"></h6><p id="avatar-designation-text">AI Assistant</p>
                                    </div>
                                </div>
                                <div class="stlp"><span>Powered by </span><a href="http://aiagent.yaraai.com/" target="_blank">Yaraa.ai</a></div>
                            </div>
                        </div>
                        <div class="r">
                            <div class="chat_history"></div>
                            <div class="dropdown">
                                <form id="text-form">
                                    <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                                        <textarea id="text" rows="2" placeholder="Type your message here..."></textarea>
                                        <div id="speech-to-text-container" class="tooltip-container">
                                            <button type="button" id="speech-to-text-control" class="control-btn speech-to-text-btn" title="Speech to Text">
                                                <svg class="btn-icon" viewBox="0 0 36 24">
                                                    <rect id="rect1" x="2" y="9" width="4.5" height="6" rx="2" stroke="#2A3663" stroke-width="0" fill="#2A3663"/>
                                                    <rect id="rect2" x="8.5" y="5" width="4.5" height="14" rx="2" stroke="#2A3663" stroke-width="0" fill="#2A3663"/>
                                                    <rect id="rect3" x="15" y="3" width="4.5" height="18" rx="2" stroke="#2A3663" stroke-width="0" fill="#2A3663"/>
                                                    <rect id="rect4" x="21.5" y="5" width="4.5" height="14" rx="2" stroke="#2A3663" stroke-width="0" fill="#2A3663"/>
                                                    <rect id="rect5" x="28" y="9" width="4.5" height="6" rx="2" stroke="#2A3663" stroke-width="0" fill="#2A3663"/>
                                                </svg>
                                            </button>
                                            <span class="tooltip-text">Click here to ask question</span>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div class="form-belowline">
                                        <button type="button" id="end-chat" class="control-btn end-chat-btn" title="End Chat">
                                            <svg class="btn-icon" viewBox="0 0 24 24">
                                                <path d="M18 6L6 18M6 6l12 12"></path>
                                            </svg>
                                            <span>End Chat</span>
                                        </button>
                                        <div class="form-belowline2">
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
                                                    <line id="mute-line" class="mute-line" x1="3" y1="3" x2="21" y2="21"/>
                                                </svg>
                                            </button>
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
                            <audio id="audio" crossorigin="anonymous" preload="auto" playsinline webkit-playsinline></audio>
                        </div>
                    </div>
                </div>
            </body>
        `;

        shadow.appendChild(wrapper);
        return shadow;
    }

    // Initialize widget functionality and event listeners
    function initWidget(options) {
        // Merge user-supplied options with defaults
        var config = extend(defaults, options || {});

        // Get or create the container element
        let container = document.getElementById(config.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = config.containerId;
            document.body.appendChild(container);
        }

        // Create Shadow DOM and inject HTML
        const shadow = createWidgetHTML(container, config);

        // Load the CSS file dynamically
        loadCSS(config.cssUrl, shadow);

        // Initialize widget elements and event listeners
        const apiConfig = typeof aiAgentConfig !== 'undefined' ? aiAgentConfig : {};
        const form = shadow.getElementById("text-form");
        const textArea = shadow.getElementById("text");
        const chatHistory = shadow.querySelector(".chat_history");
        const audio = shadow.getElementById("audio");
        const video = shadow.getElementById("avatar-video");
        const videoIdle = shadow.getElementById("avatar-idle");
        const micControl = shadow.getElementById('mic-control');
        const endChatIcon = shadow.querySelector("#end-chat");
        const chatButton = shadow.getElementById("chat-button");
        const chatContainer = shadow.querySelector(".chat-container");
        const closeButton = shadow.getElementById("close-btn23");
        const submitButton = shadow.querySelector('.send-btn');
        const stopButton = shadow.getElementById("stop-audio");
        const universalAudioControl = shadow.getElementById("universal-audio-control");
        const audioControlContainer = shadow.getElementById("audio-control-container");
        const AUDIO_PREFERENCES_KEY = 'audio_preferences';
        const STTbutton = shadow.getElementById('speech-to-text-control');
        const rect1 = shadow.getElementById('rect1');
        const rect2 = shadow.getElementById('rect2');
        const rect3 = shadow.getElementById('rect3');
        const rect4 = shadow.getElementById('rect4');
        const rect5 = shadow.getElementById('rect5');
        let sttanimation = false;

        let BACKEND_URL = config.backendUrl;
        let speechDetectionFrameId = null;
        let ENDCHATTHINGS = false;
        let MICONLY = true;
        let userData = {};
        let registrationData = {};
        let registrationStep = '';
        let isUserRegistered = false;
        let isPlaying = false;
        let currentAudio = null;
        let messageQueue = [];
        let hasGreeting = false;
        let AUDIOSPEED = 1.20;
        let currentAudioElement = null;
        let preferences = {};

        const speedMap = {
            slow: 0.8,
            medium: 1.2,
            fast: 1.8
        };
        const VOICE_MIN_DECIBELS = -45;
        const SILENCE_TIMEOUT = 2500;
        const INITIAL_SPEECH_TIMEOUT = 10000;
        let initialSpeechTimeoutId;
        let silenceCheckInterval;

        const RMS_THRESHOLD = 0.02;
        const INITIAL_TIMEOUT = 10000;
        const MIN_SPEECH_DURATION = 800;

        let isRealSpeech = false;
        let isSpeaking = false;
        let lastSoundTime = 0;
        let speechStartTime = 0;

        function open_end_chat() {
            endChatIcon.style.opacity = "1";
            endChatIcon.style.cursor = "pointer";
            chatHistory.style.overflowY = "auto";
        }

        function block_end_chat() {
            endChatIcon.style.opacity = "1";
            endChatIcon.style.cursor = "not-allowed";
        }

        if (!BACKEND_URL) {
            alert("You should purchase our service. Please visit `https://aiagent.yaraai.com/` to subscribe.");
        }

        shadow.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                const endchatttbtn = localStorage.getItem("registrationStep");
                if (!endchatttbtn) {
                    open_end_chat();
                } else {
                    block_end_chat();
                }
            }, 3000);
        });

        const defaultMessages = {
            welcome: "Hello! I'm Dr. Nifty, your AI assistant from NiftyHMS.",
            namePrompt: "Could you please share your name with me?",
            welcomeBack: "Hello {name}! How may I assist you today?",
            phonePrompt: "Thank you {name}! May I have your Mobile Number?",
            emailPrompt: "Please enter your email to receive a transcript of this chat."
        };

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

        const fetchAvatarData = async () => {
            const result = await Settingss();

            if (!result.success) {
                console.error("Error fetching avatar data:", result.error);
                chatButton.style.display = "none";
                return;
            }

            avatarData = result.data;

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
            }
        };

        function startsttanimation() {
            STTbutton.classList.add('active');
            STTbutton.classList.add('button-pulse');
            rect1.classList.add('rect-animated-1');
            rect2.classList.add('rect-animated-2');
            rect3.classList.add('rect-animated-3');
            rect4.classList.add('rect-animated-4');
            rect5.classList.add('rect-animated-5');
            sttanimation = true;
        }

        function stopsttanimation() {
            STTbutton.classList.remove('active');
            STTbutton.classList.remove('button-pulse');
            rect1.classList.remove('rect-animated-1');
            rect2.classList.remove('rect-animated-2');
            rect3.classList.remove('rect-animated-3');
            rect4.classList.remove('rect-animated-4');
            rect5.classList.remove('rect-animated-5');
            sttanimation = false;
        }

        (async () => {
            await fetchAvatarData();
            video.src = avatarData.data.avatar_speaking;
            videoIdle.src = avatarData.data.avatar_idle;
            shadow.getElementById("avatar-name-text").textContent = avatarData.data.avatar_name;
            shadow.getElementById("avatar-designation-text").textContent = avatarData.data.avatar_designation;
            shadow.getElementById("avatar-logo").src = avatarData.data.logo || "https://dasmeet9.github.io/model/unnamed.png";
            MICONLY = avatarData.data.is_mic_only;
            const AVATAR_ENABLED = avatarData.data.avatar_enable;

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
                shadow.getElementById("audio-control-container").style.pointerEvents = "none";
                if (window.innerWidth < 800) {
                    endChatIcon.style.width = "75%";
                }
                AUDIOSPEED = speedMap[avatarData?.data?.audio_speed] || 1.2;
            }

            if (!AVATAR_ENABLED) {
                MICONLY = false;
                shadow.getElementById('avatar-container').style.display = "none";
                shadow.getElementById('avatar-videoa').style.display = "none";
                shadow.getElementsByClassName('r')[0].style.width = "auto";
                shadow.getElementById('avatar-avtar_name-container').style.display = "none";
                chatButton.style.backgroundColor = "#5181d4";
                if (window.innerWidth < 800) {
                    shadow.getElementsByClassName('top-title')[0].style.flexDirection = "row";
                    shadow.getElementsByClassName('avatar-wrapper')[0].style.flexDirection = "column";
                    shadow.getElementsByClassName('avatar-wrapper')[0].style.height = "100%";
                }
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
                    shadow.getElementById("audio-control-container").style.pointerEvents = "none";
                    if (window.innerWidth < 800) {
                        endChatIcon.style.width = "75%";
                    }
                    AUDIOSPEED = speedMap[avatarData?.data?.audio_speed] || 1.2;
                }
            }

            const buttonVideo = shadow.getElementById('avatar-videoa');
            if (buttonVideo) {
                buttonVideo.src = avatarData.data.avatar_idle;
            }
        })();

        STTbutton.addEventListener('click', () => {
            if (!sttanimation) {
                startsttanimation();
            } else {
                stopsttanimation();
            }
        });

        video.playbackRate = 0.8;
        videoIdle.play();

        const VISITOR_ID_KEY = 'nifty_visitor_id';
        const CONVERSATION_ID_KEY = 'nifty_conversation_id';
        const STORAGE_TIMESTAMP_KEY = 'ai_agent_storage_timestamp';
        const STORAGE_EXPIRY_TIME = 5 * 60 * 60 * 1000;
        const KEYS_TO_REMOVE = ["nifty_visitor_id", "chat_history", "audio_preferences", "ai_agent_storage_timestamp", "nifty_conversation_id", "nifty_modeofconversation"];

        function checkAndClearStorage() {
            const lastClearTime = parseInt(localStorage.getItem(STORAGE_TIMESTAMP_KEY), 10) || 0;
            const currentTime = Date.now();

            if (!lastClearTime || (currentTime - lastClearTime) > STORAGE_EXPIRY_TIME) {
                KEYS_TO_REMOVE.forEach(key => {
                    localStorage.removeItem(key);
                });
                localStorage.setItem(STORAGE_TIMESTAMP_KEY, currentTime.toString());
                localStorage.setItem("registrationStep", "greeting");
            }
        }

        shadow.addEventListener('DOMContentLoaded', function () {
            checkAndClearStorage();
            initAudioPreferences();
            loadChatHistory();
            setupEndChatFunctionality();
        });

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

        function focusTextArea() {
            textArea.focus();
        }

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

        async function startnewchatwithchatbutton() {
            if (chatContainer.classList.contains("active")) {
                return;
            }
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
                shadow.getElementById("audio-control-container").style.pointerEvents = "none";
                if (window.innerWidth < 800) {
                    endChatIcon.style.width = "75%";
                }
            }
            if (ENDCHATTHINGS) {
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
                registrationStep = 'greeting';
                appendChatBubble("bot", `${messages.welcome} ${messages.namePrompt}`);
                if (preloadedWelcomeAudio && preloadedWelcomeAudio.length > 0) {
                    const welcomeText = `${messages.welcome} , ${messages.namePrompt}`;
                    await playPreloadedWelcomeAudio(welcomeText, preloadedWelcomeAudio);
                } else {
                    await processAndPlayTTS(`${messages.welcome} , ${messages.namePrompt}`);
                }
                localStorage.setItem("registrationStep", registrationStep);
            } else if (!isUserRegistered && hasGreeting) {
                let steg = localStorage.getItem("registrationStep");
                if (steg == "greeting") {
                    if (preloadedWelcomeAudio && preloadedWelcomeAudio.length > 0) {
                        const welcomeText = `${messages.welcome} , ${messages.namePrompt}`;
                        await playPreloadedWelcomeAudio(welcomeText, preloadedWelcomeAudio);
                    } else {
                        await processAndPlayTTS(`${messages.welcome} ${messages.namePrompt}`);
                    }
                }
            } else if (isUserRegistered && !hasGreeting) {
                const welcomeBack = messages.welcomeBack.replace('{name}', userData.name);
                appendChatBubble("bot", welcomeBack);
                await processAndPlayTTS(welcomeBack);
                enableInputControls();
                showSpeechToTextTooltip();
            }
            enableInputControls();
            showSpeechToTextTooltip();
        }

        async function playPreloadedWelcomeAudio(textResponse, preloadedAudioURLs) {
            const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
            if (isMuted || !MICONLY) {
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
                for (let i = 0; i < preloadedAudioURLs.length; i++) {
                    if (!isPlaying) break;

                    const audioURL = preloadedAudioURLs[i];
                    if (!audioURL) continue;

                    audio.src = audioURL;
                    await new Promise(resolve => {
                        audio.addEventListener('canplaythrough', resolve, { once: true });
                        audio.load();
                    });

                    if (i === 0) {
                        audio.playbackRate = AUDIOSPEED || 1.2;
                        video.currentTime = 0;
                        const startTime = performance.now() + 10;
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
                    } else {
                        audio.playbackRate = AUDIOSPEED || 1.2;
                        const startTime = performance.now() + 10;
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

                    await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
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
            STTbutton.style.opacity = "0.5";
            STTbutton.style.pointerEvents = "none";
            STTbutton.style.cursor = "not-allowed";
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
            STTbutton.style.opacity = "1";
            STTbutton.style.pointerEvents = "auto";
            STTbutton.style.cursor = "pointer";
        }

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

        function stripHtmlTags(html) {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            let text = temp.textContent || temp.innerText || '';
            text = text.replace(/https?:\/\/\S+/g, '');
            text = text.replace(/\s+/g, ' ').trim();
            text = text.replace(/([a-zA-Z]) (?=[A-Z])/g, '$1\n');
            text = text.replace(/[^a-zA-Z0-9 .,!₹$€\n]/g, '');
            text = text.replace(/\n/g, ' ');
            return text;
        }

        async function searchtts(text) {
            const registrationstepsss = localStorage.getItem("registrationStep");
            if (registrationstepsss) {
                await handleRegistrationStep(text);
                return;
            } else {
                try {
                    appendChatBubble("user", text);
                    showLoadingIndicator();
                    disableInputControls();
                    const answerResponse = await fetchAnswer(text);
                    removeLoadingIndicator();
                    if (answerResponse) {
                        const botResponse = answerResponse;
                        const plainTextResponse = stripHtmlTags(botResponse);
                        const sentences = splitIntoSentences(plainTextResponse);
                        let firstTTSPromise = null;
                        if (sentences.length > 0) {
                            firstTTSPromise = fetchSingleTTS(sentences[0]);
                        }
                        appendChatBubble("bot", botResponse);
                        let firstTTSAudio = null;
                        if (firstTTSPromise) {
                            firstTTSAudio = await firstTTSPromise;
                        }
                        if (firstTTSAudio) {
                            const ttsPromise = processAndPlayTTS(plainTextResponse, firstTTSAudio);
                            await ttsPromise;
                        } else {
                            await processAndPlayTTS(plainTextResponse);
                        }
                        enableInputControls();
                    } else {
                        if (localStorage.getItem("registrationStep")) {
                            console.log("your in register steps for now");
                        } else {
                            const errorMessage = "I apologize, but I couldn't process your request. Could you please try again?";
                            appendChatBubble("bot", `${errorMessage}`);
                            await processAndPlayTTS(errorMessage);
                            enableInputControls();
                        }
                    }
                } catch (error) {
                    console.error("Error in searchtts:", error);
                    removeLoadingIndicator();
                    const errorMessage = "I apologize, but I encountered an error. Could you please try again?";
                    appendChatBubble("bot", errorMessage);
                    await processAndPlayTTS(errorMessage);
                    enableInputControls();
                }
            }
        }

        async function fetchSingleTTS(sentence) {
            try {
                const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                if (isMuted) return;
                const response = await fetch(BACKEND_URL + '/tts', {
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

        async function preloadTTSAudio(sentences) {
            const audioURLs = [];
            const firstSentencePromise = fetchSingleTTS(sentences[0]);
            const otherSentencesPromises = sentences.slice(1).map(sentence => fetchSingleTTS(sentence));
            const firstAudioURL = await firstSentencePromise;
            audioURLs.push(firstAudioURL);
            const loadRestInBackground = async () => {
                try {
                    const results = await Promise.all(otherSentencesPromises);
                    audioURLs.push(...results);
                } catch (error) {
                    console.error('Error preloading TTS audio:', error);
                }
            };
            loadRestInBackground();
            return {
                firstAudioURL,
                getAudioURL: async (index) => {
                    if (audioURLs[index]) return audioURLs[index];
                    while (!audioURLs[index] && isPlaying) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                    return audioURLs[index];
                }
            };
        }

        async function processAndPlayTTS(textResponse, preloadedFirstAudio = null) {
            const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
            if (isMuted || !MICONLY) {
                return;
            }

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

            if (MICONLY) {
                const { microphoneEnabled } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                if (microphoneEnabled) {
                    // Implement command listening if needed
                }
            }

            try {
                let firstAudioURL = preloadedFirstAudio;
                let audioLoader;
                if (!firstAudioURL) {
                    audioLoader = await preloadTTSAudio(sentences);
                    firstAudioURL = audioLoader.firstAudioURL;
                    if (!firstAudioURL) {
                        console.error("Failed to load first audio segment");
                        return;
                    }
                } else {
                    const otherSentencesPromises = sentences.slice(1).map(sentence => fetchSingleTTS(sentence));
                    const audioURLs = [firstAudioURL];
                    Promise.all(otherSentencesPromises).then(results => {
                        audioURLs.push(...results);
                    }).catch(error => {
                        console.error('Error preloading remaining TTS audio:', error);
                    });
                    audioLoader = {
                        firstAudioURL,
                        getAudioURL: async (index) => {
                            if (audioURLs[index]) return audioURLs[index];
                            while (!audioURLs[index] && isPlaying) {
                                await new Promise(resolve => setTimeout(resolve, 100));
                            }
                            return audioURLs[index];
                        }
                    };
                }

                for (let i = 0; i < sentences.length; i++) {
                    if (!isPlaying) break;
                    const audioURL = i === 0 ? firstAudioURL : await audioLoader.getAudioURL(i);
                    if (!audioURL) continue;
                    audio.src = audioURL;
                    await new Promise(resolve => {
                        audio.addEventListener('canplaythrough', resolve, { once: true });
                        audio.load();
                    });
                    if (i === 0) {
                        audio.playbackRate = AUDIOSPEED || 1.2;
                        video.currentTime = 0;
                        const startTime = performance.now() + 50;
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
                    } else {
                        audio.playbackRate = AUDIOSPEED || 1.2;
                        const startTime = performance.now() + 20;
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
                    await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
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
        }

        function splitIntoSentences(text) {
            return text.split(".")
                .map(sentence => sentence.trim())
                .filter(Boolean)
                .map(sentence => sentence + ".");
        }

        async function fetchSingleAudioURL(sentence) {
            try {
                const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY));
                if (isMuted) return;
                const response = await fetch(BACKEND_URL + '/tts', {
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

        async function playAudioWithVideo(sentences) {
            if (!MICONLY) return;
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
                let isFirstSegment = true;
                let nextAudioURL = null;

                for (let i = 0; i < sentences.length; i++) {
                    if (!isPlaying) break;

                    const currentSentence = sentences[i];
                    if (i < sentences.length - 1) {
                        fetchSingleAudioURL(sentences[i + 1]).then(url => nextAudioURL = url);
                    }
                    let audioURL = nextAudioURL || await fetchSingleAudioURL(currentSentence);
                    if (!audioURL) continue;

                    audio.src = audioURL;
                    audio.load();
                    await new Promise(resolve => audio.addEventListener('canplaythrough', resolve, { once: true }));
                    audio.playbackRate = AUDIOSPEED || 1.20;
                    await audio.play();

                    audio.addEventListener('play', () => {
                        setTimeout(() => {
                            video.play();
                        }, 2000);
                    }, { once: true });

                    if (isFirstSegment) {
                        isFirstSegment = false;
                    }

                    await new Promise(resolve => audio.addEventListener('ended', resolve, { once: true }));
                    if (i < sentences.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 30));
                    }
                }
            } catch (error) {
                console.error("Playback error:", error);
            }

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
            chatHistory.scrollTop = chatHistory.scrollHeight;
            resetUI();
            storeChatMessage(sender, message);
        }

        async function fetchAnswer(text) {
            try {
                const visitorId = localStorage.getItem(VISITOR_ID_KEY);
                if (!visitorId) {
                    console.warn('User ID not found in localStorage');
                    await handleRegistrationStep(text);
                    return;
                }
                const registrationStep = JSON.parse(localStorage.getItem("registrationStep"));
                if (registrationStep) {
                    return;
                }
                open_end_chat();

                const MODEOFCONVERSATION = localStorage.getItem("nifty_modeofconversation");
                const response = await fetch(BACKEND_URL + '/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question: text,
                        visitor_id: visitorId,
                        mode: MODEOFCONVERSATION
                    })
                });
                const responseData = await response.json();

                if (!response.ok) {
                    if (responseData.conversation_id) {
                        localStorage.setItem(CONVERSATION_ID_KEY, responseData.conversation_id);
                    }
                    throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(responseData)}`);
                }

                if (!responseData.response && responseData.answer) {
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

        function resetUI() {
            textArea.value = "";
            video.style.display = "none";
            videoIdle.style.display = "block";
            videoIdle.play();
        }

        const SILENCE_THRESHOLD = 5;
        const SILENCE_DURATION = 2000;
        const MAX_RECORDING_DURATION = 20000;

        const VOICE_COMMANDS = {
            STOP: ['stop', 'pause', 'halt', 'stop it', 'please stop', 'top', 'hop', 'pot', 'op']
        };
        const COMMAND_CONFIDENCE_THRESHOLD = 0.3;

        let mediaRecorder;
        let audioChunks = [];
        let isRecording = false;
        let isListeningForCommands = false;
        let audioContext, analyser, sourceNode;
        let stream;
        let commandRecognizer = null;

        const startMicrophone = async () => {
            if (!MICONLY) return;
            preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
            if (preferences.microphoneEnabled === true) {
                await startRecording();
            }
        };

        STTbutton.addEventListener('click', startMicrophone);

        const startMicrophoneOnClick = async () => {
            if (!MICONLY) return;
            try {
                preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
            } catch (e) {
                console.error("Failed to parse audio preferences:", e);
                preferences = {};
            }
            preferences.microphoneEnabled = !preferences.microphoneEnabled;
            localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify(preferences));
            updateMicIcon();
            if (preferences.microphoneEnabled) {
                await startRecording();
            } else {
                try {
                    stopRecording();
                } catch (err) {
                    console.error("Error stopping recording:", err);
                }
            }
        };

        const updateMicIcon = () => {
            preferences = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY)) || {};
            const muteLine = shadow.getElementById("mute-line");
            if (muteLine) {
                muteLine.style.display = preferences.microphoneEnabled ? "none" : "block";
                stopsttanimation();
            }
        };

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
                const THRESHOLD = 0.007;

                if (rms > THRESHOLD) {
                    console.log("🎤 Soft voice detected...");
                    startedSpeaking = true;
                    lastSoundTime = Date.now();
                    beginRecording();
                    detectSilence();
                    if (speechDetectionFrameId) {
                        cancelAnimationFrame(speechDetectionFrameId);
                        speechDetectionFrameId = null;
                    }
                    return;
                }
                if (!startedSpeaking) {
                    speechDetectionFrameId = requestAnimationFrame(checkSpeechStart);
                }
            }

            if (speechDetectionFrameId) {
                cancelAnimationFrame(speechDetectionFrameId);
                speechDetectionFrameId = null;
            }
            checkSpeechStart();
        }

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
            stopsttanimation();
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
                if (!isRealSpeech) return;
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
                if (rms > RMS_THRESHOLD) {
                    lastSoundTime = currentTime;
                    if (!isSpeaking) {
                        speechStartTime = currentTime;
                        isSpeaking = true;
                    }
                    if (!isRecording && (currentTime - speechStartTime) > MIN_SPEECH_DURATION) {
                        beginRecording();
                    }
                }
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
                startsttanimation();
                resetState();
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048;
                analyser.minDecibels = VOICE_MIN_DECIBELS;
                sourceNode = audioContext.createMediaStreamSource(stream);
                sourceNode.connect(analyser);
                initialSpeechTimeoutId = setTimeout(() => {
                    if (!startedSpeaking) {
                        console.log("No speech in 10s - stopping mic");
                        stopRecording();
                    }
                }, INITIAL_SPEECH_TIMEOUT);
                detectSpeech();
            } catch (err) {
                console.error("Microphone error:", err);
                stopsttanimation();
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

        async function processRecordedAudio() {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            stopsttanimation();
            if (audioBlob.size > 0) {
                const formData = new FormData();
                formData.append("audio", audioBlob, "voice_input.webm");
                try {
                    let response = await fetch(BACKEND_URL + '/process-audio', {
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

        micControl.addEventListener("click", startMicrophoneOnClick);
        shadow.addEventListener("DOMContentLoaded", updateMicIcon);

        closeButton.addEventListener("click", () => {
            chatContainer.classList.remove("active");
            closeButton.style.display = "none";
            chatButton.style.transform = "scale(1)";
        });

        stopButton.addEventListener("click", stopPlayback);

        function stopPlayback() {
            isPlaying = false;
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio.src = "";
                audio.load();
            }
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            video.style.display = "none";
            videoIdle.style.display = "block";
            videoIdle.play();
            currentAudio = null;
            stopButton.style.display = "none";
            enableInputControls();
        }

        function storeChatMessage(user, message, type = 'chat') {
            let storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
            if (type === 'registration') {
                storedHistory.push({
                    type: 'registration',
                    data: message
                });
                isUserRegistered = true;
            } else {
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

        function showSpeechToTextTooltip() {
            const tooltipContainer = shadow.getElementById('speech-to-text-container');
            if (tooltipContainer) {
                tooltipContainer.classList.add('tooltip-visible');
                setTimeout(() => {
                    tooltipContainer.classList.remove('tooltip-visible');
                }, 2000);
            }
        }

        function startNewChat() {
            localStorage.removeItem('chat_history');
            localStorage.removeItem(VISITOR_ID_KEY);
            chatHistory.innerHTML = '';
            registrationData = {};
            isUserRegistered = false;
            endChatIcon.disabled = false;
            registrationStep = 'greeting';
            localStorage.setItem("registrationStep", registrationStep);
            disableInputControls();
            if (chatContainer.classList.contains("active")) {
                const welcomeMessage = messages.welcome;
                const namemessage = messages.namePrompt;
                appendChatBubble("bot", `${welcomeMessage} ${namemessage}`);
                disableInputControls();
                if (preloadedWelcomeAudio && preloadedWelcomeAudio.length > 0) {
                    const welcomeText = `${welcomeMessage} , ${namemessage}`;
                    playPreloadedWelcomeAudio(welcomeText, preloadedWelcomeAudio).then(() => {
                        enableInputControls();
                        showSpeechToTextTooltip();
                    });
                } else {
                    processAndPlayTTS(`${welcomeMessage}, ${namemessage}`).then(() => {
                        enableInputControls();
                        showSpeechToTextTooltip();
                    });
                }
            } else {
                startnewchatwithchatbutton();
            }
        }

        function setupEndChatFunctionality() {
            if (endChatIcon) {
                endChatIcon.addEventListener('click', function() {
                    if (shadow.getElementsByClassName("confirmation-popup-chat").length > 0) {
                        return;
                    }
                    chatHistory.scrollTop = 0;
                    chatHistory.style.overflowY = "hidden";
                    showEmailCapture();
                });
            }
            shadow.addEventListener('click', function(event) {
                if (event.target && event.target.id === 'confirm-end-chat') {
                    const email = event.target.getAttribute('data-email');
                    handleEndChatConfirmation(email);
                } else if (event.target && event.target.id === 'cancel-end-chat') {
                    handleEndChatCancel();
                }
            });
        }

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
            const emailInput = shadow.querySelector('#user-email-input');
            emailInput.focus();

            emailInput.addEventListener('input', function() {
                const email = this.value.trim();
                const isValid = isValidEmail(email);
                submitButton.disabled = !isValid;
                errorMessage.style.display = email === '' ? 'none' : (isValid ? 'none' : 'block');
                this.classList.toggle('invalid', !isValid && email !== '');
            });

            shadow.querySelector('#submit-email-btn').addEventListener('click', () => {
                const email = emailInput.value.trim();
                if (isValidEmail(email)) {
                    const popup = shadow.querySelector('.confirmation-popup-chat');
                    popup.remove();
                    handleEndChatConfirmation(email);
                } else {
                    emailInput.style.border = '1px solid red';
                }
            });

            shadow.querySelector('#cancel-email-btn').addEventListener('click', () => {
                const popup = shadow.querySelector('.confirmation-popup-chat');
                popup.remove();
                endChatIcon.disabled = false;
                chatHistory.style.overflowY = "auto";
            });
        }

        function handleEndChatCancel() {
            endChatIcon.disabled = false;
            const confirmationPopup = shadow.querySelector('.confirmation-popup-chat');
            if (confirmationPopup) {
                confirmationPopup.remove();
            }
            chatHistory.style.overflowY = "auto";
        }

        async function handleEndChatConfirmation(email) {
            endChatIcon.disabled = true;
            const confirmationPopup = shadow.querySelector('.confirmation-popup-chat');
            if (confirmationPopup) {
                confirmationPopup.remove();
            }

            try {
                const visitorId = localStorage.getItem(VISITOR_ID_KEY);
                const conversationID = localStorage.getItem(CONVERSATION_ID_KEY);
                disableInputControls();
                block_end_chat();
                showThankYouMessage();
                await fetch(BACKEND_URL + '/chat-end', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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

        function showThankYouMessage() {
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
            chatHistory.insertAdjacentHTML('beforeend', thankYouHtml);
            ENDCHATTHINGS = true;
            shadow.getElementById('new-chat').addEventListener('click', startNewChat);
            shadow.getElementById('new-chat').focus();
            const thankYouMessage = "Thank you for chatting with us ,We appreciate your time and hope to assist you again soon!";
            processAndPlayTTS(thankYouMessage).catch(error => {
                console.error('Error playing thank you audio:', error);
            });
        }

        function createParticles() {
            let particlesHtml = '';
            const particleCount = 150;
            for (let i = 0; i < particleCount; i++) {
                const size = Math.floor(Math.random() * 10) + 5;
                const left = Math.floor(Math.random() * 100);
                const top = Math.floor(Math.random() * 100);
                const delay = Math.random() * 2;
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

        textArea.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                form.requestSubmit();
                resetUI();
            }
        });

        function adjustTextareaRows() {
            endChatIcon.disabled = false;
            const textarea = shadow.getElementById("text");
            if (window.innerWidth < 800) {
                textarea.rows = 1;
            } else {
                textarea.rows = 2;
            }
        }

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
            shadow.querySelector('.chat_history').appendChild(loadingBubble);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        function removeLoadingIndicator() {
            const loadingBubble = shadow.querySelector('.chat-bubble.bot.loading');
            if (loadingBubble) {
                loadingBubble.remove();
            }
        }

        function initAudioPreferences() {
            if (MICONLY) {
                const savedPreferences = localStorage.getItem(AUDIO_PREFERENCES_KEY);
                if (savedPreferences) {
                    const { isMuted } = JSON.parse(savedPreferences);
                    updateAudioControlUI(isMuted);
                } else {
                    localStorage.setItem(AUDIO_PREFERENCES_KEY, JSON.stringify({
                        isMuted: false,
                        microphoneEnabled: true
                    }));
                    updateAudioControlUI(false);
                }
                preloadWelcomeMessageAudio();
            }
        }

        let preloadedWelcomeAudio = [];

        async function preloadWelcomeMessageAudio() {
            try {
                const { isMuted } = JSON.parse(localStorage.getItem(AUDIO_PREFERENCES_KEY) || '{"isMuted": false}');
                if (isMuted) return;
                if (!avatarData || !avatarData.data) {
                    setTimeout(preloadWelcomeMessageAudio, 500);
                    return;
                }
                const welcomeText = `${messages.welcome} , ${messages.namePrompt}`;
                const sentences = splitIntoSentences(welcomeText);
                const audioPromises = sentences.map(sentence => fetchSingleTTS(sentence));
                preloadedWelcomeAudio = await Promise.all(audioPromises);
                console.log("Welcome message audio preloaded successfully");
            } catch (err) {
                console.error("Error preloading welcome audio:", err);
            }
        }

        function updateAudioControlUI(isMuted) {
            if (MICONLY) {
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
                if (preferences.isMuted) {
                    stopPlayback();
                    enableInputControls();
                }
            }
        });

        shadow.querySelectorAll('.next-btn').forEach(btn => {
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
                    showSpeechToTextTooltip();
                    break;
                case 'phone':
                    const cleannumber = text.trim().replace(/[\s-]+/g, '');
                    if (!isValidPhone(cleannumber)) {
                        appendChatBubble("user", cleannumber);
                        disableInputControls();
                        const invalidPhoneMsg = "That doesn't look like a valid phone number. Could you please check and try again?";
                        appendChatBubble("bot", invalidPhoneMsg);
                        await processAndPlayTTS(invalidPhoneMsg);
                        enableInputControls();
                        return;
                    }
                    registrationData.phone = cleannumber;
                    localStorage.setItem("registrationData", JSON.stringify(registrationData));
                    appendChatBubble("user", cleannumber);
                    await handleRegistration(registrationData);
                    break;
            }
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            const phoneRegex = /^\+?\d{6,15}$/;
            return phoneRegex.test(phone.replace(/\s+/g, ''));
        }

        function hasValidUserId() {
            return !!localStorage.getItem(VISITOR_ID_KEY);
        }

        async function showInitialGreeting() {
            if (!isUserRegistered && !hasGreeting) {
                registrationStep = 'greeting';
                localStorage.setItem("registrationStep", registrationStep);
                appendChatBubble("bot", `${messages.welcome} ${messages.namePrompt}`);
                disableInputControls();
                await Promise.all([
                    processAndPlayTTS(`${messages.welcome} , ${messages.namePrompt}`)
                ]);
            } else if (isUserRegistered && !hasGreeting) {
                const welcomeBack = messages.welcomeBack.replace('{name}', userData.name || '');
                appendChatBubble("bot", welcomeBack);
                disableInputControls();
                await processAndPlayTTS(welcomeBack);
                enableInputControls();
            }
            hasGreeting = true;
        }

        async function handleRegistration(registrationData) {
            try {
                const response = await fetch(BACKEND_URL + '/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registrationData)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.visitor_id) {
                        localStorage.setItem(VISITOR_ID_KEY, responseData.visitor_id);
                        localStorage.setItem(CONVERSATION_ID_KEY, responseData.conversation_id);
                    }
                    localStorage.removeItem("registrationData");
                    localStorage.removeItem("registrationStep");
                    const successMsg = `Thank you, ${registrationData.username}! Your information is securely saved. How may I assist you today?`;
                    appendChatBubble("bot", successMsg);
                    registrationStep = '';
                    registrationData = {};
                    await processAndPlayTTS(successMsg);
                    enableInputControls();
                    open_end_chat();
                } else {
                    const errorText = await response.text();
                    console.error('Registration failed:', errorText);
                    const errorMsg = "I apologize, but I encountered an issue saving your information.";
                    appendChatBubble("bot", errorMsg);
                    registrationStep = 'greeting';
                    localStorage.setItem("registrationStep", registrationStep);
                    registrationData = {};
                    await processAndPlayTTS(errorMsg);
                    enableInputControls();
                    open_end_chat();
                }
            } catch (error) {
                console.error('Registration error:', error);
                const errorMsg = "I apologize, but I encountered an issue saving your information. Could we start over with your name?";
                appendChatBubble("bot", errorMsg);
                await processAndPlayTTS(errorMsg);
                registrationStep = 'greeting';
                localStorage.setItem("registrationStep", registrationStep);
                registrationData = {};
                enableInputControls();
                open_end_chat();
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
            chatHistory.innerHTML = "";
            storedHistory.forEach(entry => {
                appendChatBubbleFromHistory(entry.user, entry.message, entry.count);
            });
        }
    }

    // Expose the init method
    window.ChatbotWidget = {
        init: initWidget
    };
})();

ChatbotWidget.init({
    containerId: 'chatbot-container',
    cssUrl: 'https://dasmeet9.github.io/model/abhi/style.css',
    backendUrl: 'https://aiservice.yaraamanager.com/api'
});