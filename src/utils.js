export async function login({ username, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'maria' && password === 'maria') {
                resolve();
            } else {
                reject();
            }
        })
    })
}