// Mostra a mensagem de erro padrao do navegador abaixo do campo.
function showInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_type_error");
  error.textContent = input.validationMessage;
  error.classList.add("popup__input-error_visible");
}

// Esconde a mensagem de erro e remove o estilo vermelho do campo.
function hideInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  error.textContent = "";
  error.classList.remove("popup__input-error_visible");
}

// Verifica se um campo esta valido e mostra ou esconde o erro.
function checkInputValidity(form, input) {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    showInputError(form, input);
  }
}

// Ativa ou desativa o botao de envio de acordo com a validade dos campos.
function toggleSubmitButton(form) {
  const inputs = Array.from(form.querySelectorAll("input"));
  const button = form.querySelector("button[type='submit']");
  const hasInvalidInput = inputs.some((input) => !input.validity.valid);

  button.disabled = hasInvalidInput;
  button.classList.toggle("popup__button-submit_disabled", hasInvalidInput);
}

// Adiciona os eventos de validacao aos inputs de um formulario.
function setFormValidation(form) {
  const inputs = Array.from(form.querySelectorAll("input"));

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleSubmitButton(form);
    });
  });

  toggleSubmitButton(form);
}

// Limpa os erros antigos e atualiza o estado do botao ao abrir um pop-up.
function resetValidation(form) {
  const inputs = Array.from(form.querySelectorAll("input"));

  inputs.forEach((input) => {
    hideInputError(form, input);
  });

  toggleSubmitButton(form);
}