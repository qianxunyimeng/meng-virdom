// https://www.w3cschool.cn/jest_cn/jest_setting.html
import { isArray } from '../../src/utils/paramType';

describe('paramType', () => {
  test('[] is Array', () => {
    expect(isArray([])).toBeTruthy();
  });
  test('{} is not array', () => {
    expect(isArray({})).toBeFalsy();
  });
});
