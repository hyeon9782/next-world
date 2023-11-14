import FormHead from '@/components/account/FormHead';
import SignInForm from '@/components/account/SignInForm';
import { accountContainer } from '@/styles/account.css';

const LoginPage = () => {
  return (
    <main className={accountContainer}>
      <FormHead titleText="Sign in" questionText="Need an account?" />
      <SignInForm />
    </main>
  );
};

export default LoginPage;
