"use client";

import {ClipboardIcon, Package} from "lucide-react";
import Input from "@/components/layout/input";
import InputBox from "@/components/layout/input-box";
import MoneyInput from "@/components/layout/money-input";
import {Label} from "@/components/shadcn/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shadcn/ui/select";
import {Textarea} from "@/components/shadcn/ui/textarea";
import Modal from "@/components/layout/modal";
import {useState} from "react";
import {useFormState} from "react-dom";
import {saveCategory} from "@/actions/category.actions";
import {Button} from "@/components/shadcn/ui/button";

export default function AddCategory() {

    const [errors, setErrors] = useState<any>();
    const [state, action] = useFormState(saveCategory, { errors: undefined, pending: true });

    return (
        <Modal
            trigger={<Button icon={ClipboardIcon}>Añadir categoria</Button>}
            footer={<Button type="submit" form="categoryForm">Añadir categoria</Button>}
            title="Agregar una nueva categoría"
            description="Se recomienda usar un color nueva para diferenciar los productos"
        >
            <form className="flex flex-col gap-3" action={action} id="categoryForm">
                <Input name="Nombre" id="name" type="text" error={errors?.name}/>
                <Input name="Color" id="stock" type="color" error={errors?.stock}/>
            </form>
        </Modal>
    )
}