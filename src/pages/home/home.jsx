import Menu1CategoryList from "../../components/MenuCategoryList/Menu1CategoryList";
import Menu2CategoryList from "../../components/MenuCategoryList/Menu2CategoryList";
import BannerCarausel from "../../components/header/banner-carausel";

const Home = () => {
  return (
    <div>
      <BannerCarausel />
      <Menu1CategoryList />
      <Menu2CategoryList />
    </div>
  );
};

export default Home;
