import ParallaxSection from "../../components/demo2/ParallaxSection";

//TODO 'clean' empty space in the bottom

const Demo2 = () => {

    return (
        <div>
            <section>
                <h1 className="text-4xl">Hello world</h1>
            </section>
            <section>
                <h2 className="text-2xl">Section 1</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque provident dolorum fuga! Itaque facilis incidunt facere iure minus sequi rerum magnam recusandae officia quasi, architecto, illum voluptatem soluta asperiores nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem nam doloribus voluptatibus sit libero molestiae earum iure culpa, distinctio necessitatibus perspiciatis odit, repellendus adipisci officia vero minus quibusdam consequatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam minus reprehenderit id sed, sit, iusto atque provident repudiandae nemo tenetur doloremque ipsam maxime distinctio explicabo facere accusantium? Quam, illo doloribus.
                </p>
            </section>
            <ParallaxSection color={'red'} speed={'0.6'} isLastSection={false}>
                <h2 className="text-2xl">Section 2</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque provident dolorum fuga! Itaque facilis incidunt facere iure minus sequi rerum magnam recusandae officia quasi, architecto, illum voluptatem soluta asperiores nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem nam doloribus voluptatibus sit libero molestiae earum iure culpa, distinctio necessitatibus perspiciatis odit, repellendus adipisci officia vero minus quibusdam consequatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam minus reprehenderit id sed, sit, iusto atque provident repudiandae nemo tenetur doloremque ipsam maxime distinctio explicabo facere accusantium? Quam, illo doloribus.
                </p>
            </ParallaxSection>
            <ParallaxSection color={'white'} speed={'0.6'} isLastSection={false}>
                <h2 className="text-2xl">Section 3</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque provident dolorum fuga! Itaque facilis incidunt facere iure minus sequi rerum magnam recusandae officia quasi, architecto, illum voluptatem soluta asperiores nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem nam doloribus voluptatibus sit libero molestiae earum iure culpa, distinctio necessitatibus perspiciatis odit, repellendus adipisci officia vero minus quibusdam consequatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam minus reprehenderit id sed, sit, iusto atque provident repudiandae nemo tenetur doloremque ipsam maxime distinctio explicabo facere accusantium? Quam, illo doloribus.
                </p>
            </ParallaxSection>
            <ParallaxSection color={'forestgreen'} speed={'0.85'} isLastSection={true}>
                <h2 className="text-2xl">Section 4</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque provident dolorum fuga! Itaque facilis incidunt facere iure minus sequi rerum magnam recusandae officia quasi, architecto, illum voluptatem soluta asperiores nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem nam doloribus voluptatibus sit libero molestiae earum iure culpa, distinctio necessitatibus perspiciatis odit, repellendus adipisci officia vero minus quibusdam consequatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam minus reprehenderit id sed, sit, iusto atque provident repudiandae nemo tenetur doloremque ipsam maxime distinctio explicabo facere accusantium? Quam, illo doloribus.
                </p>
            </ParallaxSection>
        </div>
    )
}

export default Demo2;