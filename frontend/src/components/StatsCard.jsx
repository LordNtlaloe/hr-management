import { CreditCard, DollarSign, Package, TrendingUp, Users } from "lucide-react";

const stats = [
    {
        icon: <Package size={26} />,
        title: "Total Products",
        value: "25,154",
        percentage: "25%",
    },
    {
        icon: <DollarSign size={26} />,
        title: "Total Paid Orders",
        value: "$16,000",
        percentage: "12%",
    },
    {
        icon: <Users size={26} />,
        title: "Total Customers",
        value: "15,400k",
        percentage: "15%",
    },
    {
        icon: <CreditCard size={26} />,
        title: "Sales",
        value: "12,340",
        percentage: "19%",
    },
];

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="card"
                >
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                            {stat.icon}
                        </div>
                        <p className="card-title">{stat.title}</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{stat.value}</p>
                        <span className="flex items-center gap-x-2 border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            {stat.percentage}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
