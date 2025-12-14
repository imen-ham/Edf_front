import React, { useState } from 'react';
import '../styles/Register.css';

// ✅ Import de la fonction registerUser pour appeler l'API backend
import { registerUser } from '../services/api';

const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(''); // ✅ Message de succès ou d'erreur

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.profile) {
      newErrors.profile = 'Veuillez sélectionner un profil';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Bloc ajouté : handleSubmit qui se connecte au backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await registerUser({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          mdp: formData.password, // ❗ le backend attend 'mdp'
          profile: formData.profile
        });

        if (res.success) {
          setMessage('Inscription réussie !');
          console.log('Utilisateur inscrit :', res);

          // ✅ Redirection vers la page login après inscription
          setTimeout(() => {
            setCurrentPage('login');
          }, 1500);
        } else {
          setMessage(res.message);
        }
      } catch (error) {
        console.error(error);
        setMessage('Erreur serveur. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Inscription</h1>
          <p>Créez votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                className={errors.nom ? 'error' : ''}
              />
              {errors.nom && <span className="error-message">{errors.nom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                className={errors.prenom ? 'error' : ''}
              />
              {errors.prenom && <span className="error-message">{errors.prenom}</span>}
            </div>
          </div>

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

          <div className="form-row">
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
              <label htmlFor="confirmPassword">Confirmer</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
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
              <option value="magasin">Magasin</option>
              <option value="labo">Laboratoire</option>
              <option value="base">Base Opérationnelle</option>
            </select>
            {errors.profile && <span className="error-message">{errors.profile}</span>}
          </div>

          {/* ✅ Bloc ajouté : affichage du message succès ou erreur */}
          {message && <div className="form-message">{message}</div>}

          <button type="submit" className="submit-btn">
            S'inscrire
          </button>

          <div className="form-footer">
            <p>Vous avez déjà un compte ? <span style={{color: '#667eea', cursor: 'pointer', fontWeight: 600}} onClick={() => setCurrentPage('login')}>Se connecter</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
