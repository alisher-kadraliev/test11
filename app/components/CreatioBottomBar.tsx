import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SaveChanges } from "./SubmitButtons";

export function CreatioBottomBar() {
  return (
    <div className="fixed w-full bottom-0 left-0 right-0 z-50 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full max-w-7xl">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <SaveChanges />
      </div>
    </div>
  );
}