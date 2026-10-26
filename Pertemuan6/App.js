import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { Provider as PaperProvider, Snackbar } from 'react-native-paper';

// Import Komponen Layar Terpisah
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import DashboardScreen from './screens/dashboardScreen';
import ProfileDetailScreen from './screens/detailScreen';

export default function App() {
  // ====================================================
  // 1. DATABASE LOKAL STATE USER
  // ====================================================
  const [users, setUsers] = useState([
    {
      nama: 'M. Taufiq',
      username: 'taufiq',
      password: '123',
      prodi: 'D3 Manajemen Informatika',
      semester: '4',
      ipk: '3.85',
      role: 'Mahasiswa',
    },
    {
      nama: 'Administrator',
      username: 'admin',
      password: '123',
      prodi: 'Pusat Data & Sistem',
      semester: '-',
      ipk: '-',
      role: 'Admin',
    },
  ]);

  // ====================================================
  // 2. MEKANISME STACK NAVIGATION (PUSH & POP)
  // ====================================================
  // Stack navigation mengelola tumpukan layar dengan prinsip LIFO (Last-In-First-Out)
  const [stack, setStack] = useState([{ name: 'Login', params: {} }]);

  // State Feedback Notifikasi Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbarVisible(true);
  };

  // PUSH: Menambahkan layar baru ke atas tumpukan (navigasi maju)
  const push = (screenName, params = {}) => {
    setStack((prevStack) => [...prevStack, { name: screenName, params }]);
  };

  // POP: Mengambil/menghapus layar teratas (navigasi kembali)
  const pop = () => {
    if (stack.length > 1) {
      setStack((prevStack) => prevStack.slice(0, -1));
    }
  };

  // POP TO TOP: Kembali langsung ke layar paling awal (root/Login)
  const popToTop = () => {
    if (stack.length > 1) {
      setStack([stack[0]]);
    }
  };

  // Layar yang sedang aktif adalah elemen paling atas dari stack
  const currentScreen = stack[stack.length - 1];

  // ====================================================
  // 3. LOGIKA AUTHENTICATION & REGISTRASI
  // ====================================================
  const handleLogin = (username, password) => {
    const matchedUser = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (matchedUser) {
      push('Dashboard', { user: matchedUser });
      showSnackbar(`Selamat datang kembali, ${matchedUser.nama}! 🎉`);
    } else {
      Alert.alert(
        'Login Gagal',
        'Username atau password salah! Silakan periksa kembali atau buat akun baru melalui menu Registrasi.'
      );
    }
  };

  const handleRegister = (newUser) => {
    const existingUser = users.find(
      (u) => u.username.toLowerCase() === newUser.username.toLowerCase()
    );

    if (existingUser) {
      Alert.alert('Peringatan', 'Username sudah digunakan! Silakan gunakan username lain.');
      return;
    }

    setUsers((prev) => [...prev, newUser]);

    Alert.alert(
      'Registrasi Berhasil! 🎉',
      `Akun "${newUser.username}" berhasil terdaftar.\n\nSistem akan kembali ke halaman Login.`,
      [
        {
          text: 'Kembali ke Login (POP)',
          onPress: () => {
            pop();
            showSnackbar('Registrasi sukses! Silakan login dengan akun baru Anda.');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Konfirmasi Logout', 'Apakah Anda yakin ingin keluar dari sistem?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Ya, Keluar',
        style: 'destructive',
        onPress: () => {
          pop();
          showSnackbar('Anda telah keluar dari sistem.');
        },
      },
    ]);
  };

  // ====================================================
  // 4. SCREEN SWITCHER (BERDASARKAN ELEMEN TERATAS STACK)
  // ====================================================
  const renderCurrentScreen = () => {
    switch (currentScreen.name) {
      case 'Register':
        return (
          <RegisterScreen
            onRegister={handleRegister}
            onGoBack={pop}
          />
        );
      case 'Dashboard':
        return (
          <DashboardScreen
            user={currentScreen.params.user || users[0]}
            onGoBack={pop}
            onLogout={handleLogout}
            onViewDetail={(user) => push('ProfileDetail', { user })}
            onPopToTop={popToTop}
          />
        );
      case 'ProfileDetail':
        return (
          <ProfileDetailScreen
            user={currentScreen.params.user || users[0]}
            onGoBack={pop}
            onPopToTop={popToTop}
          />
        );
      case 'Login':
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onGoToRegister={() => push('Register')}
          />
        );
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        {/* Render Komponen Layar yang Sedang Aktif */}
        <View style={styles.mainContainer}>{renderCurrentScreen()}</View>

        {/* Feedback Notifikasi Pop-up */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingTop: 36,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
});