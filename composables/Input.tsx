import { Input } from '@/types/props/composables';

const Input = ({ placeholder }: Input) => {
  return <input type="text" placeholder={placeholder} />;
};

export default Input;
