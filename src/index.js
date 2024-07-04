console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];

    // Fetch and display dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const imageContainer = document.getElementById('dog-image-container');
        data.message.forEach(imgUrl => {
          const img = document.createElement('img');
          img.src = imgUrl;
          imageContainer.appendChild(img);
        });
      });

    // Fetch and display dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        allBreeds = Object.keys(data.message);
        renderBreeds(allBreeds);
      });

    // Function to render breeds
    const renderBreeds = (breeds) => {
      const breedList = document.getElementById('dog-breeds');
      breedList.innerHTML = '';
      breeds.forEach(breed => {
        const li = document.createElement('li');
        li.innerText = breed;
        breedList.appendChild(li);
      });
    };

    // Filter breeds by starting letter
    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', (event) => {
      const selectedLetter = event.target.value;
      const filteredBreeds = selectedLetter === 'all' ? allBreeds : allBreeds.filter(breed => breed.startsWith(selectedLetter));
      renderBreeds(filteredBreeds);
    });

    // Change font color on click
    const breedList = document.getElementById('dog-breeds');
    breedList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        event.target.style.color = 'blue';  // Change 'blue' to any color you prefer
      }
    });
  });