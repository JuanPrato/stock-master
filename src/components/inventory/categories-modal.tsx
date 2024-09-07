"use client";

import { ClipboardIcon } from "lucide-react";
import Input from "@/components/layout/input";
import Modal from "@/components/layout/modal";
import { useFormState } from "react-dom";
import { saveCategory } from "@/actions/category.actions";
import { Button } from "@/components/shadcn/ui/button";
import { DBCategory } from "@/lib/db.type";
import SelectSearch from "@/components/layout/select-search";
import { useState } from "react";

interface Props {
  categories: DBCategory[];
}

export default function CategoriesModal({ categories }: Props) {

  const [state, action] = useFormState(saveCategory, { errors: undefined, pending: true });
  const [selected, setSelected] = useState<Partial<DBCategory>>();

  function handleCategorySelected(cat: string) {
    if (cat === selected?.id?.toString()) {
      setSelected(undefined);
      return;
    }
    const category = categories.find((c) => c.id.toString() === cat);
    setSelected(category);
  }

  function handleClose(v: boolean) {
    if (!v) {
      setSelected(undefined);
    }
  }

  return (
    <Modal
      trigger={<Button icon={ClipboardIcon}>Categorias</Button>}
      footer={<Button
        type="submit"
        form="categoryForm">{selected?.id ? "Actualizar categoría" : "Añadir categoria"}
      </Button>
      }
      title="Agregar una nueva categoría"
      description="Se recomienda usar un color nueva para diferenciar los productos"
      shouldClose={{ should: (!state?.pending && !state?.errors) }}
      onOpenChange={handleClose}
    >
      <form className="flex flex-col gap-3" action={action} id="categoryForm">
        <SelectSearch
          items={categories.map((cat) => ({ label: cat.description, value: cat.id.toString() }))}
          onValueChange={handleCategorySelected}
          placeHolder="Categoria nueva"
        />
        <Input
          name="Nombre"
          id="name" type="text"
          error={state.errors?.name}
          value={selected?.description || ""}
          onChange={(e) => setSelected({ ...selected, description: e.target.value })}
        />
        <Input
          name="Color"
          id="color"
          type="color"
          error={state.errors?.color}
          value={selected?.color || "#000000"}
          onChange={(e) => setSelected({ ...selected, color: e.target.value })}
        />
      </form>
    </Modal>
  )
}