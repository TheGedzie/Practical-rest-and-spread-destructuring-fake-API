//import mock API
import { API_URL } from "./API_URL.js";

//get reauired elements for uses in JavaScript
const cardContainer = document.querySelector(".cards");
const template = document.getElementById("cardTemplate");
const total = document.getElementById("totalUsers");
const inputName = document.querySelector(".createForm-name");
const inputAge = document.querySelector(".createForm-age");
const createBtn = document.querySelector(".createForm-createBtn");

//Function for get user from server
const getUsers = async (URL) => {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(
        `New detected error: ${response.status} ---> ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`New detected error: ---> ${error}`);
  }
};

//frunction for get base referenses to card
const createCard = ({ name, avatar, age, address, email, id }) => {
  const cloneCard = template.content.cloneNode(true);

  const card = cloneCard.querySelector(".card");
  const cloneName = cloneCard.querySelector(".card__right-userInfo-name");
  const cloneAvatar = cloneCard.querySelector(".card__right-avatar");
  const cloneAge = cloneCard.querySelector(".card__right-userInfo-age");
  const cloneAddress = cloneCard.querySelector(".card__left-city");
  const cloneEmail = cloneCard.querySelector(".card__left-email");
  const deleteBtn = cloneCard.querySelector(".deleteBtn");
  const updateBtn = cloneCard.querySelector(".updateUser__Btn");
  const inputName = cloneCard.querySelector(".updateUser__newName");
  const inputAge = cloneCard.querySelector(".updateUser__newAge");

  cloneName.textContent = name;
  cloneAvatar.src = avatar;
  cloneAge.textContent = age;
  cloneAddress.textContent = address;
  cloneEmail.textContent = email;
  card.dataset.id = id;
  deleteBtn.addEventListener("click", () => deleteCard(API_URL, id));
  updateBtn.addEventListener("click", () =>
    updateCard(API_URL, id, inputName, inputAge)
  );
  cardContainer.append(cloneCard);
};
//function for delete user
const deleteCard = async (URL, id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    renderCards(getUsers(API_URL));
  } catch (error) {
    console.error(`Error -> ${error}`);
  }
};
//function for update user
const updateCard = async (URL, id, name, age) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name.value,
        age: age.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `New detected error: ${response.status} ---> ${response.statusText}`
      );
    }
    name.value = "";
    age.value = "";
    renderCards(getUsers(API_URL));
  } catch (error) {
    console.error(`New error --> ${error}`);
  }
};
//function for create new user
const createUser = async (URL) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        name: inputName.value.trim(),
        age: inputAge.value.trim(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `New detected error: ${response.status} ---> ${response.statusText}`
      );
    }
    inputName.value = "";
    inputAge.value = "";
  } catch (error) {
    console.error(`New detected error: ---> ${error}`);
  }
};

//logic for call function createUser on click button
createBtn.addEventListener("click", () => {
  createUser(API_URL);
  renderCards(getUsers(API_URL));
});

//function for render user card in page
const renderCards = async (dataCards) => {
  cardContainer.innerHTML = "";
  const data = await dataCards;
  total.textContent = data.length;
  data.forEach((element) => {
    createCard(element);
  });
};

// call render function
renderCards(getUsers(API_URL));
