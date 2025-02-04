import { renderHook } from 'react-hooks-testing-library';
import { queryGql } from '../test-utils';
import { useRequest } from './useRequest';

it('preserves instance of request when key has not changed', () => {
  let { query, variables } = queryGql;

  const { result, rerender } = renderHook(
    ({ query, variables }) => useRequest(query, variables),
    { initialProps: { query, variables } }
  );

  const resultA = result.current;
  expect(resultA).toEqual({
    key: expect.any(Number),
    query: expect.anything(),
    variables: variables,
  });

  variables = { ...variables }; // Change reference
  rerender({ query, variables });

  const resultB = result.current;
  expect(resultA).toBe(resultB);

  variables = { ...variables, test: true }; // Change values
  rerender({ query, variables });

  const resultC = result.current;
  expect(resultA).not.toBe(resultC);
});
