import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import {
  Card,
  Avatar,
  Text as PaperText,
  Button,
  TextInput,
  Divider,
} from 'react-native-paper';

export default function LoginScreen({ onLogin, onGoToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Silakan isi username dan password!');
      return;
    }
    onLogin(username.trim(), password);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Card style={styles.cardAuth} elevation={3}>
        <Card.Content>
          <View style={styles.authHeaderCenter}>
            <Avatar.Icon size={64} icon="school" style={styles.authAvatar} color="#ffffff" />
            <PaperText style={styles.authTitle}>Sistem Akademik Mobile</PaperText>
            <PaperText style={styles.authSubtitle}>
              Pertemuan 6: Stack Navigation (Push & Pop)
            </PaperText>
          </View>

          <PaperText style={styles.formSectionTitle}>Silakan Masuk ke Akun Anda</PaperText>

          {/* Input Username */}
          <TextInput
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={setUsername}
            left={<TextInput.Icon icon="account" />}
            autoCapitalize="none"
            style={styles.inputSpacing}
          />

          {/* Input Password */}
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
            style={styles.inputSpacing}
          />

          {/* Tombol Login */}
          <Button
            mode="contained"
            icon="login"
            onPress={handleSubmit}
            style={styles.btnPrimary}
            contentStyle={styles.btnContent}
          >
            LOGIN KE DASHBOARD
          </Button>

          <View style={styles.dividerBox}>
            <Divider style={styles.dividerLine} />
            <PaperText style={styles.dividerLabel}>ATAU</PaperText>
            <Divider style={styles.dividerLine} />
          </View>

          {/* Tombol Pindah ke Halaman Registrasi */}
          <Button
            mode="outlined"
            icon="account-plus"
            onPress={onGoToRegister}
            style={styles.btnSecondary}
            contentStyle={styles.btnContent}
          >
            DAFTAR AKUN BARU
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  cardAuth: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 8,
  },
  authHeaderCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  authAvatar: {
    backgroundColor: '#2563eb',
    marginBottom: 10,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  formSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  inputSpacing: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    marginTop: 8,
  },
  btnSecondary: {
    borderColor: '#93c5fd',
    borderRadius: 10,
  },
  btnContent: {
    paddingVertical: 6,
  },
  dividerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerLabel: {
    marginHorizontal: 10,
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
});