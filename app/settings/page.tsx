import LogoutButton from '@/components/settings/LogoutButton';
import SettingForm from '@/components/settings/SettingForm';
import { settingContainer, settingTitle } from '@/styles/settings.css';

const SettingsPage = () => {
  return (
    <main className={settingContainer}>
      <div className={settingTitle}>Your Settings</div>
      <SettingForm />
      <LogoutButton />
    </main>
  );
};

export default SettingsPage;
