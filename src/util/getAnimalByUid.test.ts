import { detailsResp } from '@/mocks/handlers';
import getAnimalByUid from './getAnimalByUid';

describe('Test getUnitByUid', () => {
  test('call to valid URL should return animal data', async () => {
    const uid = 'ANMA0000032315';
    const expectedResult = detailsResp;

    const resp = await getAnimalByUid(uid);

    expect(resp).toEqual(expectedResult);
  });

  test('call to invalid UID should return null', async () => {
    const uid = 'INVALIDUID';
    const expectedResult = null;

    const resp = await getAnimalByUid(uid);

    expect(resp).toEqual(expectedResult);
  });

  test('call to valid but empty UID should return null', async () => {
    const uid = 'ANMA0000000000';
    const expectedResult = null;

    const resp = await getAnimalByUid(uid);

    expect(resp).toEqual(expectedResult);
  });
});
