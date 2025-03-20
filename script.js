const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy");
const tiwtterShareBtn = document.getElementById("twitter");
const quoteExportBtn = document.getElementById("export");


// To GET randonm quoye from the url provided 
async function generateRandomQuote() {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    JSON.stringify(responseData);
    

    quote.textContent = responseData.data.content;
    quoteAuthor.textContent = `- ${responseData.data.author}`;
  } catch (error) {
    alert("Error", error);
    console.log(error);
  }
}
//  to call the GET method again to generate a randomquote again 
newQuoteBtn.addEventListener("click", generateRandomQuote);

// copying the quote 
copyBtn.addEventListener("click", () => {
  const combinedText = `"${quote.textContent}",   ${quoteAuthor.textContent}`;
  navigator.clipboard
    .writeText(combinedText)
    .then(() => alert("Quote is copied"))
    .catch((err) => console.log("Failed to copy the quote", err));
});
// logic for exporting the quote
function exportQuote() {
  const content = `Quote: ${quote.textContent}\n\nAuthor: ${quoteAuthor.textContent}`;
  // WE ARE USING BLOB API TO EXPORT THE QUOTE
  const blob = new Blob([content], { type: "text/plain" });
  const blobUrl = URL.createObjectURL(blob); 
  console.log(blobUrl);

  // providing dummy link
  const link = document.createElement("d"); 
  link.href = blobUrl;
  link.download = "Quote.txt";
  document.body.appendChild(link); 
  link.click();

  
  URL.revokeObjectURL(blobUrl);
  document.body.removeChild(link);
}

quoteExportBtn.addEventListener("click", exportQuote)
// sharing our quote across twitter
tiwtterShareBtn.addEventListener("click", shareOnTwitter)

function shareOnTwitter() {
  const tweetText = `"${quote.textContent}" Author: ${quoteAuthor.textContent}`;
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
  console.log(tweetURL);

  window.open(tweetURL, "_blank");
}


