(() => {
  const form = document.querySelector('#form');
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const passwordConfirm = document.querySelector('#password_confirm');

  // Show input error message
  function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className = 'form-control error';
    small.innerText = message;
  }

  // Show success message
  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  // Check email is valid
  function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
      showSuccess(email);
    } else {
      showError(email, 'Email is not valid');
    }
  }

  // Check password match
  function checkPasswordMatch(input, inputToCompare) {
    if (input.value !== inputToCompare.value) {
      showError(inputToCompare, 'Passwords do not match');
    }
  }

  // Get the name of the field by id
  function getFieldName(input) {
    const name = input.id.replace('_', ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function checkLength(input, minLength, maxLength) {
    if (input.value.trim().length < minLength) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${minLength} characters`
      );
    } else if (input.value.trim().length > maxLength) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${maxLength} characters`
      );
    }
  }

  // Check required fields
  function checkRequired(inputArray) {
    inputArray.forEach(input => {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }
    });
  }

  function handleRegister(event) {
    event.preventDefault();

    checkRequired([username, email, password, passwordConfirm]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password, passwordConfirm);
  }

  // Event listener
  form.addEventListener('submit', handleRegister);
})();
