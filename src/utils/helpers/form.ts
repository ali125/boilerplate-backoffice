export const convertToFormData = (data: { [key: string]: any }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, item]) => {
    if (Array.isArray(item)) {
      item.forEach((val) => {
        if (val) formData.append(`${key}[]`, val);
      });
    } else if (item) {
      formData.append(`${key}`, item);
    }
  });

  return formData;
};
