export function Compare(word: string, input: string): number[] {
  const LENGTH = word.length;
  let pattern: number[] = new Array(LENGTH);
  if (LENGTH != input.length) {
    return pattern;
  }
  let flags: boolean[] = new Array(LENGTH);

  for (let index = 0; index < LENGTH; index++) {
    if (word[index] == input[index]) {
      pattern[index] = 1;
      flags[index] = true;
    } else {
      pattern[index] = 3;
      flags[index] = false;
    }
  }

  for (let index = 0; index < LENGTH; index++) {
    if (pattern[index] != 3) {
      continue;
    } else {
      for (let index_ = 0; index_ < LENGTH; index_++) {
        if (flags[index_]) {
          continue;
        } else if (input[index] == word[index_]) {
          flags[index_] = true;
          pattern[index] = 2;
        }
      }
    }
  }

  return pattern;
}

export function resolveDisabled(
  pattern: number[],
  word: string,
  oldDisabled: Set<string>
): Set<string> {
  if (pattern.length != word.length) {
    return new Set();
  }
  word = word.toLowerCase();
  const length = word.length;
  let disabled = new Set(Array.from(word));

  oldDisabled.forEach((charecter) => {
    disabled.add(charecter);
  });

  for (let index = 0; index < word.length; index++) {
    if (pattern[index] == 1 || pattern[index] == 2) {
      disabled.delete(word[index]);
    }
  }

  return disabled;
}
