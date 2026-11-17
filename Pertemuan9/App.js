import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  MD3LightTheme,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";

const initialMahasiswa = [
  {
    id: "1",
    nim: "2301001",
    nama: "Andi Pratama",
    jurusan: "Teknik Informatika",
    angkatan: "2023",
    email: "andi.pratama@example.com",
    noTelepon: "0812-3456-7890",
    alamat: "Jl. Merdeka No. 10, Jakarta",
  },
  {
    id: "2",
    nim: "2301002",
    nama: "Budi Santoso",
    jurusan: "Sistem Informasi",
    angkatan: "2023",
    email: "budi.santoso@example.com",
    noTelepon: "0813-4567-8901",
    alamat: "Jl. Diponegoro No. 25, Bandung",
  },
  {
    id: "3",
    nim: "2301003",
    nama: "Citra Lestari",
    jurusan: "Teknik Komputer",
    angkatan: "2023",
    email: "citra.lestari@example.com",
    noTelepon: "0814-5678-9012",
    alamat: "Jl. Sudirman No. 8, Surabaya",
  },
  {
    id: "4",
    nim: "2301004",
    nama: "Dewi Anggraini",
    jurusan: "Manajemen Informatika",
    angkatan: "2023",
    email: "dewi.anggraini@example.com",
    noTelepon: "0815-6789-0123",
    alamat: "Jl. Ahmad Yani No. 17, Yogyakarta",
  },
];

async function loadMahasiswa() {
  const db = await SQLite.openDatabaseAsync("mahasiswa.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS mahasiswa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nim TEXT NOT NULL UNIQUE,
      nama TEXT NOT NULL,
      jurusan TEXT NOT NULL,
      angkatan TEXT NOT NULL,
      email TEXT NOT NULL,
      noTelepon TEXT NOT NULL,
      alamat TEXT NOT NULL
    );
  `);

  for (const student of initialMahasiswa) {
    await db.runAsync(
      `INSERT OR IGNORE INTO mahasiswa
        (nim, nama, jurusan, angkatan, email, noTelepon, alamat)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      student.nim,
      student.nama,
      student.jurusan,
      student.angkatan,
      student.email,
      student.noTelepon,
      student.alamat,
    );
  }

  return db.getAllAsync(
    `SELECT id, nim, nama, jurusan, angkatan, email, noTelepon, alamat
     FROM mahasiswa
     ORDER BY nama COLLATE NOCASE`,
  );
}

