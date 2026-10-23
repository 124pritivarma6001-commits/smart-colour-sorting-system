/**
 * Sorting Service
 * Unified service providing live Supabase-backed data with clean initial state and real-time synchronization.
 */
import { HARDWARE_SPECS } from '../data/mockData';
import { isSupabaseConfigured } from './supabaseClient';
import { SupabaseService } from './supabaseService';

export class SortingService {
  /**
   * Retrieves default initial system state matching App.jsx expectations
   */
  static getSystemState() {
    return {
      isHardwareConnected: false,
      connectionStatus: 'OFFLINE (Awaiting Connection)',
      lastUpdateTime: 'Connecting to Supabase...',
      firmwareVersion: 'v1.2.0-esp32-tcs3200',
      wifiSsid: 'IoT-Lab-WiFi',
      supabaseConfigured: isSupabaseConfigured(),
      loading: isSupabaseConfigured(),
      error: null,
      isEmpty: true,
      source: isSupabaseConfigured() ? 'SUPABASE' : 'DEMO',

      stats: {
        totalSorted: 0,
        redCount: 0,
        greenCount: 0,
        blueCount: 0,
        efficiencyRate: 100,
        avgSortingTimeSec: 0
      },

      latestDetection: {
        color: 'Awaiting Object',
        hex: '#94a3b8',
        servoAngle: 90,
        timestamp: 'Standby',
        confidence: 0,
        rawFrequencies: { red: 0, green: 0, blue: 0 },
        filterMode: 'Optical Standby',
        binAssigned: 'Awaiting Object'
      },

      sortingHistory: []
    };
  }

  /**
   * Alias for getSystemState
   */
  static getInitialState() {
    return this.getSystemState();
  }

  /**
   * Retrieves hardware specifications and pinout
   */
  static getHardwareSpecs() {
    return HARDWARE_SPECS;
  }

  /**
   * Subscribes to real data updates from Supabase
   */
  static subscribe(callback) {
    // Deliver initial state immediately to avoid any blank screen
    const initialState = this.getSystemState();
    callback(initialState);

    if (!isSupabaseConfigured()) {
      return () => {};
    }

    const updateFromSupabase = async () => {
      const result = await SupabaseService.fetchDashboardData();
      const devStatus = result.deviceStatus;
      const history = result.sortingHistory || [];

      callback({
        ...initialState,
        supabaseConfigured: true,
        loading: false,
        error: result.error || null,
        isEmpty: history.length === 0,
        source: 'SUPABASE',
        isHardwareConnected: devStatus ? devStatus.isHardwareConnected : false,
        connectionStatus: devStatus ? devStatus.connectionStatus : 'OFFLINE (Awaiting Connection)',
        lastUpdateTime: devStatus?.lastUpdateTime || (history[0]?.timestamp ? `Last event: ${history[0].timestamp}` : 'Awaiting ESP32 Ping'),
        firmwareVersion: devStatus?.firmwareVersion || initialState.firmwareVersion,
        wifiSsid: devStatus?.wifiSsid || initialState.wifiSsid,
        stats: result.stats || initialState.stats,
        latestDetection: result.latestDetection || initialState.latestDetection,
        sortingHistory: history
      });
    };

    // Initial fetch from Supabase tables
    updateFromSupabase();

    // Subscribe to real-time Postgres changes on sorting_history and device_status
    const unsubscribeRealtime = SupabaseService.subscribeToRealtime(() => {
      updateFromSupabase();
    });

    return () => {
      unsubscribeRealtime();
    };
  }
}
