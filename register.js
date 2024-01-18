const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const pass_REGEXP =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
const inputEmail = document.querySelector(".register__email");
const inputAge = document.querySelector(".register__userAge");
const inputEmailError = document.querySelector(".email__error");
const inputPassword = document.querySelector(".register__password");
const inputPasswordError = document.querySelector(".password__error");
const inputPasswordRepeatError = document.querySelector(
  ".passwordRepeat__error"
);
const inputPasswordRepeat = document.querySelector(".register__passwordRepeat");
const userAgeError = document.querySelector(".userAgeError");
const button = document.querySelector(".register__submit");
const form = document.querySelector(".register__form");

inputEmail.addEventListener("blur", function () {
  let shouldError = EMAIL_REGEXP.test(inputEmail.value) === false;
  if (shouldError) {
    inputEmailError.textContent =
      "Проверьте, пожалуйста, адрес электронной почты";
    button.setAttribute("disabled", " ");
  } else {
    inputEmailError.textContent = "";
    button.removeAttribute("disabled", " ");
  }
});

inputPassword.addEventListener("blur", function () {
  let error = pass_REGEXP.test(inputPassword.value) === false;
  if (error) {
    inputPasswordError.textContent =
      "Минимальная длина пароля 8 символов. Пароль должен содержать минимум одну цифру, по одной заглавной и строчной букве и один символ.";
    button.setAttribute("disabled", " ");
  } else {
    inputPasswordError.textContent = "";
    button.removeAttribute("disabled", " ");
  }
});

inputPasswordRepeat.addEventListener("blur", function () {
  if (inputPasswordRepeat.value !== inputPassword.value) {
    inputPasswordRepeatError.textContent = "Пароли не совпадают";
    button.setAttribute("disabled", " ");
  } else {
    inputPasswordRepeatError.textContent = "";
    button.removeAttribute("disabled", " ");
  }
});

inputAge.addEventListener("blur", (evt) => {
  const value = inputAge.value;

  /* убираем все символы маски ввода c разделением через дефиз (05-12-2002) */
  const valueWithoutDash = value.replace(/[^\d]/g, "");

  /* проверка только после ввода полной даты */
  if (valueWithoutDash.length === 8) {
    /* проверка на корректность введенной даты, чтобы не было числа 77 или месяца 99 и т.п. Основана на свойстве объекта даты - автоисправление */
    const arrBirth = value.split("-");

    const birth = new Date(arrBirth[0], arrBirth[1], arrBirth[2]);

    let today = new Date();
    const yearsOld18 = new Date();

    yearsOld18.setFullYear(today.getFullYear() - 18);
    if (birth > yearsOld18) {
      userAgeError.textContent = "Доступ запрещен, Вам еще нет 18 лет";
      button.setAttribute("disabled", " ");
    } else {
      userAgeError.textContent = "";
      button.removeAttribute("disabled", " ");
    }
  }
});

button.addEventListener("click", function (event) {
  const errorCount =
    userAgeError.textContent.length +
    inputPasswordRepeatError.textContent.length +
    inputPasswordError.textContent.length +
    inputEmailError.textContent.length;
  console.log(inputEmail.value.length);
  if (
    errorCount > 0 ||
    inputEmail.value.length < 1 ||
    inputPasswordRepeat.value.length < 1 ||
    inputAge.value.length < 1 ||
    inputPasswordRepeat.value.length < 1
  ) {
    event.preventDefault();
    button.setAttribute("disabled", " ");
  } else {
    button.removeAttribute("disabled", " ");
  }
});
