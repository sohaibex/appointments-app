export const auth = {
    login: (user) => Promise.resolve(`Logged in as ${user}`),
    logout: () => Promise.resolve('Logged out'),
}; 