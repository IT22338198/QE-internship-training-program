import { test } from '../fixtures/books-fixture';
import { APIRequestContext, Page } from '@playwright/test';
import baseAPIUrl from '../utils/environmentBaseUrl';
import deleteBookAPIRequest from '../api/requests/delete-books-collection';
import userData from '../data/user-data';

test.describe.configure({ mode: 'serial' });

let apiContext: APIRequestContext;
const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

test.beforeAll(async ({ playwright }) => {
    
    apiContext = await playwright.request.newContext({
        baseURL: baseAPIUrl[env].api,
        extraHTTPHeaders: {
            
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            
            Accept: 'application/json',
        },
    });
});

test.describe('Books - Fixture & API', () => {
    
    test.use({ isDupe: false });
    test('Add brand new book', async ({ page, bookPage }) => { //first thing that will happen is to call the fixture automatically. whenever the fixture has a "use" it goes back to the test and then go back to the fixture again when the test is done and execute any remaining commands
        await cleanBooks(userId, page);
        await bookPage.goto(userData.books.new);
    });
});

async function cleanBooks(userId: string, page: Page) {
    await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
    
};

