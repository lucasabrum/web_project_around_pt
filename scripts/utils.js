// Abre o pop-up recebido e ativa o fechamento pela tecla Esc.
export function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener("keydown", closeByEsc);
}

// Fecha o pop-up recebido e remove o evento da tecla Esc.
export function closePopup(popup) {
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
export function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup__opened")) {
    closePopup(evt.target);
  }
}