// index.js

// Function for when ramen photo is clicked
const handleClick = (ramen) => {
  // Add code
  const ramenDetailImg = document.querySelector(".detail-image")
  ramenDetailImg.src = ramen.target.src

  const ramenDetailName = document.querySelector(".name")
  ramenDetailName.textContent = ramen.target.getAttribute("data-name")

  const ramenDetailRestaurant = document.querySelector(".restaurant")
  ramenDetailRestaurant.textContent = ramen.target.getAttribute("data-restaurant")

  const ratingDisplayP = document.querySelector("#rating-display")
  ratingDisplayP.textContent = ramen.target.getAttribute("data-rating")

  const ratingCommentDisplayP = document.querySelector("#comment-display")
  ratingCommentDisplayP.textContent = ramen.target.getAttribute("data-comment")
};
// Function for when ramen photo is clicked

//Core Deliverable - Adds a new ramen to the dom and server
const addSubmitListener = () => {
  const ramenForm = document.getElementById("new-ramen")
  ramenForm.addEventListener("submit", (event) => {
      event.preventDefault()  
      console.log("Submit event triggered")
      console.log(ramenForm)
      const nameInput = document.querySelector("#new-name").value
      const restaurantInput = document.querySelector("#new-restaurant").value
      const imageInput = document.querySelector("#new-image").value
      const ratingInput = document.querySelector("#new-rating").value
      const commentInput = document.querySelector("#new-comment").value

      fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": nameInput,
          "restaurant": restaurantInput,
          "image": imageInput,
          "rating": ratingInput,
          "comment": commentInput
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    })
}
//Core Deliverable - Adds a new ramen to the dom and server

//Core Deliverable - Shows all ramens
const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(ramens => {
      const ramenMenu = document.querySelector("#ramen-menu")
      ramens.forEach(ramen => {
        const ramenDiv = document.createElement('div')
        ramenDiv.addEventListener("click", handleClick)
        ramenDiv.addEventListener("dblclick", handleDoubleClick)
        const ramenImg = document.createElement('img')
        ramenMenu.appendChild(ramenDiv)
        ramenDiv.appendChild(ramenImg)
        ramenImg.src = ramen.image
        ramenImg.setAttribute('data-name', ramen.name)
        ramenImg.setAttribute('data-restaurant', ramen.restaurant)
        ramenImg.setAttribute('data-rating', ramen.rating)
        ramenImg.setAttribute('data-comment', ramen.comment)
      })
    })
};
//Core Deliverable - Shows all ramens

//Advanced Deliverable - Deletes a ramen when double-clicked
const handleDoubleClick = (event) => {
  event.target.remove()
  const ramenDetailImg = document.querySelector(".detail-image")
  ramenDetailImg.src = "./assets/image-placeholder.jpg"

  const ramenDetailName = document.querySelector(".name")
  ramenDetailName.textContent = 'Insert Name Here'

  const ramenDetailRestaurant = document.querySelector(".restaurant")
  ramenDetailRestaurant.textContent = 'Insert Restaurant'

  const ratingDisplayP = document.querySelector("#rating-display")
  ratingDisplayP.textContent = 'Insert Rating Here'

  const ratingCommentDisplayP = document.querySelector("#comment-display")
  ratingCommentDisplayP.textContent = 'Insert Comment Here'
}
//Advanced Deliverable - Deletes a ramen when double-clicked

//Advanced deliverable - Displays the first ramen and its details on ramen-detail when page reloads
const showFirstRamen = () => {
  fetch("http://localhost:3000/ramens")
  .then(resp => resp.json())
  .then(ramens => {
      const ramenDetailImg = document.querySelector(".detail-image")
      ramenDetailImg.src = ramens[0].image
  
      const ramenDetailName = document.querySelector(".name")
      ramenDetailName.textContent = ramens[0].name
  
      const ramenDetailRestaurant = document.querySelector(".restaurant")
      ramenDetailRestaurant.textContent = ramens[0].restaurant
    
      const ratingDisplayP = document.querySelector("#rating-display")
      ratingDisplayP.textContent = ramens[0].rating
    
      const ratingCommentDisplayP = document.querySelector("#comment-display")
      ratingCommentDisplayP.textContent = ramens[0].comment
  })
}
const main = () => {
  addSubmitListener()
  displayRamens()
  showFirstRamen() //Advanced deliverable
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};     