const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test";

const NYTD = {
  render_section_front: (something) => {
    console.log(something);
  },
};

function fetchNyRegionData() {
  return fetch(`${PROXY_URL + BASE_URL}/${"nyregion.js"}`).then((resp) =>
    resp.text()
  );
}

async function extractData() {
  const response = await fetchNyRegionData();
  const F = new Function(response);
  F();
}

extractData();
