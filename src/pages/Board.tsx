import { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { t } from "i18next";

type Props = {};

export default function Board({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Block user"
        description="Select a user and provide a reason"
      >
        <div className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </Modal>

      <Select
        placeholder="Select user"
        onChange={() => {}}
        options={[
          { label: "John", value: "1" },
          { label: "Anna", value: "2" },
        ]}
      />

      <Textarea
        t={t}
        label="Description"
        placeholder="Enter description..."
        maxLength={200}
        showRemaining
      />
    </div>
  );
}
