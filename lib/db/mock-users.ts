import fs from 'node:fs/promises';
import path from 'node:path';

const DB_FILE_PATH = path.join(process.cwd(), 'db.json');

type User = {
  id: string;
  email: string;
  passwordHash: string;
};

async function readUsersDB(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_FILE_PATH, 'utf-8');
    const db = JSON.parse(data);
    return db.users || [];
  } catch (err) {
    console.warn('Error reading db.json, initializing with default user.', err);
    const defaultUsers: User[] = [
      {
        id: '1',
        email: 'test@example.com',
        passwordHash:
          '$2a$12$qQ/pwSel.mLPuI/YFbjV4uEPCgvN1y5/H1zkwXcKzQ6MSa8cpW7JC', // password123
      },
    ];
    await writeUsersDB(defaultUsers);
    return defaultUsers;
  }
}

async function writeUsersDB(users: User[]): Promise<void> {
  const db = { users };
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function getUsers() {
  return await readUsersDB();
}

export async function addUser(newUser: User): Promise<void> {
  const users = await readUsersDB();
  users.push(newUser);
  await writeUsersDB(users);
}
