const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    account: '/account',
    favorites: '/favorites',
    favoriteItem: (favoriteItem) => (favoriteItem ? `/favorites/:${favoriteItem}` : '/favorites/:favoriteItem'),

};

export default routes;
