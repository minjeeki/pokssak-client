import { VStack } from "@vapor-ui/core";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <VStack>
        <Outlet />
      </VStack>
    </main>
  );
}
