
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in and is an admin
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        try {
          // Check if the user is an admin
          const { data: agentData, error } = await supabase
            .from('agents')
            .select('type')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching agent data:', error);
            return;
          }

          if (agentData && (agentData.type === 'site_admin' || agentData.type === 'sub_admin')) {
            navigate('/admin');
          } else {
            // If not an admin, sign out
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error('Error in auth check:', error);
          await supabase.auth.signOut();
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (!data.session) {
        throw new Error("সেশন তৈরি করা যায়নি");
      }

      // Check if the user is an admin
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('type')
        .eq('id', data.session.user.id)
        .single();

      if (agentError) {
        await supabase.auth.signOut();
        throw agentError;
      }

      if (!agentData || (agentData.type !== 'site_admin' && agentData.type !== 'sub_admin')) {
        // Sign out if not an admin
        await supabase.auth.signOut();
        throw new Error("অননুমোদিত অ্যাকাউন্ট। শুধুমাত্র এডমিনরা লগইন করতে পারবেন।");
      }

      toast({
        title: "স্বাগতম!",
        description: "সফলভাবে লগইন হয়েছে",
      });

      navigate("/admin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "লগইন ব্যর্থ হয়েছে",
        description: error.message,
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            এডমিন লগইন
          </CardTitle>
          <CardDescription>
            আপনার ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করুন
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="ইমেইল"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="পাসওয়ার্ড"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                "লগইন হচ্ছে..."
              ) : (
                <>
                  লগইন করুন
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
