import { Transaction, User } from '@/types';
import { formatCurrency, getFullName } from '@/utils';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03B961',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999999',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
  },
  recipientSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  recipientTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipientName: {
    fontSize: 12,
    color: '#666666',
  },
});

export const TransactionPDF = ({ transaction, recipient }: { transaction: Transaction, recipient: User }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction Receipt</Text>
        <Text style={styles.subtitle}>WayniWallet</Text>
        <Text style={styles.amount}>{formatCurrency(transaction.amount)}</Text>
      </View>

      {recipient && (
        <View style={styles.recipientSection}>
          <Text style={styles.recipientTitle}>Sent to:</Text>
          <Text style={styles.recipientName}>{getFullName(recipient)}</Text>
          <Text style={styles.recipientName}>{recipient.email}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Transaction Details</Text>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amount</Text>
        <Text style={styles.detailValue}>{formatCurrency(transaction.amount)}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date</Text>
        <Text style={styles.detailValue}>{dayjs(transaction.date).format('MMMM D, YYYY')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Time</Text>
        <Text style={styles.detailValue}>{dayjs(transaction.date).format('h:mm A')}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Reference Number</Text>
        <Text style={styles.detailValue}>{transaction.reference}</Text>
      </View>

      {transaction.notes && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Notes</Text>
          <Text style={styles.detailValue}>{transaction.notes}</Text>
        </View>
      )}

      <Text style={styles.footer}>
        Generated on {dayjs().format('MMMM D, YYYY [at] h:mm A')}
      </Text>
    </Page>
  </Document>
);