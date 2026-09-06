/* =========================================
   FARDIN PORTFOLIO JAVASCRIPT
   ========================================= */


/* =========================================
   CURRENT YEAR
   ========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   MOBILE MENU
   ========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================
   3D TILT EFFECT
   ========================================= */

function addTiltEffect(element, strength = 6) {

  if (!element) return;


  element.addEventListener("mousemove", (event) => {

    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    const percentX =
      (x - rect.width / 2) /
      (rect.width / 2);

    const percentY =
      (y - rect.height / 2) /
      (rect.height / 2);


    element.style.transform = `
      perspective(900px)
      rotateX(${-percentY * strength}deg)
      rotateY(${percentX * strength}deg)
      scale3d(1.015, 1.015, 1.015)
    `;

  });


  element.addEventListener("mouseleave", () => {

    element.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

  });

}


/* HERO PORTRAIT */

addTiltEffect(
  document.querySelector(".hero-portrait"),
  7
);


/* STAT CARDS */

document
  .querySelectorAll(".stat-card")
  .forEach((card) => {

    addTiltEffect(card, 5);

  });


/* OTHER CARDS */

document
  .querySelectorAll(
    ".about-card, .featured-video, .service-card, .comparison-card, .process-card, .contact-card"
  )
  .forEach((card) => {

    addTiltEffect(card, 3);

  });


/* =========================================
   ACTIVE NAVIGATION
   ========================================= */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if (sections.length && navigationLinks.length) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navigationLinks.forEach((link) => {

          const href = link.getAttribute("href");

          /*
           * LONG-FORM WORK belongs to WORK.
           * Therefore #longform should highlight #work.
           */

          let shouldBeActive = false;

          if (currentId === "longform") {

            shouldBeActive = href === "#work";

          } else {

            shouldBeActive = href === `#${currentId}`;

          }

          link.classList.toggle(
            "active",
            shouldBeActive
          );

        });

      });

    },

    {
      threshold: 0.35
    }
  );


  sections.forEach((section) => {

    observer.observe(section);

  });

}


/* =========================================
   CUSTOM PURPLE CURSOR
   ========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const cursor =
      document.querySelector(".custom-cursor");

    const dot =
      document.querySelector(".cursor-dot");

    const ring =
      document.querySelector(".cursor-ring");


    if (
      cursor &&
      dot &&
      ring
    ) {

      let mouseX =
        window.innerWidth / 2;

      let mouseY =
        window.innerHeight / 2;


      let ringX = mouseX;
      let ringY = mouseY;


      /* -------------------------
         MOUSE MOVEMENT
         ------------------------- */

      document.addEventListener(
        "mousemove",
        (event) => {

          mouseX = event.clientX;
          mouseY = event.clientY;


          dot.style.left =
            `${mouseX}px`;

          dot.style.top =
            `${mouseY}px`;


          cursor.style.opacity = "1";

        }
      );


      /* -------------------------
         SMOOTH RING MOVEMENT
         ------------------------- */

      function animateCursor() {

        ringX +=
          (mouseX - ringX) * 0.18;

        ringY +=
          (mouseY - ringY) * 0.18;


        ring.style.left =
          `${ringX}px`;

        ring.style.top =
          `${ringY}px`;


        requestAnimationFrame(
          animateCursor
        );

      }


      animateCursor();


      /* -------------------------
         CURSOR HOVER EFFECT
         ------------------------- */

      const hoverElements =
        document.querySelectorAll(
          "a, button, .reel-card, .service-card, .stat-card, .portrait-inner, [role='button']"
        );


      hoverElements.forEach(
        (element) => {

          element.addEventListener(
            "mouseenter",
            () => {

              cursor.classList.add(
                "cursor-hover"
              );

            }
          );


          element.addEventListener(
            "mouseleave",
            () => {

              cursor.classList.remove(
                "cursor-hover"
              );

            }
          );

        }
      );


      /* -------------------------
         CLICK EFFECT
         ------------------------- */

      document.addEventListener(
        "mousedown",
        () => {

          cursor.classList.add(
            "cursor-click"
          );

        }
      );


      document.addEventListener(
        "mouseup",
        () => {

          cursor.classList.remove(
            "cursor-click"
          );

        }
      );


      /* -------------------------
         LEAVE WINDOW
         ------------------------- */

      document.addEventListener(
        "mouseleave",
        () => {

          cursor.style.opacity = "0";

        }
      );


      document.addEventListener(
        "mouseenter",
        () => {

          cursor.style.opacity = "1";

        }
      );

    }

  }
);

