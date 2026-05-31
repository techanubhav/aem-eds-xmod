/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroHomepageParser from './parsers/hero-homepage.js';
import cardsQuicklinksParser from './parsers/cards-quicklinks.js';
import cardsCategoryParser from './parsers/cards-category.js';
import columnsSplitParser from './parsers/columns-split.js';
import cardsProductParser from './parsers/cards-product.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsWayfinderParser from './parsers/cards-wayfinder.js';

// TRANSFORMER IMPORTS
import racvCleanupTransformer from './transformers/racv-cleanup.js';
import racvSectionsTransformer from './transformers/racv-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-homepage': heroHomepageParser,
  'cards-quicklinks': cardsQuicklinksParser,
  'cards-category': cardsCategoryParser,
  'columns-split': columnsSplitParser,
  'cards-product': cardsProductParser,
  'columns-feature': columnsFeatureParser,
  'cards-article': cardsArticleParser,
  'cards-wayfinder': cardsWayfinderParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'RACV homepage with hero, navigation cards, and promotional content sections',
  urls: ['https://www.racv.com.au/'],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['.herobanner.parent .cmp-homepage-banner'],
    },
    {
      name: 'cards-quicklinks',
      instances: ['.cmp-homepage-banner-bottom .cmp-list'],
    },
    {
      name: 'cards-category',
      instances: ['.productlisting.parent .cmp-productListing'],
    },
    {
      name: 'columns-split',
      instances: ['.splitpanel.parent .cmp-split-panel'],
    },
    {
      name: 'cards-product',
      instances: ['.highlightcards.parent .cmp-highlight-cards'],
    },
    {
      name: 'columns-feature',
      instances: ['.icontext.parent'],
    },
    {
      name: 'cards-article',
      instances: ['.relatedinformation.parent .cmp-related-information'],
    },
    {
      name: 'cards-wayfinder',
      instances: ['.wayfinder.parent .cmp-wayfinder'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.herobanner.parent',
      style: null,
      blocks: ['hero-homepage', 'cards-quicklinks'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Popular Products and Services',
      selector: '.productlisting.parent',
      style: 'grey',
      blocks: ['cards-category'],
      defaultContent: ['h2.cmp-title__text'],
    },
    {
      id: 'section-3',
      name: 'RACV App Promo',
      selector: '.splitpanel.parent',
      style: null,
      blocks: ['columns-split'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Highlight Cards',
      selector: '.highlightcards.parent',
      style: null,
      blocks: ['cards-product'],
      defaultContent: ['h2.cmp-title__text.main-title'],
    },
    {
      id: 'section-5',
      name: 'RACV Difference',
      selector: '#container-3a020d5778',
      style: 'blue',
      blocks: ['columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Stay Up to Date',
      selector: '.relatedinformation.parent',
      style: null,
      blocks: ['cards-article'],
      defaultContent: ['#title-18f91eb4d3 h2', '#text-56edf84098 p'],
    },
    {
      id: 'section-7',
      name: 'Need Support',
      selector: '.wayfinder.parent',
      style: 'grey',
      blocks: ['cards-wayfinder'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  racvCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [racvSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
