const ROW_COUNT = 5;
const MIN_DISPLAY_HEIGHT = 67;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function computeLayout({ width, height, topBarHeight, platform = 'android' }) {
  const isLandscape = width > height;
  const isCompact = height < 640;
  const isNarrow = width < 360;

  const horizontalPadding = isNarrow ? 14 : width >= 480 ? 26 : 20;
  const gap = isNarrow ? 10 : 14;
  const padTop = 6;
  const bottomPadding = platform === 'ios' && height >= 812 ? 22 : 14;

  const minRowHeight = isCompact ? 46 : 54;
  const preferredMinKeypad = ROW_COUNT * minRowHeight + (ROW_COUNT - 1) * gap + padTop + bottomPadding;
  const hardMinKeypad = ROW_COUNT * 44 + (ROW_COUNT - 1) * gap + padTop + bottomPadding;
  const maxKeypadHeight = ROW_COUNT * 78 + (ROW_COUNT - 1) * gap + padTop + bottomPadding;

  const measuredTopBar = topBarHeight > 0 ? topBarHeight : 56;
  const keypadWidth = isLandscape ? clamp(width * 0.55, 260, 420) : null;
  const contentWidth = isLandscape ? width - keypadWidth : width;
  const buttonAreaWidth = isLandscape ? keypadWidth : width;

  let displayHeight;
  let keypadHeight;

  if (isLandscape) {
    displayHeight = Math.max(72, height - measuredTopBar);
    keypadHeight = Math.min(height, maxKeypadHeight);
  } else {
    displayHeight = clamp(Math.round(height * (isCompact ? 0.24 : 0.27)), 96, 230);
    keypadHeight = height - measuredTopBar - displayHeight;

    if (keypadHeight < preferredMinKeypad) {
      displayHeight = Math.max(MIN_DISPLAY_HEIGHT, height - measuredTopBar - preferredMinKeypad);
      keypadHeight = height - measuredTopBar - displayHeight;
    }

    if (keypadHeight < hardMinKeypad) {
      displayHeight = Math.max(MIN_DISPLAY_HEIGHT, height - measuredTopBar - hardMinKeypad);
      keypadHeight = height - measuredTopBar - displayHeight;
    }

    if (keypadHeight > maxKeypadHeight) {
      keypadHeight = maxKeypadHeight;
      displayHeight = height - measuredTopBar - keypadHeight;
    }
  }

  const rowHeight = Math.max(
    36,
    (keypadHeight - padTop - bottomPadding - gap * (ROW_COUNT - 1)) / ROW_COUNT,
  );
  const buttonWidth = (buttonAreaWidth - horizontalPadding * 2 - gap * 3) / 4;
  const buttonScale = clamp(Math.min(buttonWidth / 76, rowHeight / 70), 0.7, 1.05);

  const displayPaddingBottom = clamp(displayHeight * 0.1, 8, 20);
  const expressionRowHeight = clamp(displayHeight * 0.34, 26, 50);
  const usableValueHeight = displayHeight - displayPaddingBottom - 8 - expressionRowHeight;
  const valueFontSize = clamp(
    Math.min(contentWidth * 0.2, usableValueHeight / 1.25),
    20,
    78,
  );
  const expressionFontSize = clamp(displayHeight * 0.12, 14, 24);

  return {
    isLandscape,
    isCompact,
    leftColumnWidth: isLandscape ? contentWidth : null,
    displayHeight,
    keypadHeight,
    keypadWidth,
    horizontalPadding,
    gap,
    padTop,
    bottomPadding,
    preferredMinKeypad,
    maxKeypadHeight,
    buttonScale,
    rowHeight,
    buttonWidth,
    valueFontSize,
    expressionFontSize,
    backspaceSize: expressionRowHeight,
    displayPaddingBottom,
  };
}
