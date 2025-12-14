import React, { useState } from 'react';
import '../styles/login.css';
import { loginUser } from '../services/api';

const Login = ({ setCurrentPage, setCurrentUser, redirectAfterLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profile: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";

    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';

    if (!formData.profile) newErrors.profile = 'Veuillez sélectionner un profil';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await loginUser({
        email: formData.email,
        mdp: formData.password
      });

      if (res.success) {
        const user = { email: formData.email, profile: formData.profile };
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setMessage('Connexion réussie !');
        redirectAfterLogin(formData.profile);
      } else {
        setMessage(res.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Connexion</h1>
          <p>Accédez à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profile">Profil</label>
            <select
              id="profile"
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              className={errors.profile ? 'error' : ''}
            >
              <option value="">Sélectionnez votre profil</option>
              <option value="admin">Admin</option>
              <option value="magasin">Magasin</option>
              <option value="labo">Laboratoire</option>
              <option value="base">Base Opérationnelle</option>
            </select>
            {errors.profile && <span className="error-message">{errors.profile}</span>}
          </div>

          {message && <div className="form-message">{message}</div>}

          <button type="submit" className="submit-btn">
            Se connecter
          </button>

          <div className="form-footer">
            <p>
              Pas encore de compte ?{' '}
              <span
                style={{ color: '#667eea', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setCurrentPage('register')}
              >
                S'inscrire
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
