import {
  ShoppingCart,
  Users,
  TrendingUp,
  Package2,
  IndianRupee,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";
import { getAllCustomers } from "../../redux/slices/customerSlice";

function calculateChange(current, previous) {
  if (previous === 0) return "0%";
  const change = ((current - previous) / previous) * 100;
  const rounded = change.toFixed(1);
  return `${change >= 0 ? "+" : ""}${rounded}%`;
}

export default function StatsGridCard({
  orders = [],
  previousOrdersCount = 0,
  previousProductsCount = 0,
  previousUsersCount = 0,
  previousRevenue = 0,
}) {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.product);
  const { customer: users = [] } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, order) => {
      const total = parseFloat(order.total) || 0;
      if (order.payment === "Paid" && order.status !== "Cancelled") {
        return acc + total;
      }
      return acc;
    }, 0);
  }, [orders]);

  const currentOrdersCount = orders.length;
  const currentProductsCount = products.length;
  const currentUsersCount = users.length;

  const revenueChange = useMemo(
    () => calculateChange(totalRevenue, previousRevenue),
    [totalRevenue, previousRevenue]
  );
  const orderChange = useMemo(
    () => calculateChange(currentOrdersCount, previousOrdersCount),
    [currentOrdersCount, previousOrdersCount]
  );
  const productChange = useMemo(
    () => calculateChange(currentProductsCount, previousProductsCount),
    [currentProductsCount, previousProductsCount]
  );
  const userChange = useMemo(
    () => calculateChange(currentUsersCount, previousUsersCount),
    [currentUsersCount, previousUsersCount]
  );

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      change: revenueChange,
      changeType: parseFloat(revenueChange) >= 0 ? "positive" : "negative",
      icon: IndianRupee,
    },
    {
      title: "Orders",
      value: currentOrdersCount,
      change: orderChange,
      changeType: parseFloat(orderChange) >= 0 ? "positive" : "negative",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: currentProductsCount,
      change: productChange,
      changeType: parseFloat(productChange) >= 0 ? "positive" : "negative",
      icon: Package2,
    },
    {
      title: "Active Users",
      value: currentUsersCount,
      change: userChange,
      changeType: parseFloat(userChange) >= 0 ? "positive" : "negative",
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
