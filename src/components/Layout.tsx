export const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="app-layout bg-gradient-to-br from-[#FFEDD5] to-[#FDBA74] h-screen flex justify-center items-center">
          <main className="max-w-600">{children}</main>
        </div>
      );
}
