import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import './index.css';
// management pages and layout
import Layout from './component/management/layout/Layout';
import Dashboard from './component/management/pages/Dashboard';
import POS from './component/management/pages/POS';
import Orders from './component/management/pages/Orders';
import Tables from './component/management/pages/Tables';
import Menu from './component/management/pages/Menu';
import Billing from './component/management/pages/Billing';
import Inventory from './component/management/pages/Inventory';
import Staff from './component/management/pages/Staff';
import Reports from './component/management/pages/Reports';
import CRM from './component/management/pages/CRM';
import Settings from './component/management/pages/Settings';
// kitchen pages and layout
import KitchenLayout from './component/kitchen/layout/KitchenLayout';
import KitchenDashboard from './component/kitchen/pages/KitchenDashboard';
// manager pages and layout
import ManagerLayout from './component/manager/layout/ManagerLayout';
import ManagerDashboard from './component/manager/pages/ManagerDashboard';
import LiveOrders from './component/manager/pages/LiveOrders';
import TableOverview from './component/manager/pages/TableOverview';
import StaffAttendance from './component/manager/pages/StaffAttendance';
import DailySales from './component/manager/pages/DailySales';
import Complaints from './component/manager/pages/Complaints';
import DiscountApproval from './component/manager/pages/DiscountApproval';
import InventoryAlerts from './component/manager/pages/InventoryAlerts';
// cashier pages and layout
import CashierLayout from './component/cashier/layout/CashierLayout';
import CashierDashboard from './component/cashier/pages/CashierDashboard';
import BillingQueue from './component/cashier/pages/BillingQueue';
import PaymentCollection from './component/cashier/pages/PaymentCollection';
import CashRegister from './component/cashier/pages/CashRegister';
import ReceiptHistory from './component/cashier/pages/ReceiptHistory';
import DiscountRequest from './component/cashier/pages/DiscountRequest';
// waiter pages and layout
import WaiterLayout from './component/waiter/layout/WaiterLayout';
import WaiterDashboard from './component/waiter/pages/WaiterDashboard';
import MyTables from './component/waiter/pages/MyTables';
import TakeOrder from './component/waiter/pages/TakeOrder';
import OrderStatus from './component/waiter/pages/OrderStatus';
import TableRequests from './component/waiter/pages/TableRequests';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* management Routes */}
        <Route path="/management" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="pos" element={<POS />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tables" element={<Tables />} />
          <Route path="menu" element={<Menu />} />
          <Route path="billing" element={<Billing />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff />} />
          <Route path="reports" element={<Reports />} />
          <Route path="crm" element={<CRM />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* kitchen Routes */}
        <Route path="/kitchen" element={<KitchenLayout />}>
          <Route index element={<KitchenDashboard />} />
        </Route>
        {/* manager Routes */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="live-orders" element={<LiveOrders />} />
          <Route path="table-overview" element={<TableOverview />} />
          <Route path="staff-attendance" element={<StaffAttendance />} />
          <Route path="daily-sales" element={<DailySales />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="discount-approval" element={<DiscountApproval />} />
          <Route path="inventory-alerts" element={<InventoryAlerts />} />
        </Route>
        {/* cashier Routes */}
        <Route path="/cashier" element={<CashierLayout />}>
          <Route index element={<CashierDashboard />} />
          <Route path="billing-queue" element={<BillingQueue />} />
          <Route path="payment" element={<PaymentCollection />} />
          <Route path="cash-register" element={<CashRegister />} />
          <Route path="receipts" element={<ReceiptHistory />} />
          <Route path="discount-request" element={<DiscountRequest />} />
        </Route>
        {/* waiter routes */}
        <Route path="/waiter" element={<WaiterLayout />}>
          <Route index element={<WaiterDashboard />} />
          <Route path="my-tables" element={<MyTables />} />
          <Route path="take-order" element={<TakeOrder />} />
          <Route path="order-status" element={<OrderStatus />} />
          <Route path="table-requests" element={<TableRequests />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;