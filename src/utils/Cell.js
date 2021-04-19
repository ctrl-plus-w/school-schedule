export const getCell = (prev, curr, next, cell) => {
  if (!prev || prev.empty) {
    if (next && next.subject === curr.subject && next.label === curr.label) return cell('start', true);
    return cell('normal', true);
  }

  if (!next || next.empty) {
    if (prev.subject !== curr.subject || prev.label !== curr.label) return cell('end', true);
    return cell('end');
  }

  const eq = (pattern, field) => {
    if (pattern === '===') return prev[field] === curr[field] && curr[field] === next[field] && prev[field] === next[field];
    if (pattern === '==!') return prev[field] === curr[field] && curr[field] === next[field] && prev[field] !== next[field];
    if (pattern === '!!=') return prev[field] !== curr[field] && curr[field] !== next[field] && prev[field] === next[field];
    if (pattern === '=!!') return prev[field] === curr[field] && curr[field] !== next[field] && prev[field] !== next[field];
  };

  // If next is an event and prev as well.
  if (next && !next.empty && prev && !prev.empty) {
    if (eq('=!!', 'label') || eq('=!!', 'subject')) return cell('end');
    if (eq('===', 'subject') && eq('===', 'label')) return cell('middle');
    if (eq('!!= ', 'label') || eq('!!=', 'subject')) return cell('end', true);

    return cell('middle', true);
  }
};
