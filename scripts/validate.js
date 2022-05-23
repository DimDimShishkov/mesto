// функция показа ошибки при введении неправильных значений
const showValidationError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(
    `.popup__input-error_type_${inputSelector.id}`
  );
  inputSelector.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// функция скрытия ошибки при введении правильных значений
const hideValidationError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(
    `.popup__input-error_type_${inputSelector.id}`
  );
  inputSelector.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

// функция проверки инпута на ошибку
const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showValidationError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  } else {
    hideValidationError(formSelector, inputSelector);
  }
};

// функция проверки формы на ошибку
const checkFormValidity = (form) => {
  const submitButtonSelector = form.querySelector(
    `.popup__submit-button_type_${form.name}`
  );
  if (form.checkValidity()) {
    submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove("popup__submit-button_type_disabled");
  } else {
    submitButtonSelector.disabled = true;
    submitButtonSelector.classList.add("popup__submit-button_type_disabled");
  }
};

// функция проверки вводимых данных в инпут
const setEventListeners = (formSelector) => {
  const inputSelector = Array.from(
    formSelector.querySelectorAll(".popup__input")
  );
  inputSelector.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(formSelector, input);
      checkFormValidity(formSelector);
    });
  });
};



// функция запуски проверки
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formSelector) => {
    setEventListeners(formSelector);
    checkFormValidity(formSelector);
  });
};

enableValidation();

