import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function useDocumentDescription(desc) {
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    description.content = desc;
  }, [desc]);
}

export { useDocumentTitle, useDocumentDescription };
