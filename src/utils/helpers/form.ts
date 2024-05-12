export const convertToFormData = (data: { [key: string]: any }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, item]) => {
    if (Array.isArray(item)) {
      item.forEach((val) => {
        formData.append(`${key}[]`, val);
      });
    } else {
      formData.append(`${key}`, item);
    }
  });

  console.log("data", data);
  console.log("formData", formData);
  return formData;
};
