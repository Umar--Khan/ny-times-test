const ENGLISH = "ENGLISH";
const MARTIAN = "MARTIAN";

let content = [];

let currentLanguage = ENGLISH;

const NYTD = {
  render_section_front: (data) => {
    content = data.page.content;
    generateCardsContent(content);
  },
};

function handleLanguageButton(event, language) {
  const martianButton = document.getElementById("btn-martian");
  const englishButton = document.getElementById("btn-english");

  if (currentLanguage === language) return;

  if (language === MARTIAN) {
    currentLanguage = MARTIAN;
    englishButton.className = "btn";
    generateCardsContent(content);
  } else {
    currentLanguage = ENGLISH;
    martianButton.className = "btn";
    generateCardsContent(content);
  }

  if (!event.target.classList.value.includes("btn__active")) {
    event.target.classList.toggle("btn__active");
  }
}

function generateCard(newsArticle) {
  const storiesContent = document.querySelector(".content");
  const card = document.createElement("div");
  card.className = "card border__bottom";

  const {
    lastPublished,
    headline,
    summary,
    byline,
    type,
    images,
    url,
  } = newsArticle;

  if (
    type !== "HTML" &&
    lastPublished &&
    headline &&
    summary &&
    byline &&
    url &&
    images.length
  ) {
    const lastPublishedDateFormatted = formatPublishDate(lastPublished);
    const { caption } = images[0];

    let translatedHeadline = headline;
    let translatedSummary = summary;
    let translatedByline = byline;

    if (currentLanguage === MARTIAN) {
      translatedHeadline = martianFormatText(headline);
      translatedSummary = martianFormatText(summary);
      translatedByline = martianFormatText(byline);
    }

    card.innerHTML = `
    <a class="card__link" href=${url} target="_blank" rel="noopener noreferrer">
      <span class="tag">${lastPublishedDateFormatted}</span>
        <div class="card__content">
          <div class="card__left">
            <h2>${translatedHeadline}</h2>
            <p>${translatedSummary}</p>
          </div>
          <div class="card__right">
            <img class="card__img" src="https://via.placeholder.com/320x210" alt="${caption}" />
          </div>
        </div>
      <p class="tag">${translatedByline}</p>
    </a>
    `;
    storiesContent.appendChild(card);
  }
}

function generateCardsContent(content) {
  const storiesContent = document.querySelector(".content");
  storiesContent.innerHTML = "";
  content.map((contentItem) => {
    contentItem.collections.map((collection) => {
      if (collection.assets.length >= 1) {
        collection.assets.map((newsArticle) => generateCard(newsArticle));
      }
    });
  });
}

(function () {
  extractedDataFromNyRegion();
})();
