(function () {
  const data = window.AC_SITE_DATA;

  if (!data) {
    return;
  }

  const byId = (id) => document.getElementById(id);
  const create = (tag, className, text) => {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text) {
      element.textContent = text;
    }

    return element;
  };

  const renderHero = () => {
    const eyebrow = byId("hero-eyebrow");
    if (eyebrow) {
      eyebrow.textContent = data.hero.eyebrow;
    }

    const statsRoot = byId("hero-stats");
    data.hero.stats.forEach((item) => {
      const wrapper = create("div");
      const dt = create("dt", null, item.label);
      const dd = create("dd", null, item.value);
      wrapper.append(dt, dd);
      statsRoot.appendChild(wrapper);
    });
  };

  const renderAbout = () => {
    byId("about-title").textContent = data.about.title;

    const aboutRoot = byId("about-copy");
    data.about.paragraphs.forEach((paragraph) => {
      aboutRoot.appendChild(create("p", null, paragraph));
    });
  };

  const renderProjects = () => {
    const projectRoot = byId("projects-grid");

    data.projects.forEach((project) => {
      const article = create("article", "project-card reveal");
      const visual = create("div", "project-visual");
      const badge = create("span", "project-badge", project.subtitle);
      const title = create("h3", "project-title", project.title);

      visual.style.setProperty("--card-start", project.palette[0]);
      visual.style.setProperty("--card-end", project.palette[1]);
      visual.append(badge, title);

      const copy = create("div", "project-copy");
      const meta = create("div", "project-meta");
      const role = create("p", "project-role", project.role);
      const status = create("span", "project-status", project.status);

      meta.append(role, status);
      copy.append(meta, create("p", null, project.description));

      const tags = create("ul", "project-tags");
      project.tags.forEach((tag) => {
        tags.appendChild(create("li", null, tag));
      });
      copy.appendChild(tags);

      const link = create("a", "project-link", project.linkLabel + " ->");
      link.href = project.url;
      if (project.url.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      copy.appendChild(link);

      article.append(visual, copy);
      projectRoot.appendChild(article);
    });
  };

  const renderProcess = () => {
    const processRoot = byId("process-grid");

    data.process.forEach((step, index) => {
      const card = create("article", "process-card reveal");
      const stepNumber = String(index + 1).padStart(2, "0");

      card.append(
        create("div", "process-index", stepNumber),
        create("h3", null, step.title),
        create("p", null, step.summary)
      );

      processRoot.appendChild(card);
    });
  };

  const renderBga = () => {
    byId("bga-title").textContent = data.bga.title;
    byId("bga-summary").textContent = data.bga.summary;

    const pointRoot = byId("bga-points");
    data.bga.points.forEach((point) => {
      pointRoot.appendChild(create("li", null, point));
    });
  };

  const renderPublished = () => {
    const publishedRoot = byId("published-list");

    data.published.forEach((item) => {
      const card = create("article", "link-item reveal");
      if (item.previewId || item.placeholderTitle || item.placeholderImage) {
        const media = create("div", "link-media");

        if (item.previewId) {
          const preview = document.createElement("div");
          preview.className = "link-video-preview";

          const video = document.createElement("video");
          video.className = "link-video";
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.preload = "metadata";
          video.setAttribute("aria-label", item.title + " preview video");

          const webmSource = document.createElement("source");
          webmSource.src = "https://x.boardgamearena.net/data/gamepreviews/" + item.previewId + "/en-w640.webm";
          webmSource.type = "video/webm";

          const mp4Source = document.createElement("source");
          mp4Source.src = "https://x.boardgamearena.net/data/gamepreviews/" + item.previewId + "/en-w640.mp4";
          mp4Source.type = "video/mp4";

          video.append(webmSource, mp4Source);
          preview.appendChild(video);
          media.appendChild(preview);
        } else {
          const placeholder = create("div", "link-video-placeholder");

          if (item.placeholderImage) {
            placeholder.classList.add("has-image");
            const image = document.createElement("img");
            image.className = "link-placeholder-image";
            image.src = item.placeholderImage;
            image.alt = item.title + " screenshot";
            image.loading = "lazy";
            placeholder.appendChild(image);
          } else {
            const title = create("span", "link-placeholder-title", item.placeholderTitle || "Preview Coming Soon");
            const note = create("span", "link-placeholder-note", item.placeholderNote || "Add screenshot later.");
            placeholder.append(title, note);
          }

          media.appendChild(placeholder);
        }

        card.appendChild(media);
      }

      const header = create("div", "link-item-header");
      const titleGroup = create("div");
      const title = create("h3", null, item.title);
      const type = create("span", "link-type", item.type);
      const summary = create("p", null, item.summary);
      const link = create("a", null, item.linkLabel + " ->");

      titleGroup.appendChild(title);
      header.append(titleGroup, type);
      link.href = item.url;
      if (item.url.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }

      if (Array.isArray(item.meta) && item.meta.length > 0) {
        const metaList = create("ul", "published-meta");
        item.meta.forEach((metaItem) => {
          metaList.appendChild(create("li", null, metaItem));
        });
        card.append(header, summary, metaList, link);
        publishedRoot.appendChild(card);
        return;
      }

      card.append(header, summary, link);
      publishedRoot.appendChild(card);
    });
  };

  const renderContact = () => {
    byId("contact-title").textContent = data.contact.title;
    byId("contact-summary").textContent = data.contact.summary;

    const contactRoot = byId("contact-links");
    data.contact.links.forEach((item) => {
      const link = create("a", null, item.label + ": " + item.value);
      link.href = item.url;
      if (item.url.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      contactRoot.appendChild(link);
    });
  };

  const setupNavigation = () => {
    const nav = byId("site-nav");
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", active);
      });
    };

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => setActiveLink(entry.target.id));
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  const setupReveal = () => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15
      }
    );

    elements.forEach((element) => observer.observe(element));
  };

  renderHero();
  renderAbout();
  renderProjects();
  renderProcess();
  renderBga();
  renderPublished();
  renderContact();
  setupNavigation();
  setupReveal();
})();