import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// 1. KOMPONEN ANAK (CHILD COMPONENT) MENGGUNAKAN PROPS
// Komponen ini menerima data 'nama', 'nim', dan 'prodi' dari komponen induk
function KartuMahasiswa({ nama, nim, prodi }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Data Akademik Mahasiswa</Text>
      <Text style={styles.cardText}>Nama : {nama}</Text>
      <Text style={styles.cardText}>NIM : {nim}</Text>
      <Text style={styles.cardText}>Prodi: {prodi}</Text>
    </View>
  );
}
// 2. KOMPONEN UTAMA (PARENT COMPONENT)
export default function App() {
  // Menggunakan State untuk data interaktif
  const [counter, setCounter] = useState(0);
  const [statusAktif, setStatusAktif] = useState(true);
  // Fungsi untuk menambah angka counter
  const handleTambah = () => {
    setCounter(counter + 1);
  };
  // Fungsi untuk mengurangi angka counter
  const handleKurang = () => {
    setCounter(counter - 1);
  };
  // Fungsi untuk mengubah status aktif
  const handleToggleStatus = () => {
    setStatusAktif(!statusAktif);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Aplikasi */}
      <Text style={styles.headerTitle}>Pertemuan 3: Props & State</Text>
      <Text style={styles.headerSubtitle}>STIKOM PGRI Banyuwangi</Text>
      {/* Implementasi Komponen dengan PROPS */}
      <KartuMahasiswa
        nama="M. Nadiril Khoir"
        nim="3125101308"
        prodi="D3 Manajemen Informatika"
      />
      <KartuMahasiswa
        nama="Ahmad Rojali"
        nim="362024002"
        prodi="D3 Manajemen Informatika"
      />
      {/* Implementasi Komponen dengan STATE (Interaktif) */}
      <View style={styles.stateContainer}>
        <Text style={styles.sectionTitle}>Demonstrasi State Interaktif</Text>

        {/* Contoh 1: Counter */}
        <Text style={styles.counterText}>Nilai Counter: {counter}</Text>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleTambah}>
          <Text style={styles.buttonText}>Tambah Angka</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleKurang}>
          <Text style={styles.buttonText}>Kurangi Angka</Text>
        </TouchableOpacity>
        {/* Contoh 2: Status Toggle */}
        <Text
          style={[
            styles.statusText,
            { color: statusAktif ? "#16a34a" : "#dc2626" },
          ]}
        >
          Status Akun:{" "}
          {statusAktif ? "AKTIF (Online)" : "TIDAK AKTIF (Offline)"}
        </Text>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleToggleStatus}
        >
          <Text style={styles.buttonText}>Ubah Status Akun</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
// Konfigurasi StyleSheet
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eef0f3d5",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#000",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#ebb625",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    color: "#334155",
    marginBottom: 4,
  },
  stateContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonPrimary: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: "#475569",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
