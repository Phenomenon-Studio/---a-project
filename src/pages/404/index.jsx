import { useChangeTitle } from '../../hooks/useChangeTitle';

const NotFound = () => {
    useChangeTitle('Not Found');

    return (
        <section className="section min-h-full">
            <div className="container min-h-full flex flex-col">
                <h1 className="title title--main tracking-tighter text-center">
                    Not <i>found</i>
                </h1>
            </div>
        </section>
    );
};

export default NotFound;
