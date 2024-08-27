import RecentTable from "@/components/dashboard/recent-table";
import Box from "@/components/layout/box";
import Button from "@/components/layout/button";
import Card from "@/components/layout/card";
import { ClipboardList, DollarSign, List, Package, PlusCircle, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <section>
      <header className="flex p-4">
        <h1 className="flex items-center justify-center"><Package />
          <span className="ml-2 text-lg font-semibold">StockMaster</span>
        </h1>
      </header>

      <main className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
        <section className="col-span-2 lg:col-span-4 grid grid-cols-2 gap-4">
          <Card title="Total de Productos" detail="+20 desde último mes" icon={Package} value={1234} />
          <Card title="Productos Bajos en Stock" detail="Necesitan reabastecimiento" icon={ClipboardList} value={45} />
          <Card title="Órdenes del día" detail="12 urgentes" icon={ShoppingCart} value={28} />
          <Card title="Valor Total del Inventario" detail="+2.5% desde el último mes" icon={DollarSign} value={12345678} isMoney />
        </section>
        <Box>
          <h2 className="text-2xl font-semibold mb-10">Acciones Rápidas</h2>
          <div className="flex flex-col gap-4">
            <Button icon={Package}>Añadir Producto</Button>
            <Button icon={ShoppingCart}>Procesar Order</Button>
            <Button icon={ClipboardList}>Generar Informe</Button>
            <Button icon={List} accent>Ver Inventario Completo</Button>
          </div>
        </Box>
        <Box className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-10">Actualizaciones Recientes en el Inventario</h2>
          <RecentTable />
        </Box>
      </main>
    </section>
  );
}
