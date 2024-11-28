// Callbacks
const handleClick = (ramen) => {
  // Populate the #ramen-detail div with the ramen details
  const detailImage = document.querySelector("#ramen-detail img");
  const detailName = document.querySelector("#ramen-detail h2");
  const detailRestaurant = document.querySelector("#ramen-detail h3");
  const detailRating = document.querySelector("#rating-display");
  const detailComment = document.querySelector("#comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.querySelector("#new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const newRamen = {
      name: event.target["name"].value,
      restaurant: event.target["restaurant"].value,
      image: event.target["image"].value,
      rating: event.target["rating"].value,
      comment: event.target["comment"].value,
    };

    // Add new ramen image to #ramen-menu
    const ramenMenu = document.querySelector("#ramen-menu");
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;

    // Attach event listener to display ramen details on click
    img.addEventListener("click", () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    // Clear the form after submission
    form.reset();
  });
};

const displayRamens = async () => {
  try {
    // Fetch ramen data from the server
    const response = await fetch("http://localhost:3000/ramens");
    const ramens = await response.json();

    // Display each ramen's image in #ramen-menu
    const ramenMenu = document.querySelector("#ramen-menu");
    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;

      // Attach event listener to display ramen details on click
      img.addEventListener("click", () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching ramens:", error);
  }
};

const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
