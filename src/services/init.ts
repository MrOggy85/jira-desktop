import { setUser } from '@/store';
import { getUserData } from './persist';

export default async function init() {
  let userData: PromiseReturnType<typeof getUserData>;
  try {
    userData = await getUserData();
  } catch (error) {
    console.error(error);
    return;
  }

  setUser(userData.username, userData.password);
}
