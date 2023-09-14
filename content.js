// Function to extract the domain from a URL
function getDomain(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}
// Get the current URL
const currentURL = getDomain(window.location.href);

// Check if the URL is already in the list of visited URLs
chrome.storage.local.get('visitedURLs', (data) => {
  const urlList = data.visitedURLs || [];

  if (urlList.includes(currentURL)) {
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '0';
    messageContainer.style.left = '0';
    messageContainer.style.width = '100%';
    messageContainer.style.zIndex = '9999';
    messageContainer.style.backgroundColor = 'yellow'; 
    messageContainer.style.padding = '10px'; 
    messageContainer.style.display = 'flex';
    messageContainer.style.justifyContent = 'space-evenly'; 
    messageContainer.style.alignItems = 'center';

    // Create the message
    const message = document.createElement('div');
    message.textContent = 'This page already visited';

    // Create a button to dismiss the message
    const dismissButton = document.createElement('button');
    dismissButton.textContent = 'Dismiss';
    dismissButton.style.marginRight = '10px'; 
    dismissButton.addEventListener('click', () => {
      // Remove the message container
      messageContainer.remove();
    });

    // Append the message and button to the message container
    messageContainer.appendChild(message);
    messageContainer.appendChild(dismissButton);

    // Append the message container to the body
    document.body.appendChild(messageContainer);
  } else {
    // This is a new URL; added it to the list of visited URLs and update storage
    urlList.push(currentURL);
    chrome.storage.local.set({ visitedURLs: urlList });
  }
});
