'use client';

import { articleTextarea } from '@/styles/article.css';
import { input } from '@/styles/common.css';
import { editorButton, editorForm } from '@/styles/editor.css';
import TagInput from './TagInput';
import { useState } from 'react';
import { NewArticle } from '@/types/api/articles';
import useArticle from '@/hooks/useArticle';

const EditForm = ({ slug }: { slug?: string }) => {
  const { article, createArticle, updateArticle } = useArticle({ slug });

  const [formData, setFormData] = useState<NewArticle>({
    title: article ? article.title : '',
    description: article ? article.description : '',
    body: article ? article.body : '',
    tagList: article ? [...article.tagList] : [],
  });

  const handleClick = () => {
    if (slug) {
      updateArticle(formData);
    } else {
      createArticle(formData);
    }
  };

  const handleChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const appendTag = (tag: string) => {
    setFormData(prevData => ({ ...prevData, tagList: [...prevData.tagList, tag] }));
  };
  return (
    <div className={editorForm}>
      <input
        type="text"
        name="title"
        className={input}
        placeholder="Article Title"
        onChange={handleChange}
        value={formData.title}
      />
      <input
        type="text"
        name="description"
        className={input}
        placeholder="What's this article about?"
        onChange={handleChange}
        value={formData.description}
      />

      <textarea
        rows={8}
        name="body"
        className={articleTextarea}
        placeholder="Write your article (in markdown)"
        onChange={handleChange}
        value={formData.body}
      ></textarea>
      <TagInput appendTag={appendTag} tagList={formData.tagList} />
      <div>
        <button className={editorButton} onClick={handleClick}>
          Publish Article
        </button>
      </div>
    </div>
  );
};

export default EditForm;
