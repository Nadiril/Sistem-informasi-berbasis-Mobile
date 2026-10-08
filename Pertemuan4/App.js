import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

export default function App() {
  // Data Akademik Mahasiswa
  const mahasiswa = {
    nama: 'M. Nadiril Khoir',
    npm: '1125102212',
    prodi: 'D3 Manajemen Informatika',
    semester: 3,
    ipk: 4.00,
    status: 'Aktif',
    foto: require('./assets/icon.png'),
  };

  // Data KHS / Mata Kuliah
  const mataKuliah = [
    { kode: 'KK312408', nama: 'Sistem Informasi Berbasis Mobile', sks: 3, nilai: 'A', smt: 3 },
    { kode: 'KU312411', nama: 'Sistem Basis Data', sks: 3, nilai: 'A-', smt: 1 },
    { kode: 'KU312412', nama: 'Desain UI/UX', sks: 3, nilai: 'A', smt: 2 },
    { kode: 'KK312409', nama: 'Sistem Informasi Berbasis Web', sks: 3, nilai: 'A+', smt: 3 },
  ];

  // Data FRS / Mata Kuliah
  const mataKuliahFrs = [
    { kode: 'KK312408', nama: 'Sistem Informasi Berbasis Web', sks: 3, smt: 4 },
    { kode: 'KU312411', nama: 'Sistem Basis Data', sks: 3, smt: 4 },
    { kode: 'KU312412', nama: 'Desain UI/UX', sks: 3, smt: 4 },
    { kode: 'KK312409', nama: 'Praktek Sistem Informasi Berbasis Web', sks: 3, smt: 4 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#eceff1', paddingTop: 50 }}>
      <Text style={styles.mainTitle}>Sistem Akademik Mahasiswa</Text>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}>

        {/* ==================================================== */}
        {/* BAGIAN 1: PROFIL MAHASISWA (MENGGUNAKAN INLINE STYLE) */}
        {/* ==================================================== */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
            borderLeftWidth: 5,
            borderLeftColor: '#6ee51eff',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#1e88e5',
              fontWeight: 'bold',
              letterSpacing: 1,
              marginBottom: 6,
            }}
          >
            [ INLINE STYLE ] PROFIL MAHASISWA
          </Text>
          <Image
            source={mahasiswa.foto}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: 'center',
              marginBottom: 12,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#212121',
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            {mahasiswa.nama}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#757575',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            NPM: {mahasiswa.npm} | {mahasiswa.prodi}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#f4f6f8',
              borderRadius: 10,
              padding: 12,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#757575' }}>Semester</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1565c0' }}>
                {mahasiswa.semester}
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#757575' }}>IPK</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2e7d32' }}>
                {mahasiswa.ipk}
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#757575' }}>Status</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1565c0', marginTop: 2 }}>
                {mahasiswa.status}
              </Text>
            </View>
          </View>
        </View>

        {/* ==================================================== */}
        {/* BAGIAN 2: KHS (MENGGUNAKAN STYLESHEET API)           */}
        {/* ==================================================== */}
        <View style={styles.cardKhs}>
          <Text style={styles.khsTitle}>[ STYLESHEET ] KARTU HASIL STUDI (KHS)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header Tabel */}
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, styles.colMk]}>Mata Kuliah</Text>
                <Text style={[styles.columnHeader, styles.colSks, styles.textCenter]}>SKS</Text>
                <Text style={[styles.columnHeader, styles.colNilai, styles.textCenter]}>Nilai</Text>
                <Text style={[styles.columnHeader, styles.colSmt, styles.textCenter]}>Semester</Text>
              </View>

              {/* Data Mata Kuliah */}
              {mataKuliah.map((item, index) => (
                <View
                  key={item.kode}
                  style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}
                >
                  <View style={styles.colMk}>
                    <Text style={styles.mkNama}>{item.nama}</Text>
                    <Text style={styles.mkKode}>{item.kode}</Text>
                  </View>
                  <Text style={[styles.cellText, styles.colSks, styles.textCenter]}>
                    {item.sks}
                  </Text>
                  <View style={[styles.colNilai, styles.alignCenter]}>
                    <View style={styles.badgeNilai}>
                      <Text style={styles.badgeText}>{item.nilai}</Text>
                    </View>
                  </View>
                  <Text style={[styles.cellText, styles.colSmt, styles.textCenter]}>
                    {item.smt}
                  </Text>
                </View>
              ))}
            </View>

        

            
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total SKS diambil: 13 SKS</Text>
          </View>
        </View>

        {/* ==================================================== */}
        {/* BAGIAN 2: KHS (MENGGUNAKAN STYLESHEET API)           */}
        {/* ==================================================== */}
        <View style={styles.cardFrs}>
          <Text style={styles.khsTitle}>[ STYLESHEET ] KARTU HASIL STUDI (KHS)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header Tabel */}
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, styles.colMk]}>Mata Kuliah</Text>
                <Text style={[styles.columnHeader, styles.colSks, styles.textCenter]}>SKS</Text>
                {/* <Text style={[styles.columnHeader, styles.colNilai, styles.textCenter]}>Nilai</Text> */}
                <Text style={[styles.columnHeader, styles.colSmt, styles.textCenter]}>Semester</Text>
              </View>

              {/* Data Mata Kuliah */}
              {mataKuliah.map((item, index) => (
                <View
                  key={item.kode}
                  style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}
                >
                  <View style={styles.colMk}>
                    <Text style={styles.mkNama}>{item.nama}</Text>
                    <Text style={styles.mkKode}>{item.kode}</Text>
                  </View>
                  <Text style={[styles.cellText, styles.colSks, styles.textCenter]}>
                    {item.sks}
                  </Text>
                  {/* <View style={[styles.colNilai, styles.alignCenter]}>
                    <View style={styles.badgeNilai}>
                      <Text style={styles.badgeText}>{item.nilai}</Text>
                    </View>
                  </View> */}
                  <Text style={[styles.cellText, styles.colSmt, styles.textCenter]}>
                    {item.smt}
                  </Text>
                </View>
              ))}
            </View>

        

            
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total SKS diambil: 13 SKS</Text>
          </View>
        </View>

      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// ====================================================
// DEFINISI STYLESHEET
// ====================================================
const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#263238',
  },
  cardKhs: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#7b1fa2',
  },
  cardFrs: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#4caf50',
  },
  khsTitle: {
    fontSize: 12,
    color: '#7b1fa2',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  colMk: { width: 200 },
  colSks: { width: 60 },
  colNilai: { width: 80 },
  colSmt: { width: 80 },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa',
  },
  mkNama: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  mkKode: {
    fontSize: 11,
    color: '#888888',
  },
  cellText: {
    fontSize: 14,
    color: '#444444',
  },
  badgeNilai: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  textCenter: { textAlign: 'center' },
  alignCenter: { alignItems: 'center' },
});