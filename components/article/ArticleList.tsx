import { fetchArticles } from '@/services/articles';
import ArticlePreview from './ArticlePreview';

const ArticleList = async () => {
  const { articles } = await fetchArticles();

  return (
    <div>{articles.length > 0 && articles.map(article => <ArticlePreview key={article.slug} article={article} />)}</div>
  );
};

export default ArticleList;