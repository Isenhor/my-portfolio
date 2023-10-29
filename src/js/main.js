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

  /*
	// Back-to-top
	const backTopBtn = document.querySelector("#backtop");
	backTopBtn.style.opacity = 0;
	document.addEventListener("scroll", function () {
	  if (window.pageYOffset > 500) {
		backTopBtn.style.opacity = 1;
	  } else {
		backTopBtn.style.opacity = 0;
	  }
	});*/
});