async function insertMahasiswa(student) {
  const db = await SQLite.openDatabaseAsync("mahasiswa.db");

  await db.runAsync(
    `INSERT INTO mahasiswa
      (nim, nama, jurusan, angkatan, email, noTelepon, alamat)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    student.nim.trim(),
    student.nama.trim(),
    student.jurusan.trim(),
    student.angkatan.trim(),
    student.email.trim(),
    student.noTelepon.trim(),
    student.alamat.trim(),
  );
}

async function updateMahasiswa(id, student) {
  const db = await SQLite.openDatabaseAsync("mahasiswa.db");

  await db.runAsync(
    `UPDATE mahasiswa
     SET nim = ?, nama = ?, jurusan = ?, angkatan = ?, email = ?, noTelepon = ?, alamat = ?
     WHERE id = ?`,
    student.nim.trim(),
    student.nama.trim(),
    student.jurusan.trim(),
    student.angkatan.trim(),
    student.email.trim(),
    student.noTelepon.trim(),
    student.alamat.trim(),
    Number(id),
  );
}

async function deleteMahasiswa(id) {
  const db = await SQLite.openDatabaseAsync("mahasiswa.db");

  await db.runAsync(`DELETE FROM mahasiswa WHERE id = ?`, Number(id));
}

const theme = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2563EB",
    secondary: "#0F766E",
    background: "#F5F7FB",
    surface: "#FFFFFF",
    surfaceVariant: "#F1F5F9",
    onSurface: "#172033",
    onSurfaceVariant: "#64748B",
    outline: "#D8E0EA",
    error: "#DC2626",
  },
};

function StatCard({ label, value, accent }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: accent }]}>
      <Text variant="labelMedium" style={styles.statLabel}>
        {label}
      </Text>
      <Text variant="headlineSmall" style={styles.statValue}>
        {value}
      </Text>
    </View>
  );
}

function StudentList({
  students,
  onSelect,
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  sortOption,
  onSortChange,
  onAdd,
  onResetFilters,
}) {
  const totalJurusan = new Set(students.map((student) => student.jurusan)).size;
  const filterOptions = [
    "Semua",
    ...new Set(students.map((student) => student.jurusan)),
  ];
  const sortOptions = ["Nama", "NIM", "Jurusan"];

  return (
    <View style={styles.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listScrollContent}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.logoWrap}>
              <Avatar.Image
                source={require("./assets/icon.png")}
                size={52}
                style={styles.appImage}
              />
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>Online</Text>
            </View>
          </View>

          <Text variant="labelLarge" style={styles.heroEyebrow}>
            Sistem Akademik
          </Text>
          <Text variant="headlineMedium" style={styles.heroTitle}>
            Data Mahasiswa
          </Text>
          <Text variant="bodyMedium" style={styles.heroSubtitle}>
            Lihat profil dan data mahasiswa dengan tampilan yang lebih rapi dan
            mudah dibaca.
          </Text>

          <View style={styles.searchContainer}>
            <TextInput
              mode="outlined"
              value={searchTerm}
              onChangeText={onSearchChange}
              placeholder="Cari nama atau NIM"
              placeholderTextColor="#94A3B8"
              left={<TextInput.Icon icon="magnify" size={18} color="#64748b" />}
              style={styles.searchInput}
              outlineStyle={styles.searchOutline}
              contentStyle={styles.searchContent}
            />
          </View>

          <View style={styles.filterRow}>
            {filterOptions.map((option) => {
              const isActive = activeFilter === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => onFilterChange(option)}
                  style={[
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isActive && styles.filterChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>Urutkan:</Text>
            {sortOptions.map((option) => {
              const isActive = sortOption === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => onSortChange(option)}
                  style={[styles.sortChip, isActive && styles.sortChipActive]}
                >
                  <Text
                    style={[
                      styles.sortChipText,
                      isActive && styles.sortChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {(searchTerm || activeFilter !== "Semua") && (
            <Pressable style={styles.resetButton} onPress={onResetFilters}>
              <Text style={styles.resetButtonText}>Reset filter</Text>
            </Pressable>
          )}

          <View style={styles.statusStrip}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Status</Text>
              <Text style={styles.statusValue}>Siap</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Update</Text>
              <Text style={styles.statusValue}>Realtime</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Mode</Text>
              <Text style={styles.statusValue}>Gen Z</Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <StatCard
              label="Total"
              value={String(students.length)}
              accent="#059669"
            />
            <StatCard
              label="Jurusan"
              value={String(totalJurusan)}
              accent="#2563EB"
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Daftar Mahasiswa
          </Text>
          <View style={styles.headerActionWrap}>
            <Text style={styles.sectionCount}>{students.length} data</Text>
            <Pressable style={styles.addButton} onPress={onAdd}>
              <Text style={styles.addButtonText}>+ Tambah</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.studentList}>
          {students.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Tidak ada mahasiswa yang cocok.
              </Text>
            </View>
          ) : (
            students.map((item) => (
              <Pressable
                key={item.id}
                style={styles.studentCard}
                onPress={() => onSelect(item)}
                accessibilityRole="button"
                accessibilityLabel={`Lihat detail ${item.nama}`}
              >
                <View style={styles.studentRow}>
                  <Avatar.Text
                    label={item.nama
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                    size={54}
                    color="#ffffff"
                    style={styles.studentAvatar}
                  />

                  <View style={styles.studentMeta}>
                    <Text variant="titleMedium" style={styles.studentName}>
                      {item.nama}
                    </Text>
                    <Text variant="bodyMedium" style={styles.studentNim}>
                      {item.nim}
                    </Text>
                    <View style={styles.tagRow}>
                      <Text style={styles.programTag}>{item.jurusan}</Text>
                    </View>
                  </View>

                  <Text style={styles.chevron}>›</Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel="Tambah mahasiswa baru"
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

function StudentForm({ form, onChange, onSave, onCancel, errorMessage }) {
  const fields = [
    { key: "nama", label: "Nama Lengkap", placeholder: "Masukkan nama" },
    { key: "nim", label: "NIM", placeholder: "Contoh: 2301005" },
    {
      key: "jurusan",
      label: "Jurusan",
      placeholder: "Contoh: Teknik Informatika",
    },
    { key: "angkatan", label: "Angkatan", placeholder: "Contoh: 2024" },
    { key: "email", label: "Email", placeholder: "nama@example.com" },
    { key: "noTelepon", label: "No. Telepon", placeholder: "0812..." },
    { key: "alamat", label: "Alamat", placeholder: "Masukkan alamat" },
  ];

  return (
    <View style={styles.content}>
      <View style={styles.detailHeader}>
        <Pressable
          style={styles.backButton}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Batalkan tambah mahasiswa"
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text variant="titleLarge" style={styles.detailHeaderTitle}>
          Tambah Mahasiswa
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formScroll}
      >
        <View style={styles.formCard}>
          {errorMessage ? (
            <Text style={styles.formError}>{errorMessage}</Text>
          ) : null}

          {fields.map((field) => (
            <View key={field.key} style={styles.formFieldWrap}>
              <Text style={styles.formLabel}>{field.label}</Text>
              <TextInput
                mode="outlined"
                value={form[field.key]}
                onChangeText={(value) => onChange(field.key, value)}
                placeholder={field.placeholder}
                placeholderTextColor="#94a3b8"
                style={styles.formInput}
                outlineStyle={styles.formOutline}
                contentStyle={styles.formContent}
              />
            </View>
          ))}

          <View style={styles.formActions}>
            <Button
              mode="outlined"
              onPress={onCancel}
              textColor="#334155"
              style={styles.cancelButton}
              labelStyle={styles.buttonLabel}
            >
              Batal
            </Button>
            <Button
              mode="contained"
              onPress={onSave}
              buttonColor="#2563EB"
              style={styles.saveButton}
              labelStyle={styles.buttonLabel}
            >
              Simpan
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function StudentDetail({ student, onBack, onEdit, onDelete }) {
  return (
    <View style={styles.content}>
      <View style={styles.detailHeader}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Kembali ke daftar mahasiswa"
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text variant="titleLarge" style={styles.detailHeaderTitle}>
          Detail
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailScroll}
      >
        <Card mode="contained" style={styles.detailCard}>
          <Card.Content>
            <View style={styles.profile}>
              <Avatar.Text
                label={student.nama
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
                size={78}
                color="#ffffff"
                style={styles.detailAvatar}
              />
              <View style={styles.profileText}>
                <Text variant="titleLarge" style={styles.profileName}>
                  {student.nama}
                </Text>
                <Text variant="bodyMedium" style={styles.profileNim}>
                  NIM {student.nim}
                </Text>
              </View>
            </View>

            <View style={styles.tagRowDetail}>
              <Text style={styles.programTag}>{student.jurusan}</Text>
              <Text style={styles.yearTag}>{student.angkatan}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.detailActionRow}>
          <Pressable
            style={[styles.actionButton, styles.editButton]}
            onPress={onEdit}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </Pressable>
        </View>

        <View style={styles.infoPanel}>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Informasi Mahasiswa
          </Text>
          <DetailRow label="Jurusan" value={student.jurusan} />
          <DetailRow label="Angkatan" value={student.angkatan} />
          <DetailRow label="Email" value={student.email} />
          <DetailRow label="No. Telepon" value={student.noTelepon} />
          <DetailRow label="Alamat" value={student.alamat} />
        </View>
      </ScrollView>
    </View>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text variant="labelLarge" style={styles.detailLabel}>
        {label}
      </Text>
      <Text variant="bodyLarge" style={styles.detailValue}>
        {value}
      </Text>
    </View>
  );
}

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [sortOption, setSortOption] = useState("Nama");
  const [isAddMode, setIsAddMode] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [formError, setFormError] = useState("");
  const [newStudent, setNewStudent] = useState({
    id: null,
    nama: "",
    nim: "",
    jurusan: "",
    angkatan: "",
    email: "",
    noTelepon: "",
    alamat: "",
  });

  const refreshStudents = useCallback(() => {
    setIsLoading(true);
    setErrorMessage("");

    loadMahasiswa()
      .then(setStudents)
      .catch(() => {
        setErrorMessage(
          "Data mahasiswa tidak dapat dimuat. Pastikan database dapat diakses, lalu coba lagi.",
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      !searchTerm ||
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "Semua" || student.jurusan === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOption === "NIM") {
      return a.nim.localeCompare(b.nim);
    }

    if (sortOption === "Jurusan") {
      return a.jurusan.localeCompare(b.jurusan) || a.nama.localeCompare(b.nama);
    }

    return a.nama.localeCompare(b.nama);
  });

  const handleFormChange = (field, value) => {
    setNewStudent((current) => ({ ...current, [field]: value }));
  };

  const handleSaveStudent = async () => {
    const payload = Object.fromEntries(
      Object.entries(newStudent).map(([key, value]) => [
        key,
        String(value).trim(),
      ]),
    );

    if (
      Object.entries(payload).some(([key, value]) => key !== "id" && !value)
    ) {
      setFormError("Semua data harus diisi dengan lengkap.");
      return;
    }

    try {
      if (formMode === "edit") {
        await updateMahasiswa(payload.id, payload);
      } else {
        await insertMahasiswa(payload);
      }

      setIsAddMode(false);
      setFormError("");
      setNewStudent({
        id: null,
        nama: "",
        nim: "",
        jurusan: "",
        angkatan: "",
        email: "",
        noTelepon: "",
        alamat: "",
      });
      setSearchTerm("");
      setActiveFilter("Semua");
      refreshStudents();
    } catch (e) {
      setFormError("NIM sudah terdaftar atau data tidak valid.");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteMahasiswa(studentId);
      setSelectedStudent(null);
      refreshStudents();
    } catch (error) {
      setErrorMessage("Data mahasiswa gagal dihapus.");
    }
  };

  useEffect(() => {
    refreshStudents();
  }, [refreshStudents]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        {selectedStudent ? (
          <StudentDetail
            student={selectedStudent}
            onBack={() => setSelectedStudent(null)}
            onEdit={() => {
              setFormMode("edit");
              setNewStudent({ ...selectedStudent });
              setIsAddMode(true);
              setSelectedStudent(null);
              setFormError("");
            }}
            onDelete={() => {
              Alert.alert(
                "Hapus mahasiswa",
                `Apakah kamu yakin ingin menghapus ${selectedStudent.nama}?`,
                [
                  { text: "Batal", style: "cancel" },
                  {
                    text: "Hapus",
                    style: "destructive",
                    onPress: () => handleDeleteStudent(selectedStudent.id),
                  },
                ],
              );
            }}
          />
        ) : isAddMode ? (
          <StudentForm
            form={newStudent}
            onChange={handleFormChange}
            onSave={handleSaveStudent}
            onCancel={() => {
              setIsAddMode(false);
              setFormError("");
            }}
            errorMessage={formError}
          />
        ) : isLoading ? (
          <View style={styles.feedbackContainer}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text variant="bodyLarge" style={styles.feedbackText}>
                Memuat data mahasiswa...
              </Text>
            </View>
          </View>
        ) : errorMessage ? (
          <View style={styles.feedbackContainer}>
            <View style={styles.errorCard}>
              <View style={styles.errorIconWrap}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <Text variant="bodyLarge" style={styles.feedbackText}>
                {errorMessage}
              </Text>
              <Button
                mode="contained"
                onPress={refreshStudents}
                buttonColor="#2563EB"
                labelStyle={styles.buttonLabel}
              >
                Coba Lagi
              </Button>
            </View>
          </View>
        ) : (
          <StudentList
            students={sortedStudents}
            onSelect={setSelectedStudent}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onResetFilters={() => {
              setSearchTerm("");
              setActiveFilter("Semua");
            }}
            onAdd={() => {
              setFormMode("add");
              setNewStudent({
                id: null,
                nama: "",
                nim: "",
                jurusan: "",
                angkatan: "",
                email: "",
                noTelepon: "",
                alamat: "",
              });
              setIsAddMode(true);
            }}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  listScrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  // Hero Section
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    elevation: 1,
  },
  heroTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  logoWrap: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 8,
  },
  appImage: {
    backgroundColor: "#2563EB",
  },
  liveBadge: {
    backgroundColor: "#ECFDF5",
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  liveText: {
    color: "#047857",
    fontSize: 11,
    fontWeight: "700",
  },
  heroEyebrow: {
    color: "#64748B",
    fontWeight: "700",
    letterSpacing: 0.7,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  heroTitle: {
    color: "#172033",
    fontWeight: "700",
    lineHeight: 34,
  },
  heroSubtitle: {
    color: "#64748B",
    lineHeight: 21,
    marginTop: 6,
  },

  // Search & Filter
  searchContainer: {
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  searchContent: {
    color: "#172033",
    fontSize: 14,
  },
  searchOutline: {
    borderColor: "#D8E0EA",
    borderRadius: 12,
    borderWidth: 1,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  filterChip: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E0EA",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  filterChipText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#1D4ED8",
  },
  sortRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  sortLabel: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 2,
  },
  sortChip: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  sortChipActive: {
    backgroundColor: "#F1F5F9",
    borderColor: "#94A3B8",
  },
  sortChipText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
  },
  sortChipTextActive: {
    color: "#172033",
  },
  resetButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: "#B91C1C",
    fontSize: 11,
    fontWeight: "700",
  },

  // Status & Statistics
  statusStrip: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  statusItem: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  statusLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "600",
  },
  statusValue: {
    color: "#172033",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 4,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  statLabel: {
    color: "#64748B",
    marginBottom: 4,
  },
  statValue: {
    color: "#172033",
    fontWeight: "700",
  },

  // Student List
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#172033",
    fontWeight: "700",
  },
  headerActionWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  sectionCount: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  fab: {
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 18,
    bottom: 26,
    height: 56,
    justifyContent: "center",
    position: "absolute",
    right: 22,
    width: 56,
    elevation: 4,
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "500",
    lineHeight: 30,
  },
  studentList: {
    gap: 10,
  },
  studentCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    elevation: 1,
  },
  studentRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  studentAvatar: {
    backgroundColor: "#2563EB",
  },
  studentMeta: {
    flex: 1,
    marginLeft: 12,
  },
  studentName: {
    color: "#172033",
    fontWeight: "700",
  },
  studentNim: {
    color: "#64748B",
    marginTop: 3,
  },
  tagRow: {
    marginTop: 8,
  },
  programTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
    color: "#1D4ED8",
    fontSize: 11,
    fontWeight: "600",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  chevron: {
    color: "#94A3B8",
    fontSize: 26,
    fontWeight: "400",
    marginLeft: 10,
  },

  // Detail Page
  detailHeader: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 18,
  },
  detailHeaderTitle: {
    color: "#172033",
    fontWeight: "700",
    marginLeft: 12,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 12,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  backArrow: {
    color: "#334155",
    fontSize: 28,
    lineHeight: 30,
    marginTop: -2,
  },
  detailScroll: {
    paddingBottom: 20,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    paddingBottom: 8,
    elevation: 1,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
  },
  detailAvatar: {
    backgroundColor: "#2563EB",
  },
  profileText: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    color: "#172033",
    fontWeight: "700",
  },
  profileNim: {
    color: "#64748B",
    marginTop: 4,
  },
  tagRowDetail: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },
  yearTag: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9",
    borderRadius: 6,
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  detailActionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    paddingVertical: 13,
  },
  editButton: {
    backgroundColor: "#2563EB",
  },
  deleteButton: {
    backgroundColor: "#DC2626",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  infoPanel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  infoTitle: {
    color: "#172033",
    fontWeight: "700",
    marginBottom: 8,
  },
  detailRow: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  detailLabel: {
    color: "#64748B",
    marginBottom: 4,
  },
  detailValue: {
    color: "#172033",
    fontWeight: "500",
  },

  // Feedback & Empty State
  feedbackContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  loadingCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 16,
    borderWidth: 1,
    padding: 28,
    width: "100%",
    elevation: 1,
  },
  feedbackText: {
    color: "#475569",
    marginTop: 14,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 14,
    borderWidth: 1,
    padding: 24,
  },
  emptyText: {
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
  },

  // Form
  formScroll: {
    paddingBottom: 20,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    elevation: 1,
  },
  formFieldWrap: {
    marginBottom: 14,
  },
  formLabel: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  formInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  formOutline: {
    borderColor: "#D8E0EA",
    borderRadius: 10,
    borderWidth: 1,
  },
  formContent: {
    color: "#172033",
    fontSize: 14,
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  cancelButton: {
    flex: 1,
    borderColor: "#CBD5E1",
    borderWidth: 1,
  },
  saveButton: {
    flex: 1,
  },
  formError: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    borderRadius: 10,
    borderWidth: 1,
    color: "#B91C1C",
    marginBottom: 16,
    padding: 10,
  },
  errorCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#FECACA",
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    width: "100%",
    elevation: 1,
  },
  errorIconWrap: {
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 999,
    height: 64,
    justifyContent: "center",
    marginBottom: 10,
    width: 64,
  },
  errorIconText: {
    color: "#B91C1C",
    fontSize: 28,
    fontWeight: "700",
  },
  buttonLabel: {
    fontWeight: "700",
  },
});
