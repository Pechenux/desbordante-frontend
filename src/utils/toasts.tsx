import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { Toast } from '@/components/meta';

export const showToast = (
  header: ReactNode,
  text?: ReactNode,
  options?: ToastOptions,
) =>
  toast(
    <Toast header={text ? header : null}>{text ? text : header}</Toast>,
    options,
  );

export const showError = (
  header: ReactNode,
  text?: ReactNode,
  options?: ToastOptions,
) => showToast(header, text, { type: 'error', ...options });

export const showSuccess = (
  header: ReactNode,
  text?: ReactNode,
  options?: ToastOptions,
) => showToast(header, text, { type: 'success', ...options });
