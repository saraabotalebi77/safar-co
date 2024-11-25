import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";

// Persian labels for each route
const routeLabels = {
  "": "خانه",
  "articles": "مقالات",
  "article": "مقاله",
  "profile": "پروفایل",
  "notification": "اعلان ها",
  "tickets": "تیکت‌ها",
  "add-ticket": "افزودن تیکت",
  "add-article" : "افزودن مقاله",
  "edit-article" : "ویرایش مقاله",
  "articles/add" : "افزودن مقاله"
};

interface IPropsComponent{
  className : string,
}

const Breadcrumb:FC<IPropsComponent> = ({className}) => {
  const {pathname} = useLocation();

  // Split pathname and filter out any empty segments
  const pathSegments = pathname.split("/").filter(Boolean);


  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Construct the path for each breadcrumb link
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    const label = routeLabels[segment] || segment; // Fallback to segment if no translation

    return (
      <React.Fragment key={index}>
        {<img src="/assets/images/left-arrow.svg" className="w-2 h-2 mx-1"/>}
        
        {isLast ? (
          isNaN(Number(pathSegments[pathSegments.length - 1])) && <span className="text-gray-200">{label}</span>
        ) : (
          <Link to={path} className="text-gray-200 hover:underline">
            {label}
          </Link>
        )}
      </React.Fragment>
    );
  });

  return (
    <nav aria-label="breadcrumb" className={`flex items-center text-sm text-gray-200 ${className}`}>
      {breadcrumbItems.length > 0 && (
        <Link to="/" className="hover:underline">
          {routeLabels[""]}
        </Link>
      )}
      {breadcrumbItems}
    </nav>
  );
};

export default Breadcrumb;