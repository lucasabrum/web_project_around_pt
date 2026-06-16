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

const cardTemplate = document.querySelector("#template-cards").content;
const cardContainer = document.querySelector(".elements");

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

// Abre o pop-up recebido e ativa o fechamento pela tecla Esc.
function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener("keydown", closeByEsc);
}

// Fecha o pop-up recebido e remove o evento da tecla Esc.
function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener("keydown", closeByEsc);
}

// Fecha o pop-up aberto quando o usuario pressiona a tecla Esc.
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    closePopup(openedPopup);
  }
}

// Fecha o pop-up quando o usuario clica na area escura fora da janela.
function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup__opened")) {
    closePopup(evt.target);
  }
}


// Preenche o formulario com os dados atuais do perfil e abre o pop-up.
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetValidation(profileForm);
  openPopup(editPopup);
}

// Limpa o formulario de novo local e abre o pop-up.
function openAddPopup() {
  cardForm.reset();
  resetValidation(cardForm);
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

  createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });

  closePopup(addPopup);
}

// Monta um cartao, adiciona seus eventos e coloca o cartao na pagina.
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__text");
  const likeButton = cardElement.querySelector(".element__button");
  const removeButton = cardElement.querySelector(".element__remove-btn");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__button-like");
  });

  removeButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    const popupPhoto = popupImage.querySelector(".popup-image__photo");
    const popupTitle = popupImage.querySelector(".popup-image__title");

    popupPhoto.src = card.link;
    popupPhoto.alt = card.name;
    popupTitle.textContent = card.name;
    openPopup(popupImage);
  });

  cardContainer.prepend(cardElement);
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

setFormValidation(profileForm);
setFormValidation(cardForm);
initialCards.forEach(createCard);
