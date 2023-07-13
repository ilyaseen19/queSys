const sortArr = async (data) => {
  const ascSort = await data.sort(
    (obj1, obj2) => new Date(obj1.createdAt) - new Date(obj2.createdAt)
  );

  return ascSort;
};

const sortQue = async (data) => {
  console.log(data);
  const ascSort = await data.sort(
    (obj1, obj2) => {
      let time1 = new Date(obj1.queData[obj1.queData.length - 1].createdAt).getTime()
      let time2 = new Date(obj2.queData[obj1.queData.length - 1].createdAt).getTime()

      return time1 - time2
    }
  );

  return ascSort;
};

export { sortArr, sortQue };
