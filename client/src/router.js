import { createRouter, createWebHistory } from 'vue-router';
import LoginSignup from './components/LoginSignup.vue';
import HomePage from './components/HomePage.vue';
import AdminPage from './components/AdminPage.vue';
import UpdateUser from './components/UpdateUser.vue';
import CreateUser from './components/CreateUser.vue';
import UserProfile from './components/UserProfile.vue';
import GameBoard from './components/GameBoard.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import ResetPassword from './components/ResetPassword.vue';
import PaymentSuccess from './components/PaymentSuccess.vue';
import PaymentError from './components/PaymentError';
import { useToast } from 'vue-toastification';
import jwtDecode from 'jwt-decode';

const routes = [
    {
      path: '/',
      name: 'LoginSignup',
      component: LoginSignup,
    },
    {   
        path : "/home",
        name : 'HomePage',
        component : HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminPage,
        meta: { requiresAuth: true, requiresAdmin: true}
    },
    { 
        path: '/update-user/:id',
        component: UpdateUser,
        meta: { requiresAuth: true }
    },
    {
        path: '/createUser',
        name: 'CreateUser',
        component: CreateUser,
        meta: { requiresAuth: true }
    },
    {
        path : '/profile',
        name : 'UserProfile',
        component : UserProfile,
        meta: { requiresAuth: true }
    },
    { 
        path: '/forgot-password', 
        component: ForgotPassword 
    },
    {
        
        path: '/resetPassword/:token',
        component: ResetPassword 
        
    },
    {
        path: '/game/:id',
        component: GameBoard,
        meta: { requiresAuth: true }
    },
    {
        
        path: '/paiement-success',
        component: PaymentSuccess,
        meta: { requiresAuth: true }
    },
    
    {
        
        path: '/paiement-fail',
        component: PaymentError,
        meta: { requiresAuth: true }
    },
        
  ];

  const router = createRouter({
    history: createWebHistory(''),
    routes,
  });

  
  router.beforeEach((to, from, next) => {
    // Instance de Toastification
    const toast = useToast();

    // Vérifie si la route nécessite une authentification
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('token');
        // Vérifie si l'utilisateur est authentifié
        if (!token) {
            // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
            // et affiche une notification 
            toast.error('Vous devez être connecté pour accéder à cette page.');
            next({ name: 'LoginSignup' });
        } else {
            // Vérifie si la route nécessite un rôle administrateur
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                try {
                    const decodedToken = jwtDecode(token);
                    // Si l'utilisateur n'est pas un admin, redirige vers la page d'accueil
                    if (decodedToken.role !== 'admin') {
                        toast.error('Vous devez être administrateur pour accéder à cette page.');
                        next({ name: 'HomePage' });
                    } else {
                        // Si l'utilisateur est un admin, le laisser accéder
                        next();
                    }
                } catch (err) {
                    // Si le token n'est pas décodable, redirige vers la page de connexion
                    toast.error('Une erreur s\'est produite. Veuillez vous reconnecter.');
                    next({ name: 'LoginSignup' });
                }
            } else {
                // Si la route ne nécessite pas un rôle administrateur, le laisser accéder
                next();
            }
        }
    } else {
        // Si la route ne nécessite pas d'authentification, laissez simplement l'utilisateur accéder à la route
        next();
    }
});

export default router;