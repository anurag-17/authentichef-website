import Dashboard from "../components/admin/admin-pages/Dashboard";
import ChefMain from "../components/admin/admin-pages/chef-management/ChefMain";
import Cuisines from "../components/admin/admin-pages/cuisines/page";
import Dietary from "../components/admin/admin-pages/dietary/page";
import DishType from "../components/admin/admin-pages/dishType/page";
import FoodMenu from "../components/admin/admin-pages/food-menu/FoodMenu";
import OrderList from "../components/admin/admin-pages/order-management/page";
import SpiceLevel from "../components/admin/admin-pages/spice-level/page";
import User from "../components/admin/admin-pages/user/User";


export const sideMenus = [
  {
    id: 0,
    label: "Dashboard",
    component: <Dashboard />,
    // icon: <DashboardIcon />,
  },
  {
    id: 1,
    label: "Chef managment",
    component : <ChefMain />,
  },

  {
    id: 2,
    label: "User management",
    component : <User />,
  },
  {
    id: 3,
    label: "Order managment",
    component : <OrderList />,
  },
  {
    id: 4,
    label: " Menu Items",
    component : <FoodMenu />,
  },
  // {
  //   id: 4,
  //   label: "Order management",
  //   // component : <Property />,
  // },
  {
    id: 5,
    label: "Cuisines",
    component : <Cuisines />,
  },
  {
    id: 6,
    label: "Dietary",
    component : <Dietary />,
  },
  {
    id: 7,
    label: "Dish Type",
    component : <DishType />,
  },
  {
    id: 8,
    label: "Spice Level",
    component : <SpiceLevel />,
  },
];
