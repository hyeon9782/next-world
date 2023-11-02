import SkeletonElement from '@/composables/SkeletonElement';
import { bannerSkeleton, editProfileSkeleton, profileSkeleton } from '@/styles/skeleton.css';

const ProfileSkeleton = () => {
  return (
    <div>
      <SkeletonElement width="100%" height="100%" radius="5px" background="lightgray">
        <div className={profileSkeleton}>
          <div className={bannerSkeleton}>
            <SkeletonElement width="100px" height="100px" radius="50%" background="gray" />
            <SkeletonElement width="209px" height="32px" radius="5px" background="gray" />
          </div>
          <div className={editProfileSkeleton}>
            <SkeletonElement width="170px" height="28px" radius="5px" background="gray" />
          </div>
          <SkeletonElement width="100%" height="1000px" radius="5px" background="gray" />
        </div>
      </SkeletonElement>
    </div>
  );
};

export default ProfileSkeleton;
