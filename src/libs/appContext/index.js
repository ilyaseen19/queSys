import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { uploadFiles } from "../functions/uploadFile";
import { sortArr } from "../sortArray";
import { getCustomers } from "../functions/fetchCustomers";
import dayjs from "dayjs";
import { addToQue } from "../functions/addToQue";
import { createCustomer } from "../functions/createCustomer";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [pageTitle, setTitle] = useState("Que");
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    type: "info",
    message: "",
    open: false,
  });
  const [customers, setCustomers] = useState([]);
  const [que, setQue] = useState([]);
  const [original, setOriginal] = useState([]);
  const [originalPh, setOriginalPh] = useState([]);
  const [fileName, setFileName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(dayjs(""));
  const [queData, setQueData] = useState({
    idType: "",
    IDNumber: "",
    phoneNumber: "",
    fullName: "",
    transactionType: "",
  });

  useEffect(() => {
    _getCustomers();
  }, []);

  const routeToPage = (page) => {
    navigate(page);
  };

  const switchPage = (page) => {
    setTitle(page);
  };

  const handleClose = () => {
    setSnack({
      ...snack,
      type: "info",
      message: "",
      open: false,
    });
  };

  const uploadFile = async () => {
    if (excelData.length === 0)
      return setSnack({
        ...snack,
        type: "info",
        message: "Please choose a file first",
        open: true,
      });

    setLoading(true);
    const res = await uploadFiles(excelData);

    if (res.success === 0) {
      setLoading(false);
      return setSnack({
        ...snack,
        type: "error",
        message: res.message,
        open: true,
      });
    }

    const sortData = await sortArr(res.data);

    setCustomers(sortData);
    setLoading(false);
    setExcelData([]);
    setFileName("");
    setSnack({
      type: "success",
      message: res.message,
      open: true,
    });
  };

  const _getCustomers = async () => {
    setLoading(true);

    let res = await getCustomers();

    if (res.success === 0) {
      setLoading(false);
      return setSnack({
        ...snack,
        type: "error",
        message: res.message,
        open: true,
      });
    }

    const tdyQue = await sortArr(res.que);

    const sortData = await sortArr(res.data);

    setCustomers(sortData);
    setQue(tdyQue);
    setLoading(false);
    setSnack({
      type: "success",
      message: res.message,
      open: true,
    });
  };

  const _search = async () => {
    if (!date.isValid())
      return setSnack({
        type: "warning",
        message: "Please choose a search parameter",
        open: true,
      });

    setLoading(true);

    if (date.isValid()) {
      let found = customers.filter(
        (customer) =>
          new Date(customer.createdAt).toLocaleDateString() ===
          new Date(date.$d).toLocaleDateString()
      );

      if (found.length === 0) {
        setLoading(false);
        setDate(dayjs(""));
        return setSnack({
          type: "info",
          message: "No data found, please provide a new date",
          open: true,
        });
      }

      setOriginal(customers);

      const sortData = await sortArr(found);
      setCustomers(sortData);
      setLoading(false);

      return;
    }
  };

  const _clear = () => {
    if (date.isValid()) {
      setCustomers(original);
      setOriginal([]);
      setDate(dayjs(""));
      return;
    }

    if (phone !== "") {
      setCustomers(originalPh);
      setOriginalPh([]);
      setPhone("");
      return;
    }
  };

  const _handlePhoneSearch = async (data) => {
    setPhone(data);

    let found = customers.filter((customer) =>
      customer.phoneNumber.includes(phone)
    );

    setOriginalPh(customers);

    const sortData = await sortArr(found);
    setCustomers(sortData);
  };

  const _handleIdChange = (id) => {
    if (!id) return null;

    let customer = customers.find((cust) => cust.IDNumber === id);
    setQueData({
      ...queData,
      idType: customer.IDType,
      IDNumber: id,
      phoneNumber: customer.phoneNumber,
      fullName: customer.fullName,
    });
  };

  const _handleQue = async () => {
    let { idType, phoneNumber, IDNumber, transactionType, fullName } = queData;
    if (idType === "" || idType === "Phone") {
      if (fullName === "" || transactionType === "" || phoneNumber === "")
        return setSnack({
          ...snack,
          type: "info",
          message: "Please provide all fields",
          open: true,
        });

      setLoading(true);

      let customer = customers.find((cust) => cust.phoneNumber === phoneNumber);

      if (customer) {
        // add to que
        const res = await addToQue({ _id: customer._id, transactionType });

        if (res.success === 0) {
          setLoading(false);
          return setSnack({
            ...snack,
            type: "error",
            message: res.message,
            open: true,
          });
        }

        let sortQ = await sortArr(res.que);
        let sortData = await sortArr(res.data);

        setCustomers(sortData);
        setQue(sortQ);
        setQueData({
          ...queData,
          idType: "",
          IDNumber: "",
          phoneNumber: "",
          fullName: "",
          transactionType: "",
        });
        setLoading(false);

        return;
      }

      // create and add to que
      let res = await createCustomer({
        idType,
        IDNumber,
        phoneNumber,
        fullName,
        transactionType,
      });

      if (res.success === "") {
        setLoading(false);
        return setSnack({
          ...snack,
          type: "error",
          message: res.message,
          open: true,
        });
      }

      let sortQ = await sortArr(res.que);
      let sortData = await sortArr(res.data);

      setCustomers(sortData);
      setQue(sortQ);
      setLoading(false);
      setQueData({
        ...queData,
        idType: "",
        IDNumber: "",
        phoneNumber: "",
        fullName: "",
        transactionType: "",
      });

      return;
    }

    if (
      fullName === "" ||
      transactionType === "" ||
      phoneNumber === "" ||
      IDNumber === "" ||
      idType === ""
    )
      return setSnack({
        ...snack,
        type: "info",
        message: "Please provide all fields",
        open: true,
      });

    setLoading(true);

    let customer = customers.find((cust) => cust.phoneNumber === phoneNumber);

    if (customer) {
      // add to que
      const res = await addToQue({ _id: customer._id, transactionType });

      if (res.success === 0) {
        setLoading(false);
        return setSnack({
          ...snack,
          type: "error",
          message: res.message,
          open: true,
        });
      }

      let sortQ = await sortArr(res.que);
      let sortData = await sortArr(res.data);

      setCustomers(sortData);
      setQue(sortQ);
      setLoading(false);
      setQueData({
        ...queData,
        idType: "",
        IDNumber: "",
        phoneNumber: "",
        fullName: "",
        transactionType: "",
      });

      return;
    }

    // create and add to que
    let res = await createCustomer({
      idType,
      IDNumber,
      phoneNumber,
      fullName,
      transactionType,
    });

    if (res.success === 0) {
      setLoading(false);
      return setSnack({
        ...snack,
        type: "error",
        message: res.message,
        open: true,
      });
    }

    let sortQ = await sortArr(res.que);
    let sortData = await sortArr(res.data);

    setCustomers(sortData);
    setQue(sortQ);
    setLoading(false);
    setQueData({
      ...queData,
      idType: "",
      IDNumber: "",
      phoneNumber: "",
      fullName: "",
      transactionType: "",
    });

    return;
  };

  const _handlePhChange = async (phone) => {
    if (!phone) return null;

    let customer = customers.find((cust) => cust.phoneNumber === phone);
    setQueData({
      ...queData,
      idType: customer.IDType,
      IDNumber: customer.IDNumber,
      phoneNumber: phone,
      fullName: customer.fullName,
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        routeToPage,
        pageTitle,
        setTitle,
        switchPage,
        uploadFile,
        setExcelData,
        loading,
        snack,
        setSnack,
        customers,
        handleClose,
        excelData,
        setFileName,
        fileName,
        date,
        setDate,
        _search,
        original,
        originalPh,
        _clear,
        _handlePhoneSearch,
        que,
        _handleIdChange,
        queData,
        setQueData,
        _handleQue,
        _handlePhChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
