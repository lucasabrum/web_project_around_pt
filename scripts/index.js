import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closeByOverlay } from "./utils.js";

const editPopupButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-pop-up");
const closePopupButton = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__text");
const profileForm = document.querySelector("#popup_form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");

const addLocalButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#Local-popup");
const closeLocalButton = document.querySelector(".popup-local__button");
const cardForm = document.querySelector("#popup-local_form");
const cardNameInput = document.querySelector("#popup-local-name");
const cardLinkInput = document.querySelector("#link");

const popupImage = document.querySelector("#Popup-photo");
const buttonPopupImage = document.querySelector(".popup-image__button");

const cardTemplateSelector = "#template-cards";
const cardContainer = document.querySelector(".elements");

const validationConfig = {
  inputSelector: "input",
  submitButtonSelector: "button[type='submit']",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da...",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

// Abre o pop-up de imagem preenchido com os dados do cartao clicado.
function handleCardClick(name, link) {
  const popupPhoto = popupImage.querySelector(".popup-image__photo");
  const popupTitle = popupImage.querySelector(".popup-image__title");

  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupTitle.textContent = name;
  openPopup(popupImage);
}

// Cria uma instancia de Card e devolve o elemento pronto para ser inserido.
function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, { handleCardClick });
  return card.generateCard();
}

// Adiciona um cartao ao inicio do container.
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardContainer.prepend(cardElement);
}

// Preenche o formulario com os dados atuais do perfil e abre o pop-up.
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation();
  openPopup(editPopup);
}

// Limpa o formulario de novo local e abre o pop-up.
function openAddPopup() {
  cardForm.reset();
  cardFormValidator.resetValidation();
  openPopup(addPopup);
}

// Salva as informacoes do formulario no perfil.
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

// Cria um novo cartao com os dados digitados no formulario.
function handleCardSubmit(evt) {
  evt.preventDefault();

  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });

  closePopup(addPopup);
}

editPopupButton.addEventListener("click", openEditPopup);
closePopupButton.addEventListener("click", () => closePopup(editPopup));
profileForm.addEventListener("submit", handleProfileSubmit);

addLocalButton.addEventListener("click", openAddPopup);
closeLocalButton.addEventListener("click", () => closePopup(addPopup));
cardForm.addEventListener("submit", handleCardSubmit);

buttonPopupImage.addEventListener("click", () => closePopup(popupImage));

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", closeByOverlay);
});

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();
initialCards.forEach(renderCard);