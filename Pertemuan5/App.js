// Reimplemented pertemuan5 UI using react-native-paper
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Provider as PaperProvider,
  Card,
  Avatar,
  DataTable,
  Text as PaperText,
  Button,
  TextInput,
  HelperText,
  RadioButton,
  Checkbox,
  Switch,
  Divider,
  Snackbar,
  SegmentedButtons,
  Chip,
} from 'react-native-paper';

export default function App() {
  // Data Profil Mahasiswa Default
  const defaultMahasiswa = {
    nama: 'M. Nadiril Khoir',
    npm: '3125101308',
    prodi: 'D3 Manajemen Informatika',
    semester: '3',
    ipk: '4.00',
    status: 'Aktif',
    jenisKelamin: 'Laki-laki',
    email: 'mnadirilkhoir@gmail.com',
    noHp: '089508778539',
    alamat: 'LINGK. Gombeng',
    minat: ['Fullstack Development'],
    notifikasi: false,
    foto: require('./assets/Profile.jpeg'),
  };

  // State Mahasiswa Utama (Data dinamis untuk Profile Card)
  const [mahasiswa, setMahasiswa] = React.useState(defaultMahasiswa);

  // State Kontrol Form Input Profil
  const [formNama, setFormNama] = React.useState(defaultMahasiswa.nama);
  const [formNpm, setFormNpm] = React.useState(defaultMahasiswa.npm);
  const [formProdi, setFormProdi] = React.useState(defaultMahasiswa.prodi);
  const [formSemester, setFormSemester] = React.useState(defaultMahasiswa.semester);
  const [formIpk, setFormIpk] = React.useState(defaultMahasiswa.ipk);
  const [formGender, setFormGender] = React.useState(defaultMahasiswa.jenisKelamin);
  const [formEmail, setFormEmail] = React.useState(defaultMahasiswa.email);
  const [formNoHp, setFormNoHp] = React.useState(defaultMahasiswa.noHp);
  const [formAlamat, setFormAlamat] = React.useState(defaultMahasiswa.alamat);
  const [formStatusAktif, setFormStatusAktif] = React.useState(false);
  const [formNotif, setFormNotif] = React.useState(false);

  // State Checkbox Peminatan
  const [minatMobile, setMinatMobile] = React.useState(false);
  const [minatWeb, setMinatWeb] = React.useState(false);
  const [minatAI, setMinatAI] = React.useState(false);
  const [minatUIUX, setMinatUIUX] = React.useState(false);

  // State Feedback Snackbar
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  // Validasi Sederhana
  const isNpmValid = formNpm.trim().length === 10;
  const isEmailValid = formEmail.includes('@') && formEmail.includes('.');

  // Handler Simpan Data Profil
  const handleSimpanProfil = () => {
    const listMinat = [];
    if (minatMobile) listMinat.push('Mobile Apps');
    if (minatWeb) listMinat.push('Web Development');
    if (minatAI) listMinat.push('Artificial Intelligence');
    if (minatUIUX) listMinat.push('UI/UX Design');

    setMahasiswa({
      ...mahasiswa,
      nama: formNama,
      npm: formNpm,
      prodi: formProdi,
      semester: formSemester,
      ipk: formIpk,
      status: formStatusAktif ? 'Aktif' : 'Cuti',
      jenisKelamin: formGender,
      email: formEmail,
      noHp: formNoHp,
      alamat: formAlamat,
      minat: listMinat,
      notifikasi: formNotif,
    });

    setSnackbarMessage('Data profil mahasiswa berhasil diperbarui!');
    setSnackbarVisible(true);
  };

  // Handler Reset Form
  const handleResetForm = () => {
    setFormNama(defaultMahasiswa.nama);
    setFormNpm(defaultMahasiswa.npm);
    setFormProdi(defaultMahasiswa.prodi);
    setFormSemester(defaultMahasiswa.semester);
    setFormIpk(defaultMahasiswa.ipk);
    setFormGender(defaultMahasiswa.jenisKelamin);
    setFormEmail(defaultMahasiswa.email);
    setFormNoHp(defaultMahasiswa.noHp);
    setFormAlamat(defaultMahasiswa.alamat);
    setFormStatusAktif(false);
    setFormNotif(false);
    setMinatMobile(false);
    setMinatWeb(false);
    setMinatAI(false);
    setMinatUIUX(false);

    setSnackbarMessage('Formulir berhasil di-reset ke nilai bawaan.');
    setSnackbarVisible(true);
  };

  // Data KHS / Mata Kuliah (Pertemuan 4/5)
  const mataKuliah = [
    { kode: 'KK312408', nama: 'Sistem Informasi Berbasis Mobile', sks: 3, nilai: 'A', smt: 3 },
    { kode: 'KU312411', nama: 'Sistem Basis Data', sks: 3, nilai: 'A-', smt: 1 },
    { kode: 'KU312412', nama: 'Desain UI/UX', sks: 3, nilai: 'A', smt: 2 },
    { kode: 'KK312409', nama: 'Sistem Informasi Berbasis Web', sks: 3, nilai: 'A+', smt: 3 },
  ];

  return (
    <PaperProvider>
      <View style={styles.root}>
        <PaperText style={styles.mainTitle}>Sistem Akademik Mahasiswa</PaperText>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* CARD 1: DISPLAY PROFIL MAHASISWA                    */}
          <Card style={styles.profileCard}>
            <Card.Content>
              <PaperText style={styles.sectionHeader}> PROFIL MAHASISWA</PaperText>
              <Avatar.Image size={80} source={mahasiswa.foto} style={styles.avatar} />
              <PaperText style={styles.name}>{mahasiswa.nama}</PaperText>
              <PaperText style={styles.subInfo}>NPM: {mahasiswa.npm} | {mahasiswa.prodi}</PaperText>

              {/* Grid Statistik Akademik */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <PaperText style={styles.statLabel}>Semester</PaperText>
                  <PaperText style={styles.statValue}>{mahasiswa.semester}</PaperText>
                </View>
                <View style={styles.statItem}>
                  <PaperText style={styles.statLabel}>IPK</PaperText>
                  <PaperText style={styles.statValue}>{mahasiswa.ipk}</PaperText>
                </View>
                <View style={styles.statItem}>
                  <PaperText style={styles.statLabel}>Status</PaperText>
                  <PaperText style={[styles.statValue, { color: mahasiswa.status === 'Aktif' ? '#2e7d32' : '#c62828' }]}>
                    {mahasiswa.status}
                  </PaperText>
                </View>
                <View style={styles.statItem}>
                  <PaperText style={styles.statLabel}>Gender</PaperText>
                  <PaperText style={styles.statValue}>{mahasiswa.jenisKelamin}</PaperText>
                </View>
              </View>

              {/* Informasi Tambahan */}
              <View style={styles.infoList}>
                <PaperText style={styles.infoText}>✉ {mahasiswa.email}</PaperText>
                <PaperText style={styles.infoText}>☎ {mahasiswa.noHp}</PaperText>
                <PaperText style={styles.infoText}>⌂ {mahasiswa.alamat}</PaperText>
              </View>

              {/* Tag / Chip Peminatan */}
              {mahasiswa.minat && mahasiswa.minat.length > 0 && (
                <View style={styles.chipsRow}>
                  {mahasiswa.minat.map((item, idx) => (
                    <Chip key={idx} icon="check-circle" style={styles.chipItem} compact>
                      {item}
                    </Chip>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>

          {/* CARD 2: FORM INPUT LENGKAP REACT NATIVE PAPER       */}
          <Card style={styles.formCard}>
            <Card.Content>
              <PaperText style={styles.formSectionHeader}> FORM INPUT PROFIL MAHASISWA</PaperText>
              <PaperText style={styles.formSubtitle}>
                Formulir interaktif menggunakan komponen resmi React Native Paper
              </PaperText>

              {/* 1. SEKSI IDENTITAS DASAR */}
              <PaperText style={styles.groupTitle}>1. Identitas Mahasiswa</PaperText>

              <TextInput
                mode="outlined"
                label="Nama Lengkap"
                value={formNama}
                onChangeText={setFormNama}
                left={<TextInput.Icon icon="account" />}
                style={styles.input}
              />

              <TextInput
                mode="outlined"
                label="NPM (10 Digit)"
                value={formNpm}
                onChangeText={setFormNpm}
                keyboardType="numeric"
                maxLength={10}
                left={<TextInput.Icon icon="card-account-details" />}
                style={styles.input}
              />
              <HelperText type={isNpmValid ? 'info' : 'error'} visible={false}>
                {isNpmValid ? '✓ Format NPM valid (10 digit)' : '⚠ NPM harus tepat 10 digit angka'}
              </HelperText>

              {/* RadioButton: Jenis Kelamin */}
              <PaperText style={styles.fieldLabel}>Jenis Kelamin:</PaperText>
              <RadioButton.Group onValueChange={setFormGender} value={formGender}>
                <View style={styles.radioGroup}>
                  <RadioButton.Item
                    label="Laki-laki"
                    value="Laki-laki"
                    mode="android"
                    position="leading"
                    style={styles.radioItem}
                  />
                  <RadioButton.Item
                    label="Perempuan"
                    value="Perempuan"
                    mode="android"
                    position="leading"
                    style={styles.radioItem}
                  />
                </View>
              </RadioButton.Group>

              <Divider style={styles.divider} />

              {/* 2. SEKSI KONTAK & ALAMAT */}
              <PaperText style={styles.groupTitle}>2. Kontak & Alamat</PaperText>

              <TextInput
                mode="outlined"
                label="Email Mahasiswa"
                value={formEmail}
                onChangeText={setFormEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                style={styles.input}
              />
              <HelperText type={isEmailValid ? 'info' : 'error'} visible={false}>
                {isEmailValid ? '✓ Alamat email valid' : '⚠ Masukkan format email yang valid (@ dan domain)'}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Nomor Handphone / WhatsApp"
                value={formNoHp}
                onChangeText={setFormNoHp}
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="phone" />}
                style={styles.input}
              />

              <TextInput
                mode="outlined"
                label="Alamat Tempat Tinggal"
                value={formAlamat}
                onChangeText={setFormAlamat}
                multiline
                numberOfLines={3}
                left={<TextInput.Icon icon="map-marker" />}
                style={styles.input}
              />

              <Divider style={styles.divider} />

              {/* 3. SEKSI AKADEMIK */}
              <PaperText style={styles.groupTitle}>3. Jenjang Akademik</PaperText>

              <PaperText style={styles.fieldLabel}>Program Studi:</PaperText>
              <SegmentedButtons
                value={formProdi}
                onValueChange={setFormProdi}
                buttons={[
                  { value: 'D3 Manajemen Informatika', label: 'D3 MI' },
                  { value: 'D4 Teknik Informatika', label: 'D4 TI' },
                  { value: 'S1 Sistem Informasi', label: 'S1 SI' },
                ]}
                style={styles.segmentedBtn}
              />

              <PaperText style={styles.fieldLabel}>Semester:</PaperText>
              <SegmentedButtons
                value={formSemester}
                onValueChange={setFormSemester}
                buttons={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' },
                  { value: '6', label: '6' },
                ]}
                style={styles.segmentedBtn}
              />

              <TextInput
                mode="outlined"
                label="Indeks Prestasi Kumulatif (IPK)"
                value={formIpk}
                onChangeText={setFormIpk}
                keyboardType="numeric"
                left={<TextInput.Icon icon="star" />}
                style={styles.input}
              />

              <Divider style={styles.divider} />

              {/* 4. SEKSI MINAT & PREFERENSI */}
              <PaperText style={styles.groupTitle}>4. Peminatan & Pengaturan</PaperText>

              <PaperText style={styles.fieldLabel}>Peminatan Bidang Studi:</PaperText>
              <Checkbox.Item
                label="Mobile Application (React Native)"
                status={minatMobile ? 'checked' : 'unchecked'}
                onPress={() => setMinatMobile(!minatMobile)}
                mode="android"
                position="leading"
                style={styles.checkItem}
              />
              <Checkbox.Item
                label="Web Application (Fullstack)"
                status={minatWeb ? 'checked' : 'unchecked'}
                onPress={() => setMinatWeb(!minatWeb)}
                mode="android"
                position="leading"
                style={styles.checkItem}
              />
              <Checkbox.Item
                label="Artificial Intelligence & Data"
                status={minatAI ? 'checked' : 'unchecked'}
                onPress={() => setMinatAI(!minatAI)}
                mode="android"
                position="leading"
                style={styles.checkItem}
              />
              <Checkbox.Item
                label="UI/UX & Product Design"
                status={minatUIUX ? 'checked' : 'unchecked'}
                onPress={() => setMinatUIUX(!minatUIUX)}
                mode="android"
                position="leading"
                style={styles.checkItem}
              />

              {/* Switch Status Mahasiswa Aktif */}
              <View style={styles.switchRow}>
                <PaperText style={styles.switchLabel}>Status Mahasiswa Aktif</PaperText>
                <Switch
                  value={formStatusAktif}
                  onValueChange={setFormStatusAktif}
                  color="#1565c0"
                />
              </View>

              {/* Switch Notifikasi Kampus */}
              <View style={styles.switchRow}>
                <PaperText style={styles.switchLabel}>Langganan Notifikasi Akademik</PaperText>
                <Switch
                  value={formNotif}
                  onValueChange={setFormNotif}
                  color="#6e51ef"
                />
              </View>

              <Divider style={styles.divider} />

              {/* 5. TOMBOL AKSI */}
              <View style={styles.actionRow}>
                <Button
                  mode="contained"
                  icon="content-save"
                  onPress={handleSimpanProfil}
                  style={styles.btnSimpan}
                >
                  Simpan Profil
                </Button>
                <Button
                  mode="outlined"
                  icon="refresh"
                  onPress={handleResetForm}
                  style={styles.btnReset}
                >
                  Reset Form
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* CARD 3: KARTU HASIL STUDI (KHS)                      */}
          <Card style={styles.khsCard}>
            <Card.Content>
              <PaperText style={styles.sectionHeader}> KARTU HASIL STUDI (KHS)</PaperText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DataTable style={styles.table}>
                  <DataTable.Header>
                    <DataTable.Title style={styles.colMk}>Mata Kuliah</DataTable.Title>
                    <DataTable.Title style={styles.colSks}>SKS</DataTable.Title>
                    <DataTable.Title style={styles.colNilai}>Nilai</DataTable.Title>
                    <DataTable.Title style={styles.colSmt}>Semester</DataTable.Title>
                  </DataTable.Header>
                  {mataKuliah.map((item, idx) => (
                    <DataTable.Row key={item.kode} style={idx % 2 === 1 ? styles.rowAlt : null}>
                      <DataTable.Cell style={styles.colMk}>
                        <View>
                          <PaperText style={styles.mkNama}>{item.nama}</PaperText>
                          <PaperText style={styles.mkKode}>{item.kode}</PaperText>
                        </View>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.colSks}>{item.sks}</DataTable.Cell>
                      <DataTable.Cell style={styles.colNilai}>{item.nilai}</DataTable.Cell>
                      <DataTable.Cell style={styles.colSmt}>{item.smt}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>
              <View style={styles.footer}>
                <PaperText style={styles.totalText}>Total SKS diambil: 13 SKS</PaperText>
              </View>
              <View style={styles.buttonContainer}>
                <Button icon="download" mode="contained" onPress={() => console.log('Download KHS')}>
                  Download KHS
                </Button>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>

        {/* FEEDBACK SNACKBAR */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'Tutup',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#eceff1', paddingTop: 50 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#263238' },
  scrollContainer: { paddingHorizontal: 16, paddingBottom: 40 },

  // Profile Card Styles
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#6e51ef', letterSpacing: 1, marginBottom: 6 },
  profileCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3, borderLeftWidth: 5, borderLeftColor: '#6ee51e' },
  avatar: { alignSelf: 'center', marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#212121', marginBottom: 2, textAlign: 'center' },
  subInfo: { fontSize: 14, color: '#757575', marginBottom: 12, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f4f6f8', borderRadius: 10, padding: 12, marginBottom: 12 },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#757575' },
  statValue: { fontSize: 15, fontWeight: 'bold', color: '#1565c0' },
  infoList: { marginVertical: 6, gap: 4 },
  infoText: { fontSize: 13, color: '#555' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  chipItem: { backgroundColor: '#e8f5e9' },

  // Form Card Styles
  formCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3, borderLeftWidth: 5, borderLeftColor: '#1976d2' },
  formSectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#1976d2', letterSpacing: 1, marginBottom: 4 },
  formSubtitle: { fontSize: 12, color: '#666', marginBottom: 14 },
  groupTitle: { fontSize: 15, fontWeight: 'bold', color: '#37474f', marginTop: 10, marginBottom: 8 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginTop: 8, marginBottom: 4 },
  input: { marginBottom: 4, backgroundColor: '#ffffff' },
  radioGroup: { flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' },
  radioItem: { paddingVertical: 2, paddingHorizontal: 0, marginRight: 10 },
  segmentedBtn: { marginBottom: 10 },
  checkItem: { paddingVertical: 2, paddingHorizontal: 0 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  switchLabel: { fontSize: 14, color: '#333' },
  divider: { marginVertical: 14, height: 1, backgroundColor: '#e0e0e0' },
  actionRow: { marginTop: 10, gap: 10 },
  btnSimpan: { backgroundColor: '#1976d2' },
  btnReset: { borderColor: '#757575' },

  // KHS Card Styles
  khsCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 3, borderLeftWidth: 5, borderLeftColor: '#7b1fa2' },
  table: { minWidth: 440 },
  colMk: { width: 200, minWidth: 200 },
  colSks: { width: 60, minWidth: 60, justifyContent: 'center' },
  colNilai: { width: 80, minWidth: 80, justifyContent: 'center' },
  colSmt: { width: 100, minWidth: 100, justifyContent: 'center' },
  mkNama: { fontSize: 14, fontWeight: '600', color: '#333' },
  mkKode: { fontSize: 11, color: '#888' },
  rowAlt: { backgroundColor: '#fafafa' },
  footer: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#e0e0e0', alignItems: 'flex-end' },
  totalText: { fontSize: 12, fontWeight: '600', color: '#666' },
  buttonContainer: { marginTop: 16 },
});