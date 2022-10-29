import CategoryItem from '../category-item/category-item.component';
import './categories.styles.scss';

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category, index) => {
        return <CategoryItem key={index} category={category} />;
      })}
    </div>
  );
};

export default Categories;
