const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test";

function fetchNyTestData(url) {
  return fetch(`${PROXY_URL + BASE_URL}/${url}`).then((resp) => resp.text());
}

async function extractedDataFromNyRegion() {
  const response = await fetchNyTestData("nyregion.js");
  const F = new Function(response);
  F();
}
