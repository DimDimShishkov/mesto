const config = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__submit-button",
  inactiveButtonClass: "popup__submit-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// функция показа ошибки при введении неправильных значений
const showValidationError = ( errorElement, inputElement, errorMessage, inputErrorSelector, errorSelector) => {
  inputElement.classList.add(inputErrorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorSelector);
};

// функция скрытия ошибки при введении правильных значений
const hideValidationError = ( errorElement, inputElement, inputErrorSelector, errorSelector) => {
  inputElement.classList.remove(inputErrorSelector);
  errorElement.classList.remove(errorSelector);
  errorElement.textContent = "";
};

// функция проверки инпута на ошибку
const checkInputValidity = (errorElement, inputElement, inputErrorSelector, errorSelector) => {
  if (!inputElement.validity.valid) {
    showValidationError(errorElement, inputElement, inputElement.validationMessage, inputErrorSelector, errorSelector);
  } else {
    hideValidationError(errorElement, inputElement, inputErrorSelector, errorSelector);
  }
};

// функция проверки формы на ошибку
const checkFormValidity = (formElement, submitButton, disabledSelector) => {
  if (formElement.checkValidity()) {
    submitButton.disabled = false;
    submitButton.classList.remove(disabledSelector);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(disabledSelector);
  }
};

// функция проверки вводимых данных в инпут
const setEventListeners = (formElement, validationElement) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = validationElement;
  const submitButton = formElement.querySelector(`.${submitButtonSelector}`);
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
    inputElement.addEventListener("input", function () {
      checkInputValidity(errorElement, inputElement, inputErrorClass, errorClass);
      checkFormValidity(formElement, submitButton, inactiveButtonClass);
    });
  });
};

// функция запуски проверки
const enableValidation = (validConfig) => {
  const { formSelector, submitButtonSelector } = validConfig;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validConfig);
    const submitButton = formElement.querySelector(`.${submitButtonSelector}`);
  });
};

enableValidation(config);

// функция сброса ошибок и блокировки кнокпи отправить при открытии формы 
const openedFormReset = (formName) => {
  formName.reset()
  formName.querySelector(".popup__submit-button").disabled = true;
  formName.querySelector(".popup__submit-button").classList.add('popup__submit-button_type_disabled');
  formName.querySelectorAll(".popup__input-error").forEach((input) => {
    input.classList.remove('popup__input-error_active')});
  formName.querySelectorAll(".popup__input").forEach((input) => {
    input.classList.remove('popup__input_type_error')});
}
