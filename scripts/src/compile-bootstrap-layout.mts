import postcss from 'postcss';
import { compile } from 'sass';

import { PATHS } from './core/paths.mts';

const LAYOUT_PATTERNS = ['.container', '.col', '.row', '.d-flex', '.flex'];

export async function compileBootstrapLayout(input: string) {
  const result = compile(input, {
    loadPaths: [PATHS.nodeModules],
    silenceDeprecations: [
      'color-functions',
      'global-builtin',
      'import',
      'mixed-decls'
    ]
  });

  return extractLayoutStyles(result.css);
}

// Function to extract responsive and layout styles
function extractLayoutStyles(cssContent: string) {
  // Use a Map to group rules by their media query parameters
  const mediaQueryMap = new Map();
  const baseRules: postcss.Rule[] = [];

  const root = postcss.parse(cssContent);

  root.walk((node) => {
    // If it's a rule within a media query
    if (
      node.type === 'rule' &&
      node.parent?.type === 'atrule' &&
      node.parent.name === 'media'
    ) {
      if (containsLayoutClass(node.selector)) {
        const mediaParams = node.parent.params;
        if (!mediaQueryMap.has(mediaParams)) {
          mediaQueryMap.set(mediaParams, []);
        }
        mediaQueryMap.get(mediaParams).push(node);
      }
    } else if (node.type === 'rule') {
      // If it's a base rule (not in a media query)
      if (containsLayoutClass(node.selector)) {
        baseRules.push(node);
      }
    }
  });

  // Reconstruct the CSS string
  let output = '';

  // Add all base rules first
  if (baseRules.length > 0) {
    output += baseRules.map((rule) => rule.toString()).join('\n\n');
  }

  // Add the grouped media queries
  for (const [params, rules] of mediaQueryMap.entries()) {
    output += `\n\n@media ${params} {\n`;
    output += rules
      .map(
        (rule: postcss.Rule) => `  ${rule.toString().replace(/\n/g, '\n  ')}`
      )
      .join('\n\n');
    output += `\n}`;
  }

  return output;
}

function containsLayoutClass(selector: string) {
  return LAYOUT_PATTERNS.some((pattern) => selector.includes(pattern));
}
