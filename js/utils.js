function formatPublishDate(date) {
  const extractedDate = date.substr(0, date.indexOf("T"));
  const dateFormatted = new Date(extractedDate);
  const options = { month: "long", day: "numeric", year: "numeric" };

  return dateFormatted.toLocaleDateString("EN-us", options);
}

// const startPunc = ["“", "'", "(", "[", "{"];
const endPunc = [".", ",", ":", ";", "?", "!", "/", "”", "'", ")", "]", "}"];

// TODO: Check for words beginning with a punc and retain them
// function checkStartPunc(startChar) {
//   return startPunc.some((char) => char === startChar);
// }

function checkEndPunc(lastChar) {
  return endPunc.some((char) => char === lastChar);
}

function martianFormatText(text) {
  let words = text.split(" ");

  words = words.map((word) => {
    let tempWord = "";

    if (word.length >= 4) {
      if (word[0] === word[0].toUpperCase()) {
        tempWord = "Boinga";
      } else {
        tempWord = "boingo";
      }

      if (checkEndPunc(word[word.length - 1])) {
        tempWord += word[word.length - 1];
      }
      return tempWord;
    }
    return word;
  });

  return words.join(" ");
}
