import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Notification {
  static success = (msg: string) => { toast.success(msg);}
  static error = (msg: string) => {toast.error(msg);}
  static warning = (msg: string) => { toast.warning(msg);}
  static info = (msg: string) => {toast.info(msg);}
}
