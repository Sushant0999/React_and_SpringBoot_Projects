import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getLocale from "../utils/SettingLocale";
import { getRandomColor } from '../utils/ColorList';
import { getIPinfo } from './LogIP';



export const Login = async (UserInfo) => {

   const baseUrl = process.env.REACT_APP_BASE_URL;
   const url = `${baseUrl}/user/auth/login`;



   const signInObj = {
      email: UserInfo.get("email"),
      password: UserInfo.get("password"),
   }

   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(signInObj),
      });

      console.log(response);


      if (response.status === 500) {
         toast.warn('Server Error !', {
            autoClose: 1000,
         });
         return;
      }

      if (response.status === 409) {
         toast.warn('User Not Exist, Please Signup', {
            autoClose: 1000,
         });
         return;
      }

      if (response.status === 401) {
         toast.warn('Email or Password Wrong', {
            autoClose: 1000,
         });
         throw new Error('Network response was not ok');
      }

      if (!response.ok) {
         toast.warn('Something Went Wrong', {
            autoClose: 1000,
         });
         throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
         const data = await response.json();
         if (data !== null) {
            localStorage.setItem('userData', JSON.stringify(data));
            sessionStorage.setItem('userData', JSON.stringify(data));
            const locale = navigator.language;
            const currLocale = getLocale(locale);
            localStorage.setItem('lang', JSON.stringify(currLocale));
            localStorage.setItem('avtarCol', JSON.stringify(getRandomColor()));
            getIPinfo();
            return data;
         }

      } else {
         throw new Error('Response is not valid JSON');
      }
   } catch (e) {
      console.log('Error', e);
   }
}
