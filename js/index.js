const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test";

const NYTD = {
  render_section_front: (data) => {
    generateContent(data);
  },
};

function fetchNyRegionData() {
  return fetch(`${PROXY_URL + BASE_URL}/${"nyregion.js"}`).then((resp) =>
    resp.text()
  );
}

async function extractDataFromResponse() {
  const response = await fetchNyRegionData();
  const F = new Function(response);
  F();
}

extractDataFromResponse();

function generateCard(newsArticle) {
  const storiesContent = document.querySelector(".stories__content");
  const card = document.createElement("div");
  card.className = "stories__content__news__article__card";

  if (newsArticle.headline) {
    card.innerHTML = `
    <div>
        <p>${newsArticle.lastPublished}</p>
        <h1>${newsArticle.headline}</h1>
        <p>${newsArticle.summary}</p>
        <p>${newsArticle.byline}</p>
        <hr />
    </div>`;
    storiesContent.appendChild(card);
  }
}

function generateContent(data) {
  const content = data.page.content;

  content.map((contentItem) => {
    contentItem.collections.map((collection) => {
      if (collection.assets.length >= 1) {
        collection.assets.map((asset) => generateCard(asset));
      }
    });
  });
}
