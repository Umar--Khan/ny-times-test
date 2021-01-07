const NYTD = {
  render_section_front: (data) => {
    generateCardsContent(data);
  },
};

function generateCard(newsArticle) {
  const storiesContent = document.querySelector(".content");
  const card = document.createElement("div");
  card.className = "card border__bottom";

  const { lastPublished, headline, summary, byline, type } = newsArticle;

  if (type !== "HTML" && lastPublished && headline && summary && byline) {
    const lastPublishedDate = newsArticle.lastPublished.substr(
      0,
      lastPublished.indexOf("T")
    );
    let lastPublishedDateFormatted = new Date(lastPublishedDate);
    const options = { month: "long", day: "numeric", year: "numeric" };

    lastPublishedDateFormatted = lastPublishedDateFormatted.toLocaleDateString(
      "EN-us",
      options
    );

    card.innerHTML = `
    <div>
        <span class="tag">${lastPublishedDateFormatted}</span>
        <div class="card__content">
          <div class="card__left">
            <h2>${headline}</h2>
            <p>${summary}</p>
          </div>
          <div class="card__right">
            <img class="card__img" src="https://via.placeholder.com/320x210" alt="placeholder" />
          </div>
        </div>
        <p class="tag">${byline}</p>
    </div>
    `;
    storiesContent.appendChild(card);
  }
}

function generateCardsContent(data) {
  const content = data.page.content;

  content.map((contentItem) => {
    contentItem.collections.map((collection) => {
      if (collection.assets.length >= 1) {
        collection.assets.map((asset) => generateCard(asset));
      }
    });
  });
}

(function () {
  extractedDataFromNyRegion();
})();
