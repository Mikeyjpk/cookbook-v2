"use state";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div
      className="
            max-w-[1200px]
            mx-auto
            px-2
            sm:px-4
            md:px-6
            lg:px-8
            h-screen
            bg-black/10
        "
    >
      {children}
    </div>
  );
};

export default AppContainer;
