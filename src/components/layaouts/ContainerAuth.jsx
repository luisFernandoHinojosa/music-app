export const ContainerAuth = ({children}) => {
  return (
    <main className="bg-[#37211c] text-white font-urbanist h-screen grid items-center px-4 bg-[url(/images/auth-bg-mobile.png)] bg-no-repeat bg-right-bottom md:bg-[url(/images/auth-bg-destok.png)] transition-all">
      <section className="grid md:grid-cols-[auto_400px] md:justify-center gap-10 ">
        {children}
      </section>
      </main>
  )
}