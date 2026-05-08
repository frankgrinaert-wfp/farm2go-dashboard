function MainPage() {
  return (
    <>
      <main className="mx-auto flex flex-col gap-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl sm:text-3xl">Overview</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4"></div>
        </div>
      </main>
    </>
  );
}

export { MainPage };
