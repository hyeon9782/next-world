import TagList from '../tags/TagList';
import { sideBar, sideBarText } from '@/styles/layout.css';
import { getTagsAPI } from '@/api/tags';

const SideBar = async () => {
  const tags = await getTagsAPI().then(res => res.tags);

  return (
    <article className={sideBar}>
      <p className={sideBarText}>Popular Tags</p>
      <TagList tags={tags} />
    </article>
  );
};

export default SideBar;
