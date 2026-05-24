(function () {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-main-nav]");

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  const hero = document.querySelector("[data-hero]");

  if (hero) {
    const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
    const dots = Array.from(hero.querySelectorAll("[data-hero-dot]"));
    let index = 0;

    function showSlide(nextIndex) {
      index = nextIndex;
      slides.forEach(function (slide, currentIndex) {
        slide.classList.toggle("active", currentIndex === index);
      });
      dots.forEach(function (dot, currentIndex) {
        dot.classList.toggle("active", currentIndex === index);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        showSlide(Number(dot.dataset.heroDot));
      });
    });

    if (slides.length > 1) {
      setInterval(function () {
        showSlide((index + 1) % slides.length);
      }, 5200);
    }
  }

  const searchInput = document.querySelector("[data-search-input]");
  const cards = Array.from(document.querySelectorAll("[data-card]"));
  const emptyState = document.querySelector("[data-empty-state]");
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  let activeFilter = "all";

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function applyFilter() {
    const query = normalize(searchInput ? searchInput.value : "");
    let visible = 0;

    cards.forEach(function (card) {
      const text = normalize(card.dataset.search);
      const type = normalize(card.dataset.type);
      const filter = normalize(activeFilter);
      const matchesQuery = !query || text.indexOf(query) !== -1;
      const matchesFilter = filter === "all" || type.indexOf(filter) !== -1 || text.indexOf(filter) !== -1;
      const shouldShow = matchesQuery && matchesFilter;

      card.classList.toggle("hide-card", !shouldShow);
      if (shouldShow) {
        visible += 1;
      }
    });

    if (emptyState) {
      emptyState.classList.toggle("show", visible === 0);
    }
  }

  if (searchInput && cards.length) {
    searchInput.addEventListener("input", applyFilter);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      applyFilter();
    });
  });
})();
