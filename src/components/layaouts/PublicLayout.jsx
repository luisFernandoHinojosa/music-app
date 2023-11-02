export const PublicLayout = ({children}) => {
  return (
    <section className="bg-[#37211c] min-h-screen text-white font-urbanist grid  bg-[url(/images/auth-bg-mobile.png)] bg-no-repeat bg-right-bottom md:bg-[url(/images/auth-bg-destok.png)] transition-all grid-rows-[auto_1fr]">
      <header className="bg-orange-900  flex justify-between p-4 px-4 uppercase items-center">
        <h1 className="font-semibold text-lg">Git Music</h1>
        
      </header>
      <section className="py-14 px-4 overflow-y-auto">
        <main className="w-[min(520px,_100%)] mx-auto bg-orange-900  py-8 px-6 sm:px-14 rounded-3xl">
          {children}
        </main>
      </section>
      {/* Seccion popups */}
    </section>
  )
}