import lost from '../assets/no-page.svg';
import inLogger from '../inLogger';

const NotFound = () => {

    return (
        <section className="flex flex-col px-5 md:gap-5 md:flex-row pt-24 justify-center align-center">
            <img src={lost} className="h-60 w-60 self-center" alt="not-found" />
            <div className="flex flex-col gap-2 md:pt-10 self-center">
                <h1 className="text-7xl text-primary100 text-center font-bold">Oh, no!</h1>
                <h2 className="text-3xl text-secondary300 font-bold md:pl-5">
                    <span className="text-3xl text-secondary500 font-bold">404 </span>
                    Page not found</h2>
            </div>
        </section>
    );
};

export default inLogger(NotFound);
