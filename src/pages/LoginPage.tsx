import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogIn, Bot, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center"
          >
            <div className="bg-accent p-4 rounded-2xl shadow-glow">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome <span className="bg-glow-gradient bg-clip-text text-transparent">Back</span>
          </h1>
          <p className="text-text-secondary">
            Sign in to access the admin dashboard
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-8 flex flex-col items-center"
        >
          <button onClick={login} className="btn-primary w-full">
            <span className="flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Sign in with Keycloak
            </span>
          </button>
        </motion.div>

        <div className="text-center">
          <button
            onClick={() => navigate('/search')}
            className="text-text-secondary hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
          >
            <Search className="w-4 h-4" />
            Continue to search without login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
