import './style.scss';

type AppContainerProps = {
    children: React.ReactNode;
}

export default function AppContainer({children}: AppContainerProps) {
    return (
        <div className="app__container">
            {children}
        </div>
    );
}