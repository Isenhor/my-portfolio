document.addEventListener("DOMContentLoaded", function () {
  // Burger
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#menu");
  const bodyEl = document.body;

  burger.addEventListener("click", function () {
    if (this.classList.contains("burger--active")) {
      this.classList.remove("burger--active");
      bodyEl.classList.remove("lock");
      menu.classList.remove("nav--active");
    } else {
      this.classList.add("burger--active");
      bodyEl.classList.add("lock");
      menu.classList.add("nav--active");
    }
  });

  menu.addEventListener("click", () => {
    burger.classList.remove("burger--active");
    bodyEl.classList.remove("lock");
    menu.classList.remove("nav--active");
  });

  // Перемещение плейсхолдера
  const formItems = document.querySelectorAll(".form-input");

  for (let item of formItems) {
    const thisParent = item.closest(".form-item");
    const thisPlaceholder = thisParent.querySelector(".fake-placeholder");
    const thisInput = thisParent.querySelector(".form-input");

    // Если инпут в фокусе
    item.addEventListener("focus", () => {
      thisPlaceholder.classList.add("fake-placeholder--active");
      thisInput.classList.add("form-input--active");
    });

    // Когда инпут теряет фокус
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
        thisPlaceholder.classList.add("fake-placeholder--active");
        thisInput.classList.add("form-input--active");
      } else {
        thisPlaceholder.classList.remove("fake-placeholder--active");
        thisInput.classList.remove("form-input--active");
      }
    });
  }

//FORM VALIDATE
$(".contact-form").validate({
  rules: {
    email: {
      required: true,
      email: true,
    },

    message: {
      required: true,
    },
  },
  messages: {
    email: {
      required: "Введите email",
      email: "отсутсвует символ @",
    },

    message: {
      required: "Поле не должно быть пустым",
    },
  },
  submitHandler: function (form) {
    ajaxFormSubmit();
  },
});

//*************************************************** */
// Функция AJAX запрса на сервер

function ajaxFormSubmit() {
  let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

  //Формируем ajax запрос
  $.ajax({
    type: "POST", // Тип запроса - POST
    url: "php/mail.php", // Куда отправляем запрос
    data: string, // Какие даные отправляем, в данном случае отправляем переменную string

    // Функция если все прошло успешно
    success: function (html) {
      $(".contact-form").slideUp(800);
      $("#answer").html(html);
    },
  });
  // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
  return false;
}

  // Back-to-top
  const backTopBtn = document.querySelector("#backtop");
  backTopBtn.style.opacity = 0;
  document.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      backTopBtn.style.opacity = 1;
    } else {
      backTopBtn.style.opacity = 0;
    }
  });

  //AOS Init
  AOS.init();

  //Mixitup
  let containerEl = document.querySelector("#mix-cards");

  let mixer = mixitup(containerEl, {
    classNames: {
      block: "",
    },
  });
});
