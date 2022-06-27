(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._image=n,this._title=e,this._cardSelector=r,this._handleCardClick=i}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".element__image"),this._cardText=this._element.querySelector(".element__text"),this._cardLike=this._element.querySelector(".element__like"),this._cardDelete=this._element.querySelector(".element__remove"),this._cardImage.src="".concat(this._image),this._cardImage.alt=this._title,this._cardText.textContent=this._title,this._setEventListeners(),this._element}},{key:"_toggleLike",value:function(){this._cardLike.classList.toggle("element__like_active")}},{key:"_deleteImage",value:function(){this._element.remove()}},{key:"_setEventListeners",value:function(){var e=this;this._cardLike.addEventListener("click",(function(){e._toggleLike()})),this._cardDelete.addEventListener("click",(function(){e._deleteImage()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._image,e._title)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._form=n,this._submitButton=this._form.querySelector(".".concat(this._submitButtonSelector)),this._inputsList=Array.from(this._form.querySelectorAll(".".concat(this._inputSelector)))}var t,r;return t=e,(r=[{key:"_hideValidationError",value:function(e){e.classList.remove(this._inputErrorClass);var t=this._form.querySelector(".popup__input-error_type_".concat(e.id));t.classList.remove(this._errorClass),t.textContent=""}},{key:"_showValidationError",value:function(e){e.classList.add(this._inputErrorClass);var t=this._form.querySelector(".popup__input-error_type_".concat(e.id));t.textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_toggleButtonState",value:function(e){e.validity.valid?this._hideValidationError(e):this._showValidationError(e)}},{key:"_checkFormValidity",value:function(){this._form.checkValidity()?(this._submitButton.disabled=!1,this._submitButton.classList.remove(this._inactiveButtonClass)):(this._submitButton.disabled=!0,this._submitButton.classList.add(this._inactiveButtonClass))}},{key:"_setEventListeners",value:function(e){var t=this;e.addEventListener("input",(function(){t._toggleButtonState(e),t._checkFormValidity()}))}},{key:"resetValidation",value:function(){var e=this;this._checkFormValidity(),this._inputsList.forEach((function(t){e._hideValidationError(t)}))}},{key:"enableValidation",value:function(){var e=this;this._inputsList.forEach((function(t){e._setEventListeners(t),e._hideValidationError(t),e._checkFormValidity(t)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),i=document.querySelector(".page"),o=i.querySelector(".profile"),a=o.querySelector(".profile__info"),s=a.querySelector(".profile__edit-button"),l=o.querySelector(".profile__add-button"),c=a.querySelector(".profile__name"),u=a.querySelector(".profile__description"),p=i.querySelector(".popup_type_info"),_=p.querySelector(".popup__form_type_info"),d=document.getElementById("edit-name"),m=document.getElementById("edit-description"),h=i.querySelector(".popup_type_images"),f=h.querySelector(".popup__form_type_images"),v=document.getElementById("image-name"),y=document.getElementById("image-link"),g=i.querySelector(".elements"),k=document.querySelector(".popup_type_image"),S=k.querySelector(".popup__description"),b=k.querySelector(".popup__image"),E=function(e){e.classList.add("popup_opened"),i.classList.add("page_active"),document.addEventListener("keydown",C)},L=function(e){e.classList.remove("popup_opened"),i.classList.remove("page_active"),document.removeEventListener("keydown",C)};_.addEventListener("submit",(function(e){e.preventDefault(),L(p),c.textContent=d.value,u.textContent=m.value})),s.addEventListener("click",(function(e){e.preventDefault(),E(p),d.value=c.textContent,m.value=u.textContent,V.info.resetValidation()})),Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&L(e),t.target.classList.contains("popup__exit-button")&&L(e)}))}));var C=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");L(t)}};l.addEventListener("click",(function(e){e.preventDefault(),E(h),V.images.resetValidation()}));var q=function(e,t){S.textContent=t,b.src=e,b.alt=t,E(k)},B=function(e,n){return new t(e,n,".image-template",q).generateCard()};f.addEventListener("submit",(function(e){var t=B(v.value,y.value);g.prepend(t),e.preventDefault(),L(h),e.target.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=B(e.name,e.link);g.prepend(t)}));var x,V={};x={formSelector:"popup__form",inputSelector:"popup__input",submitButtonSelector:"popup__submit-button",inactiveButtonClass:"popup__submit-button_type_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(".".concat(x.formSelector))).forEach((function(e){var t=new r(x,e),n=e.getAttribute("name");V[n]=t,t.enableValidation()}))})();