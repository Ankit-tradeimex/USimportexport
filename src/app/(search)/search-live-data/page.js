'use client';

import { useMemo, useState } from 'react';

const shipmentData = [
  {
    id: 'IMP-2048',
    company: 'Northport Goods',
    product: 'Industrial Machinery',
    region: 'West Coast',
    destination: 'Los Angeles, CA',
    status: 'In Transit',
    eta: '2 days',
    volume: 420,
    updated: '2026-11-09T08:15:00',
  },
  {
    id: 'IMP-1893',
    company: 'Harborline Supply',
    product: 'Consumer Electronics',
    region: 'East Coast',
    destination: 'Newark, NJ',
    status: 'Customs Review',
    eta: '5 days',
    volume: 310,
    updated: '2026-11-08T13:45:00',
  },
  {
    id: 'IMP-2317',
    company: 'Blue Ridge Imports',
    product: 'Auto Components',
    region: 'South',
    destination: 'Houston, TX',
    status: 'Cleared',
    eta: '1 day',
    volume: 560,
    updated: '2026-11-10T09:20:00',
  },
  {
    id: 'IMP-1740',
    company: 'Summit Trade Co.',
    product: 'Home Furnishings',
    region: 'Midwest',
    destination: 'Chicago, IL',
    status: 'Delayed',
    eta: '7 days',
    volume: 250,
    updated: '2026-11-07T18:10:00',
  },
  {
    id: 'IMP-2402',
    company: 'Cascade Logistics',
    product: 'Medical Devices',
    region: 'West Coast',
    destination: 'Seattle, WA',
    status: 'In Transit',
    eta: '3 days',
    volume: 475,
    updated: '2026-11-10T10:05:00',
  },
  {
    id: 'IMP-1689',
    company: 'Atlantic Freight',
    product: 'Retail Goods',
    region: 'East Coast',
    destination: 'Savannah, GA',
    status: 'Cleared',
    eta: 'Same day',
    volume: 390,
    updated: '2026-11-11T07:40:00',
  },
];

const regionColors = {
  'West Coast': '#3b82f6',
  'East Coast': '#8b5cf6',
  South: '#10b981',
  Midwest: '#f59e0b',
};

const statusColors = {
  'In Transit': '#0ea5e9',
  'Customs Review': '#f59e0b',
  Cleared: '#22c55e',
  Delayed: '#ef4444',
};

export default function SearchLiveDataPage() {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const regions = ['All', ...new Set(shipmentData.map((item) => item.region))];

  const filteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...shipmentData]
      .filter((item) => {
        const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
        const haystack = [
          item.id,
          item.company,
          item.product,
          item.destination,
          item.status,
          item.region,
        ]
          .join(' ')
          .toLowerCase();

        const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
        return matchesRegion && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.updated) - new Date(a.updated);
        }
        if (sortBy === 'volume') {
          return b.volume - a.volume;
        }
        return a.company.localeCompare(b.company);
      });
  }, [query, selectedRegion, sortBy]);

  const totalVolume = filteredData.reduce((sum, item) => sum + item.volume, 0);
  const activeShipments = filteredData.filter((item) => item.status === 'In Transit').length;

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div>
            <p style={styles.kicker}>Live import search</p>
            <h1 style={styles.title}>Trade and shipment dashboard</h1>
          </div>
          <div style={styles.badgeWrap}>
            <span style={styles.badge}>Live</span>
          </div>
        </header>

        <section style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <span style={styles.label}>Visible shipments</span>
            <strong style={styles.value}>{filteredData.length}</strong>
          </div>
          <div style={styles.summaryCard}>
            <span style={styles.label}>Active in transit</span>
            <strong style={styles.value}>{activeShipments}</strong>
          </div>
          <div style={styles.summaryCard}>
            <span style={styles.label}>Total volume</span>
            <strong style={styles.value}>{totalVolume}k</strong>
          </div>
        </section>

        <section style={styles.controls}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              aria-label="Search shipments"
              placeholder="Search by ID, company, product, or destination"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Region</label>
            <select
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
              style={styles.select}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Sort</label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              style={styles.select}
            >
              <option value="latest">Latest updates</option>
              <option value="volume">Highest volume</option>
              <option value="company">Company name</option>
            </select>
          </div>
        </section>

        <section style={styles.tableSection}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>Shipment list</h2>
            <span style={styles.metaText}>{filteredData.length} records</span>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Shipment</th>
                  <th style={styles.th}>Origin / Destination</th>
                  <th style={styles.th}>Region</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>ETA</th>
                  <th style={styles.th}>Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.shipmentCell}>
                        <strong style={styles.shipmentId}>{item.id}</strong>
                        <span style={styles.shipmentName}>{item.company}</span>
                        <small style={styles.shipmentMeta}>{item.product}</small>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.destinationText}>{item.destination}</span>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.regionPill,
                          background: `${regionColors[item.region] || '#64748b'}20`,
                          color: regionColors[item.region] || '#64748b',
                        }}
                      >
                        {item.region}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusPill,
                          background: `${statusColors[item.status] || '#64748b'}22`,
                          color: statusColors[item.status] || '#64748b',
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td style={styles.td}>{item.eta}</td>
                    <td style={styles.td}>
                      <strong>{item.volume}k</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)',
    padding: '32px 20px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#0f172a',
  },
  shell: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 0',
  },
  kicker: {
    margin: '0 0 8px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#2563eb',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: 1.1,
  },
  badgeWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '999px',
    background: '#dcfce7',
    color: '#166534',
    fontSize: '12px',
    fontWeight: 700,
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  summaryCard: {
    background: '#ffffff',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '18px',
    padding: '18px 20px',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
    display: 'grid',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    color: '#475569',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: '2rem',
    lineHeight: 1,
    fontWeight: 700,
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, 2fr) minmax(140px, 1fr) minmax(150px, 1fr)',
    gap: '16px',
    alignItems: 'end',
    background: '#ffffff',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '18px',
    padding: '18px',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '12px 14px',
  },
  searchIcon: {
    color: '#64748b',
    fontSize: '18px',
    lineHeight: 1,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    color: '#0f172a',
  },
  filterGroup: {
    display: 'grid',
    gap: '8px',
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  select: {
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '12px 14px',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
  },
  tableSection: {
    background: '#ffffff',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '18px',
    padding: '18px',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  tableTitle: {
    margin: 0,
    fontSize: '1.25rem',
  },
  metaText: {
    color: '#64748b',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '760px',
  },
  th: {
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#475569',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '16px 14px',
    borderBottom: '1px solid #eef2f7',
    color: '#0f172a',
    verticalAlign: 'middle',
  },
  tr: {
    transition: 'background 0.2s ease',
  },
  shipmentCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  shipmentId: {
    fontSize: '0.82rem',
    color: '#2563eb',
    letterSpacing: '0.04em',
  },
  shipmentName: {
    fontWeight: 700,
  },
  shipmentMeta: {
    color: '#64748b',
  },
  destinationText: {
    fontWeight: 600,
  },
  regionPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
  },
  statusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
  },
};
