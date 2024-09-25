const useHelpers = () => {
  const GetCapital = (word) => {
    let result;
    if (word && word.length > 1) {
      result = word[0].toUpperCase() + word.slice(1);
      return result;
    }
    return word;
  };

  return { GetCapital };
};

export default useHelpers;
