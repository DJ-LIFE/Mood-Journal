export const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="app-layout bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-300 h-screen flex justify-center items-center">
          <main className="max-w-600">{children}</main>
        </div>
      );
}
