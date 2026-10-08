export const MAX_EXPRESSION_LENGTH = 32;

const OPERATORS = ['+', '-', '×', '÷'];

export function isOperator(ch) {
  return OPERATORS.includes(ch);
}

function fail(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function tokenize(source) {
  const tokens = [];
  let i = 0;

  while (i < source.length) {
    const ch = source[i];

    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < source.length && /[0-9.]/.test(source[j])) j++;

      if (
        (source[j] === 'e' || source[j] === 'E') &&
        /[+-]/.test(source[j + 1] || '') &&
        /[0-9]/.test(source[j + 2] || '')
      ) {
        j += 2;
        while (j < source.length && /[0-9]/.test(source[j])) j++;
      }

      const raw = source.slice(i, j);
      if ((raw.match(/\./g) || []).length > 1) throw fail('INVALID', 'INVALID');
      const value = Number.parseFloat(raw);
      if (Number.isNaN(value)) throw fail('INVALID', 'INVALID');

      tokens.push({ type: 'num', value });
      i = j;
      continue;
    }

    if (ch === '(') {
      tokens.push({ type: 'lparen' });
      i += 1;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'rparen' });
      i += 1;
      continue;
    }
    if (ch === '%') {
      tokens.push({ type: 'percent' });
      i += 1;
      continue;
    }
    if (isOperator(ch)) {
      tokens.push({ type: 'op', value: ch });
      i += 1;
      continue;
    }

    throw fail('INVALID', 'INVALID');
  }

  return tokens;
}

export function evaluate(expression) {
  if (!expression || !expression.trim()) return null;

  const tokens = tokenize(expression);
  if (tokens.length === 0) return null;

  let pos = 0;
  const peek = () => tokens[pos];

  function parseExpression() {
    let left = parseTerm(null);

    while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
      const op = tokens[pos++].value;
      const right = parseTerm(left);
      left = op === '+' ? left + right : left - right;
    }

    return left;
  }

  function parseTerm(base) {
    let left = parseFactor(base);

    while (peek() && peek().type === 'op' && (peek().value === '×' || peek().value === '÷')) {
      const op = tokens[pos++].value;
      const right = parseFactor(null);

      if (op === '÷') {
        if (right === 0) throw fail('Tidak bisa membagi nol', 'DIV_ZERO');
        left = left / right;
      } else {
        left = left * right;
      }
    }

    return left;
  }

  function parseFactor(base) {
    const token = peek();
    if (!token) throw fail('INVALID', 'INVALID');

    let value;

    if (token.type === 'op' && (token.value === '-' || token.value === '+')) {
      pos += 1;
      const nested = parseFactor(base);
      value = token.value === '-' ? -nested : nested;
    } else if (token.type === 'lparen') {
      pos += 1;
      value = parseExpression();
      if (!peek() || peek().type !== 'rparen') throw fail('INVALID', 'INVALID');
      pos += 1;
    } else if (token.type === 'num') {
      value = tokens[pos++].value;
    } else {
      throw fail('INVALID', 'INVALID');
    }

    while (peek() && peek().type === 'percent') {
      pos += 1;
      value = base != null ? (base * value) / 100 : value / 100;
    }

    return value;
  }

  const result = parseExpression();
  if (pos !== tokens.length) throw fail('INVALID', 'INVALID');
  if (Number.isNaN(result)) throw fail('INVALID', 'INVALID');

  return result;
}

export function formatNumber(value) {
  if (!Number.isFinite(value)) return '∞';
  if (value === 0) return '0';

  const absolute = Math.abs(value);
  if (absolute >= 1e15 || absolute < 1e-9) {
    return value.toExponential(6).replace(/\.?0+e/, 'e');
  }

  return String(Number.parseFloat(value.toPrecision(12)));
}

export function groupDigits(text) {
  return String(text).replace(/\d+(\.\d+)?/g, (match) => {
    const [intPart, decPart] = match.split('.');
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decPart === undefined ? grouped : `${grouped}.${decPart}`;
  });
}

export function groupExpression(expression) {
  if (!expression || expression.includes('e') || expression.includes('E')) return expression;
  return groupDigits(expression);
}

export function trailingNumber(expression) {
  const match = /[0-9.]*$/.exec(expression);
  return match ? match[0] : '';
}

export function sanitize(expression) {
  let value = expression;
  let depth = 0;
  let lastOpen = -1;

  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === '(') {
      depth += 1;
      lastOpen = i;
    } else if (value[i] === ')') {
      depth -= 1;
    }
  }

  if (depth > 0 && lastOpen >= 0) {
    let start = lastOpen;
    const before = start > 0 ? value[start - 1] : '';
    const beforeThat = start > 1 ? value[start - 2] : '';
    if (before === '-' && (start - 1 === 0 || isOperator(beforeThat) || beforeThat === '(')) {
      start -= 1;
    }
    value = value.slice(0, start);
  }

  let open = 0;
  let close = 0;
  for (const ch of value) {
    if (ch === '(') open += 1;
    if (ch === ')') close += 1;
  }
  while (close > open && value.endsWith(')')) {
    value = value.slice(0, -1);
    close -= 1;
  }

  return value;
}

export function negateExpression(expression) {
  if (!expression) return '-';

  if (expression.endsWith(')')) {
    let depth = 0;
    let open = -1;
    for (let i = expression.length - 1; i >= 0; i -= 1) {
      if (expression[i] === ')') depth += 1;
      if (expression[i] === '(') {
        depth -= 1;
        if (depth === 0) {
          open = i;
          break;
        }
      }
    }

    if (open >= 0) {
      const inner = expression.slice(open + 1, expression.length - 1);
      if (inner.startsWith('-') && inner.length > 1) {
        return expression.slice(0, open) + inner.slice(1);
      }
    }

    return expression;
  }

  const number = trailingNumber(expression);
  if (!number) return expression;

  const before = expression.slice(0, expression.length - number.length);
  if (before === '') return `-${number}`;

  const lastChar = before[before.length - 1];
  const previousChar = before.length > 1 ? before[before.length - 2] : '';

  const isUnaryMinus =
    lastChar === '-' && (before.length === 1 || isOperator(previousChar) || previousChar === '(');

  if (isUnaryMinus) return before.slice(0, -1) + number;
  return `${before}(-${number})`;
}