/* =========================================================
   RECENT WORK — TWO PAGE SMOOTH PAGINATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const pages = Array.from(
    document.querySelectorAll(".reel-page")
  );

  const prevButton =
    document.getElementById("prevReelPage");

  const nextButton =
    document.getElementById("nextReelPage");

  const currentPageElement =
    document.getElementById("currentReelPage");

  const peekButton =
    document.getElementById("project06Peek");


  /* -----------------------------------------
     CHECK REQUIRED ELEMENTS
     ----------------------------------------- */

  if (
    pages.length < 2 ||
    !prevButton ||
    !nextButton ||
    !currentPageElement
  ) {
    return;
  }


  /* -----------------------------------------
     CURRENT PAGE
     ----------------------------------------- */

  let currentPage = 1;

  let isAnimating = false;


  /* -----------------------------------------
     UPDATE BUTTONS
     ----------------------------------------- */

  function updateButtons() {

    prevButton.disabled =
      currentPage === 1;

    nextButton.disabled =
      currentPage === pages.length;

  }


  /* -----------------------------------------
     SHOW PAGE WITH SMOOTH SLIDE
     ----------------------------------------- */

  function showPage(
    newPage,
    direction = "next"
  ) {

    if (isAnimating) return;

    if (
      newPage < 1 ||
      newPage > pages.length ||
      newPage === currentPage
    ) {
      return;
    }


    const oldPage =
      pages.find(
        (page) =>
          Number(page.dataset.page) === currentPage
      );

    const newPageElement =
      pages.find(
        (page) =>
          Number(page.dataset.page) === newPage
      );


    if (!oldPage || !newPageElement) {
      return;
    }


    isAnimating = true;


    /* -----------------------------------------
       PREPARE NEW PAGE
       ----------------------------------------- */

    newPageElement.classList.remove(
      "page-from-left",
      "page-from-right",
      "page-exit-left",
      "page-exit-right"
    );


    oldPage.classList.remove(
      "page-from-left",
      "page-from-right",
      "page-exit-left",
      "page-exit-right"
    );


    /* New page enters from right */

    if (direction === "next") {

      newPageElement.classList.add(
        "page-from-right"
      );

    }

    /* New page enters from left */

    else {

      newPageElement.classList.add(
        "page-from-left"
      );

    }


    /* Make new page active */

    newPageElement.classList.add("active");


    /* Force browser to register starting position */

    void newPageElement.offsetWidth;


    /* -----------------------------------------
       MOVE OLD PAGE OUT
       ----------------------------------------- */

    if (direction === "next") {

      oldPage.classList.add(
        "page-exit-left"
      );

    } else {

      oldPage.classList.add(
        "page-exit-right"
      );

    }


    /* -----------------------------------------
       MOVE NEW PAGE INTO POSITION
       ----------------------------------------- */

    newPageElement.classList.remove(
      "page-from-left",
      "page-from-right"
    );


    /* -----------------------------------------
       UPDATE PAGE NUMBER
       ----------------------------------------- */

    currentPage = newPage;

    currentPageElement.textContent =
      currentPage;


    updateButtons();


    /* -----------------------------------------
       FINISH ANIMATION
       ----------------------------------------- */

    setTimeout(() => {

      pages.forEach((page) => {

        if (
          Number(page.dataset.page) !== currentPage
        ) {

          page.classList.remove(
            "active",
            "page-from-left",
            "page-from-right",
            "page-exit-left",
            "page-exit-right"
          );

        }

      });


      isAnimating = false;

    }, 550);

  }


  /* -----------------------------------------
     NEXT BUTTON
     ----------------------------------------- */

  nextButton.addEventListener(
    "click",
    () => {

      if (currentPage < pages.length) {

        showPage(
          currentPage + 1,
          "next"
        );

      }

    }
  );


  /* -----------------------------------------
     PREVIOUS BUTTON
     ----------------------------------------- */

  prevButton.addEventListener(
    "click",
    () => {

      if (currentPage > 1) {

        showPage(
          currentPage - 1,
          "previous"
        );

      }

    }
  );


  /* -----------------------------------------
     PROJECT 06 PEEK
     ----------------------------------------- */

  if (peekButton) {

    peekButton.addEventListener(
      "click",
      () => {

        if (currentPage === 1) {

          showPage(2, "next");

        }

      }
    );

  }


  /* -----------------------------------------
     INITIAL PAGE
     ----------------------------------------- */

  pages.forEach((page) => {

    page.classList.remove(
      "page-from-left",
      "page-from-right",
      "page-exit-left",
      "page-exit-right"
    );

    if (
      Number(page.dataset.page) === 1
    ) {

      page.classList.add("active");

    } else {

      page.classList.remove("active");

    }

  });


  currentPageElement.textContent = "1";

  updateButtons();

});
/* =========================================================
   PROCESS SECTION — HOVER INTERACTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const processItems =
    document.querySelectorAll(".process-item");

  const processScenes =
    document.querySelectorAll(".visual-scene");


  if (
    !processItems.length ||
    !processScenes.length
  ) {

    return;

  }


  function activateProcess(processName) {

    /* -----------------------------
       LEFT SIDE
       ----------------------------- */

    processItems.forEach((item) => {

      item.classList.toggle(
        "active",
        item.dataset.process === processName
      );

    });


    /* -----------------------------
       RIGHT SIDE
       ----------------------------- */

    processScenes.forEach((scene) => {

      scene.classList.toggle(
        "active",
        scene.dataset.visual === processName
      );

    });

  }


  /* -----------------------------
     HOVER
     ----------------------------- */

  processItems.forEach((item) => {

    item.addEventListener(
      "mouseenter",
      () => {

        activateProcess(
          item.dataset.process
        );

      }
    );


    /* Mobile support */

    item.addEventListener(
      "click",
      () => {

        activateProcess(
          item.dataset.process
        );

      }
    );

  });


  /* -----------------------------
     DEFAULT
     ----------------------------- */

  activateProcess("strategy");

});
/* =========================================================
   PROCESS SECTION — HOVER SWITCHING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const processItems =
        document.querySelectorAll(".process-item");

    const processScenes =
        document.querySelectorAll(".process-scene");


    if (!processItems.length || !processScenes.length) {
        return;
    }


    function activateProcess(processName) {

        processItems.forEach((item) => {

            item.classList.toggle(
                "active",
                item.dataset.process === processName
            );

        });


        processScenes.forEach((scene) => {

            scene.classList.toggle(
                "active",
                scene.classList.contains(
                    `scene-${processName}`
                )
            );

        });

    }


    processItems.forEach((item) => {

        item.addEventListener("mouseenter", () => {

            activateProcess(
                item.dataset.process
            );

        });

    });


    /* Start with Strategy */

    activateProcess("strategy");

});
/* =========================================================
   PROCESS SECTION — STRATEGY / BUILD / LAUNCH
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const processItems =
        document.querySelectorAll(".process-item");

    const visualStates =
        document.querySelectorAll(".visual-state");


    if (
        !processItems.length ||
        !visualStates.length
    ) {
        return;
    }


    function activateProcess(processName) {

        /* -----------------------------------------
           LEFT SIDE
           ----------------------------------------- */

        processItems.forEach((item) => {

            const itemProcess =
                item.dataset.process;

            item.classList.toggle(
                "active",
                itemProcess === processName
            );

        });


        /* -----------------------------------------
           RIGHT SIDE
           ----------------------------------------- */

        visualStates.forEach((visual) => {

            const visualProcess =
                visual.dataset.visual;

            visual.classList.toggle(
                "active",
                visualProcess === processName
            );

        });

    }


    /* -----------------------------------------
       HOVER
       ----------------------------------------- */

    processItems.forEach((item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                const processName =
                    item.dataset.process;

                activateProcess(processName);

            }
        );

    });


    /* -----------------------------------------
       INITIAL STATE
       ----------------------------------------- */

    activateProcess("strategy");

});
// =========================
// SHOWCASE VIDEO
// =========================

