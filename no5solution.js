function countWordTypes(sentence) {
    const words = sentence.split(" ");
    let stringCount = 0;
    let numericCount = 0;
    let alphanumericCount = 0;
  
    words.forEach((word) => {
      if (/^[a-zA-Z]+$/.test(word)) {
        stringCount++;
      } else if (/^[0-9]+$/.test(word)) {
        numericCount++;
      } else if (/^[a-zA-Z0-9]+$/.test(word)) {
        alphanumericCount++;
      }
    });
  
    return {
      strings: stringCount,
      numeric: numericCount,
      alphanumeric: alphanumericCount,
    };
  }
  
  const sentence = "876 records are there for 3A block";
  const wordCounts = countWordTypes(sentence);
  
  console.log(wordCounts);
  