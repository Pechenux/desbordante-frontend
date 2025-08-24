// import { FC, useCallback, useState } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';
// import {
//   useLogin,
//   useRegister,
//   useSendResetEmail,
//   useResetPassword,
//   useSendConfirmationEmail,
//   useConfirmEmail,
// } from '@/api/services/auth';
// import {
//   RegisterFormData,
//   LoginFormData,
//   ResetEmailRequest,
//   ResetPasswordRequest,
//   ConfirmEmailRequest,
// } from '@/api/services/auth/types';
// import {
//   ModalContainer,
//   ModalProps,
// } from '@/components/common/layout/ModalContainer';
// import { ControlledFormField, Text } from '@/components/common/uikit';
// import { Button } from '@/components/common/uikit/Button';
// import { showError } from '@/utils/toasts';
// import styles from './LoginModal.module.scss';

// // Define the different states for the modal
// export enum LoginModalState {
//   LOGIN = 'login',
//   REGISTER = 'register',
//   EMAIL_VERIFY = 'email_verify',
//   PASSWORD_RESET_EMAIL = 'password_reset_email',
//   PASSWORD_RESET_FORM = 'password_reset_form',
// }

// type LoginModalProps = ModalProps & {
//   initialState?: LoginModalState;
//   onLogin: () => void;
//   onEmailVerified?: () => void;
// };

// export const LoginModal: FC<LoginModalProps> = ({
//   isOpen,
//   onClose,
//   initialState = LoginModalState.LOGIN,
//   onLogin,
//   onEmailVerified,
// }) => {
//   // State to track the current modal state
//   const [currentState, setCurrentState] =
//     useState<LoginModalState>(initialState);

//   // State to track if we're in the process of submitting
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State to track the email for password reset
//   const [resetEmail, setResetEmail] = useState('');

//   // State to track the verification token
//   // const [verificationToken, setVerificationToken] = useState('');

//   // Form hooks
//   const loginForm = useForm<LoginFormData>({
//     mode: 'all',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const registerForm = useForm<RegisterFormData>({
//     mode: 'all',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       email: '',
//       password: '',
//       full_name: '',
//     },
//   });

//   const passwordResetEmailForm = useForm<ResetEmailRequest>({
//     mode: 'all',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       email: '',
//     },
//   });

//   const passwordResetForm = useForm<ResetPasswordRequest>({
//     mode: 'all',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       email: '',
//       token: '',
//       password: '',
//       password_confirm: '',
//     },
//   });

//   const emailVerifyForm = useForm<ConfirmEmailRequest>({
//     mode: 'all',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       token: '',
//     },
//   });

//   // Auth hooks
//   const login = useLogin();
//   const register = useRegister();
//   const sendResetEmail = useSendResetEmail();
//   const resetPassword = useResetPassword();
//   const sendConfirmationEmail = useSendConfirmationEmail();
//   const confirmEmail = useConfirmEmail();

//   // Handle form submission based on current state
//   const handleSubmit = useCallback(
//     async (formData: any) => {
//       setIsSubmitting(true);

