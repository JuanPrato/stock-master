import RecentTable from "@/components/dashboard/recent-table";
import Box from "@/components/layout/box";
import Card from "@/components/layout/card";
import { ClipboardList, DollarSign, List, Package, ShoppingCart } from "lucide-react";
import { DashboardGetResponse } from "./api/dashboard/route";
import AddProduct from "@/components/dashboard/add-product";
import AddOrder from "@/components/dashboard/add-order";
import { db } from "@/lib/db";
import { products as productsTable } from "@/db/schema";
import Link from "next/link";
import {Button} from "@/components/shadcn/ui/button";

export const dynamic = "force-dynamic";

export default async function Home() {

  const { stats, inventory, categories } = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dashboard`, { method: "GET", cache: "no-cache" }).then(r => r.json()) as DashboardGetResponse;

  const products = await db.select().from(productsTable);

  return (
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
          <AddOrder products={products} />
          <Button icon={ClipboardList}>Generar Informe</Button>
          <Link href="/ordenes" className="block w-full">
            <Button icon={ShoppingCart} variant="outline" className="w-full">Todas las ordenes</Button>
          </Link>
        </div>
      </Box>
      <Box className="lg:col-span-3 gap-3 flex flex-col">
        <h2 className="text-2xl font-semibold">Actualizaciones Recientes en el Inventario</h2>
        <RecentTable logs={inventory} />
        <Link href="/inventario">
          <Button icon={List} variant="outline">Ver Inventario Completo</Button>
        </Link>
      </Box>
    </main>
  );
}
