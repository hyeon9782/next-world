import SkeletonElement from '@/composables/SkeletonElement';
import { settingPageButtonBox, settingPageForm, settingPageSkeleton, settingPageTitle } from '@/styles/skeleton.css';

const SettingsLaoding = () => {
  return (
    <div className={settingPageSkeleton}>
      <SkeletonElement width="704px" height="100%" radius="5px" background="lightgray">
        <div className={settingPageForm}>
          <div className={settingPageTitle}>
            <SkeletonElement width="240px" height="54px" radius="5px" background="gray" />
          </div>
          <SkeletonElement width="684px" height="50px" radius="5px" background="gray" />
          <SkeletonElement width="684px" height="50px" radius="5px" background="gray" />
          <SkeletonElement width="684px" height="138px" radius="5px" background="gray" />
          <SkeletonElement width="684px" height="54px" radius="5px" background="gray" />
          <SkeletonElement width="684px" height="54px" radius="5px" background="gray" />
          <div className={settingPageButtonBox}>
            <SkeletonElement width="194px" height="38px" radius="5px" background="gray" />
            <SkeletonElement width="192px" height="49px" radius="5px" background="gray" />
          </div>
        </div>
      </SkeletonElement>
    </div>
  );
};

export default SettingsLaoding;
