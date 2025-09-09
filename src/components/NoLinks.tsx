import { Link } from "lucide-react";
import { CreateButton } from "./CreateButton";

export function NoLinks() {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md">
      <Link className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
      <h2 className="text-xl font-bold mb-2 text-center">No Links Found</h2>
      <p className="text-muted-foreground text-sm mb-5 text-center">
        You have not created any links yet. Click the button below to create your first link.
      </p>
      <CreateButton />
    </div>
  );
}
