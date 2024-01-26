import axios from "axios";
import { server } from "../../server";

export const getUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}/get-user`, { withCredentials: true })
      .then((response) => {
        const userInfo = response.data.user;
        console.log(response);
        resolve(userInfo);
      })
      .catch((err) => {
        // console.log(err.message);
        reject(err);
      });
  });
};
export const getAllStaffs = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}/u-get-staffs`, { withCredentials: true })
      .then((response) => {
        const staffs = response.data.staffs;
        console.log(response);
        resolve(staffs);
      })
      .catch((err) => {
        // console.log(err.message);
        reject(err);
      });
  });
};
export const getAppointments = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}/get-appointments`, { withCredentials: true })
      .then((response) => {
        const appointments = response.data.appointments;
        console.log(appointments);
        resolve(appointments);
      })
      .catch((err) => {
        // console.log(err.message);
        reject(err);
      });
  });
};
export const logout = () => {
  return axios
    .get(`${server}/logout`, {
      withCredentials: true,
    })
    .then((response) => {
      return {
        message: response.data.message,
      };
    })
    .catch((error) => {
      const axiosError = error;
      return {
        error: axiosError.message,
      };
    });
};
