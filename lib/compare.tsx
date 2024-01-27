export function Compare(word: string, input: string): number[] {
  const LENGTH = word.length;
  let pattern: number[] = new Array(LENGTH);
  if (LENGTH != input.length) {
    console.log("word length mismatch", word, input);
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
    if (pattern[index] != 0) {
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

  console.log(`comparing \"${word}\" & \"${input}\": [${pattern}]`);
  console.log(
    "\t 1: right charecter; \t 2: right misplaced charecter; \t 3: doesnt exist; "
  );
  return pattern;
}
