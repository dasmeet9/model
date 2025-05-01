(function () {
    // Load CSS
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://dasmeet9.github.io/model/style.css"; // update with your real CSS URL
    document.head.appendChild(link);

  
    // Load chatbot HTML from external file
    fetch("https://dasmeet9.github.io/model/a.html") // update with your real HTML URL
      .then(res => res.text())
      .then(html => {
        chatbot.innerHTML = html;
        document.body.appendChild(chatbot);
      })
      .catch(err => {
        console.error("Failed to load chatbot:", err);
      });
  })();
  