import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

class SocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Map();
    this.metricsInterval = null;
  }

  initialize(userId, authToken) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io('wss://your-server-url.com', {
      transports: ['websocket'],
      auth: {
        userId,
        token: authToken
      },
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000
    });

    this.setupEventHandlers();
    this.setupHeartbeat();
    this.setupEncryption();
    this.startMetricsPolling();
  }

  setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.reconnectAttempts = 0;
      this.broadcastEvent('connectionStatus', { status: 'connected' });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      this.broadcastEvent('connectionStatus', { status: 'disconnected', reason });
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      this.broadcastEvent('error', { error });
    });

    this.socket.on('serverMetrics', (data) => {
      this.broadcastEvent('serverMetrics', this.decryptData(data));
    });

    this.socket.on('dashboardUpdate', (data) => {
      this.broadcastEvent('dashboardUpdate', this.decryptData(data));
    });

    this.socket.on('securityAlert', (data) => {
      this.broadcastEvent('securityAlert', this.decryptData(data));
    });

    this.socket.on('userActivity', (data) => {
      this.broadcastEvent('userActivity', this.decryptData(data));
    });
  }

  startMetricsPolling() {
    // Clear any existing interval
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }

    // Start polling server metrics every 5 seconds
    this.metricsInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit('getServerMetrics');
      }
    }, 5000);
  }

  setupHeartbeat() {
    const heartbeatInterval = setInterval(() => {
      if (this.socket.connected) {
        this.socket.emit('heartbeat', { timestamp: Date.now() });
      }
    }, 30000);

    this.socket.on('disconnect', () => {
      clearInterval(heartbeatInterval);
    });
  }

  setupEncryption() {
    const encryptionKey = Cookies.get('session_key');
    if (!encryptionKey) {
      const newKey = CryptoJS.lib.WordArray.random(256/8).toString();
      Cookies.set('session_key', newKey, { secure: true, sameSite: 'strict' });
    }
  }

  encryptData(data) {
    const key = Cookies.get('session_key');
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  decryptData(encryptedData) {
    const key = Cookies.get('session_key');
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
      }
    };
  }

  broadcastEvent(event, data) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  emitDashboardAction(action, data) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    
    const encryptedData = this.encryptData({
      action,
      data,
      timestamp: Date.now()
    });

    this.socket.emit('dashboardAction', encryptedData);
  }

  disconnect() {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
    Cookies.remove('session_key');
  }
}

export const socketService = new SocketService();