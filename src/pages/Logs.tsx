import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Wifi, MapPin, Power, Eye, Thermometer, Droplets, Zap } from "lucide-react";

interface SensorLog {
  id: string;
  voltage1: number;
  voltage2: number;
  ldrValue: number;
  pirDetection: boolean;
  temperature: number;
  humidity: number;
  mainPower: boolean;
  backupPower: boolean;
  gpsStatus: 'VALID' | 'INVALID';
  latitude?: number;
  longitude?: number;
  wifiRssi: number;
  dataMode: 'DUMMY' | 'REAL';
  timestamp: string;
}

const Logs = () => {
  const [logs, setLogs] = useState<SensorLog[]>([]);
  const navigate = useNavigate();

  // Simulate real-time log updates
  useEffect(() => {
    const generateMockLog = (): SensorLog => ({
      id: Math.random().toString(36).substr(2, 9),
      voltage1: Math.round((Math.random() * 5 + 10) * 100) / 100,
      voltage2: Math.round((Math.random() * 5 + 10) * 100) / 100,
      ldrValue: Math.floor(Math.random() * 1000),
      pirDetection: Math.random() > 0.7,
      temperature: Math.round((Math.random() * 15 + 20) * 10) / 10,
      humidity: Math.round((Math.random() * 40 + 40) * 10) / 10,
      mainPower: Math.random() > 0.1,
      backupPower: Math.random() > 0.8,
      gpsStatus: Math.random() > 0.2 ? 'VALID' : 'INVALID',
      latitude: Math.random() > 0.2 ? Math.round(Math.random() * 180 - 90 * 1000000) / 1000000 : undefined,
      longitude: Math.random() > 0.2 ? Math.round(Math.random() * 360 - 180 * 1000000) / 1000000 : undefined,
      wifiRssi: Math.floor(Math.random() * 50 + 30) * -1,
      dataMode: Math.random() > 0.3 ? 'REAL' : 'DUMMY',
      timestamp: new Date().toLocaleString(),
    });

    // Add initial logs
    const initialLogs = Array.from({ length: 5 }, generateMockLog);
    setLogs(initialLogs);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newLog = generateMockLog();
      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 19)]); // Keep only latest 20 logs
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-sensor-bg">
      <header className="bg-sensor-card border-b border-sensor-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold">Live Sensor Logs</h1>
              <p className="text-sm text-muted-foreground">Real-time monitoring dashboard</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-smooth"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Waiting for sensor data...</div>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="bg-sensor-card border border-sensor-border rounded-lg p-6 shadow-minimal hover:shadow-card transition-smooth"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <Badge
                      variant={log.dataMode === 'REAL' ? 'default' : 'secondary'}
                      className="font-medium"
                    >
                      {log.dataMode}
                    </Badge>
                    <Badge
                      variant={log.gpsStatus === 'VALID' ? 'default' : 'destructive'}
                      className="font-medium"
                    >
                      GPS {log.gpsStatus}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {log.timestamp}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Voltage Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Voltage
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Voltage 1:</span>
                        <span className="font-mono font-medium">{log.voltage1} V</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Voltage 2:</span>
                        <span className="font-mono font-medium">{log.voltage2} V</span>
                      </div>
                    </div>
                  </div>

                  {/* Sensors Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      Sensors
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">LDR Value:</span>
                        <span className="font-mono font-medium">{log.ldrValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">PIR Detection:</span>
                        <Badge variant={log.pirDetection ? 'default' : 'secondary'} className="text-xs">
                          {log.pirDetection ? 'DETECTED' : 'NOT DETECTED'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Environment Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" />
                      Environment
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Temperature:</span>
                        <span className="font-mono font-medium">{log.temperature} °C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Humidity:</span>
                        <span className="font-mono font-medium">{log.humidity} %</span>
                      </div>
                    </div>
                  </div>

                  {/* Power Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Power className="w-4 h-4 mr-1" />
                      Power Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Main Power:</span>
                        <Badge variant={log.mainPower ? 'default' : 'destructive'} className="text-xs">
                          {log.mainPower ? 'ON' : 'OFF'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Backup Power:</span>
                        <Badge variant={log.backupPower ? 'default' : 'secondary'} className="text-xs">
                          {log.backupPower ? 'ON' : 'OFF'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Location & Network */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </h3>
                    <div className="space-y-2">
                      {log.gpsStatus === 'VALID' && log.latitude && log.longitude ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm">Latitude:</span>
                            <span className="font-mono font-medium text-xs">{log.latitude}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Longitude:</span>
                            <span className="font-mono font-medium text-xs">{log.longitude}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-xs text-muted-foreground">GPS coordinates unavailable</div>
                      )}
                    </div>
                  </div>

                  {/* Network Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Wifi className="w-4 h-4 mr-1" />
                      Network
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">WiFi RSSI:</span>
                        <span className="font-mono font-medium">{log.wifiRssi} dBm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Logs;