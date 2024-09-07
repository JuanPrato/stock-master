"use client";

import Modal from "@/components/layout/modal";
import { Button } from "@/components/shadcn/ui/button";
import { ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getAuditRegistry } from "@/lib/api.utils";
import { DBInventoryLog } from "@/lib/db.type";
import { Label } from "@/components/shadcn/ui/label";
import RecentTable from "@/components/dashboard/recent-table";

export default function AuditRegistry() {

  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<DBInventoryLog[]>([]);

  useEffect(() => {
    getAuditRegistry().then(r => {
      setLogs(r);
    });
  }, []);

  return (
    <Modal
      trigger={<Button icon={ClipboardIcon}>Registro de auditoria</Button>}
      footer={<Button type="button" onClick={() => setOpen(false)}>Cerrar</Button>}
      title="Registro de auditoria"
      description="Movimientos completos del inventario"
      shouldClose={{ state: open }}
      onOpenChange={setOpen}
    >
      <div className="h-[600px] max-w-[600px] w-full overflow-y-auto">
      <RecentTable
        logs={logs.map(l => ({ product: l.product, type: l.type, date: l.saveDate, quantity: l.quantity }))}/>
      </div>
    </Modal>
  );
}