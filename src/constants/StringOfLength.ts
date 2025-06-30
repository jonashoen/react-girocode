export type StringOfLength<Max> = string & {
  max: Max;
  readonly StringOfLength: unique symbol;
};

export function StringOfLength<Max extends number>(
  input: string | undefined,
  { max }: { max: Max }
): StringOfLength<Max> {
  if (input === undefined) {
    return StringOfLength("", { max });
  }

  if (input.length > max) {
    throw new Error(
      `Input "${input}" is longer than specified max lenght ${max}`
    );
  }

  return input as StringOfLength<Max>;
}
