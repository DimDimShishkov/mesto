export const config = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__submit-button",
  inactiveButtonClass: "popup__submit-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  _hideValidationError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._form.querySelector(
      `.popup__input-error_type_${inputElement.id}`
    );
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _showValidationError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._form.querySelector(
      `.popup__input-error_type_${inputElement.id}`
    );
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showValidationError(inputElement);
    } else {
      this._hideValidationError(inputElement);
    }
  }

  _checkFormValidity() {
    const submitButton = this._form.querySelector(
      `.${this._submitButtonSelector}`
    );
    if (this._form.checkValidity()) {
      submitButton.disabled = false;
      submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      submitButton.disabled = true;
      submitButton.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListeners(inputElement) {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._checkFormValidity();
    });
  }

  enableValidation() {
    const inputList = Array.from(
      this._form.querySelectorAll(`.${this._inputSelector}`)
    );
    inputList.forEach((inputElement) => {
      this._setEventListeners(inputElement);
      this._hideValidationError(inputElement);
      this._checkFormValidity(inputElement);
    });
  }
}
