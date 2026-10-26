import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Card,
  Avatar,
  Text as PaperText,
  Button,
  Divider,
} from 'react-native-paper';

export default function ProfileDetailScreen({ user, onGoBack, onPopToTop }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Button
        mode="text"
        icon="arrow-left"
        onPress={onGoBack}
        style={styles.btnBackTop}
        textColor="#1e3a8a"
      >
        Kembali ke Dashboard (POP)
      </Button>

      <Card style={styles.cardAuth} elevation={3}>
        <Card.Content>
          <View style={styles.authHeaderCenter}>
            <Avatar.Icon size={56} icon="card-account-details" style={styles.authAvatar} color="#ffffff" />
            <PaperText style={styles.authTitle}>Detail Lengkap Mahasiswa</PaperText>
            <PaperText style={styles.authSubtitle}>
              Informasi identitas dan data akademik akun
            </PaperText>
          </View>

          <View style={styles.detailItemRow}>
            <PaperText style={styles.detailLabel}>Nama Lengkap:</PaperText>
            <PaperText style={styles.detailValue}>{user?.nama}</PaperText>
          </View>
          <Divider />

          <View style={styles.detailItemRow}>
            <PaperText style={styles.detailLabel}>Username:</PaperText>
            <PaperText style={styles.detailValue}>@{user?.username}</PaperText>
          </View>
          <Divider />

          <View style={styles.detailItemRow}>
            <PaperText style={styles.detailLabel}>Program Studi:</PaperText>
            <PaperText style={styles.detailValue}>{user?.prodi}</PaperText>
          </View>
          <Divider />

          <View style={styles.detailItemRow}>
            <PaperText style={styles.detailLabel}>Semester:</PaperText>
            <PaperText style={styles.detailValue}>{user?.semester}</PaperText>
          </View>
          <Divider />

          <View style={styles.detailItemRow}>
            <PaperText style={styles.detailLabel}>IPK Kumulatif:</PaperText>
            <PaperText style={styles.detailValue}>{user?.ipk}</PaperText>
          </View>
          <Divider />

          <View style={styles.detailItemRow}>
            <PaperText style={styles.detailLabel}>Role Akses:</PaperText>
            <PaperText style={styles.detailValue}>{user?.role}</PaperText>
          </View>
          <Divider />

          <View style={{ marginTop: 24, gap: 10 }}>
            <Button
              mode="contained"
              icon="arrow-left"
              onPress={onGoBack}
              style={styles.btnPrimary}
            >
              KEMBALI KE DASHBOARD (POP)
            </Button>

            <Button
              mode="outlined"
              icon="home"
              textColor="#b91c1c"
              onPress={onPopToTop}
              style={styles.btnSecondaryDanger}
            >
              KEMBALI KE LOGIN (POP TO TOP)
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
  btnPrimary: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    marginTop: 8,
  },
  btnSecondaryDanger: {
    borderRadius: 10,
    borderColor: '#fca5a5',
  },
  btnBackTop: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  detailItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 13,
    color: '#0f172a',
    fontWeight: 'bold',
  },
});