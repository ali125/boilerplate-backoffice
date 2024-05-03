type QueryToString = (params: { [key: string]: any }) => string;

export const convertQueryToString: QueryToString = (params) => {
    const queryArr = Object.entries(params).reduce((acc, [key, val]) => {
        if (val) acc.push(`${key}=${val}`);
        return acc;
    }, [] as any[]);
    if (queryArr.length === 0) return "";
    return `?${queryArr.join('&')}`;
}

export const calculateStringFormula = (str: string) => {
    if (!str) return null;
    try {
      const result = Function(`return (${str})`)()
      return result
    } catch (e) {
      return 0
    }
}