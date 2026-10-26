import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import {
  Card,
  Avatar,
  Text as PaperText,
  Button,
  Divider,
  Chip,
  Surface,
} from 'react-native-paper';

export default function DashboardScreen({
  user,
  onGoBack,
  onLogout,
  onViewDetail,
  onPopToTop,
}) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Top Header Card */}
      <Card style={styles.cardDashboardHeader} elevation={4}>
        <Card.Content>
          <View style={styles.dashboardNavBar}>
            <Button
              mode="contained-tonal"
              icon="arrow-left"
              onPress={onGoBack}
              compact
              style={styles.btnBackDashboard}
            >
              Kembali
            </Button>
            <Button
              mode="contained"
              icon="logout"
              buttonColor="#dc2626"
              onPress={onLogout}
              compact
            >
              Logout
            </Button>
          </View>

          {/* Profile Row */}
          <View style={styles.dashboardProfileRow}>
            <Avatar.Text
              size={64}
              label={user?.nama ? user.nama.charAt(0).toUpperCase() : 'U'}
              style={styles.dashboardAvatar}
              color="#1e3a8a"
            />
            <View style={styles.profileInfoCol}>
              <PaperText style={styles.profileName}>{user?.nama}</PaperText>
              <View style={styles.badgeRow}>
                <Chip icon="shield-account" compact style={styles.chipRole}>
                  {user?.role}
                </Chip>
                <PaperText style={styles.profileUsername}>@{user?.username}</PaperText>
              </View>
              <PaperText style={styles.profileProdi}>{user?.prodi}</PaperText>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Stats Grid */}
      <View style={styles.statsRow}>
        <Surface style={styles.statCard} elevation={2}>
          <PaperText style={styles.statNumber}>{user?.semester || '-'}</PaperText>
          <PaperText style={styles.statLabel}>Semester</PaperText>
        </Surface>
        <Surface style={styles.statCard} elevation={2}>
          <PaperText style={styles.statNumber}>{user?.ipk || '-'}</PaperText>
          <PaperText style={styles.statLabel}>IPK Kumulatif</PaperText>
        </Surface>
        <Surface style={styles.statCard} elevation={2}>
          <PaperText style={[styles.statNumber, { color: '#16a34a' }]}>Aktif</PaperText>
          <PaperText style={styles.statLabel}>Status</PaperText>
        </Surface>
      </View>

      {/* Menu Layanan Mahasiswa */}
      <Card style={styles.cardMenu} elevation={2}>
        <Card.Content>
          <PaperText style={styles.sectionHeading}>📌 Menu Layanan Mahasiswa</PaperText>

          <View style={styles.menuItemRow}>
            <Avatar.Icon size={40} icon="book-open-page-variant" style={styles.menuIconBg} />
            <View style={styles.menuTextCol}>
              <PaperText style={styles.menuTitleText}>Kartu Rencana Studi (KRS)</PaperText>
              <PaperText style={styles.menuSubText}>Pengambilan mata kuliah semester genap</PaperText>
            </View>
            <Button mode="text" onPress={() => Alert.alert('KRS', 'Membuka menu KRS')}>
              Buka
            </Button>
          </View>

          <Divider style={styles.dividerSpacing} />

          <View style={styles.menuItemRow}>
            <Avatar.Icon size={40} icon="chart-bar" style={styles.menuIconBg} />
            <View style={styles.menuTextCol}>
              <PaperText style={styles.menuTitleText}>Kartu Hasil Studi (KHS)</PaperText>
              <PaperText style={styles.menuSubText}>Transkrip nilai & capaian akademik</PaperText>
            </View>
            <Button mode="text" onPress={() => Alert.alert('KHS', 'Membuka menu KHS')}>
              Buka
            </Button>
          </View>

          <Divider style={styles.dividerSpacing} />

          <View style={styles.menuItemRow}>
            <Avatar.Icon size={40} icon="calendar-clock" style={styles.menuIconBg} />
            <View style={styles.menuTextCol}>
              <PaperText style={styles.menuTitleText}>Jadwal Perkuliahan</PaperText>
              <PaperText style={styles.menuSubText}>Ruangan, jam kuliah, dan dosen pengampu</PaperText>
            </View>
            <Button mode="text" onPress={() => Alert.alert('Jadwal', 'Membuka Jadwal Kuliah')}>
              Buka
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Card Navigasi Lanjut (Detail Profil) */}
      <Card style={styles.cardStackTest} elevation={2}>
        <Card.Content>
          <PaperText style={styles.stackTestHeader}>👤 Profil Lengkap Pengguna</PaperText>
          <PaperText style={styles.stackTestDesc}>
            Buka tampilan rincian profil menggunakan fungsi PUSH atau keluar menggunakan POP.
          </PaperText>

          <Button
            mode="contained"
            icon="account-details"
            onPress={() => onViewDetail(user)}
            style={styles.btnPushDetail}
          >
            LIHAT DETAIL PROFIL (PUSH)
          </Button>

          <View style={styles.dualActionRow}>
            <Button
              mode="outlined"
              icon="arrow-left"
              onPress={onGoBack}
              style={styles.btnHalf}
            >
              Kembali (POP)
            </Button>
            <Button
              mode="outlined"
              icon="home"
              textColor="#b91c1c"
              onPress={onPopToTop}
              style={styles.btnHalfDanger}
            >
              Ke Login
            </Button>
          </View>
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
  cardDashboardHeader: {
    backgroundColor: '#1e3a8a',
    borderRadius: 16,
    marginBottom: 14,
  },
  dashboardNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  btnBackDashboard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dashboardProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardAvatar: {
    backgroundColor: '#ffffff',
    marginRight: 14,
  },
  profileInfoCol: {
    flex: 1,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  chipRole: {
    backgroundColor: '#dbeafe',
  },
  profileUsername: {
    color: '#bfdbfe',
    fontSize: 12,
  },
  profileProdi: {
    color: '#93c5fd',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  cardMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  menuIconBg: {
    backgroundColor: '#eff6ff',
    marginRight: 10,
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  menuSubText: {
    fontSize: 11,
    color: '#64748b',
  },
  dividerSpacing: {
    marginVertical: 8,
  },
  cardStackTest: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: '#2563eb',
    marginBottom: 14,
  },
  stackTestHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  stackTestDesc: {
    fontSize: 12,
    color: '#475569',
    marginVertical: 8,
    lineHeight: 18,
  },
  btnPushDetail: {
    backgroundColor: '#0284c7',
    borderRadius: 10,
    marginBottom: 10,
  },
  dualActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  btnHalf: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#cbd5e1',
  },
  btnHalfDanger: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#fca5a5',
  },
});