(function () {
    // Load CSS
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://yourdomain.com/style.css"; // update with your real CSS URL
    document.head.appendChild(link);
  
    // Create chatbot container
    var chatbot = document.createElement("div");
    chatbot.id = "ai-chatbot-container";
    chatbot.style.position = "fixed";
    chatbot.style.bottom = "20px";
    chatbot.style.right = "20px";
    chatbot.style.zIndex = "99999";
    chatbot.style.width = "350px";
    chatbot.style.height = "500px";
    chatbot.style.background = "#fff";
    chatbot.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";
    chatbot.style.borderRadius = "10px";
    chatbot.style.overflow = "hidden";
  
    // Load chatbot HTML from external file
    fetch("https://yourdomain.com/a.html") // update with your real HTML URL
      .then(res => res.text())
      .then(html => {
        chatbot.innerHTML = html;
        document.body.appendChild(chatbot);
      })
      .catch(err => {
        console.error("Failed to load chatbot:", err);
      });
  })();
  