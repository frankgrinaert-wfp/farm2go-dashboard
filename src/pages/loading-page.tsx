import { Spinner } from "@/components/ui/spinner";

function LoadingPage() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-16 text-primary" />
        <p>Loading Farm2Go</p>
      </div>
    </main>
  );
}

export { LoadingPage };
