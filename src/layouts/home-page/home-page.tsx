import { Carousel } from "./components/carousel";
import { ExploreTopBooks } from "./components/explore-top-books";
import { Heros } from "./components/heros";
import { LibraryServices } from "./components/library-services";

export const HomePage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    );
}