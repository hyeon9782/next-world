import FormHead from '@/components/account/FormHead';
import SignUpForm from '@/components/account/SignUpForm';
import { accountContainer } from '@/styles/account.css';

const RegisterPage = () => {
  return (
    <main className={accountContainer}>
      <FormHead titleText="Sign up" questionText="Have an account?" />
      <SignUpForm />
    </main>
  );
};

export default RegisterPage;
