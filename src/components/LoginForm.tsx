import { useState, FormEvent } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    // Simulate login success
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Username"
        id="username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[44px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex items-center space-x-2 ml-1">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
        />
        <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
          Remember me
        </label>
      </div>

      <Button type="submit">
        <span>Log In</span>
        <ArrowRight size={20} />
      </Button>
    </form>
  );
}
