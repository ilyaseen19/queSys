const sortArr = async (data) => {
  const ascSort = await data.sort(
    (obj1, obj2) => new Date(obj1.createdAt) - new Date(obj2.createdAt)
  );

  return ascSort;
};

const sortQue = async (data) => {
  const ascSort = await data.sort(
    (obj1, obj2) => new Date(obj1.createdAt) - new Date(obj2.createdAt)
  );

  return ascSort;
};

export { sortArr };
