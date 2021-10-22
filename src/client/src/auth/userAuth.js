import { useContext } from 'react';
import { AuthContext } from './AuthProvider.js';

export default function useAuth() {
	return useContext(AuthContext);
}