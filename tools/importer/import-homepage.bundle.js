/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    const heroImage = element.querySelector(".cmp-homepage-banner-image picture, .cmp-homepage-banner-image img");
    const heading = element.querySelector(".cmp-homepage-banner-content h1, .cmp-homepage-banner-content h2, .cmp-homepage-banner-content .title");
    const description = element.querySelector(".cmp-homepage-banner-content .cmp-text p, .cmp-homepage-banner-content p");
    const ctaLink = element.querySelector(".cmp-homepage-banner-content .banner-button a, .cmp-homepage-banner-content a.cmp-button");
    const cells = [];
    if (heroImage) {
      cells.push([heroImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (ctaLink) contentCell.push(ctaLink);
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-quicklinks.js
  function parse2(element, { document }) {
    const listItems = element.querySelectorAll(".cmp-list-item");
    const cells = [];
    listItems.forEach((item) => {
      const link = item.querySelector("a.cmp-list-item-link");
      if (!link) return;
      const icon = link.querySelector("i.c-icon img, .c-icon img");
      const label = link.querySelector("span");
      const imageCell = document.createElement("div");
      if (icon) {
        const img = icon.cloneNode(true);
        imageCell.appendChild(img);
      }
      const textCell = document.createElement("div");
      if (label) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = label.textContent.trim();
        textCell.appendChild(a);
      }
      if (label) {
        cells.push([[imageCell], [textCell]]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-quicklinks", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-category.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll("li.cmp-productListing__item");
    const cells = [];
    items.forEach((item) => {
      const illustrationIcon = item.querySelector("i.c-icon--illustration img, .c-icon--illustration img");
      const headingLink = item.querySelector("h2.cmp-list_heading a.cmp-list_heading__linkwithicon, h2.cmp-list_heading a");
      const titleSpan = item.querySelector("span.cmp-list__item-title");
      const imageCell = [];
      if (illustrationIcon) {
        imageCell.push(illustrationIcon);
      }
      const contentCell = [];
      if (headingLink && titleSpan) {
        const link = document.createElement("a");
        link.href = headingLink.href || headingLink.getAttribute("href");
        const strong = document.createElement("strong");
        strong.textContent = titleSpan.textContent.trim();
        link.appendChild(strong);
        contentCell.push(link);
      } else if (titleSpan) {
        const strong = document.createElement("strong");
        strong.textContent = titleSpan.textContent.trim();
        contentCell.push(strong);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell.length > 0 ? imageCell : "", contentCell.length > 0 ? contentCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-category", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-split.js
  function parse4(element, { document }) {
    const imageContainer = element.querySelector(".cmp-split-panel-image-container");
    const image = imageContainer ? imageContainer.querySelector("picture, img") : null;
    const heading = element.querySelector(".cmp-split-panel-content h2, .cmp-split-panel-content .cmp-title__text");
    const descriptionEl = element.querySelector(".cmp-split-panel-content > .cmp-text p, .cmp-split-panel-content .cmp-text p");
    const iconTextItems = Array.from(element.querySelectorAll(".icon-text-group .icon-text-container"));
    const ctaLink = element.querySelector(".cmp-split-panel-content a.btn, .cmp-split-panel-content a.button, .cmp-split-panel-content .cmp-button a, .cmp-split-panel-content > a");
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    if (descriptionEl) {
      contentCell.push(descriptionEl);
    }
    if (iconTextItems.length > 0) {
      const ul = document.createElement("ul");
      iconTextItems.forEach((item) => {
        const li = document.createElement("li");
        const textEl = item.querySelector(".cmp-text p, p");
        if (textEl) {
          li.textContent = textEl.textContent;
        }
        ul.appendChild(li);
      });
      contentCell.push(ul);
    }
    if (ctaLink) {
      contentCell.push(ctaLink);
    }
    const imageCell = [];
    if (image) {
      imageCell.push(image);
    }
    const isImageLeft = element.classList.contains("left");
    const cells = [];
    if (isImageLeft) {
      cells.push([imageCell, contentCell]);
    } else {
      cells.push([contentCell, imageCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-split", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".cmp-productActionCard, .cmp-tile");
    const uniqueCards = element.querySelectorAll(".cmp-productActionCard");
    const cells = [];
    const cardElements = uniqueCards.length > 0 ? uniqueCards : element.querySelectorAll(".swiper-slide");
    cardElements.forEach((card) => {
      const imgSection = card.querySelector(".cmp-productActionCard_imgSection, .cmp-tile picture, picture");
      const picture = imgSection ? imgSection.querySelector("picture") || imgSection.closest("picture") || imgSection : null;
      const img = card.querySelector("img");
      const titleEl = card.querySelector(".cmp-productActionCard_contentSection h3, .cmp-productActionCard_contentSection .cmp-title__text, h3.cmp-title__text, h3");
      const descriptionEl = card.querySelector(".cmp-productActionCard_contentSection .cmp-text p, .cmp-productActionCard_contentSection .text p, .text p");
      const ctaLink = card.querySelector(".cta-btn a.cmp-button, .cta-btn a, a.cmp-button, a.cmp-button--primary");
      const imageCell = [];
      if (picture && picture.tagName === "PICTURE") {
        imageCell.push(picture);
      } else if (img) {
        imageCell.push(img);
      }
      const contentCell = [];
      if (titleEl) {
        const titleP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = titleEl.textContent.trim();
        titleP.appendChild(strong);
        contentCell.push(titleP);
      }
      if (descriptionEl) {
        const descP = document.createElement("p");
        descP.textContent = descriptionEl.textContent.trim();
        contentCell.push(descP);
      }
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href || ctaLink.getAttribute("href");
        const buttonText = ctaLink.querySelector(".cmp-button__text, span");
        link.textContent = buttonText ? buttonText.textContent.trim() : ctaLink.textContent.trim();
        const ctaP = document.createElement("p");
        ctaP.appendChild(link);
        contentCell.push(ctaP);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse6(element, { document }) {
    const parent = element.parentElement;
    const allColumnItems = parent ? Array.from(parent.querySelectorAll(':scope > .icontext.parent, :scope > [class*="icontext"][class*="parent"]')) : [element];
    if (allColumnItems.length > 1 && allColumnItems[0] !== element) {
      element.setAttribute("data-columns-feature-processed", "true");
      element.remove();
      return;
    }
    const cells = [];
    const row = [];
    const items = allColumnItems.length > 0 ? allColumnItems : [element];
    items.forEach((item) => {
      const cellContent = [];
      const icon = item.querySelector('.cmp-icon-text--icon img, .cmp-icon-text--icon svg, [class*="icon--illustration"] img');
      if (icon) {
        cellContent.push(icon);
      } else {
        const fallbackImg = item.querySelector("img");
        if (fallbackImg) {
          cellContent.push(fallbackImg);
        }
      }
      const heading = item.querySelector(".cmp-icon-text--content h4.title, .cmp-icon-text--content h4, .cmp-icon-text--content h3, .cmp-icon-text--content h2");
      if (heading) {
        cellContent.push(heading);
      }
      const description = item.querySelector(".cmp-icon-text--content .cmp-text p, .cmp-icon-text--content p");
      if (description) {
        cellContent.push(description);
      }
      if (cellContent.length > 0) {
        row.push(cellContent);
      }
    });
    cells.push(row);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse7(element, { document }) {
    const cards = element.querySelectorAll(".cmp-related-information__card, li.col");
    const cells = [];
    cards.forEach((card) => {
      const link = card.querySelector("a.cmp-single-link-tile, a[href]");
      const picture = card.querySelector(".cmp-articleCard_imgSection picture, .cmp-articleCard picture, picture");
      const img = card.querySelector(".cmp-articleCard_imgSection img, img");
      const heading = card.querySelector(".cmp-articleCard_contentSection h4, .cmp-articleCard_contentSection h3, .cmp-title__text, h4, h3");
      const description = card.querySelector(".cmp-articleCard_contentSection .cmp-text p, .cmp-text p, .text p");
      const imageCell = [];
      if (picture) {
        imageCell.push(picture);
      } else if (img) {
        imageCell.push(img);
      }
      const contentCell = [];
      if (heading) {
        const titleP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = heading.textContent.trim();
        titleP.appendChild(strong);
        if (link && link.getAttribute("href")) {
          const anchor = document.createElement("a");
          anchor.setAttribute("href", link.getAttribute("href"));
          anchor.appendChild(strong);
          titleP.innerHTML = "";
          titleP.appendChild(anchor);
        }
        contentCell.push(titleP);
      }
      if (description) {
        const descP = document.createElement("p");
        descP.textContent = description.textContent.trim();
        contentCell.push(descP);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-wayfinder.js
  function parse8(element, { document }) {
    const heading = element.querySelector(".cmp-wayfinder-headingContainer h2.heading, .cmp-wayfinder-headingContainer h2");
    const description = element.querySelector(".cmp-wayfinder-headingContainer .description p, .cmp-wayfinder-headingContainer .cmp-text p");
    const tiles = Array.from(element.querySelectorAll("a.cmp-wayfinder-tile"));
    const cells = [];
    tiles.forEach((tile) => {
      const icon = tile.querySelector(".cmp-wayfinder-tile--icon img, .cmp-wayfinder-tile--icon i img");
      const tileHeading = tile.querySelector(".cmp-wayfinder-tile--content .tile-heading, .cmp-wayfinder-tile--content h4");
      const href = tile.getAttribute("href");
      const imageCell = [];
      if (icon) {
        imageCell.push(icon);
      }
      const contentCell = [];
      if (tileHeading && href) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = tileHeading.textContent.trim();
        const strong = document.createElement("strong");
        strong.appendChild(link);
        contentCell.push(strong);
      } else if (tileHeading) {
        const strong = document.createElement("strong");
        strong.textContent = tileHeading.textContent.trim();
        contentCell.push(strong);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-wayfinder", cells });
    const container = document.createElement("div");
    if (heading) {
      container.appendChild(heading);
    }
    if (description) {
      container.appendChild(description);
    }
    container.appendChild(block);
    element.replaceWith(container);
  }

  // tools/importer/transformers/racv-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".gdpr"]);
      WebImporter.DOMUtils.remove(element, [".successbannerxfrender"]);
      WebImporter.DOMUtils.remove(element, [".fixedsubhead"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.header",
        "footer.cmp-footer",
        ".breadcrumb"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe",
        '[id^="batBeacon"]',
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/racv-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "cards-quicklinks": parse2,
    "cards-category": parse3,
    "columns-split": parse4,
    "cards-product": parse5,
    "columns-feature": parse6,
    "cards-article": parse7,
    "cards-wayfinder": parse8
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "RACV homepage with hero, navigation cards, and promotional content sections",
    urls: ["https://www.racv.com.au/"],
    blocks: [
      {
        name: "hero-homepage",
        instances: [".herobanner.parent .cmp-homepage-banner"]
      },
      {
        name: "cards-quicklinks",
        instances: [".cmp-homepage-banner-bottom .cmp-list"]
      },
      {
        name: "cards-category",
        instances: [".productlisting.parent .cmp-productListing"]
      },
      {
        name: "columns-split",
        instances: [".splitpanel.parent .cmp-split-panel"]
      },
      {
        name: "cards-product",
        instances: [".highlightcards.parent .cmp-highlight-cards"]
      },
      {
        name: "columns-feature",
        instances: [".icontext.parent"]
      },
      {
        name: "cards-article",
        instances: [".relatedinformation.parent .cmp-related-information"]
      },
      {
        name: "cards-wayfinder",
        instances: [".wayfinder.parent .cmp-wayfinder"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".herobanner.parent",
        style: null,
        blocks: ["hero-homepage", "cards-quicklinks"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Popular Products and Services",
        selector: ".productlisting.parent",
        style: "grey",
        blocks: ["cards-category"],
        defaultContent: ["h2.cmp-title__text"]
      },
      {
        id: "section-3",
        name: "RACV App Promo",
        selector: ".splitpanel.parent",
        style: null,
        blocks: ["columns-split"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Highlight Cards",
        selector: ".highlightcards.parent",
        style: null,
        blocks: ["cards-product"],
        defaultContent: ["h2.cmp-title__text.main-title"]
      },
      {
        id: "section-5",
        name: "RACV Difference",
        selector: "#container-3a020d5778",
        style: "blue",
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Stay Up to Date",
        selector: ".relatedinformation.parent",
        style: null,
        blocks: ["cards-article"],
        defaultContent: ["#title-18f91eb4d3 h2", "#text-56edf84098 p"]
      },
      {
        id: "section-7",
        name: "Need Support",
        selector: ".wayfinder.parent",
        style: "grey",
        blocks: ["cards-wayfinder"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
