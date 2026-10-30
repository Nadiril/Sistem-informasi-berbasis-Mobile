import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius } from './src/theme';
import { evaluate as evaluateExpression, formatNumber } from './src/utils/calculator';
import { computeLayout } from './src/utils/layout';

const KEYS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const isOperator = (k) => ['÷', '×', '−', '+'].includes(k);

function Button({ label, type, wide, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(label)}
      style={({ pressed }) => [
        styles.button,
        wide && styles.wide,
        type === 'operator' && styles.operator,
        type === 'equals' && styles.equals,
        type === 'clear' && styles.clear,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          type === 'operator' && styles.operatorText,
          type === 'equals' && styles.equalsText,
          type === 'clear' && styles.clearText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Display({ last, value, onDelete, valueFontSize, expressionFontSize }) {
  return (
    <View style={styles.display}>
      <Pressable onPress={onDelete} hitSlop={12} style={styles.delete}>
        <Text style={styles.deleteText}>⌫</Text>
      </Pressable>
      <Text
        style={[styles.expression, { fontSize: expressionFontSize }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {last}
      </Text>
      <Text
        style={[styles.value, { fontSize: valueFontSize }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.3}
      >
        {value}
      </Text>
    </View>
  );
}

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [last, setLast] = useState('');
  const [justEquals, setJustEquals] = useState(false);
  const { width, height } = useWindowDimensions();
  const layout = computeLayout({
    width,
    height,
    topBarHeight: 56,
    platform: Platform.OS,
  });
  const landscape = layout.isLandscape;

  const evaluate = (expr) => {
    try {
      // Parser di src/utils/calculator.js memakai operator ASCII untuk kurang.
      const result = evaluateExpression(expr.replace(/−/g, '-'));
      if (result == null || !Number.isFinite(result)) return 'Error';
      return formatNumber(result);
    } catch {
      return 'Error';
    }
  };

  const press = (key) => {
    if (key === 'C') {
      setExpression(''); setResult('0'); setLast(''); setJustEquals(false); return;
    }
    if (key === '=') {
      if (!expression) return;
      const value = evaluate(expression);
      setLast(expression + ' ='); setResult(value); setExpression(''); setJustEquals(true); return;
    }
    if (key === '±' || key === '%') {
      const target = justEquals ? result : expression;
      const num = target.match(/[\d.]+$/);
      if (!num) return;
      const n = parseFloat(num[0]);
      const next = key === '±' ? -n : n / 100;
      const replaced = target.slice(0, num.index) + String(Math.round(next * 1e10) / 1e10);
      if (justEquals) { setResult(replaced); setJustEquals(false); } else setExpression(replaced);
      return;
    }
    if (isOperator(key)) {
      setJustEquals(false);
      if (justEquals) { setExpression(result + key); setResult('0'); setLast(''); return; }
      if (!expression && key !== '−') return;
      const lastChar = expression.slice(-1);
      if (isOperator(lastChar)) { setExpression(expression.slice(0, -1) + key); return; }
      setExpression(expression + key); return;
    }
    if (key === '.') {
      setJustEquals(false);
      const parts = expression.split(/[+\−×÷]/);
      const current = parts[parts.length - 1];
      if (current.includes('.')) return;
      setExpression(justEquals ? '0.' : expression + (current === '' ? '0.' : '.'));
      return;
    }
    setJustEquals(false);
    setLast('');
    setExpression((e) => (justEquals ? key : e + key));
  };

  const backspace = () => {
    if (justEquals) { setExpression(''); setResult('0'); setLast(''); setJustEquals(false); return; }
    setExpression((e) => e.slice(0, -1));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={[styles.inner, landscape && styles.innerLandscape]}>
          <Text style={styles.header}>Kalkulator</Text>
          <Display
            last={last}
            value={expression || result}
            onDelete={backspace}
            valueFontSize={layout.valueFontSize}
            expressionFontSize={layout.expressionFontSize}
          />
          <View style={styles.keypad}>
            {KEYS.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((k) => {
                  const type = k === '=' ? 'equals' : k === 'C' ? 'clear' : isOperator(k) ? 'operator' : 'number';
                  return <Button key={k} label={k} type={type} wide={k === '0'} onPress={press} />;
                })}
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    inner: { flex: 1, padding: 16 },
    innerLandscape: { flexDirection: 'column' },
    header: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
    display: {
      flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',
      backgroundColor: colors.surface, borderRadius: radius.lg, padding: 24, marginBottom: 16,
    },
    expression: { color: colors.textMuted, fontWeight: '500', marginBottom: 8 },
    delete: { position: 'absolute', top: 16, left: 16, padding: 6 },
    deleteText: { color: colors.textMuted, fontSize: 22 },
    value: { color: colors.text, fontWeight: '600' },
    keypad: { gap: 10 },
    row: { flexDirection: 'row', gap: 10, minHeight: 64, flex: 1 },
    button: {
      flex: 1, borderRadius: radius.md, backgroundColor: colors.surfaceAlt,
      alignItems: 'center', justifyContent: 'center',
    },
    wide: { flex: 2 },
    operator: { backgroundColor: colors.accent },
    equals: { backgroundColor: colors.contrast },
    clear: { backgroundColor: colors.danger },
    pressed: { opacity: 0.7, transform: [{ scale: 0.96 }] },
    buttonText: { color: colors.text, fontSize: 26, fontWeight: '600' },
    operatorText: { color: colors.onAccent },
    equalsText: { color: colors.onContrast, fontWeight: '700' },
    clearText: { color: colors.contrast, fontWeight: '700' },
  });
