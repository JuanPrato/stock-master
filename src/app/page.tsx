import RecentTable from "@/components/dashboard/recent-table";
import Box from "@/components/layout/box";
import Button from "@/components/layout/button";
import Card from "@/components/layout/card";
import { ClipboardList, DollarSign, List, Moon, Package, PlusCircle, Settings, ShoppingCart } from "lucide-react";
import { DashboardGetResponse } from "./api/dashboard/route";
import AddProduct from "@/components/dashboard/add-product";

export default async function Home() {

  const { stats, inventory, categories } = await fetch("http://localhost:3000/api/dashboard", { method: "GET", cache: "no-cache" }).then(r => r.json()) as DashboardGetResponse;

  return (
    <section>
      <header className="flex p-4">
        <h1 className="flex items-center justify-center"><Package />
          <span className="ml-2 text-lg font-semibold">StockMaster</span>
        </h1>
      </header>

      <main className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
        <section className="col-span-2 lg:col-span-4 grid grid-cols-2 gap-4">
          <Card title="Total de Productos" detail={`+${stats.totalImproved} desde último mes`} icon={Package} value={stats.total} />
          <Card title="Productos Bajos en Stock" detail="Necesitan reabastecimiento" icon={ClipboardList} value={stats.low} />
          <Card title="Órdenes del día" detail={`${stats.dayUrgent} urgentes`} icon={ShoppingCart} value={stats.day} />
          <Card title="Valor Total del Inventario" detail={`+${stats.totalValueImproved}% desde el último mes`} icon={DollarSign} value={stats.totalValue} isMoney />
        </section>
        <Box>
          <h2 className="text-2xl font-semibold mb-10">Acciones Rápidas</h2>
          <div className="flex flex-col gap-4">
            <AddProduct categories={categories} />
            <Button icon={ShoppingCart}>Procesar Orden</Button>
            <Button icon={ClipboardList}>Generar Informe</Button>
            <Button icon={List} accent>Ver Inventario Completo</Button>
          </div>
        </Box>
        <Box className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-10">Actualizaciones Recientes en el Inventario</h2>
          <RecentTable logs={inventory} />
        </Box>
      </main>
      <footer className="w-full border-t border-border p-12 flex justify-between">
        <p className="text-muted-foreground text-sm">© 2023 StockMaster Inc. Todos los derechos reservados.</p>
        <div className="flex gap-4 text-primary">
          <button className="hover:bg-secondary rounded-sm p-2"><Settings className="size-6" /></button>
          <button className="hover:bg-secondary rounded-sm p-2"><Moon className="size-6" /></button>
        </div>
      </footer>
    </section>
  );
}
