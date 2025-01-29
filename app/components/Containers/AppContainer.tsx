"use state";

interface AppContainerProps {
	children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	return <div className="max-w-[1200px] mx-auto h-screen">{children}</div>;
};

export default AppContainer;
