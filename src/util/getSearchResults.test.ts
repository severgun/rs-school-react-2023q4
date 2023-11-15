import { searchResp } from '@/mocks/handlers';
import getSearchResults from './getSearchResults';

describe('Test getUnitByUid', () => {
  test('call with empty search value should return animals list', async () => {
    const expectedResult = searchResp;

    const resp = await getSearchResults('', 0, 10);

    expect(resp).toEqual(expectedResult);
  });

  test('call to invalid search request should return null', async () => {
    const expectedResult = null;

    const resp = await getSearchResults('qwerty', 0, 10);

    expect(resp).toEqual(expectedResult);
  });
});
