import {
  Dir,
  writeFile,
  readTextFile,
} from 'tauri/api/fs';

type UserData = {
  username: string;
  password: string;
};

const USER_DATA_FILE = 'userData.json';

export async function saveUserData(userData: UserData) {
  const stringified = JSON.stringify(userData);

  await writeFile({
    path: USER_DATA_FILE,
    contents: stringified,
  }, {
    dir: Dir.LocalData,
  });
}

export async function getUserData() {
  const contents = await readTextFile(USER_DATA_FILE, {
    dir: Dir.LocalData,
  });

  const userData = JSON.parse(contents);
  return userData as UserData;
}
