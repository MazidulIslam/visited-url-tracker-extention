
// Get the list of visited URLs from storage and populate the popup.
chrome.storage.local.get('visitedURLs', (data) => {
  const urlList = data.visitedURLs || [];

  const tbody = document.getElementById('urlList');

  urlList.forEach((url) => {
    var tdUrls = document.createElement('td');
    var tdRemove = document.createElement('td');

    var tr = document.createElement('tr');
    tdUrls.textContent = url;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('Remove');
    tdRemove.appendChild(removeButton);
    tr.appendChild(tdUrls);
    tr.appendChild(tdRemove);
    removeButton.addEventListener('click', () => {
      // Remove the URL from the list and update storage.
      const index = urlList.indexOf(url);
      if (index > -1) {
        urlList.splice(index, 1);
        chrome.storage.local.set({ visitedURLs: urlList });
        tr.remove();
      }
    });

    tbody.appendChild(tr);
  });
});
