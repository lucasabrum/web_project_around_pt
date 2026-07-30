import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const editPopupButton = document.querySelector(".profile__edit-button");
const addLocalButton = document.querySelector(".profile__add-button");

const profileForm = document.querySelector("#popup_form");
const cardForm = document.querySelector("#popup-local_form");

const cardTemplateSelector = "#template-cards";

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__text",
});

// Pop-up que exibe a imagem ampliada de um cartao.
const popupWithImage = new PopupWithImage("#Popup-photo");
popupWithImage.setEventListeners();

// Abre o pop-up de imagem com os dados do cartao clicado.
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Cria uma instancia de Card e devolve o elemento pronto para ser inserido.
function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, { handleCardClick });
  return card.generateCard();
}

// Secao responsavel por renderizar a lista de cartoes na pagina.
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".elements"
);

// Pop-up de edicao de perfil.
const editPopup = new PopupWithForm("#edit-pop-up", (formValues) => {
  userInfo.setUserInfo({ name: formValues.name, job: formValues.text });
  editPopup.close();
});
editPopup.setEventListeners();

// Pop-up de criacao de um novo local (cartao).
const addPopup = new PopupWithForm("#Local-popup", (formValues) => {
  cardSection.addItem(
    createCard({ name: formValues.name, link: formValues["popup-local-text"] })
  );
  addPopup.close();
});
addPopup.setEventListeners();

// Preenche o formulario com os dados atuais do perfil e abre o pop-up.
function openEditPopup() {
  const { name, job } = userInfo.getUserInfo();
  profileForm.querySelector("#name").value = name;
  profileForm.querySelector("#job").value = job;
  profileFormValidator.resetValidation();
  editPopup.open();
}

// Limpa o formulario de novo local e abre o pop-up.
function openAddPopup() {
  cardForm.reset();
  cardFormValidator.resetValidation();
  addPopup.open();
}

editPopupButton.addEventListener("click", openEditPopup);
addLocalButton.addEventListener("click", openAddPopup);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

cardSection.renderItems();
