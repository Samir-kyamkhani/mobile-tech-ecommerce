import {
  ShoppingCart,
  Users,
  TrendingUp,
  Package2,
  IndianRupee,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { getAllProducts } from "../../redux/slices/productSlice";
import { getAllUsers } from "../../redux/slices/totalUsersSlice";

export default function StatsGridCard() {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const { data } = useSelector((state) => state.user.users);
  console.log();
  
  

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const totalRevenue = useMemo(() => {
    if (!orders) return 0;
    return orders.reduce((acc, order) => acc + parseFloat(order.total || 0), 0);
  }, [orders]);

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      change: "+20.1%", // Replace with dynamic comparison logic if available
      changeType: "positive",
      icon: IndianRupee,
    },
    {
      title: "Orders",
      value: orders?.length || 0,
      change: "+12.5%", // Replace with dynamic comparison logic if available
      changeType: "positive",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: products?.length || 0,
      change: "+3.2%", // Replace with dynamic comparison logic if available
      changeType: "positive",
      icon: Package2,
    },
    {
      title: "Active Users",
      value: data?.length || 0,
      change: "+8.1%", // Replace with dynamic comparison logic if available
      changeType: "positive",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <IconComponent className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {index === 0 ? "₹" : ""}
                  {stat.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
