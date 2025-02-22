import { Page } from '@playwright/test';
import { buildUrl } from './uiUrlBuilder';
import BookPage from '../ui/pages/BookPage';
import LoginPage from '../ui/pages/login-page';
import ProfilePage from '../ui/pages/ProfilePage';

async function beforeEach(
  page: Page,
  PageObjectParam: LoginPage|BookPage|ProfilePage,
  targetPage: string,
  params?: Record<any, any>
) {
  await page.goto(buildUrl(targetPage, params));
  const pageObject = await new PageObjectParam(page);
  return pageObject;
}

export default { beforeEach };