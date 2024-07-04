document.addEventListener("DOMContentLoaded", () => {
  const likeCounts = document.querySelectorAll(".like-count");
  const downloadCounts = document.querySelectorAll(".download-count");

  likeCounts.forEach((likeCount) => {
    likeCount.textContent = Math.max(1323, Math.floor(Math.random() * 10000));
  });

  downloadCounts.forEach((downloadCount) => {
    downloadCount.textContent = Math.max(
      1224,
      Math.floor(Math.random() * 5000)
    );
  });

  const downloadButtons = document.querySelectorAll(".download-button");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const downloadCount = this.parentElement.querySelector(".download-count");
      downloadCount.textContent = parseInt(downloadCount.textContent) + 1;
      window.open(this.getAttribute("data-link"), "_blank");
    });
  });
});

function searchSite(event) {
  event.preventDefault();
  const query = document.getElementById("search-query").value.toLowerCase();
  const results = [];

  document.querySelectorAll(".subtitle-post").forEach((post) => {
    const title = post.querySelector(".movie-name").textContent.toLowerCase();
    const description = post
      .querySelector(".description")
      .textContent.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      results.push({
        title: post.querySelector(".movie-name").textContent,
        description: post.querySelector(".description").textContent,
        link:
          window.location.href + "#" + title.replace(/\s+/g, "-").toLowerCase(),
      });
    }
  });

  displaySearchResults(results);
}

function displaySearchResults(results) {
  const resultPage = window.open("", "_blank");
  resultPage.document.write(`
        <html>
        <head>
            <title>Search Results</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <h1>Search Results</h1>
                <div id="search-results">
                    ${results
                      .map(
                        (result) => `
                        <div class="search-result">
                            <h2><a href="${result.link}">${result.title}</a></h2>
                            <p>${result.description}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <footer>
                    <nav>
                        <a href="#">Privacy</a> | 
                        <a href="#">Legal</a> | 
                        <a href="#">Contact</a>
                    </nav>
                </footer>
            </div>
        </body>
        </html>
    `);
  resultPage.document.close();
}
