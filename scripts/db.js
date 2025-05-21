const BASE_URL = 'https://join-441-default-rtdb.europe-west1.firebasedatabase.app/join';

let users = {};
let tasks = {};
let loggedInUser = null;

/**
 * Lädt Daten aus der Datenbank
 */
export async function loadData() {
    try {
        let usersData = await fetch(`${BASE_URL}/users.json`);
        let usersJson = await usersData.json();
        users = usersJson ? Object.values(usersJson) : [];

        let tasksData = await fetch(`${BASE_URL}/tasks.json`);
        let tasksJson = await tasksData.json();
        tasks = tasksJson ? Object.values(tasksJson) : [];

    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }

    loggedInUser = users.find(u => u.login == 1);
}

/**
 * Speichert Daten
 */
export async function saveData(path = '', data = null) {
    if (data) {
        await transmitData(path, data);
    }
}

/**
 * Führt PUT-Anfrage aus
 */
async function transmitData(path = '', data = {}) {
    let response = await fetch(`${BASE_URL}/${path}/${data.id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    await loadData();
    return await response.json();
}

/**
 * Löscht einen Eintrag
 */
export async function deleteData(path = '', id) {
    if (!id) return;
    let response = await fetch(`${BASE_URL}/${path}/${id}.json`, {
        method: 'DELETE',
    });
    return await response.json();
}

export function getTasks() {
    console.log(tasks);
    return tasks;
}

export function getUsers() {
    console.log(users);
    return users;
}

export function getLoggedInUser() {
    return loggedInUser;
}
