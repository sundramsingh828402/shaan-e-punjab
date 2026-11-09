import React, { useState, useEffect } from 'react';
import { ShaanLogo } from '../../components/common/ShaanLogo';
import { adminApi, adminAuth } from '../../services/adminApi';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Forgot Password Modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    if (adminAuth.isAuthenticated()) {
      adminApi.checkAuth().then(user => {
        if (user) {
          onLoginSuccess();
        }
      });
    }
  }, [onLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setErrorMessage('Please enter both your admin email/username and password.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await adminApi.login(identifier.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      const msg = err.message || 'Login failed. Please check credentials.';
      setErrorMessage(msg);
      if (msg.toLowerCase().includes('locked')) {
        setIsLocked(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotLoading(true);
    setForgotSuccess(null);
    try {
      const res = await adminApi.forgotPassword(forgotEmail.trim());
      setForgotSuccess(res.message);
      if (res.recoveryCode) {
        setRecoveryCode(res.recoveryCode);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to process recovery request.');
    } finally {
      setForgotLoading(false);
    }
  };

  const fillDefaultDemoCreds = () => {
    setIdentifier('admin@shaanepunjab.com');
    setPassword('Shaan@Admin2026!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F0E7] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#C6A052] selection:text-[#090909]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#C6A052]/10 via-[#C6A052]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#C6A052]/5 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 px-6 py-6 border-b border-[#30271D]/40 flex items-center justify-between max-w-7xl mx-auto w-full">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F5F0E7]/70 hover:text-[#C6A052] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#C6A052]" />
          <span>Return to Hotel Website</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#30271D] text-[11px] text-[#C6A052]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-semibold tracking-wider uppercase">Official Admin Gateway</span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Brand Presentation */}
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <ShaanLogo size="lg" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mt-2">
              Management Portal
            </h1>
            <p className="text-xs text-[#F5F0E7]/60 mt-1 max-w-xs mx-auto">
              Shaan-E-Punjab Hotel & Resort — NH-19 Topchanchi, Dhanbad
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#121212] border border-[#C6A052]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/90 backdrop-blur-md relative">
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C6A052] to-transparent rounded-t-2xl" />

            {/* Error / Lockout Alert */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username/Email Input */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#E1C783] mb-1.5">
                  Admin Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F5F0E7]/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={loading || isLocked}
                    placeholder="admin@shaanepunjab.com"
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#090909] border border-[#30271D] focus:border-[#C6A052] focus:ring-1 focus:ring-[#C6A052] rounded-xl text-sm text-white placeholder-white/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#E1C783]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-[11px] text-[#C6A052] hover:text-[#E1C783] transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F5F0E7]/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || isLocked}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-2.5 bg-[#090909] border border-[#30271D] focus:border-[#C6A052] focus:ring-1 focus:ring-[#C6A052] rounded-xl text-sm text-white placeholder-white/20 transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#F5F0E7]/40 hover:text-white transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || isLocked}
                className={`w-full mt-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  loading || isLocked
                    ? 'bg-[#30271D] text-white/40 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#C6A052] via-[#E1C783] to-[#C6A052] text-[#090909] hover:brightness-110 shadow-black/50 active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#090909] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authenticate & Access Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Helper Credentials Tooltip for authorized testing */}
            <div className="mt-6 pt-5 border-t border-[#30271D]/60">
              <div className="p-3 rounded-xl bg-black/40 border border-[#C6A052]/20 flex items-start justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C6A052] font-bold block mb-0.5 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Initial System Admin Account
                  </span>
                  <div className="text-[11px] text-[#F5F0E7]/80 font-mono">
                    User: <strong className="text-white">admin@shaanepunjab.com</strong>
                  </div>
                  <div className="text-[11px] text-[#F5F0E7]/80 font-mono">
                    Pass: <strong className="text-white">Shaan@Admin2026!</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillDefaultDemoCreds}
                  className="px-2.5 py-1.5 rounded bg-[#1f1a14] hover:bg-[#C6A052] hover:text-[#090909] text-[#E1C783] text-[10px] font-semibold transition-all border border-[#C6A052]/40 shrink-0 cursor-pointer"
                  title="Auto-fill initial administrator credentials"
                >
                  Auto-fill
                </button>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center text-[11px] text-[#F5F0E7]/40 leading-relaxed max-w-sm mx-auto">
            Protected by scrypt salted cryptographic key derivation, session token invalidation, and automated brute-force rate limiting.
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsForgotModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#141414] border border-[#C6A052]/50 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#30271D]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#C6A052]" />
                <h3 className="font-serif text-base font-bold text-white">
                  Admin Password Recovery
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="text-white/50 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>{forgotSuccess}</div>
                </div>
                {recoveryCode && (
                  <div className="p-3 rounded-lg bg-black/60 border border-[#C6A052]/40 text-center">
                    <span className="text-[10px] uppercase text-[#C6A052] block font-semibold">
                      Your One-Time Recovery Token:
                    </span>
                    <span className="font-mono text-sm font-bold text-white mt-1 block">
                      {recoveryCode}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    fillDefaultDemoCreds();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#C6A052] text-[#090909] font-bold text-xs uppercase tracking-wider hover:bg-[#E1C783] transition-colors"
                >
                  Return to Login with Defaults
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
                  Enter your registered administrator email address. A recovery token will be verified against the secure database.
                </p>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#E1C783] font-semibold mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@shaanepunjab.com"
                    className="w-full px-3.5 py-2.5 bg-[#090909] border border-[#30271D] rounded-xl text-xs text-white outline-none focus:border-[#C6A052]"
                    required
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="px-5 py-2 rounded-xl bg-[#C6A052] hover:bg-[#E1C783] text-[#090909] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    {forgotLoading ? 'Processing...' : 'Verify Recovery'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-[11px] text-[#F5F0E7]/40 border-t border-[#30271D]/30">
        © {new Date().getFullYear()} Shaan-E-Punjab Hotel & Resort Management System. All access attempts are monitored and recorded.
      </footer>
    </div>
  );
};
