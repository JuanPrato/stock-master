import { Package } from "lucide-react";
import Button from "../layout/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import Input from "../layout/input";

export default function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={Package}>Añadir Producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo Producto</DialogTitle>
          <DialogDescription>Complete los detalles del nuevo producto a continuación</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input name="Nombre" id="name" type="text" />
          <Input name="Cantidad" id="quantity" type="number" />
          <Input name="Precio" id="price" type="number" />
          <div className="flex gap-4 items-center">
            <Label htmlFor="category" className="text-md w-1/4">Categoría</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button>Añadir producto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}