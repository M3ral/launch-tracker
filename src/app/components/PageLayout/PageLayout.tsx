import React from "react";
import style from "./PageLayout.module.scss";

export interface PageLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ header, content }) => {
  return (
    <div className={style.wrapper}>
      <header className={style.header} aria-label="header-section">
        {header}
      </header>
      <article className={style.content} aria-label="content-section">
        {content}
      </article>
    </div>
  );
};