const playVideo = document.getElementById("playVideo");
const videoPlaceholder = document.querySelector(".video-placeholder");

if (playVideo && videoPlaceholder) {

  playVideo.addEventListener("click", function () {

    videoPlaceholder.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/McUwJKGmklk?autoplay=1&rel=0"
        title="Recently Edited Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;

  });

}
/* =========================================================
   RECENT WORK — REEL VIDEO PLAYER
   PROJECT 01 + PROJECT 02 + PROJECT 03 + FUTURE REELS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const reelPlayButtons = document.querySelectorAll(
    ".reel-play[data-reel-video]"
  );

  if (!reelPlayButtons.length) {
    return;
  }


  /* =======================================================
     CREATE MODAL
     ======================================================= */

  const modal = document.createElement("div");

  modal.className = "reel-video-modal";

  modal.innerHTML = `
    <div class="reel-video-modal-content">

      <button
        class="reel-video-modal-close"
        type="button"
        aria-label="Close video"
      >
        ×
      </button>

      <iframe
        id="reelVideoIframe"
        src=""
        title="Reel video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <a
        id="reelWatchOnYouTube"
        class="reel-watch-youtube"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube
      </a>

    </div>
  `;

  document.body.appendChild(modal);


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const iframe =
    modal.querySelector("#reelVideoIframe");

  const closeButton =
    modal.querySelector(".reel-video-modal-close");

  const watchButton =
    modal.querySelector("#reelWatchOnYouTube");


  /* =======================================================
     OPEN VIDEO
     ======================================================= */

  function openReelVideo(videoId) {

    if (!videoId) {
      return;
    }

    const youtubeUrl =
      `https://www.youtube.com/watch?v=${videoId}`;

    const embedUrl =
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;

    iframe.src = embedUrl;

    watchButton.href = youtubeUrl;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
  }


  /* =======================================================
     CLOSE VIDEO
     ======================================================= */

  function closeReelVideo() {

    modal.classList.remove("active");

    iframe.src = "";

    document.body.style.overflow = "";
  }


  /* =======================================================
     PLAY BUTTONS
     ======================================================= */

  reelPlayButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      const videoId =
        button.getAttribute("data-reel-video");

      openReelVideo(videoId);

    });

  });


  /* =======================================================
     CLOSE BUTTON
     ======================================================= */

  closeButton.addEventListener("click", () => {

    closeReelVideo();

  });


  /* =======================================================
     CLICK OUTSIDE
     ======================================================= */

  modal.addEventListener("click", (event) => {

    if (event.target === modal) {

      closeReelVideo();

    }

  });


  /* =======================================================
     ESC KEY
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("active")
    ) {

      closeReelVideo();

    }

  });

});
/* =========================================================
   LONG-FORM VIDEO PLAYER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const longformButtons = document.querySelectorAll(
        ".longform-play[data-longform-video]"
    );

    if (!longformButtons.length) {
        return;
    }


    /* ---------------------------------------------------------
       CREATE MODAL
       --------------------------------------------------------- */

    const modal = document.createElement("div");

    modal.className = "longform-video-modal";

    modal.innerHTML = `
        <div class="longform-video-modal-content">

            <button
                class="longform-video-modal-close"
                type="button"
                aria-label="Close video"
            >
                ×
            </button>

            <iframe
                id="longformVideoIframe"
                src=""
                title="Long-Form Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>

        </div>
    `;

    document.body.appendChild(modal);


    /* ---------------------------------------------------------
       ELEMENTS
       --------------------------------------------------------- */

    const iframe = modal.querySelector(
        "#longformVideoIframe"
    );

    const closeButton = modal.querySelector(
        ".longform-video-modal-close"
    );


    /* ---------------------------------------------------------
       OPEN VIDEO
       --------------------------------------------------------- */

    function openLongformVideo(videoId) {

        if (!videoId) {
            return;
        }

        iframe.src =
            `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* ---------------------------------------------------------
       CLOSE VIDEO
       --------------------------------------------------------- */

    function closeLongformVideo() {

        modal.classList.remove("active");

        iframe.src = "";

        document.body.style.overflow = "";
    }


    /* ---------------------------------------------------------
       PLAY BUTTONS
       --------------------------------------------------------- */

    longformButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            const videoId =
                button.getAttribute(
                    "data-longform-video"
                );

            openLongformVideo(videoId);

        });

    });


    /* ---------------------------------------------------------
       CLOSE BUTTON
       --------------------------------------------------------- */

    closeButton.addEventListener(
        "click",
        closeLongformVideo
    );


    /* ---------------------------------------------------------
       CLICK OUTSIDE VIDEO
       --------------------------------------------------------- */

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeLongformVideo();

        }

    });


    /* ---------------------------------------------------------
       ESC KEY
       --------------------------------------------------------- */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeLongformVideo();

        }

    });

});
