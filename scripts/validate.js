const config = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__submit-button",
  inactiveButtonClass: "popup__submit-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// функция показа ошибки при введении неправильных значений
const showValidationError = ( formElement, inputElement, errorMessage, inputErrorSelector, errorSelector) => {
  inputElement.classList.add(inputErrorSelector);
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorSelector);
};

// функция скрытия ошибки при введении правильных значений
const hideValidationError = ( formElement, inputElement, inputErrorSelector, errorSelector) => {
  inputElement.classList.remove(inputErrorSelector);
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.id}`);
  errorElement.classList.remove(errorSelector);
  errorElement.textContent = "";
};

// функция проверки инпута на ошибку
const checkInputValidity = (formElement, inputElement, inputErrorSelector, errorSelector) => {
  if (!inputElement.validity.valid) {
    showValidationError(formElement, inputElement, inputElement.validationMessage, inputErrorSelector, errorSelector);
  } else {
    hideValidationError(formElement, inputElement, inputErrorSelector, errorSelector);
  }
};

// функция проверки формы на ошибку
const checkFormValidity = (formElement, submitButtonSelector, inactiveButtonClass) => {
//  const { submitButtonSelector, inactiveButtonClass } = validationSubmitButton;
  const submitButton = formElement.querySelector(`.${submitButtonSelector}`);
  if (formElement.checkValidity()) {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  }
};

// функция проверки вводимых данных в инпут
const setEventListeners = (formElement, validationElement) => {
  const { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass} = validationElement;
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      checkFormValidity(formElement, submitButtonSelector, inactiveButtonClass);
    });
  });
};

// функция запуски проверки
const enableValidation = (validConfig) => {
  const { formSelector } = validConfig;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validConfig);
  });
};

enableValidation(config);

// функция сброса ошибок и блокировки кнопки "отправить" при открытии формы 
const openedFormCheck = (formName, configOpenedForm) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = configOpenedForm;
  checkFormValidity(formName, submitButtonSelector, inactiveButtonClass);
  const inputList = Array.from(formName.querySelectorAll(`.${inputSelector}`));
  inputList.forEach((inputElement) => {
      hideValidationError( formName, inputElement, inputErrorClass, errorClass) 
    })
}