import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sensor-bg">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-sensor-accent/10 p-4 rounded-full">
                <Activity className="w-12 h-12 text-sensor-accent" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Sensor Monitoring System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring and logging for environmental sensors, power status, and location tracking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader className="text-center">
                <div className="bg-sensor-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-sensor-accent" />
                </div>
                <CardTitle className="text-lg">Live Data</CardTitle>
                <CardDescription>
                  Real-time sensor readings with automatic updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader className="text-center">
                <div className="bg-sensor-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-6 h-6 text-sensor-accent" />
                </div>
                <CardTitle className="text-lg">Multi-Sensor</CardTitle>
                <CardDescription>
                  Temperature, humidity, voltage, PIR, and GPS monitoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader className="text-center">
                <div className="bg-sensor-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-sensor-accent" />
                </div>
                <CardTitle className="text-lg">Secure Access</CardTitle>
                <CardDescription>
                  Protected dashboard with user authentication
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-4 pt-8">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="h-12 px-8 font-medium text-base transition-smooth hover:shadow-minimal"
            >
              Access Dashboard
            </Button>
            <p className="text-sm text-muted-foreground">
              Sign in to view live sensor data and monitoring logs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
