import React from "react";

const layout = ({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <div className=" max-h-screen grid grid-cols-2">
      {sidebar}
      <section>{content}</section>
    </div>
  );
};

export default layout;
