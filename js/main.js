(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var toTop = document.getElementById("toTop");
  var yearEl = document.getElementById("year");

  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---- Mobile nav ---- */
  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* ---- Header shadow + back-to-top ---- */
  function onScroll() {
    var y = window.scrollY;
    if (header) { header.classList.toggle("scrolled", y > 8); }
    if (toTop) { toTop.classList.toggle("show", y > 600); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Active nav link on scroll ---- */
  var sections = ["services", "why", "results", "plans", "reviews", "areas", "contact"];
  var linkMap = {};
  sections.forEach(function (id) {
    var link = nav ? nav.querySelector('a[href="#' + id + '"]') : null;
    if (link) { linkMap[id] = link; }
  });

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove("active"); });
          if (linkMap[id]) { linkMap[id].classList.add("active"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { navObserver.observe(el); }
    });

    /* ---- Reveal on scroll ---- */
    var revealTargets = document.querySelectorAll(
      ".section-head, .card, .why-media, .why-copy, .results-feature, .gallery figure, .plan, .review, .areas-copy, .areas-list, .contact-copy, .quote-form"
    );
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- Quote form ----
     Works with no backend by opening a pre-filled email.
     To collect submissions automatically, point the form action at a
     service like Formspree and this handler will step aside. */
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");
  var BUSINESS_EMAIL = "hello@slcpremiercleaning.com";

  if (form) {
    form.addEventListener("submit", function (e) {
      if (form.getAttribute("action")) { return; } // let a real endpoint handle it
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var name = (document.getElementById("name").value || "").trim();
      var email = (document.getElementById("email").value || "").trim();
      var phone = (document.getElementById("phone").value || "").trim();
      var service = document.getElementById("service").value;
      var message = (document.getElementById("message").value || "").trim();

      var subject = "Quote request - " + service + " (" + name + ")";
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Service: " + service + "\n\n" +
        "Details:\n" + message + "\n";

      window.location.href =
        "mailto:" + BUSINESS_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (status) {
        status.textContent = "Thanks, " + name + ". Your email app is opening so you can send your request.";
      }
      form.reset();
    });
  }
})();
