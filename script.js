const audioElement = document.getElementById("audio");
const button = document.getElementById("button");
const jokeContent = document.getElementById("jokeContent");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS api
function tellMe(joke) {
  VoiceRSS.speech({
    key: config.VoiceRSSKey,
    src: joke,
    hl: "en-gb",
    v: "Alice",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from joke api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text-to-speech
    tellMe(joke);
    // diabled button
    toggleButton();

    jokeContent.innerText = joke;
  } catch (error) {
    // catch error here
    console.log("something wrong with getting jokes", error);
  }
}

// Event listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
