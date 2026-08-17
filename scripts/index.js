import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import api from "./Api.js";

const editPopupButton = document.querySelector(".profile__edit-button");
const addLocalButton = document.querySelector(".profile__add-button");

const avatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);

const profileForm = document.querySelector("#popup_form");
const cardForm = document.querySelector("#popup-local_form");

const avatarForm = document.querySelector("#avatar_form");

const cardTemplateSelector = "#template-cards";

const validationConfig = {
  inputSelector: "input",
  submitButtonSelector: "button[type='submit']",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};


let currentUserId = null;

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);
// validação também para o formulário de avatar.
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

// avatarSelector adicionado para o UserInfo conseguir ler/atualizar
// a foto de perfil, além de nome e "sobre".
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__text",
  avatarSelector: ".profile__avatar",
});

// Pop-up que exibe a imagem ampliada de um cartao.
const popupWithImage = new PopupWithImage("#Popup-photo");
popupWithImage.setEventListeners();

// Abre o pop-up de imagem com os dados do cartao clicado.
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// chamado quando o usuário clica no coração de um cartão.
function handleLikeClick(cardId, isLiked, cardInstance) {
  api
    .changeLikeCardStatus(cardId, isLiked)
    .then((updatedCard) => {
      cardInstance.setIsLiked(updatedCard.isLiked);
    })
    .catch((err) => console.log(err));
}

// chamado quando o usuário clica na lixeira de um cartão.
function handleDeleteClick(cardId, cardInstance) {
  deleteConfirmPopup.setSubmitAction(() => {
    deleteConfirmPopup.setLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardInstance.removeFromDOM();
        deleteConfirmPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => deleteConfirmPopup.setLoading(false));
  });
  deleteConfirmPopup.open();
}

// Cria uma instancia de Card e devolve o elemento pronto para ser inserido.
function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, currentUserId, {
    handleCardClick,
    handleLikeClick: (cardId, isLiked) =>
      handleLikeClick(cardId, isLiked, card),
    handleDeleteClick: (cardId) => handleDeleteClick(cardId, card),
  });
  return card.generateCard();
}

// Secao responsavel por renderizar a lista de cartoes na pagina.
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".elements"
);

// Pop-up de edicao de perfil.
const editPopup = new PopupWithForm("#edit-pop-up", (formValues) => {
  editPopup.setLoading(true);
  api
    .editProfile(formValues.name, formValues.text)
    .then((userData) => {
      userInfo.setUserInfo({ name: userData.name, job: userData.about });
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editPopup.setLoading(false));
});
editPopup.setEventListeners();

// Pop-up de criacao de um novo local (cartao).
const addPopup = new PopupWithForm("#Local-popup", (formValues) => {
  addPopup.setLoading(true);
  api
    .addCard(formValues.name, formValues["popup-local-text"])
    .then((newCard) => {
      cardSection.addItem(createCard(newCard));
      addPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addPopup.setLoading(false));
});
addPopup.setEventListeners();

// Pop-up de confirmação de exclusão. 
const deleteConfirmPopup = new PopupWithConfirmation(
  "#delete-confirm-popup",
  () => {}
);
deleteConfirmPopup.setEventListeners();

// pop-up de troca de avatar.
const avatarPopup = new PopupWithForm("#avatar-popup", (formValues) => {
  avatarPopup.setLoading(true);
  api
    .updateAvatar(formValues.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.setLoading(false));
});
avatarPopup.setEventListeners();

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

// limpa o formulário de avatar e abre o pop-up correspondente.
function openAvatarPopup() {
  avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarPopup.open();
}

editPopupButton.addEventListener("click", openEditPopup);
addLocalButton.addEventListener("click", openAddPopup);
avatarEditButton.addEventListener("click", openAvatarPopup);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

// ponto de entrada real dos dados. 
api
  .getAppInfo()
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log(err));