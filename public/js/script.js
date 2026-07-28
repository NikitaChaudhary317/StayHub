// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })



 const categoryCheckboxes = document.querySelectorAll(".category-checkbox");
  const categoryFeedback = document.getElementById("categoryFeedback");
  const form = document.querySelector(".needs-validation");

  if (form && categoryCheckboxes.length > 0) {
    form.addEventListener("submit", (event) => {
      const selected =[...categoryCheckboxes].some(cb => cb.checked);
      if (!selected) {
        event.preventDefault();
        event.stopPropagation();
        categoryFeedback.classList.add("d-block");
      } else {
        categoryFeedback.classList.remove("d-block");
      }
    });
  }
})()