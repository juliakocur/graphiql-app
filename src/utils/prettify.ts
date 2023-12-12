export function prettifyRequestQuery(query: string) {
  const formattedQuery = query
    .trim()
    .replace(/\s+:/g, ': ')
    .replace(/\s+\,/g, ', ')
    .replace(/\,/g, ', ')
    .replace(/\s*\(\s*/g, '(')
    .replace(/\s*\)/g, ') ')
    .replace(/\s*\{/g, ' {')
    .replace(/\{\s*(\w+)/g, (_match, p1) => `{${p1}`)
    .replace(/\s+/g, ' ');

  const identation = '  ';
  let level = 0;
  const resultQueryArray = [];
  let isBlockParams = false;
  let isArgs = false;

  for (let i = 0; i < formattedQuery.length; i++) {
    if (formattedQuery[i] === '(') {
      isArgs = true;
    }
    if (formattedQuery[i] === ')') {
      isArgs = false;
    }

    if (formattedQuery[i] === '{' && !isArgs) {
      isBlockParams = true;
      level += 1;
      resultQueryArray.push(`{\n${identation.repeat(level)}`);
    } else if (formattedQuery[i] === '}' && !isArgs) {
      isBlockParams = false;
      level -= 1;
      resultQueryArray.push(
        `\n${identation.repeat(level)}}\n${identation.repeat(level)}`
      );
    } else {
      if (formattedQuery[i] === '(' || formattedQuery[i] === ':') {
        isBlockParams = false;
      }
      const char =
        isBlockParams &&
        formattedQuery[i] === ' ' &&
        /\w/.test(formattedQuery[i + 1])
          ? `\n${identation.repeat(level)}`
          : formattedQuery[i];
      resultQueryArray.push(char);
    }
  }

  return resultQueryArray
    .join('')
    .replace(/^\s*\n/gm, '')
    .trim();
}
