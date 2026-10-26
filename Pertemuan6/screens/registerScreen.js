import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import {
  Card,
  Avatar,
  Text as PaperText,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';

export default function RegisterScreen({ onRegister, onGoBack }) {
  const [nama, setNama] = useState('');
  const [prodi, setProdi] = useState('D3 Manajemen Informatika');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  const isPasswordMatch = password === konfirmasiPassword;
  const showPasswordWarning = konfirmasiPassword.length > 0 && !isPasswordMatch;

  const handleSubmit = () => {
    if (!nama.trim() || !username.trim() || !password || !konfirmasiPassword) {
      Alert.alert('Peringatan', 'Semua kolom formulir pendaftaran wajib diisi!');
      return;
    }

    if (!isPasswordMatch) {
      Alert.alert('Gagal', 'Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    onRegister({
      nama: nama.trim(),
      username: username.trim(),
      password,
      prodi: prodi.trim(),
      semester: '1',
      ipk: '0.00',
      role: 'Mahasiswa',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Tombol Back Navigasi (POP) */}
      <Button
        mode="text"
        icon="arrow-left"
        onPress={onGoBack}
        style={styles.btnBackTop}
        textColor="#1e3a8a"
      >
        Kembali ke Login
      </Button>

      <Card style={styles.cardAuth} elevation={3}>
        <Card.Content>
          <View style={styles.authHeaderCenter}>
            <Avatar.Icon size={56} icon="account-plus" style={styles.authAvatarRegister} color="#ffffff" />
            <PaperText style={styles.authTitle}>Registrasi Akun Baru</PaperText>
            <PaperText style={styles.authSubtitle}>
              Daftarkan akun mahasiswa untuk mengakses sistem akademik
            </PaperText>
          </View>

          <TextInput
            mode="outlined"
            label="Nama Lengkap"
            value={nama}
            onChangeText={setNama}
            left={<TextInput.Icon icon="account" />}
            style={styles.inputSpacing}
          />

          <TextInput
            mode="outlined"
            label="Program Studi"
            value={prodi}
            onChangeText={setProdi}
            left={<TextInput.Icon icon="school" />}
            style={styles.inputSpacing}
          />

          <TextInput
            mode="outlined"
            label="Username Baru"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            left={<TextInput.Icon icon="at" />}
            style={styles.inputSpacing}
          />

          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
            style={styles.inputSpacing}
          />

          <TextInput
            mode="outlined"
            label="Konfirmasi Password"
            value={konfirmasiPassword}
            onChangeText={setKonfirmasiPassword}
            secureTextEntry
            left={<TextInput.Icon icon="lock-check" />}
            style={styles.inputSpacing}
          />

          <HelperText type={showPasswordWarning ? 'error' : 'info'} visible={true}>
            {showPasswordWarning
              ? '⚠ Password dan Konfirmasi Password tidak sama!'
              : '✓ Pastikan password mudah diingat dan aman'}
          </HelperText>

          {/* Tombol Registrasi */}
          <Button
            mode="contained"
            icon="check-circle"
            onPress={handleSubmit}
            style={styles.btnPrimary}
            contentStyle={styles.btnContent}
          >
            DAFTAR SEKARANG
          </Button>

          {/* Tombol Batal Kembali */}
          <Button
            mode="text"
            onPress={onGoBack}
            style={{ marginTop: 8 }}
          >
            Sudah punya akun? Kembali ke Login
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
  authAvatarRegister: {
    backgroundColor: '#059669',
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
  inputSpacing: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    marginTop: 8,
  },
  btnContent: {
    paddingVertical: 6,
  },
  btnBackTop: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
});