import Menu1CategoryList from "../../components/MenuCategoryList/Menu1CategoryList";
import Menu2CategoryList from "../../components/MenuCategoryList/Menu2CategoryList";
import BannerCarausel from "../../components/header/banner-carausel";
import NessaHome from "../../components/home/NessaHome";
import { SmallSlider } from "../../components/home/smallSlider";

const Home = () => {
  return (
    <div>
      <BannerCarausel />
      <Menu1CategoryList />
      <SmallSlider palcement={1} />
      <Menu2CategoryList />
      <SmallSlider palcement={2} />
      <SmallSlider palcement={3} />
      <SmallSlider palcement={4} />
      <SmallSlider palcement={5} />
      <SmallSlider palcement={6} />
      <SmallSlider palcement={7} />
      <SmallSlider palcement={8} />
      <NessaHome />
    </div>
  );
};

export default Home;
