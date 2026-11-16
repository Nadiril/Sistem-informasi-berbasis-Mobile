import { Text } from 'react-native';

import { colors, textStyles } from '../theme';

export function AppText({ variant = 'body', color = colors.neutral.textPrimary, style, ...props }) {
  return <Text {...props} style={[textStyles[variant], { color }, style]} />;
}