//       try {
//         if (currentState === LoginModalState.LOGIN) {
//           await login.mutate(
//             {
//               email: formData.email,
//               password: formData.password,
//             },
//             {
//               onSuccess: (response) => {
//                 if ('detail' in response) {
//                   showError(response.detail[0]?.msg);
//                   console.error(response.detail[0]?.msg);
//                 } else {
//                   onLogin();
//                 }
//               },
//             },
//           );
//         } else if (currentState === LoginModalState.REGISTER) {
//           await register.mutate(formData, {
//             onSuccess: (response) => {
//               if ('detail' in response) {
//                 showError(response.detail[0]?.msg);
//                 console.error(response.detail[0]?.msg);
//               } else {
//                 // After successful registration, switch to email verification
//                 setCurrentState(LoginModalState.EMAIL_VERIFY);
//               }
//             },
//           });
//         } else if (currentState === LoginModalState.PASSWORD_RESET_EMAIL) {
//           await sendResetEmail.mutate(
//             { email: formData.email },
//             {
//               onSuccess: (response) => {
//                 if ('detail' in response) {
//                   showError(response.detail[0]?.msg);
//                   console.error(response.detail[0]?.msg);
//                 } else {
//                   // After sending reset email, switch to password reset form
//                   setResetEmail(formData.email);
//                   setCurrentState(LoginModalState.PASSWORD_RESET_FORM);
//                 }
//               },
//             },
//           );
//         } else if (currentState === LoginModalState.PASSWORD_RESET_FORM) {
//           await resetPassword.mutate(
//             {
//               email: resetEmail,
//               token: formData.token,
//               password: formData.password,
//               password_confirm: formData.password_confirm,
//             },
//             {
//               onSuccess: (response) => {
//                 if ('detail' in response) {
//                   showError(response.detail[0]?.msg);
//                   console.error(response.detail[0]?.msg);
//                 } else {
//                   // After successful password reset, switch back to login
//                   setCurrentState(LoginModalState.LOGIN);
//                 }
//               },
//             },
//           );
//         } else if (currentState === LoginModalState.EMAIL_VERIFY) {
//           await confirmEmail.mutate(
//             { token: formData.token },
//             {
//               onSuccess: (response) => {
//                 if ('detail' in response) {
//                   showError(response.detail[0]?.msg);
//                   console.error(response.detail[0]?.msg);
//                 } else {
//                   // After successful email verification
//                   if (onEmailVerified) {
//                     onEmailVerified();
//                   }
//                   onClose();
//                 }
//               },
//             },
//           );
//         }
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [
//       currentState,
//       login,
//       register,
//       sendResetEmail,
//       resetPassword,
//       confirmEmail,
//       onLogin,
//       onEmailVerified,
//       onClose,
//       resetEmail,
//     ],
//   );

//   // Handle state transitions
//   const handleSwitchToLogin = useCallback(() => {
//     setCurrentState(LoginModalState.LOGIN);
//   }, []);

//   // const handleSwitchToRegister = useCallback(() => {
//   //   setCurrentState(LoginModalState.REGISTER);
//   // }, []);

//   const handleSwitchToPasswordReset = useCallback(() => {
//     setCurrentState(LoginModalState.PASSWORD_RESET_EMAIL);
//   }, []);

//   // const handleSwitchToEmailVerify = useCallback(() => {
//   //   setCurrentState(LoginModalState.EMAIL_VERIFY);
//   // }, []);

//   // Handle sending confirmation email
//   const handleSendConfirmationEmail = useCallback(async () => {
//     setIsSubmitting(true);
//     try {
//       await sendConfirmationEmail.mutateAsync(undefined);
//       // The email has been sent, stay in the same state
//     } catch (error) {
//       console.error('Failed to send confirmation email:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [sendConfirmationEmail]);

//   // Render the appropriate form based on current state
//   const renderForm = () => {
//     switch (currentState) {
//       case LoginModalState.LOGIN:
//         return (
//           <div className={styles.inputs}>
//             <ControlledFormField
//               controllerProps={{ name: 'email' }}
//               formFieldProps={{ label: 'Email' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="email" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//             <ControlledFormField
//               controllerProps={{ name: 'password' }}
//               formFieldProps={{ label: 'Password' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="password" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//           </div>
//         );

//       case LoginModalState.REGISTER:
//         return (
//           <div className={styles.inputs}>
//             <ControlledFormField
//               controllerProps={{ name: 'full_name' }}
//               formFieldProps={{ label: 'Full Name' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//             <ControlledFormField
//               controllerProps={{ name: 'email' }}
//               formFieldProps={{ label: 'Email' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="email" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//             <ControlledFormField
//               controllerProps={{ name: 'password' }}
//               formFieldProps={{ label: 'Password' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="password" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//             <ControlledFormField
//               controllerProps={{ name: 'password_confirm' }}
//               formFieldProps={{ label: 'Confirm Password' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="password" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//           </div>
//         );

//       case LoginModalState.EMAIL_VERIFY:
//         return (
//           <div className={styles.inputs}>
//             <p className={styles.verifyMessage}>
//               We&apos;ve sent a verification code to your email. Please enter it
//               below:
//             </p>
//             <ControlledFormField
//               controllerProps={{ name: 'token' }}
//               formFieldProps={{ label: 'Verification Code' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//           </div>
//         );

//       case LoginModalState.PASSWORD_RESET_EMAIL:
//         return (
//           <div className={styles.inputs}>
//             <p className={styles.resetMessage}>
//               Enter your email address and we&apos;ll send you a link to reset
//               your password.
//             </p>
//             <ControlledFormField
//               controllerProps={{ name: 'email' }}
//               formFieldProps={{ label: 'Email' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="email" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//           </div>
//         );

//       case LoginModalState.PASSWORD_RESET_FORM:
//         return (
//           <div className={styles.inputs}>
//             <p className={styles.resetMessage}>
//               Enter the verification code sent to your email and create a new
//               password.
//             </p>
//             <ControlledFormField
//               controllerProps={{ name: 'token' }}
//               formFieldProps={{ label: 'Verification Code' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//             <ControlledFormField
//               controllerProps={{ name: 'password' }}
//               formFieldProps={{ label: 'New Password' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="password" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//             <ControlledFormField
//               controllerProps={{ name: 'password_confirm' }}
//               formFieldProps={{ label: 'Confirm New Password' }}
//             >
//               {({ field: { value, onChange } }) => (
//                 <Text type="password" value={value} onChange={onChange} />
//               )}
//             </ControlledFormField>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // Render the appropriate title based on current state
//   const renderTitle = () => {
//     switch (currentState) {
//       case LoginModalState.LOGIN:
//         return 'Log in';
//       case LoginModalState.REGISTER:
//         return 'Sign up';
//       case LoginModalState.EMAIL_VERIFY:
//         return 'Verify Your Email';
//       case LoginModalState.PASSWORD_RESET_EMAIL:
//         return 'Reset Password';
//       case LoginModalState.PASSWORD_RESET_FORM:
//         return 'Reset Password';
//       default:
//         return 'Log in';
//     }
//   };

//   // Render the appropriate buttons based on current state
//   const renderButtons = () => {
//     switch (currentState) {
//       case LoginModalState.LOGIN:
//         return (
//           <div className={styles.buttons}>
//             <Button
//               variant="secondary"
//               onClick={handleSwitchToPasswordReset}
//               disabled={isSubmitting}
//             >
//               Forgot password?
//             </Button>
//             <Button type="submit" form="loginform" disabled={isSubmitting}>
//               Log in
//             </Button>
//           </div>
//         );

//       case LoginModalState.REGISTER:
//         return (
//           <div className={styles.buttons}>
//             <Button
//               variant="secondary"
//               onClick={handleSwitchToLogin}
//               disabled={isSubmitting}
//             >
//               Already have an account? Log in
//             </Button>
//             <Button type="submit" form="loginform" disabled={isSubmitting}>
//               Sign up
//             </Button>
//           </div>
//         );

//       case LoginModalState.EMAIL_VERIFY:
//         return (
//           <div className={styles.buttons}>
//             <Button
//               variant="secondary"
//               onClick={handleSendConfirmationEmail}
//               disabled={isSubmitting}
//             >
//               Resend Email
//             </Button>
//             <Button type="submit" form="loginform" disabled={isSubmitting}>
//               Verify Email
//             </Button>
//           </div>
//         );

//       case LoginModalState.PASSWORD_RESET_EMAIL:
//         return (
//           <div className={styles.buttons}>
//             <Button
//               variant="secondary"
//               onClick={handleSwitchToLogin}
//               disabled={isSubmitting}
//             >
//               Back to Login
//             </Button>
//             <Button type="submit" form="loginform" disabled={isSubmitting}>
//               Send Reset Link
//             </Button>
//           </div>
//         );

//       case LoginModalState.PASSWORD_RESET_FORM:
//         return (
//           <div className={styles.buttons}>
//             <Button
//               variant="secondary"
//               onClick={handleSwitchToLogin}
//               disabled={isSubmitting}
//             >
//               Back to Login
//             </Button>
//             <Button type="submit" form="loginform" disabled={isSubmitting}>
//               Reset Password
//             </Button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // Get the appropriate form provider and form ID based on current state
//   const getFormProvider = () => {
//     switch (currentState) {
//       case LoginModalState.LOGIN:
//         return { formProvider: loginForm, formId: 'loginform' };
//       case LoginModalState.REGISTER:
//         return { formProvider: registerForm, formId: 'loginform' };
//       case LoginModalState.EMAIL_VERIFY:
//         return { formProvider: emailVerifyForm, formId: 'loginform' };
//       case LoginModalState.PASSWORD_RESET_EMAIL:
//         return { formProvider: passwordResetEmailForm, formId: 'loginform' };
//       case LoginModalState.PASSWORD_RESET_FORM:
//         return { formProvider: passwordResetForm, formId: 'loginform' };
//       default:
//         return { formProvider: loginForm, formId: 'loginform' };
//     }
//   };

//   const { formProvider, formId } = getFormProvider();

//   return (
//     <ModalContainer isOpen={isOpen} onClose={onClose}>
//       <h4 className={styles.title}>{renderTitle()}</h4>
//       <FormProvider {...formProvider}>
//         <form id={formId} onSubmit={formProvider.handleSubmit(handleSubmit)}>
//           {renderForm()}
//         </form>
//       </FormProvider>
//       {renderButtons()}
//     </ModalContainer>
//   );
// };
